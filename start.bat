@echo off
echo Starting Movie Search Engine...
echo.

IF NOT EXIST node_modules (
  echo Installing root dependencies...
  npm install
)

IF NOT EXIST backend\node_modules (
  echo Installing backend dependencies...
  cd backend && npm install && cd ..
)

IF NOT EXIST frontend\node_modules (
  echo Installing frontend dependencies...
  cd frontend && npm install && cd ..
)

echo.
echo Starting backend (port 5000) and frontend (port 3000)...
npm run dev
