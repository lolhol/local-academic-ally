#!/bin/bash

# Update and install Python3 and pip
echo "Updating and installing Python3 and pip..."
sudo apt-get update && sudo apt-get install -y python3 python3-pip

# Alternatively, for macOS (uncomment the line below)
# brew install python3

echo "Python3 and pip installation complete."

# Install the required libraries using pip
echo "Installing required Python libraries..."
pip3 install llama-index qdrant_client torch transformers watchdog 'llama_index.llms.ollama'

echo "Library installations complete. You're all set!"

# End of script