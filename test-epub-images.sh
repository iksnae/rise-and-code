#!/bin/bash

set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Testing EPUB image support for Rise & Code book...${NC}"

# Check if build directory exists
if [ ! -d "build" ]; then
    echo -e "${RED}❌ Build directory not found. Please run the build first.${NC}"
    exit 1
fi

# Find all EPUB files in the build directory
EPUB_FILES=$(find build -name "*.epub" -type f)

if [ -z "$EPUB_FILES" ]; then
    echo -e "${RED}❌ No EPUB files found in build directory!${NC}"
    exit 1
fi

echo -e "${GREEN}Found EPUB files:${NC}"
echo "$EPUB_FILES"
echo ""

# Test each EPUB file
for EPUB_FILE in $EPUB_FILES; do
    echo -e "${YELLOW}Testing: $(basename $EPUB_FILE)${NC}"
    
    # Get file size
    FILE_SIZE=$(du -h "$EPUB_FILE" | cut -f1)
    echo -e "  File size: ${FILE_SIZE}"
    
    # Check if file has realistic size (>100KB)
    SIZE_BYTES=$(du -k "$EPUB_FILE" | cut -f1)
    if [ "$SIZE_BYTES" -lt 100 ]; then
        echo -e "${RED}  ⚠️  Warning: File size is suspiciously small (< 100KB)${NC}"
    fi
    
    # List contents and search for images
    echo -e "  Checking for embedded images..."
    IMAGE_COUNT=$(unzip -l "$EPUB_FILE" | grep -E "\.(svg|png|jpg|jpeg|gif)" | wc -l)
    
    if [ "$IMAGE_COUNT" -gt 0 ]; then
        echo -e "${GREEN}  ✅ Found $IMAGE_COUNT image file(s) in EPUB!${NC}"
        echo -e "  Image files:"
        unzip -l "$EPUB_FILE" | grep -E "\.(svg|png|jpg|jpeg|gif)" | awk '{print "    - " $4}'
    else
        echo -e "${RED}  ❌ No image files found in EPUB!${NC}"
    fi
    
    echo ""
done

echo -e "${GREEN}EPUB image test complete.${NC}"
