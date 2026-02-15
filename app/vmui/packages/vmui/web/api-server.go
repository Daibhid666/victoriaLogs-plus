//go:build ignore

package main

import (
	"encoding/json"
	"flag"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"sync"
)

var listenAddr = flag.String("listenAddr", ":8080", "listen address")
var dataDir = flag.String("dataDir", "data", "directory to store JSON data")

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

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next(w, r)
	}
}

func jsonAPIHandler(filename string) http.HandlerFunc {
	return corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
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
	})
}

func main() {
	flag.Parse()
	ensureDataDir()

	mux := http.NewServeMux()
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`OK`))
	})
	mux.HandleFunc("/api/query-history", jsonAPIHandler("query-history.json"))
	mux.HandleFunc("/api/group-settings", jsonAPIHandler("group-settings.json"))
	mux.HandleFunc("/api/global-settings", jsonAPIHandler("global-settings.json"))
	mux.HandleFunc("/api/field-selector-settings", jsonAPIHandler("field-selector-settings.json"))

	log.Printf("API server starting at %s", *listenAddr)
	log.Fatal(http.ListenAndServe(*listenAddr, mux))
}
