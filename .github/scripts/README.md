# GitHub Scripts Documentation

## Overview

This directory contains custom scripts used to fix the EPUB image embedding issue in the Rise & Code book build process.

## The Problem

When building EPUB files using book-tools, images were not being embedded properly. The root cause was that `book-tools`' `build-language.sh` script generates EPUB files by calling Pandoc directly, which doesn't handle image resource paths correctly for multi-language projects.

### Symptoms

- EPUB files generated but with very small file sizes (< 50KB)
- Opening EPUB files shows no images, only text
- Images exist in the repository but aren't included in the final EPUB
- PDF and HTML builds work fine, only EPUB affected

## The Solution

We implemented a **post-install patch strategy** inspired by the [actual-intelligence](https://github.com/iksnae/actual-intelligence) project. This approach:

1. Installs book-tools normally
2. Patches `build-language.sh` to route EPUB generation through `generate-epub.sh`
3. `generate-epub.sh` has proper image handling logic built-in

## Files in This Directory

### `post-install.sh`

**Purpose:** Patches book-tools after installation to fix image support.

**What it does:**
1. Locates the installed `build-language.sh` script in `~/.book-tools/`
2. Creates a backup of the original file
3. Replaces the direct Pandoc EPUB generation with a call to `generate-epub.sh`
4. Makes all scripts executable

**Why this works:**
- `generate-epub.sh` exists in book-tools and has proper `--resource-path` handling
- It correctly resolves image paths for multi-language builds
- The script is maintained as part of book-tools, so it stays up-to-date

### `custom-install.sh` (parent directory)

**Purpose:** Custom installation script that installs book-tools + applies fixes.

**What it does:**
1. Clones or updates book-tools repository to `~/.book-tools/`
2. Makes scripts executable using `make-scripts-executable.sh`
3. Creates a wrapper script at `~/.local/bin/book-tools`
4. Calls `post-install.sh` to apply the image fix

**Usage in CI/CD:**
```yaml
- name: Setup book-tools
  run: bash .github/custom-install.sh
```

## Workflow Integration

The fix is integrated into `.github/workflows/build-book.yml`:

```yaml
- name: Setup book-tools
  run: |
    echo "Setting up book-tools CLI..."
    bash .github/custom-install.sh
    export PATH="$HOME/.local/bin:$PATH"
    which book-tools
```

This ensures every CI/CD build:
1. Installs book-tools fresh
2. Applies the image fix automatically
3. Generates EPUBs with proper image embedding

## Verification

### Test Script

Use `test-epub-images.sh` (in project root) to verify EPUBs contain images:

```bash
# After building
./test-epub-images.sh
```

**What it checks:**
- EPUB files exist in build directory
- File sizes are realistic (> 100KB)
- Images are embedded (lists all `.svg`, `.png`, `.jpg`, `.gif` files)

### Manual Verification

Extract and check EPUB contents:

```bash
# List images in EPUB
unzip -l build/rise-and-code.epub | grep -E "\.(svg|png|jpg|gif)"

# Should show entries like:
#   book/en/images/ch1-programming-benefits.png
#   book/en/images/ch2-flowchart-symbols.png
#   ...
```

### Expected Output

A properly fixed EPUB should:
- Be 500KB - 5MB in size (depending on image count/size)
- List 10-20+ image files when extracted
- Display images correctly when opened in an EPUB reader

## Troubleshooting

### Images still not showing

1. **Check if post-install ran:**
   ```bash
   cat ~/.book-tools/src/scripts/build-language.sh | grep "generate-epub.sh"
   ```
   Should see the call to `generate-epub.sh`, not direct Pandoc.

2. **Verify image paths in markdown:**
   Images should use relative paths from the chapter directory:
   ```markdown
   ![Diagram](images/my-image.png)
   ```

3. **Check image locations:**
   ```bash
   find book -name "*.png" -o -name "*.svg"
   ```
   Should list images in `book/en/images/`, `book/es/images/`, etc.

### Post-install script fails

If `post-install.sh` can't find the EPUB generation section:

1. Check book-tools version:
   ```bash
   cd ~/.book-tools && git log --oneline -1
   ```

2. Manually inspect `build-language.sh`:
   ```bash
   cat ~/.book-tools/src/scripts/build-language.sh | grep -A 10 "pandoc.*epub"
   ```

3. Update the sed pattern in `post-install.sh` to match current structure

## References

- **actual-intelligence project:** https://github.com/iksnae/actual-intelligence
  - Original implementation of this fix strategy
  - Reference for post-install patterns
  
- **book-tools:** https://github.com/iksnae/book-tools
  - The underlying book building framework
  - Contains `generate-epub.sh` with proper image handling

## Maintenance

### When to update this fix

- If book-tools changes `build-language.sh` structure
- If `generate-epub.sh` API changes (parameters, calling convention)
- If image handling logic needs enhancement

### How to update

1. Test changes locally first
2. Update `post-install.sh` with new sed pattern or logic
3. Run `custom-install.sh` to verify
4. Test EPUB generation with `test-epub-images.sh`
5. Commit and push when verified working

## License

This fix strategy follows the same license as the Rise & Code project.
