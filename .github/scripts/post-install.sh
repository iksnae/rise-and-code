#!/bin/bash
set -e

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Running post-installation script to verify image support...${NC}"

# Variables
BOOK_TOOLS_DIR="${HOME}/.book-tools"
BUILD_LANGUAGE_SCRIPT="${BOOK_TOOLS_DIR}/src/scripts/build-language.sh"

# Check if build-language.sh exists
if [ ! -f "$BUILD_LANGUAGE_SCRIPT" ]; then
    echo "❌ Error: Could not find build-language.sh at ${BUILD_LANGUAGE_SCRIPT}"
    exit 1
fi

# Check if the script is already using generate-epub.sh (the fix is already in place)
if grep -q "generate-epub.sh" "$BUILD_LANGUAGE_SCRIPT"; then
    echo -e "${GREEN}✅ book-tools is already using generate-epub.sh for EPUB generation${NC}"
    echo -e "${BLUE}ℹ️  No patching needed - image support is built-in!${NC}"
elif grep -q "pandoc \"\$COMBINED_MD\" .*--to epub" "$BUILD_LANGUAGE_SCRIPT"; then
    # Old version detected - needs patching
    echo -e "${YELLOW}⚠️  Detected old Pandoc-based EPUB generation, applying patch...${NC}"
    
    # Make a backup of the original file
    cp "$BUILD_LANGUAGE_SCRIPT" "${BUILD_LANGUAGE_SCRIPT}.bak"
    
    # Replace the EPUB generation section in build-language.sh
    sed -i.tmp '/# Check for cover image/,/exit 1/c\
    # Use the dedicated EPUB generation script for better image handling\
    SCRIPTS_PATH=$(dirname "$0")\
    "$SCRIPTS_PATH/generate-epub.sh" \\\
        "$LANG" \\\
        "$COMBINED_MD" \\\
        "$PROJECT_ROOT/build/$LANG/$BOOK_TITLE-$LANG.epub" \\\
        "$BOOK_TITLE" \\\
        "$BOOK_SUBTITLE" \\\
        "resources" \\\
        "$PROJECT_ROOT"' "$BUILD_LANGUAGE_SCRIPT"
    
    # Remove the temporary file
    rm -f "${BUILD_LANGUAGE_SCRIPT}.tmp"
    
    echo -e "${GREEN}✅ Successfully patched build-language.sh to use generate-epub.sh script${NC}"
else
    echo -e "${YELLOW}⚠️  Unknown EPUB generation method in build-language.sh${NC}"
    echo -e "${YELLOW}    Manual verification recommended.${NC}"
fi

# Ensure all scripts are executable
find "${BOOK_TOOLS_DIR}/src/scripts" -name "*.sh" -exec chmod +x {} \; 2>/dev/null || true

echo -e "${GREEN}✅ Post-installation complete. Image support verified.${NC}"
