# Stage 1: Build frontend
FROM node:22-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Build Go backend (embeds frontend static files)
FROM golang:1.24-alpine AS backend

WORKDIR /src

COPY web/go.mod ./
COPY web/*.go ./

# Copy frontend build output for go:embed
COPY --from=frontend /app/build/index.html ./
COPY --from=frontend /app/build/favicon.svg ./
COPY --from=frontend /app/build/robots.txt ./
COPY --from=frontend /app/build/manifest.json ./
COPY --from=frontend /app/build/asset-manifest.json ./
COPY --from=frontend /app/build/static ./static/

RUN CGO_ENABLED=0 go build -o /vmui-server .

# Stage 3: Minimal runtime
FROM alpine:3.21

COPY --from=backend /vmui-server /vmui-server
RUN mkdir -p /data

EXPOSE 8080

CMD ["/vmui-server", "-dataDir=/data"]
