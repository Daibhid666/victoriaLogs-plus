# Stage 1: Build frontend
FROM node:22-alpine AS frontend

WORKDIR /app

COPY app/vmui/packages/vmui/package.json app/vmui/packages/vmui/package-lock.json* ./
RUN npm ci

COPY app/vmui/packages/vmui/ ./
RUN npm run build

# Stage 2: Build VictoriaLogs binary with custom UI and custom API
FROM golang:1.25.7-alpine AS backend

RUN apk add --no-cache git make gcc musl-dev

WORKDIR /src

# Copy entire project
COPY . .

# Replace embedded vmui with our custom frontend build
RUN rm -rf app/vlselect/vmui/* && \
    cp -r app/vmui/packages/vmui/build/* app/vlselect/vmui/ && \
    rm -rf app/vlselect/vmui/dashboards

# Copy freshly built frontend (overwrite what was just copied from source)
COPY --from=frontend /app/build/ app/vlselect/vmui/

# Build VictoriaLogs binary
RUN CGO_ENABLED=0 go build -mod=vendor -trimpath -buildvcs=false \
    -ldflags "-extldflags '-static'" \
    -tags 'netgo osusergo' \
    -o /victoria-logs ./app/victoria-logs

# Stage 3: Minimal runtime
FROM alpine:3.23

RUN apk add --no-cache ca-certificates
COPY --from=backend /victoria-logs /victoria-logs-prod

EXPOSE 9428

ENTRYPOINT ["/victoria-logs-prod"]
