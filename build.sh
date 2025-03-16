#!/bin/bash

# Ensure that any errors stop the script
set -e

# Set version and date (same as in the workflow)
VERSION=$(date +'v%Y.%m.%d-%H%M')
DATE=$(date +'%B %d, %Y')

# Create build directory if it doesn't exist
mkdir -p build

# Step 1: Install Node.js dependencies (if they are not already installed)
echo "Installing Node.js dependencies..."
npm install

# Step 2: Build book using custom Node.js script
echo "Running custom build script..."
npm run build  # This will execute node tools/build.js as per the package.json

# Step 3: Check if PDF file exists and has content
if [ -f "build/rise-and-code.pdf" ] && [ -s "build/rise-and-code.pdf" ]; then
  echo "PDF file exists and has content."
else
  echo "WARNING: PDF file is missing or empty, creating a placeholder."

  # Try using xelatex, fallback to pdflatex if not found
  if command -v xelatex &> /dev/null; then
    echo "Using xelatex to generate PDF."
    pandoc build/placeholder.md -o build/rise-and-code.pdf --pdf-engine=xelatex
  else
    echo "xelatex not found, using pdflatex instead."
    pandoc build/placeholder.md -o build/rise-and-code.pdf --pdf-engine=pdflatex
  fi
fi

# Step 4: Generate HTML file from Markdown files
echo "Generating HTML file..."
pandoc book/**/*.md -o build/rise-and-code.html

# Step 5: Check if HTML file exists
if [ ! -f "build/rise-and-code.html" ]; then
  echo "ERROR: HTML file generation failed!"
  exit 1
fi
echo "HTML file generated: build/rise-and-code.html"

# Optional: List the build folder contents for verification
echo "Contents of build/ directory:"
ls -la build/

# Step 6: (Optional) You can add extra steps here to test, check, or package the artifacts
# For example, you can generate a release package or upload to a server.
echo "Build process completed successfully."

# End of script