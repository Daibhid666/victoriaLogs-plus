package customapi

import (
	"encoding/json"
	"flag"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"sync"

	"github.com/VictoriaMetrics/VictoriaMetrics/lib/httpserver"
	"github.com/VictoriaMetrics/VictoriaMetrics/lib/logger"
)

var dataDir = flag.String("customapi.dataDir", "custom-api-data", "directory to store persistent JSON data for custom API endpoints")

var mu sync.RWMutex

// Init initializes the custom API module.
func Init() {
	if err := os.MkdirAll(*dataDir, 0o755); err != nil {
		logger.Fatalf("customapi: failed to create data dir %s: %v", *dataDir, err)
	}
}

// Stop stops the custom API module.
func Stop() {
	// nothing to do
}

// RequestHandler handles /api/* requests. Returns true if the request was handled.
func RequestHandler(w http.ResponseWriter, r *http.Request) bool {
	path := strings.ReplaceAll(r.URL.Path, "//", "/")

	if !strings.HasPrefix(path, "/api/") {
		return false
	}

	httpserver.EnableCORS(w, r)

	switch path {
	case "/api/query-history":
		jsonAPIHandler("query-history.json", w, r)
		return true
	case "/api/group-settings":
		jsonAPIHandler("group-settings.json", w, r)
		return true
	case "/api/field-selector-settings":
		jsonAPIHandler("field-selector-settings.json", w, r)
		return true
	default:
		return false
	}
}

func jsonAPIHandler(filename string, w http.ResponseWriter, r *http.Request) {
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
