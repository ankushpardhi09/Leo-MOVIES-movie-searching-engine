@echo off
cls
echo.
echo ============================================
echo   🎬 Movie Search Engine - Local Dev
echo ============================================
echo.
echo Choose startup mode:
echo.
echo   1 - Combined (Both in same terminal) - RECOMMENDED
echo   2 - Separate (Backend in terminal 1, Frontend in terminal 2)
echo   3 - Backend only
echo   4 - Frontend only
echo.

set /p choice="Enter choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo Starting Combined Mode...
    echo Frontend: http://localhost:3000
    echo Backend: http://localhost:5000
    echo.
    npm run dev
) else if "%choice%"=="2" (
    echo.
    echo Starting Separate Mode...
    echo.
    call start-separate.bat
) else if "%choice%"=="3" (
    echo.
    echo Starting Backend only on port 5000...
    echo.
    npm run backend
) else if "%choice%"=="4" (
    echo.
    echo Starting Frontend only on port 3000...
    echo.
    npm run frontend
) else (
    echo Invalid choice. Exiting.
    pause
    exit /b 1
)