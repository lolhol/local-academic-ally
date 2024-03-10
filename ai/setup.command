#!/bin/bash

# Stop script on any error
set -e

# Install Homebrew
echo "Installing Homebrew..."
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Update Homebrew
echo "Updating Homebrew..."
brew update

# Install Python3 and pip
echo "Checking for Python3 and pip..."
if ! command -v python3 &> /dev/null; then
    echo "Python3 not found. Installing..."
    brew install python@3
else
    echo "Python3 is already installed."
fi

if ! command -v pip3 &> /dev/null; then
    echo "pip3 not found. Installing..."
    brew install pipenv
else
    echo "pip3 is already installed."
fi

# Install Python libraries
echo "Installing Python libraries..."
pip3 install llama-index qdrant_client torch transformers flask flask-cors

# Download and install Ollama
echo "Downloading and installing Ollama..."
curl -fsSL https://ollama.com/install.sh | sh

echo "Starting the python script!"
python3 ./ai/ai.py

echo "Version: "
brew --version

brew install node

npm install next react react-dom

npm run dev
