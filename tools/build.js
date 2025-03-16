/**
 * Rise & Code Book Builder
 * 
 * This script collates all markdown files in the book directory
 * and generates a single markdown file and PDF.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  outputDir: path.resolve(__dirname, '../build'),
  bookDir: path.resolve(__dirname, '../book'),
  outputMarkdown: 'rise-and-code.md',
  outputPdf: 'rise-and-code.pdf',
  mainReadme: path.resolve(__dirname, '../README.md'),
  version: process.env.VERSION || `v${new Date().toISOString().split('T')[0]}`,
  date: process.env.DATE || new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
};

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Get chapter directories sorted by chapter number
function getChapterDirs() {
  return fs.readdirSync(config.bookDir)
    .filter(item => item.startsWith('chapter-'))
    .sort((a, b) => {
      const numA = parseInt(a.split('-')[1]);
      const numB = parseInt(b.split('-')[1]);
      return numA - numB;
    })
    .map(dir => path.join(config.bookDir, dir));
}

// Read markdown file content
function readMarkdownFile(filePath) {
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf8');
}

// Convert SVG to PNG if needed (as a fallback)
function preprocessMarkdown(content) {
  // This is just a placeholder - in a real implementation, we could 
  // detect SVG references and convert them to PNG as needed
  return content;
}

// Run a command with options and handle errors
function runCommand(command, options = {}) {
  try {
    return execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    if (options.throwOnError) {
      throw error;
    }
    return false;
  }
}

// Build the book
function buildBook() {
  console.log('Building Rise & Code book...');
  console.log(`Version: ${config.version}`);
  console.log(`Date: ${config.date}`);
  
  // Initialize output content
  let output = '';
  
  // Add header and version info
  output += '# Rise & Code\n';
  output += '## A Programming Book for Everyone\n\n';
  output += `### Version: ${config.version}\n`;
  output += `### Generated on: ${config.date}\n\n`;
  
  // Add main README content
  output += readMarkdownFile(config.mainReadme);
  output += '\n\n';
  
  // Process each chapter
  const chapterDirs = getChapterDirs();
  
  for (const chapterDir of chapterDirs) {
    console.log(`Processing ${path.basename(chapterDir)}...`);
    
    // Add chapter separator
    output += '\n\n---\n\n';
    
    // Add chapter README
    const readmePath = path.join(chapterDir, 'README.md');
    output += readMarkdownFile(readmePath);
    output += '\n\n';
    
    // Get sections directory
    const sectionsDir = path.join(chapterDir, 'sections');
    if (fs.existsSync(sectionsDir)) {
      // Process each section file in order
      const sectionFiles = fs.readdirSync(sectionsDir)
        .filter(file => file.endsWith('.md'))
        .sort();
      
      for (const sectionFile of sectionFiles) {
        console.log(`  Adding section: ${sectionFile}`);
        const sectionPath = path.join(sectionsDir, sectionFile);
        const sectionContent = readMarkdownFile(sectionPath);
        
        output += '\n\n## ' + sectionFile.replace(/^\d+-|\.\w+$/g, '').replace(/-/g, ' ') + '\n\n';
        output += sectionContent;
      }
    }
    
    // Get activities directory
    const activitiesDir = path.join(chapterDir, 'activities');
    if (fs.existsSync(activitiesDir)) {
      output += '\n\n## Activities\n\n';
      
      // Process each activity file in order
      const activityFiles = fs.readdirSync(activitiesDir)
        .filter(file => file.endsWith('.md'))
        .sort();
      
      for (const activityFile of activityFiles) {
        console.log(`  Adding activity: ${activityFile}`);
        const activityPath = path.join(activitiesDir, activityFile);
        const activityContent = readMarkdownFile(activityPath);
        
        output += '\n\n### ' + activityFile.replace(/^\d+-|\.\w+$/g, '').replace(/-/g, ' ') + '\n\n';
        output += activityContent;
      }
    }
    
    // Add chapter summary if it exists
    const summaryPath = path.join(chapterDir, 'chapter-summary.md');
    if (fs.existsSync(summaryPath)) {
      console.log(`  Adding chapter summary`);
      output += '\n\n## Chapter Summary\n\n';
      output += readMarkdownFile(summaryPath);
    }
  }
  
  // Preprocess markdown content
  output = preprocessMarkdown(output);
  
  // Write combined markdown to file
  const outputMarkdownPath = path.join(config.outputDir, config.outputMarkdown);
  fs.writeFileSync(outputMarkdownPath, output);
  console.log(`Markdown output written to: ${outputMarkdownPath}`);
  
  // Convert to PDF using multiple methods until one succeeds
  const outputPdfPath = path.join(config.outputDir, config.outputPdf);
  let pdfSuccess = false;
  
  // Try markdown-pdf first
  console.log('Converting to PDF with markdown-pdf...');
  pdfSuccess = runCommand(`markdown-pdf "${outputMarkdownPath}" -o "${outputPdfPath}"`);
  
  // If markdown-pdf fails, try pandoc
  if (!pdfSuccess) {
    console.log('markdown-pdf failed, trying pandoc...');
    pdfSuccess = runCommand(`pandoc "${outputMarkdownPath}" -o "${outputPdfPath}" --pdf-engine=xelatex`);
  }
  
  // If pandoc fails, try wkhtmltopdf as a last resort
  if (!pdfSuccess) {
    console.log('pandoc failed, trying wkhtmltopdf...');
    // First convert markdown to HTML using pandoc
    const tempHtmlPath = path.join(config.outputDir, 'temp.html');
    if (runCommand(`pandoc "${outputMarkdownPath}" -o "${tempHtmlPath}" -s --self-contained`)) {
      pdfSuccess = runCommand(`wkhtmltopdf "${tempHtmlPath}" "${outputPdfPath}"`);
      // Clean up temporary HTML file
      fs.unlinkSync(tempHtmlPath);
    }
  }
  
  // Create a minimal PDF with just text if all else fails
  if (!pdfSuccess) {
    console.log('All PDF conversion methods failed, creating minimal PDF...');
    const minimalContent = output
      .replace(/!\[.*?\]\(.*?\)/g, '[IMAGE REMOVED]') // Replace images
      .replace(/```.*?```/gs, '[CODE BLOCK]');        // Replace code blocks
    
    fs.writeFileSync(path.join(config.outputDir, 'minimal.md'), minimalContent);
    
    pdfSuccess = runCommand(`pandoc "${path.join(config.outputDir, 'minimal.md')}" -o "${outputPdfPath}" --pdf-engine=xelatex`);
    
    // Clean up temporary minimal markdown file
    fs.unlinkSync(path.join(config.outputDir, 'minimal.md'));
  }
  
  // Verify the PDF was created and has content
  if (pdfSuccess && fs.existsSync(outputPdfPath) && fs.statSync(outputPdfPath).size > 0) {
    console.log(`PDF output written to: ${outputPdfPath}`);
  } else {
    // Create an empty PDF to prevent release failure
    console.error('Failed to create PDF with content. Creating a placeholder PDF file.');
    // Create a minimal PDF with just the title
    const minimalTitle = '# Rise & Code\n## This is a placeholder PDF. Please see the Markdown version.';
    fs.writeFileSync(path.join(config.outputDir, 'placeholder.md'), minimalTitle);
    runCommand(`pandoc "${path.join(config.outputDir, 'placeholder.md')}" -o "${outputPdfPath}" --pdf-engine=xelatex`);
    fs.unlinkSync(path.join(config.outputDir, 'placeholder.md'));
  }
  
  console.log('Book build complete!');
}

// Run the build
buildBook();
