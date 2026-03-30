#!/bin/bash

clear

echo "==========================================="
echo "   🎬 Movie Search Engine - Local Dev"
echo "==========================================="
echo ""
echo "Choose startup mode:"
echo ""
echo "  1 - Combined (Both in same terminal) - RECOMMENDED"
echo "  2 - Separate (Backend in terminal 1, Frontend in terminal 2)"
echo "  3 - Backend only"
echo "  4 - Frontend only"
echo ""

read -p "Enter choice (1-4): " choice

case $choice in
  1)
    echo ""
    echo "Starting Combined Mode..."
    echo "Frontend: http://localhost:3000"
    echo "Backend: http://localhost:5000"
    echo ""
    npm run dev
    ;;
  2)
    echo ""
    echo "⚠️  SEPARATE MODE"
    echo ""
    echo "Terminal 1 (Backend):"
    echo "  npm run backend"
    echo ""
    echo "Terminal 2 (Frontend):"
    echo "  npm run frontend"
    echo ""
    read -p "Press enter to continue..."
    ;;
  3)
    echo ""
    echo "Starting Backend only on port 5000..."
    echo ""
    npm run backend
    ;;
  4)
    echo ""
    echo "Starting Frontend only on port 3000..."
    echo ""
    npm run frontend
    ;;
  *)
    echo "Invalid choice. Exiting."
    exit 1
    ;;
esac