#!/bin/bash
set -e

# Save the original directory where the script was invoked
ORIGINAL_DIR="$(pwd)"

# Define colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

INSTALL_DIR="${HOME}/.book-tools"
BIN_DIR="${HOME}/.local/bin"
REPO_URL="https://github.com/iksnae/book-tools.git"

# Print header
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}   Book Tools CLI Installation Script    ${NC}"
echo -e "${BLUE}=========================================${NC}"
echo

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Error: git is not installed. Please install git first.${NC}"
    exit 1
fi

# Create installation directory if it doesn't exist
echo -e "${YELLOW}Creating installation directory...${NC}"
mkdir -p "${INSTALL_DIR}"
mkdir -p "${BIN_DIR}"

# Clone or update the repository
if [ -d "${INSTALL_DIR}/.git" ]; then
    echo -e "${YELLOW}Book Tools already installed, updating...${NC}"
    cd "${INSTALL_DIR}"
    git fetch origin
    git reset --hard origin/main
    echo -e "${GREEN}Reset to latest version of book-tools${NC}"
else
    echo -e "${YELLOW}Downloading Book Tools...${NC}"
    git clone --depth=1 "${REPO_URL}" "${INSTALL_DIR}"
fi

# Make scripts executable
echo -e "${YELLOW}Making scripts executable...${NC}"
cd "${INSTALL_DIR}/src"
chmod +x make-scripts-executable.sh
./make-scripts-executable.sh

# Create wrapper script in bin directory
echo -e "${YELLOW}Creating book-tools command...${NC}"
cat > "${BIN_DIR}/book-tools" << 'EOF'
#!/bin/bash

BOOK_TOOLS_DIR="$HOME/.book-tools"
COMMAND=$1
shift

# Check for commands
case "$COMMAND" in
  create)
    "$BOOK_TOOLS_DIR/src/scripts/create-book.sh" "$@"
    ;;
  build)
    # Just run the build script without any directory parameter
    "$BOOK_TOOLS_DIR/src/scripts/build.sh" "$@"
    ;;
  build-docker)
    echo "Docker build not available in this installation"
    exit 1
    ;;
  setup)
    "$BOOK_TOOLS_DIR/src/scripts/setup.sh" "$@"
    ;;
  help)
    echo "Usage: book-tools COMMAND [options]"
    echo ""
    echo "Commands:"
    echo "  create    Create a new book project"
    echo "  build     Build a book in the current directory"
    echo "  setup     Setup the book environment"
    echo "  help      Show this help message"
    ;;
  *)
    echo "Unknown command: $COMMAND"
    echo "Use 'book-tools help' for usage information"
    exit 1
    ;;
esac
EOF

chmod +x "${BIN_DIR}/book-tools"

echo ""
echo "✅ Book Tools installed successfully!"
echo ""

# Check if BIN_DIR is in PATH, if not, suggest adding it
if [[ ":$PATH:" != *":${BIN_DIR}:"* ]]; then
    echo -e "${YELLOW}NOTE: ${BIN_DIR} is not in your PATH.${NC}"
    echo -e "${YELLOW}To add it, run one of the following commands:${NC}"
    echo -e ""
    echo -e "${GREEN}For bash:${NC} echo 'export PATH=\"\${HOME}/.local/bin:\${PATH}\"' >> ~/.bashrc"
    echo -e "${GREEN}For zsh:${NC} echo 'export PATH=\"\${HOME}/.local/bin:\${PATH}\"' >> ~/.zshrc"
    echo -e ""
    echo -e "${YELLOW}Then restart your terminal or run:${NC} source ~/.bashrc (or ~/.zshrc)"
fi

# Run the post-install script to fix image support
# Look for post-install.sh relative to the original directory
cd "$ORIGINAL_DIR"

POST_INSTALL_PATH=".github/scripts/post-install.sh"

if [ -f "$POST_INSTALL_PATH" ]; then
    echo -e "${YELLOW}Running post-installation fixes...${NC}"
    chmod +x "$POST_INSTALL_PATH"
    bash "$POST_INSTALL_PATH"
else
    echo -e "${RED}Warning: post-install.sh script not found at $POST_INSTALL_PATH${NC}"
    echo -e "${RED}Image support may not work correctly.${NC}"
fi

echo -e "${GREEN}Installation successful!${NC}"
echo -e "${GREEN}You can now use Book Tools by running:${NC} book-tools [command]"
