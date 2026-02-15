package main

import (
	"embed"
	"encoding/json"
	"flag"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"sync"
)

// specific files
// static content
//
//go:embed favicon.svg robots.txt index.html manifest.json asset-manifest.json
//go:embed static
var files embed.FS

var listenAddr = flag.String("listenAddr", ":8080", "defines listen addr for http server, default to :8080")
var dataDir = flag.String("dataDir", "data", "directory to store persistent JSON data")

var mu sync.RWMutex

func ensureDataDir() {
	if err := os.MkdirAll(*dataDir, 0o755); err != nil {
		log.Fatalf("failed to create data dir %s: %v", *dataDir, err)
	}
}

func readJSONFile(name string) (json.RawMessage, error) {
	mu.RLock()
	defer mu.RUnlock()
	p := filepath.Join(*dataDir, name)
	data, err := os.ReadFile(p)
	if err != nil {
		if os.IsNotExist(err) {
			return json.RawMessage("null"), nil
		}
		return nil, err
	}
	return json.RawMessage(data), nil
}

func writeJSONFile(name string, data []byte) error {
	mu.Lock()
	defer mu.Unlock()
	p := filepath.Join(*dataDir, name)
	return os.WriteFile(p, data, 0o644)
}

func deleteJSONFile(name string) error {
	mu.Lock()
	defer mu.Unlock()
	p := filepath.Join(*dataDir, name)
	err := os.Remove(p)
	if err != nil && !os.IsNotExist(err) {
		return err
	}
	return nil
}

func jsonAPIHandler(filename string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		switch r.Method {
		case http.MethodGet:
			data, err := readJSONFile(filename)
			if err != nil {
				http.Error(w, `{"error":"`+err.Error()+`"}`, http.StatusInternalServerError)
				return
			}
			w.WriteHeader(http.StatusOK)
			_, _ = w.Write(data)

		case http.MethodPost:
			body, err := io.ReadAll(r.Body)
			if err != nil {
				http.Error(w, `{"error":"failed to read body"}`, http.StatusBadRequest)
				return
			}
			defer r.Body.Close()
			// Validate JSON
			if !json.Valid(body) {
				http.Error(w, `{"error":"invalid JSON"}`, http.StatusBadRequest)
				return
			}
			if err := writeJSONFile(filename, body); err != nil {
				http.Error(w, `{"error":"`+err.Error()+`"}`, http.StatusInternalServerError)
				return
			}
			w.WriteHeader(http.StatusOK)
			_, _ = w.Write([]byte(`{"status":"ok"}`))

		case http.MethodDelete:
			if err := deleteJSONFile(filename); err != nil {
				http.Error(w, `{"error":"`+err.Error()+`"}`, http.StatusInternalServerError)
				return
			}
			w.WriteHeader(http.StatusOK)
			_, _ = w.Write([]byte(`{"status":"ok"}`))

		default:
			http.Error(w, `{"error":"method not allowed"}`, http.StatusMethodNotAllowed)
		}
	}
}

func main() {
	flag.Parse()
	ensureDataDir()

	handler := http.NewServeMux()
	handler.Handle("/", http.FileServer(http.FS(files)))
	handler.HandleFunc("/health", func(writer http.ResponseWriter, request *http.Request) {
		writer.WriteHeader(http.StatusOK)
		_, _ = writer.Write([]byte(`OK`))
	})

	// API endpoints for persistent storage
	handler.HandleFunc("/api/query-history", jsonAPIHandler("query-history.json"))
	handler.HandleFunc("/api/group-settings", jsonAPIHandler("group-settings.json"))
	handler.HandleFunc("/api/global-settings", jsonAPIHandler("global-settings.json"))
	handler.HandleFunc("/api/field-selector-settings", jsonAPIHandler("field-selector-settings.json"))

	log.Printf("starting web server at: %v", *listenAddr)
	log.Fatal(http.ListenAndServe(*listenAddr, handler))
}
