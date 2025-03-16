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
  templateDir: path.resolve(__dirname, '../templates'),
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

// Ensure template directory exists
if (!fs.existsSync(config.templateDir)) {
  fs.mkdirSync(config.templateDir, { recursive: true });
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

// Create LaTeX template for better PDF formatting
function createLatexTemplate() {
  const templatePath = path.join(config.templateDir, 'template.tex');
  
  // Basic LaTeX template with customizations for new sections on new pages
  const template = `
\\documentclass[12pt,a4paper]{book}
\\usepackage{geometry}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{graphicx}
\\usepackage{fancyhdr}
\\usepackage{titlesec}

% Define colors
\\definecolor{chaptercolor}{RGB}{0, 83, 156}

% Set page geometry
\\geometry{margin=1in}

% Configure section formatting
\\titleformat{\\chapter}[display]{\\normalfont\\huge\\bfseries\\color{chaptercolor}}{\\chaptertitlename\\ \\thechapter}{20pt}{\\Huge}
\\titleformat{\\section}{\\normalfont\\Large\\bfseries\\color{chaptercolor}}{\\thesection}{1em}{}
\\titleformat{\\subsection}{\\normalfont\\large\\bfseries}{\\thesubsection}{1em}{}

% Always start sections on a new page
\\newcommand{\\sectionbreak}{\\clearpage}

% Configure headers and footers
\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[LE,RO]{Rise \\& Code}
\\fancyhead[RE,LO]{\\leftmark}
\\fancyfoot[C]{\\thepage}

% Title page information
\\title{\\Huge Rise \\& Code\\\\\\large A Programming Book for Everyone}
\\author{Open Source Community}
\\date{\\today}

\\begin{document}

$if(title)$
\\maketitle
$endif$

$if(toc)$
\\tableofcontents
$endif$

$body$

\\end{document}
`;

  fs.writeFileSync(templatePath, template);
  return templatePath;
}

// Build the book
function buildBook() {
  console.log('Building Rise & Code book...');
  console.log(`Version: ${config.version}`);
  console.log(`Date: ${config.date}`);
  
  // Initialize output content
  let output = '';
  
  // Add header and version info
  output += '---\n';
  output += 'title: "Rise & Code"\n';
  output += 'subtitle: "A Programming Book for Everyone"\n';
  output += `date: "${config.date}"\n`;
  output += `author: "Open Source Community"\n`;
  output += 'toc: true\n';
  output += '---\n\n';
  
  output += '# Rise & Code\n';
  output += '## A Programming Book for Everyone\n\n';
  output += `### Version: ${config.version}\n`;
  output += `### Generated on: ${config.date}\n\n`;
  output += 'This book is designed to teach programming, software development, and logical problem-solving to people without access to computers.\n\n';
  
  // Process each chapter
  const chapterDirs = getChapterDirs();
  
  for (const chapterDir of chapterDirs) {
    console.log(`Processing ${path.basename(chapterDir)}...`);
    
    // Add chapter separator (use LaTeX page break for PDF)
    output += '\n\n\\newpage\n\n';
    
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
        
        // Add section with a page break before it
        output += '\n\n\\newpage\n\n';
        output += '## ' + sectionFile.replace(/^\d+-/,'').replace(/-/g, ' ').replace(/\.md$/,'') + '\n\n';
        output += sectionContent;
      }
    }
    
    // Get activities directory
    const activitiesDir = path.join(chapterDir, 'activities');
    if (fs.existsSync(activitiesDir)) {
      // Add activities section with a page break
      output += '\n\n\\newpage\n\n';
      output += '## Activities\n\n';
      
      // Process each activity file in order
      const activityFiles = fs.readdirSync(activitiesDir)
        .filter(file => file.endsWith('.md'))
        .sort();
      
      for (const activityFile of activityFiles) {
        console.log(`  Adding activity: ${activityFile}`);
        const activityPath = path.join(activitiesDir, activityFile);
        const activityContent = readMarkdownFile(activityPath);
        
        // Add each activity with a page break
        output += '\n\n\\newpage\n\n';
        output += '### ' + activityFile.replace(/^\d+-/,'').replace(/-/g, ' ').replace(/\.md$/,'') + '\n\n';
        output += activityContent;
      }
    }
    
    // Add chapter summary if it exists
    const summaryPath = path.join(chapterDir, 'chapter-summary.md');
    if (fs.existsSync(summaryPath)) {
      console.log(`  Adding chapter summary`);
      // Add summary with a page break
      output += '\n\n\\newpage\n\n';
      output += '## Chapter Summary\n\n';
      output += readMarkdownFile(summaryPath);
    }
  }
  
  // Write combined markdown to file
  const outputMarkdownPath = path.join(config.outputDir, config.outputMarkdown);
  fs.writeFileSync(outputMarkdownPath, output);
  console.log(`Markdown output written to: ${outputMarkdownPath}`);
  
  // Create LaTeX template
  const templatePath = createLatexTemplate();
  
  // Convert to PDF
  const outputPdfPath = path.join(config.outputDir, config.outputPdf);
  try {
    console.log('Converting to PDF...');
    // Call pandoc with custom template
    execSync(`pandoc "${outputMarkdownPath}" -o "${outputPdfPath}" --pdf-engine=xelatex --template="${templatePath}" --toc`, { stdio: 'inherit' });
    console.log(`PDF output written to: ${outputPdfPath}`);
  } catch (error) {
    console.error('PDF conversion failed:', error);
    // Try again without custom template
    try {
      console.log('Trying again with default template...');
      execSync(`pandoc "${outputMarkdownPath}" -o "${outputPdfPath}" --pdf-engine=xelatex`, { stdio: 'inherit' });
      console.log(`PDF output written to: ${outputPdfPath} (default template)`);
    } catch (err) {
      console.error('Default template conversion failed:', err);
      // Create a minimal PDF with just title
      const minimalTitle = '# Rise & Code\n## This is a placeholder PDF. Please see the Markdown version.';
      fs.writeFileSync(path.join(config.outputDir, 'placeholder.md'), minimalTitle);
      try {
        execSync(`pandoc "${path.join(config.outputDir, 'placeholder.md')}" -o "${outputPdfPath}" --pdf-engine=xelatex`, { stdio: 'inherit' });
      } catch (err2) {
        console.error('Even placeholder PDF creation failed:', err2);
      }
      fs.unlinkSync(path.join(config.outputDir, 'placeholder.md'));
    }
  }
  
  console.log('Book build complete!');
}

// Run the build
buildBook();
