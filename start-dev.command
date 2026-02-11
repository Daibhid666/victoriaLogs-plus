#!/bin/bash
set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
FRONTEND_DIR="$PROJECT_ROOT/app/vmui/packages/vmui"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

cleanup() {
  echo -e "\n${YELLOW}Shutting down...${NC}"
  [[ -n "$BACKEND_PID" ]] && kill "$BACKEND_PID" 2>/dev/null
  [[ -n "$FRONTEND_PID" ]] && kill "$FRONTEND_PID" 2>/dev/null
  wait 2>/dev/null
  echo -e "${GREEN}All processes stopped.${NC}"
  exit 0
}
trap cleanup SIGINT SIGTERM

# --- Build & start backend ---
echo -e "${GREEN}[Backend] Building victoria-logs...${NC}"
cd "$PROJECT_ROOT"
make victoria-logs

echo -e "${GREEN}[Backend] Starting victoria-logs on :9428 ...${NC}"
mkdir -p "$PROJECT_ROOT/victoria-logs-data"
"$PROJECT_ROOT/bin/victoria-logs" \
  -storageDataPath="$PROJECT_ROOT/victoria-logs-data" \
  -httpListenAddr=:9428 &
BACKEND_PID=$!

# --- Start frontend ---
echo -e "${GREEN}[Frontend] Starting vmui dev server on :3000 ...${NC}"
cd "$FRONTEND_DIR"
npm run start &
FRONTEND_PID=$!

echo -e "${YELLOW}-----------------------------------------------${NC}"
echo -e "${GREEN} Backend  -> http://localhost:9428${NC}"
echo -e "${GREEN} Frontend -> http://localhost:3000${NC}"
echo -e "${YELLOW} Press Ctrl+C to stop both services${NC}"
echo -e "${YELLOW}-----------------------------------------------${NC}"

wait
