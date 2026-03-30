#!/bin/bash

echo "🎬 Starting Movie Search Engine..."
echo ""

# Check if node_modules exist, if not install
if [ ! -d "node_modules" ]; then
  echo "📦 Installing root dependencies..."
  npm install
fi

if [ ! -d "backend/node_modules" ]; then
  echo "📦 Installing backend dependencies..."
  cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
  echo "📦 Installing frontend dependencies..."
  cd frontend && npm install && cd ..
fi

echo ""
echo "🚀 Starting backend (port 5000) and frontend (port 3000)..."
npm run dev
