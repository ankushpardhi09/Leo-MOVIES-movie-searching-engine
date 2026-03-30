@echo off
setlocal

cd /d "%~dp0"

echo.
echo ============================================
echo   Movie Search Engine - Separate Terminals
echo ============================================
echo Launching backend and frontend in two windows...
echo.

start "Movie Backend" cmd /k "cd /d "%~dp0" && npm run dev:backend"
start "Movie Frontend" cmd /k "cd /d "%~dp0" && npm run dev:frontend"

echo Backend window: Movie Backend
echo Frontend window: Movie Frontend
echo.
echo URLs:
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
endlocal
