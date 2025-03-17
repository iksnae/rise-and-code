/**
 * Rise & Code Book Builder
 * 
 * This script collates all markdown files in the book directory
 * and generates a single markdown file and PDF.
 * Now supports multiple languages.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse command line arguments
const args = process.argv.slice(2);
const languageArg = args.find(arg => arg.startsWith('--lang='));
const defaultLanguage = 'en';
const language = languageArg ? languageArg.split('=')[1] : defaultLanguage;
const buildAllLanguages = args.includes('--all-languages');

// Configuration
const config = {
  outputDir: path.resolve(__dirname, '../build'),
  bookDir: path.resolve(__dirname, '../book'),
  templateDir: path.resolve(__dirname, '../templates'),
  version: process.env.VERSION || `v${new Date().toISOString().split('T')[0]}`,
  date: process.env.DATE || new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }),
  time: new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }),
  language: process.env.LANG || language // Default to English or specified language
};

// Get available language directories
function getAvailableLanguages() {
  // First check for dedicated language directories
  const langDirs = [];
  
  // English (default) is always available in the root
  langDirs.push(defaultLanguage);
  
  // Check for additional language directories (e.g., es, fr, etc.)
  if (fs.existsSync(path.join(config.bookDir, 'es'))) {
    langDirs.push('es');
  }
  
  // Add more language checks as needed
  // if (fs.existsSync(path.join(config.bookDir, 'fr'))) {
  //   langDirs.push('fr');
  // }
  
  return langDirs;
}

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Ensure template directory exists
if (!fs.existsSync(config.templateDir)) {
  fs.mkdirSync(config.templateDir, { recursive: true });
}

// Get chapter directories sorted by chapter number for a specific language
function getChapterDirs(lang) {
  const langPath = lang === defaultLanguage ? 
    config.bookDir : 
    path.join(config.bookDir, lang);
    
  if (!fs.existsSync(langPath)) {
    console.error(`Error: Language directory for '${lang}' not found`);
    return [];
  }
  
  return fs.readdirSync(langPath)
    .filter(item => item.startsWith('chapter-'))
    .sort((a, b) => {
      const numA = parseInt(a.split('-')[1]);
      const numB = parseInt(b.split('-')[1]);
      return numA - numB;
    })
    .map(dir => path.join(langPath, dir));
}

// Read markdown file content
function readMarkdownFile(filePath) {
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf8');
}

// Better sorting function for files with numeric prefixes
function sortFilesByNumber(a, b) {
  // Extract numeric prefix if it exists
  const numA = a.match(/^(\d+)-/) ? parseInt(a.match(/^(\d+)-/)[1]) : 999;
  const numB = b.match(/^(\d+)-/) ? parseInt(b.match(/^(\d+)-/)[1]) : 999;
  return numA - numB;
}

// Extract scene summaries from artifact files if they exist
function extractSceneSummaries(chapterDir) {
  const artifactsDir = path.join(chapterDir, 'artifacts');
  if (!fs.existsSync(artifactsDir)) return '';
  
  let summaries = '';
  
  const artifactFiles = fs.readdirSync(artifactsDir)
    .filter(file => file.endsWith('.md'));
  
  for (const file of artifactFiles) {
    const content = readMarkdownFile(path.join(artifactsDir, file));
    
    // Look for scene summary sections in the artifact
    const sceneSummaryMatch = content.match(/## Scene Summary\n\n([\s\S]+?)(?:\n\n##|$)/);
    if (sceneSummaryMatch && sceneSummaryMatch[1]) {
      summaries += '### Scene Summary from ' + file.replace('.md', '') + '\n\n';
      summaries += sceneSummaryMatch[1] + '\n\n';
    }
  }
  
  return summaries;
}

// Create LaTeX template for better PDF formatting
function createLatexTemplate(language) {
  const templatePath = path.join(config.templateDir, 'template.tex');
  
  // Check if the template exists and read it
  if (fs.existsSync(templatePath)) {
    console.log('Using existing LaTeX template and updating version information...');
    let template = fs.readFileSync(templatePath, 'utf8');
    
    // Replace version and build date placeholders
    const versionWithoutV = config.version.replace(/^v/, '');
    template = template.replace(/\\newcommand{\\bookversion}{VERSION}/g, 
                              `\\newcommand{\\bookversion}{${versionWithoutV}}`);
    template = template.replace(/\\newcommand{\\builddate}{BUILDDATE}/g, 
                              `\\newcommand{\\builddate}{${config.date} ${config.time}}`);
    
    // Set language for title selection
    template = template.replace(/\\newcommand{\\langsetting}{LANG}/g, 
                              `\\newcommand{\\langsetting}{${language}}`);
    
    // Write the modified template to a temporary file
    const tempTemplatePath = path.join(config.templateDir, `template-version-${language}.tex`);
    fs.writeFileSync(tempTemplatePath, template);
    return tempTemplatePath;
  }
  
  // If no template exists, create a new one (this should not happen in normal operation)
  console.log('Template not found, creating a new one...');
  
  // Enhanced LaTeX template with better structure and formatting
  const template = `
\\documentclass[12pt,a4paper]{book}
\\usepackage{geometry}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{graphicx}
\\usepackage{fancyhdr}
\\usepackage{titlesec}
\\usepackage{setspace}

% Define colors
\\definecolor{chaptercolor}{RGB}{0, 83, 156}
\\definecolor{versioncolor}{RGB}{100, 100, 100}

% Set page geometry
\\geometry{margin=1in}

% Configure section formatting
\\titleformat{\\chapter}[display]{\\normalfont\\huge\\bfseries\\color{chaptercolor}}{\\chaptertitlename\\ \\thechapter}{20pt}{\\Huge}
\\titleformat{\\section}{\\normalfont\\Large\\bfseries\\color{chaptercolor}}{\\thesection}{1em}{}
\\titleformat{\\subsection}{\\normalfont\\large\\bfseries}{\\thesubsection}{1em}{}

% Always start chapters and major sections on a new page
\\newcommand{\\chapterbreak}{\\clearpage}
\\newcommand{\\sectionbreak}{\\clearpage}

% Define version, build date, and language
\\newcommand{\\bookversion}{${config.version.replace(/^v/, '')}}
\\newcommand{\\builddate}{${config.date} ${config.time}}
\\newcommand{\\langsetting}{${language}}

% Bilingual title commands
\\newcommand{\\entitle}{Rise \\& Code}
\\newcommand{\\estitle}{Levántate y Codifica}

% Choose title based on language setting
\\newcommand{\\booktitle}{%
  \\ifx\\langsetting es
    \\estitle
  \\else
    \\entitle
  \\fi
}

% Configure headers and footers
\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[LE,RO]{\\booktitle}
\\fancyhead[RE,LO]{\\leftmark}
\\fancyfoot[C]{\\thepage}
\\fancyfoot[R]{\\textcolor{versioncolor}{\\footnotesize{v\\bookversion}}}
\\renewcommand{\\headrulewidth}{0.4pt}
\\renewcommand{\\footrulewidth}{0.4pt}

% Title page and TOC page style (no headers/footers)
\\fancypagestyle{plain}{
  \\fancyhf{}
  \\fancyfoot[C]{\\thepage}
  \\fancyfoot[R]{\\textcolor{versioncolor}{\\footnotesize{v\\bookversion}}}
  \\renewcommand{\\headrulewidth}{0pt}
  \\renewcommand{\\footrulewidth}{0.4pt}
}

% Title page customization
\\makeatletter
\\def\\maketitle{%
  \\begin{titlepage}%
    \\let\\footnotesize\\small
    \\let\\footnoterule\\relax
    \\let\\footnote\\thanks
    \\null\\vfil
    \\vskip 60\\p@
    \\begin{center}%
      {\\LARGE \\booktitle \\par}%
      \\vskip 1em%
      {\\large \\@subtitle \\par}%
      \\vskip 3em%
      {\\large
       \\lineskip .75em%
       \\begin{tabular}[t]{c}%
         \\@author
       \\end{tabular}\\par}%
      \\vskip 1.5em%
      {\\large \\@date \\par}%
    \\end{center}\\par
    \\@thanks
    \\vfil\\null
  \\end{titlepage}%
  \\setcounter{footnote}{0}%
  \\setcounter{page}{1}
  % Roman numerals for front matter
  \\pagenumbering{roman}
}
\\makeatother

\\begin{document}

$if(title)$
\\maketitle
$endif$

$if(toc)$
\\tableofcontents
\\clearpage  % Ensure content starts on a new page after TOC
$endif$

% Reset page numbering for main content
\\pagenumbering{arabic}
\\setcounter{page}{1}

$body$

\\end{document}
`;

  // Write the temporary template
  const tempTemplatePath = path.join(config.templateDir, `template-version-${language}.tex`);
  fs.writeFileSync(tempTemplatePath, template);
  return tempTemplatePath;
}

// Get title based on language
function getBookTitle(lang) {
  return lang === 'es' ? 'Levántate y Codifica' : 'Rise & Code';
}

// Get subtitle based on language
function getBookSubtitle(lang) {
  return lang === 'es' ? 'Un Libro de Programación para Todos' : 'A Programming Book for Everyone';
}

// Build the book for a specific language
function buildBook(lang) {
  console.log(`Building Rise & Code book for language: ${lang}...`);
  console.log(`Version: ${config.version}`);
  console.log(`Date: ${config.date}`);
  
  // Define language-specific output filenames
  const outputMarkdown = lang === defaultLanguage 
    ? 'rise-and-code.md' 
    : `rise-and-code-${lang}.md`;
    
  const outputPdf = lang === defaultLanguage 
    ? 'rise-and-code.pdf' 
    : `rise-and-code-${lang}.pdf`;
  
  // Get the appropriate title and subtitle based on language
  const bookTitle = getBookTitle(lang);
  const bookSubtitle = getBookSubtitle(lang);
  
  // Initialize output content
  let output = '';
  
  // Add header and version info
  output += '---\n';
  output += `title: "${bookTitle}"\n`;
  output += `subtitle: "${bookSubtitle}"\n`;
  output += `date: "${config.date}"\n`;
  output += `author: "Open Source Community"\n`;
  output += 'toc: true\n';
  output += `language: "${lang}"\n`;
  output += '---\n\n';
  
  // IMPROVEMENT: Explicitly include the title page first
  const titlePagePath = lang === defaultLanguage ? 
    path.join(config.bookDir, 'title-page.md') : 
    path.join(config.bookDir, lang, 'title-page.md');
    
  if (fs.existsSync(titlePagePath)) {
    console.log('Adding title page...');
    output += readMarkdownFile(titlePagePath);
    output += '\n\n\\newpage\n\n';
  }
  
  // Add a explicit section break before first chapter to ensure
  // it starts on a new page after the TOC
  output += '\\newpage\n\n';
  
  output += `# ${bookTitle}\n`;
  output += `## ${bookSubtitle}\n\n`;
  output += `### Version: ${config.version}\n`;
  output += `### Generated on: ${config.date}\n\n`;
  
  // Description based on language
  if (lang === 'es') {
    output += 'Este libro está diseñado para enseñar programación, desarrollo de software y resolución de problemas lógicos a personas sin acceso a computadoras.\n\n';
  } else {
    output += 'This book is designed to teach programming, software development, and logical problem-solving to people without access to computers.\n\n';
  }
  
  // Process each chapter
  const chapterDirs = getChapterDirs(lang);
  
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
      // IMPROVEMENT: Better sorting with numeric prefixes
      const sectionFiles = fs.readdirSync(sectionsDir)
        .filter(file => file.endsWith('.md'))
        .sort(sortFilesByNumber);
      
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
      // IMPROVEMENT: Better sorting with numeric prefixes
      const activityFiles = fs.readdirSync(activitiesDir)
        .filter(file => file.endsWith('.md'))
        .sort(sortFilesByNumber);
      
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
    
    // IMPROVEMENT: Add scene summaries from artifacts if they exist
    const sceneSummaries = extractSceneSummaries(chapterDir);
    if (sceneSummaries) {
      console.log(`  Adding scene summaries from artifacts`);
      output += '\n\n\\newpage\n\n';
      output += '## Scene Summaries\n\n';
      output += sceneSummaries;
    }
    
    // Add chapter summary if it exists
    const summaryPath = path.join(chapterDir, 'chapter-summary.md');
    if (fs.existsSync(summaryPath)) {
      console.log(`  Adding chapter summary`);
      // Always ensure the chapter summary appears last in the chapter
      output += '\n\n\\newpage\n\n';
      output += '## Chapter Summary\n\n';
      output += readMarkdownFile(summaryPath);
    }
  }
  
  // Write combined markdown to file
  const outputMarkdownPath = path.join(config.outputDir, outputMarkdown);
  fs.writeFileSync(outputMarkdownPath, output);
  console.log(`Markdown output written to: ${outputMarkdownPath}`);
  
  // Create LaTeX template with version information
  const templatePath = createLatexTemplate(lang);
  
  // Convert to PDF
  try {
    console.log(`Converting ${lang} version to PDF...`);
    // Call pandoc with custom template
    execSync(`pandoc "${outputMarkdownPath}" -o "${path.join(config.outputDir, outputPdf)}" --pdf-engine=xelatex --template="${templatePath}" --toc`, { stdio: 'inherit' });
    console.log(`PDF output written to: ${path.join(config.outputDir, outputPdf)}`);
    
    // Generate HTML file from Markdown
    const outputHtml = lang === defaultLanguage 
      ? 'rise-and-code.html' 
      : `rise-and-code-${lang}.html`;
      
    const outputHtmlPath = path.join(config.outputDir, outputHtml);
    console.log(`Generating HTML file for ${lang}...`);
    execSync(`pandoc "${outputMarkdownPath}" -o "${outputHtmlPath}" --toc`, { stdio: 'inherit' });
    console.log(`HTML output written to: ${outputHtmlPath}`);
    
    return {
      lang,
      outputMarkdown,
      outputPdf,
      outputHtml,
      success: true
    };
  } catch (error) {
    console.error(`PDF conversion failed for ${lang}:`, error);
    // Try again without custom template
    try {
      console.log('Trying PDF conversion without custom template...');
      execSync(`pandoc "${outputMarkdownPath}" -o "${path.join(config.outputDir, outputPdf)}" --pdf-engine=xelatex --toc`, { stdio: 'inherit' });
      console.log(`PDF output written to: ${path.join(config.outputDir, outputPdf)}`);
      return {
        lang,
        outputMarkdown,
        outputPdf,
        success: true
      };
    } catch (fallbackError) {
      console.error('PDF conversion failed completely:', fallbackError);
      // Create a placeholder PDF with an error message
      fs.writeFileSync(path.join(config.outputDir, 'placeholder.md'), 
        `# Build Error for ${lang} Version\n\nThe PDF generation process failed. Please check the build logs.`);
      try {
        execSync(`pandoc "${path.join(config.outputDir, 'placeholder.md')}" -o "${path.join(config.outputDir, outputPdf)}" --pdf-engine=xelatex`, { stdio: 'inherit' });
      } catch (placeholderError) {
        console.error('Even placeholder PDF failed:', placeholderError);
      }
      return {
        lang,
        outputMarkdown,
        outputPdf: null,
        success: false
      };
    }
  } finally {
    // Clean up temporary template file
    try {
      fs.unlinkSync(templatePath);
      console.log('Cleaned up temporary template file');
    } catch (error) {
      console.log('Note: Could not clean up temporary template file');
    }
  }
}

// Main execution
if (buildAllLanguages) {
  // Build for all available languages
  const languages = getAvailableLanguages();
  console.log(`Building for all available languages: ${languages.join(', ')}`);
  
  const results = [];
  for (const lang of languages) {
    console.log(`\n==== Building ${lang} version ====\n`);
    const result = buildBook(lang);
    results.push(result);
  }
  
  // Summary of builds
  console.log('\n==== Build Summary ====');
  results.forEach(result => {
    console.log(`${result.lang}: ${result.success ? 'SUCCESS' : 'FAILED'}`);
  });
} else {
  // Build for a single language
  buildBook(config.language);
}
