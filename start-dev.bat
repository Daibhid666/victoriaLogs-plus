@echo off
setlocal EnableExtensions

cd /d "%~dp0"
set "ROOT=%CD%"
set "BACKEND_BIN=%ROOT%\bin\victoria-logs.exe"
set "BACKEND_DATA=%ROOT%\victoria-logs-data"
set "CUSTOM_API_DATA=%ROOT%\custom-api-data"
set "FRONTEND_DIR=%ROOT%\app\vmui\packages\vmui"
set "GO_CACHE_DIR=%ROOT%\.cache\go-build"
set "GO_MOD_CACHE_DIR=%ROOT%\.cache\go-mod"
set "FRONTEND_MODE=native"

echo [INFO] Project root: %ROOT%

if not exist "%ROOT%\.cache" mkdir "%ROOT%\.cache"
if not exist "%GO_CACHE_DIR%" mkdir "%GO_CACHE_DIR%"
if not exist "%GO_MOD_CACHE_DIR%" mkdir "%GO_MOD_CACHE_DIR%"

echo [INFO] Checking prerequisites...
where /q go
if errorlevel 1 (
  echo [ERROR] 'go' not found in PATH.
  echo         Please install Go and reopen terminal.
  pause
  exit /b 1
)

where /q npm.cmd
if errorlevel 1 (
  echo [ERROR] 'npm.cmd' not found in PATH.
  echo         Please install Node.js and reopen terminal.
  pause
  exit /b 1
)

if not exist "%FRONTEND_DIR%\package.json" (
  echo [ERROR] Frontend directory not found: %FRONTEND_DIR%
  pause
  exit /b 1
)

echo [INFO] Checking frontend runtime mode...
pushd "%FRONTEND_DIR%"
node -e "const cp=require('child_process');const p=cp.spawn(process.execPath,['-v'],{stdio:['pipe','pipe','inherit']});p.on('error',()=>process.exit(1));p.on('exit',()=>process.exit(0));"
if errorlevel 1 (
  set "FRONTEND_MODE=docker"
)
popd

echo [INFO] Building backend binary...
set "GOCACHE=%GO_CACHE_DIR%"
set "GOMODCACHE=%GO_MOD_CACHE_DIR%"
go build -mod=vendor -o "%BACKEND_BIN%" .\app\victoria-logs
if errorlevel 1 (
  echo [ERROR] Backend build failed.
  pause
  exit /b 1
)

if not exist "%BACKEND_DATA%" mkdir "%BACKEND_DATA%"
if not exist "%CUSTOM_API_DATA%" mkdir "%CUSTOM_API_DATA%"

if "%FRONTEND_MODE%"=="native" if not exist "%FRONTEND_DIR%\node_modules" (
  echo [INFO] Installing frontend dependencies - first run...
  pushd "%FRONTEND_DIR%"
  npm.cmd install
  if errorlevel 1 (
    popd
    echo [ERROR] npm install failed.
    pause
    exit /b 1
  )
  popd
)

echo [INFO] Starting backend window...
start "VictoriaLogs Backend :9428" /D "%ROOT%" cmd /k ""%BACKEND_BIN%" -storageDataPath="%BACKEND_DATA%" -customapi.dataDir="%CUSTOM_API_DATA%" -httpListenAddr=:9428"

echo [INFO] Starting frontend window...
if "%FRONTEND_MODE%"=="native" (
  start "VMUI Frontend :3000" /D "%FRONTEND_DIR%" cmd /k "npm.cmd run start"
) else (
  where /q docker
  if errorlevel 1 (
    echo [ERROR] Frontend native mode is blocked by system policy, and Docker is not found.
    echo         Please install Docker Desktop or run the script in an environment without spawn restrictions.
    pause
    exit /b 1
  )
  start "VMUI Frontend :3000 (Docker)" /D "%ROOT%" cmd /k ""%ROOT%\start-frontend-docker.bat""
)

echo.
echo [OK] Started.
echo      Backend UI:   http://127.0.0.1:9428/select/vmui/
echo      Frontend dev: http://127.0.0.1:3000/
echo      Frontend mode: %FRONTEND_MODE%
echo.
echo [NOTE] If frontend dev page cannot query logs, set Server URL to:
echo        http://127.0.0.1:9428
echo.
pause
