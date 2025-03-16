# Tools and Resources

This directory contains tools and resources that support the creation and distribution of the Rise & Code book.

## Build System

The main build tool in this directory is `build.js`, a Node.js script that:

1. Collects all markdown files from the book directory
2. Combines them in the correct order
3. Generates a single markdown file
4. Converts the markdown to PDF

### Running the Build Locally

To run the build process on your local machine:

1. Make sure you have Node.js installed (version 14 or higher)
2. Install the required dependencies:
   ```
   npm install -g markdown-pdf
   ```
   
   Alternatively, you can use Pandoc, which requires:
   ```
   sudo apt-get install pandoc texlive-xetex  # For Ubuntu/Debian
   ```
   
   or
   
   ```
   brew install pandoc  # For macOS
   ```

3. Run the build:
   ```
   npm run build
   ```

4. Find the output in the `build` directory:
   - `rise-and-code.md` - Complete markdown version
   - `rise-and-code.pdf` - PDF version

### Continuous Integration

The build process runs automatically on GitHub Actions whenever changes are pushed to the main branch. The workflow:

1. Triggers when markdown files in the `book` directory are changed
2. Runs the build script
3. Creates a new release with the generated files as assets
4. Tags the release with a version based on the current date and time

## Other Tools

This directory may also contain:

- Templates for creating new chapters and activities
- Scripts for formatting and linting content
- Design assets and illustrations
- Printable worksheets and activity materials

## Contributing

If you'd like to improve the build process or add new tools, please submit a pull request with your changes. Make sure to test your modifications locally before submitting.
