#!/bin/bash

# Thuggatunes Music & Global Payment - Setup Script
# This script automates the initial setup of the project

set -e  # Exit on any error

echo "🎵 Thuggatunes Music & Global Payment - Setup Script"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed successfully"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please edit .env and update with your actual configuration"
else
    echo "⚠️  .env file already exists, skipping..."
fi
echo ""

# Run tests
echo "🧪 Running tests..."
if npm test; then
    echo "✅ All tests passed!"
else
    echo "⚠️  Some tests failed, but this may be expected if MongoDB is not running"
fi
echo ""

echo "=================================================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Edit .env file with your configuration"
echo "  2. Run 'npm start' to start the server"
echo "  3. Visit http://localhost:5050/health to verify"
echo ""
echo "📚 For detailed setup instructions, see DOCS/SETUP.md"
echo "=================================================="
