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
  console.log('Detecting available languages...');
  
  // We know English and Spanish are available in dedicated directories
  const languages = ['en', 'es'];
  console.log(`Available languages: ${languages.join(', ')}`);
  return languages;
}

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Ensure template directory exists
if (!fs.existsSync(config.templateDir)) {
  fs.mkdirSync(config.templateDir, { recursive: true });
}

// Ensure cover image is available in book/images
function ensureCoverImage(lang = 'en') {
  console.log(`Ensuring cover image is available for language: ${lang}...`);
  const targetPath = path.join(config.bookDir, 'images/cover.png');
  
  // First check for language-specific cover image
  const langCoverPath = path.join(config.bookDir, lang, 'images/cover.png');
  
  if (fs.existsSync(langCoverPath)) {
    console.log(`Language-specific cover image found at: ${langCoverPath}`);
    // No need to copy it to the common images folder if it exists in the language folder
    return langCoverPath;
  }
  
  // Check if cover image already exists in common book/images directory
  if (fs.existsSync(targetPath)) {
    console.log('Cover image found in common book/images directory');
    return targetPath;
  }
  
  // Ensure book/images directory exists
  const imagesDir = path.join(config.bookDir, 'images');
  if (!fs.existsSync(imagesDir)) {
    console.log('Creating book/images directory...');
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  // Try to find the cover image in alternate locations
  const alternatePaths = [
    path.resolve(process.cwd(), 'art/cover.png'), 
    path.join(__dirname, '../art/cover.png')
  ];
  
  for (const altPath of alternatePaths) {
    if (fs.existsSync(altPath)) {
      console.log(`Found cover image at: ${altPath}`);
      try {
        fs.copyFileSync(altPath, targetPath);
        console.log(`Successfully copied cover image to: ${targetPath}`);
        return targetPath;
      } catch (error) {
        console.error(`Failed to copy cover image: ${error}`);
      }
    }
  }
  
  console.log('WARNING: Could not find cover image in any location');
  return null;
}

// Call the function to ensure cover image is available for the default language
ensureCoverImage(defaultLanguage);

// Get chapter directories sorted by chapter number for a specific language
function getChapterDirs(lang) {
  // Language directories are directly under bookDir
  const langPath = path.join(config.bookDir, lang);
    
  if (!fs.existsSync(langPath)) {
    console.error(`Error: Language directory for '${lang}' not found at ${langPath}`);
    console.error(`Directory contents at ${config.bookDir}:`);
    try {
      fs.readdirSync(config.bookDir).forEach(item => {
        console.error(`  - ${item}`);
      });
    } catch (e) {
      console.error(`Could not read book directory: ${e.message}`);
    }
    return [];
  }
  
  // Get chapters from the language directory
  console.log(`Looking for chapters in ${langPath}`);
  console.log(`Directory contents at ${langPath}:`);
  const dirContents = fs.readdirSync(langPath);
  dirContents.forEach(item => {
    console.log(`  - ${item}`);
  });
  
  const chapterDirs = dirContents
    .filter(item => item.startsWith('chapter-'))
    .sort((a, b) => {
      const numA = parseInt(a.split('-')[1]);
      const numB = parseInt(b.split('-')[1]);
      return numA - numB;
    })
    .map(dir => path.join(langPath, dir));
  
  console.log(`Found ${chapterDirs.length} chapters for language ${lang}`);
  console.log(`Chapter directories:`);
  chapterDirs.forEach(dir => {
    console.log(`  - ${dir}`);
    try {
      if (fs.existsSync(dir)) {
        // Show what's in each chapter directory
        const chapterContents = fs.readdirSync(dir);
        console.log(`    Contains: ${chapterContents.join(', ')}`);
      }
    } catch (e) {
      console.error(`Error reading chapter directory ${dir}: ${e.message}`);
    }
  });
  
  return chapterDirs;
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
function createLatexTemplate(lang) {
  const templatePath = path.join(config.templateDir, 'template.tex');
  
  // Check if the template exists and read it
  if (fs.existsSync(templatePath)) {
    console.log('Using existing LaTeX template and updating version information...');
    let template = fs.readFileSync(templatePath, 'utf8');
    
    // Add the tightlist command if it's not already defined
    if (!template.includes('\\tightlist')) {
      console.log('Adding missing \\tightlist command to template...');
      const insertPosition = template.indexOf('\\begin{document}');
      if (insertPosition !== -1) {
        template = template.slice(0, insertPosition) + 
                  '% Define the missing tightlist command that pandoc expects\n' +
                  '\\providecommand{\\tightlist}{\\setlength{\\itemsep}{0pt}\\setlength{\\parskip}{0pt}}\n\n' +
                  template.slice(insertPosition);
      }
    }
    
    // Replace version and build date placeholders
    const versionWithoutV = config.version.replace(/^v/, '');
    template = template.replace(/\\newcommand{\\bookversion}{VERSION}/g, 
                              `\\newcommand{\\bookversion}{${versionWithoutV}}`);
    template = template.replace(/\\newcommand{\\builddate}{BUILDDATE}/g, 
                              `\\newcommand{\\builddate}{${config.date} ${config.time}}`);
    
    // Set language for title selection
    template = template.replace(/\\newcommand{\\langsetting}{LANG}/g, 
                              `\\newcommand{\\langsetting}{${lang}}`);
    
    // Write the modified template to a temporary file
    const tempTemplatePath = path.join(config.templateDir, `template-version-${lang}.tex`);
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

% Define the missing tightlist command that pandoc expects
\\providecommand{\\tightlist}{\\setlength{\\itemsep}{0pt}\\setlength{\\parskip}{0pt}}

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

% Define version and build date
\\newcommand{\\bookversion}{${config.version.replace(/^v/, '')}}
\\newcommand{\\builddate}{${config.date} ${config.time}}
\\newcommand{\\langsetting}{${lang}}

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
  const tempTemplatePath = path.join(config.templateDir, `template-version-${lang}.tex`);
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

  // Define EPUB output filename
  const outputEpub = lang === defaultLanguage 
    ? 'rise-and-code.epub' 
    : `rise-and-code-${lang}.epub`;
  
  // Get the appropriate title and subtitle based on language
  const bookTitle = getBookTitle(lang);
  const bookSubtitle = getBookSubtitle(lang);
  
  // Initialize output content
  let output = '';
  
  // Add header and version info
  output += '---\n';
  output += 'title: "Rise & Code"\n';
  
  // Add language-specific subtitle if not English
  if (lang === defaultLanguage) {
    output += 'subtitle: "A Programming Book for Everyone"\n';
  } else if (lang === 'es') {
    output += 'subtitle: "Un libro de programación para todos"\n';
  } else if (lang === 'fr') {
    output += 'subtitle: "Un livre de programmation pour tous"\n';
  } else {
    output += `subtitle: "A Programming Book for Everyone (${lang})"\n`;
  }
  
  output += `date: "${config.date}"\n`;
  output += `author: "Open Source Community"\n`;
  output += 'toc: true\n';
  
  // Add language metadata
  output += `language: "${lang}"\n`;
  output += '---\n\n';
  
  // IMPROVEMENT: Explicitly include the title page first
  const titlePagePath = path.join(config.bookDir, lang, 'title-page.md');
  if (fs.existsSync(titlePagePath)) {
    console.log('Adding title page...');
    output += readMarkdownFile(titlePagePath);
    output += '\n\n\\newpage\n\n';
  } else {
    console.log(`No title page found at ${titlePagePath}, skipping...`);
  }
  
  // Add the rest of the book content
  // Process each chapter directory
  const chapterDirs = getChapterDirs(lang);
  
  // If no chapters found for this language, return early
  if (chapterDirs.length === 0) {
    console.error(`No chapters found for language: ${lang}, skipping build.`);
    return { success: false, message: `No chapters found for language: ${lang}` };
  }
  
  // Process foreword if it exists
  const forewordPath = path.join(config.bookDir, lang, 'foreword.md');
  if (fs.existsSync(forewordPath)) {
    console.log('Adding foreword...');
    output += '# Foreword\n\n';
    output += readMarkdownFile(forewordPath);
    output += '\n\n\\newpage\n\n';
  }
  
  // Process preface if it exists
  const prefacePath = path.join(config.bookDir, lang, 'preface.md');
  if (fs.existsSync(prefacePath)) {
    console.log('Adding preface...');
    output += '# Preface\n\n';
    output += readMarkdownFile(prefacePath);
    output += '\n\n\\newpage\n\n';
  }
  
  // Process introduction if it exists
  const introPath = path.join(config.bookDir, lang, 'introduction.md');
  if (fs.existsSync(introPath)) {
    console.log('Adding introduction...');
    output += '# Introduction\n\n';
    output += readMarkdownFile(introPath);
    output += '\n\n\\newpage\n\n';
  }
  
  // Process each chapter directory
  for (const chapterDir of chapterDirs) {
    const chapterName = path.basename(chapterDir);
    console.log(`Processing chapter: ${chapterName}`);
    
    // Read the chapter's main markdown file if it exists
    const chapterFilePath = path.join(chapterDir, 'index.md');
    
    if (fs.existsSync(chapterFilePath)) {
      console.log(`  Adding content from ${chapterFilePath}`);
      output += readMarkdownFile(chapterFilePath);
      output += '\n\n';
    } else {
      console.log(`  No index.md found in ${chapterDir}`);
    }
    
    // Process any numbered markdown files in sequence
    const chapterFiles = fs.readdirSync(chapterDir)
      .filter(file => file.match(/^\d+.*\.md$/) && file !== 'index.md')
      .sort(sortFilesByNumber);
    
    console.log(`  Found ${chapterFiles.length} additional content files`);
    
    for (const file of chapterFiles) {
      console.log(`  Adding content from ${file}`);
      const filePath = path.join(chapterDir, file);
      output += readMarkdownFile(filePath);
      output += '\n\n';
    }
    
    // Add scene summaries from artifacts if present
    const summaries = extractSceneSummaries(chapterDir);
    if (summaries) {
      console.log('  Adding scene summaries from artifacts');
      output += summaries;
    }
    
    // Add a page break after each chapter
    output += '\\newpage\n\n';
  }
  
  // Process appendices if they exist
  const appendicesDir = path.join(config.bookDir, lang, 'appendices');
  if (fs.existsSync(appendicesDir)) {
    console.log('Processing appendices...');
    
    const appendixFiles = fs.readdirSync(appendicesDir)
      .filter(file => file.endsWith('.md'))
      .sort(sortFilesByNumber);
    
    if (appendixFiles.length > 0) {
      output += '# Appendices\n\n';
      
      for (const file of appendixFiles) {
        console.log(`  Adding appendix: ${file}`);
        const filePath = path.join(appendicesDir, file);
        output += readMarkdownFile(filePath);
        output += '\n\n\\newpage\n\n';
      }
    }
  }
  
  // Add glossary if it exists
  const glossaryPath = path.join(config.bookDir, lang, 'glossary.md');
  if (fs.existsSync(glossaryPath)) {
    console.log('Adding glossary...');
    output += '# Glossary\n\n';
    output += readMarkdownFile(glossaryPath);
    output += '\n\n\\newpage\n\n';
  }
  
  // Add bibliography if it exists
  const bibPath = path.join(config.bookDir, lang, 'bibliography.md');
  if (fs.existsSync(bibPath)) {
    console.log('Adding bibliography...');
    output += '# Bibliography\n\n';
    output += readMarkdownFile(bibPath);
    output += '\n\n\\newpage\n\n';
  }
  
  // Add acknowledgments if they exist
  const acknowledgmentsPath = path.join(config.bookDir, lang, 'acknowledgments.md');
  if (fs.existsSync(acknowledgmentsPath)) {
    console.log('Adding acknowledgments...');
    output += '# Acknowledgments\n\n';
    output += readMarkdownFile(acknowledgmentsPath);
    output += '\n\n';
  }
  
  // Write the collated markdown to the output file
  const markdownOutputPath = path.join(config.outputDir, outputMarkdown);
  console.log(`Writing markdown to ${markdownOutputPath}`);
  fs.writeFileSync(markdownOutputPath, output);
  
  // Results to track build success
  const results = {
    outputPdf: null,
    outputHtml: null,
    outputEpub: null
  };
  
  // Generate PDF using pandoc with the LaTeX template
  console.log(`Generating PDF: ${outputPdf}`);
  const pdfOutputPath = path.join(config.outputDir, outputPdf);
  
  // Create LaTeX template with version and build date
  const tempTemplatePath = createLatexTemplate(lang);
  
  try {
    const pdfCommand = `pandoc "${markdownOutputPath}" -o "${pdfOutputPath}" --from=markdown --template="${tempTemplatePath}" --pdf-engine=xelatex --toc`;
    console.log(`Executing: ${pdfCommand}`);
    execSync(pdfCommand, { stdio: 'inherit' });
    console.log(`PDF generated successfully: ${pdfOutputPath}`);
    results.outputPdf = pdfOutputPath;
  } catch (error) {
    console.error(`Error generating PDF: ${error}`);
  }
  
  // Generate an HTML file
  try {
    let htmlOutputPath;
    if (lang === defaultLanguage) {
      htmlOutputPath = path.join(config.outputDir, 'index.html');
    } else {
      // Create language-specific directory
      const langDir = path.join(config.outputDir, lang);
      if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, { recursive: true });
      }
      htmlOutputPath = path.join(langDir, 'index.html');
    }
    
    console.log(`Generating HTML: ${htmlOutputPath}`);
    const htmlCommand = `pandoc "${markdownOutputPath}" -o "${htmlOutputPath}" --standalone --toc --metadata title="${bookTitle}" --metadata=lang:${lang}`;
    console.log(`Executing: ${htmlCommand}`);
    execSync(htmlCommand, { stdio: 'inherit' });
    console.log(`HTML generated successfully: ${htmlOutputPath}`);
    results.outputHtml = htmlOutputPath;
  } catch (error) {
    console.error(`Error generating HTML: ${error}`);
  }
  
  // Generate EPUB
  try {
    const epubOutputPath = path.join(config.outputDir, outputEpub);
    console.log(`Generating EPUB: ${epubOutputPath}`);
    
    // Check if we have a cover image
    const coverImagePath = ensureCoverImage(lang);
    
    // Create the EPUB command
    let epubCommand;
    if (coverImagePath) {
      epubCommand = `pandoc "${markdownOutputPath}" -o "${epubOutputPath}" --toc --epub-cover-image="${coverImagePath}" --metadata title="${bookTitle}" --metadata subtitle="${bookSubtitle}" --metadata author="Open Source Community" --metadata lang=${lang}`;
    } else {
      epubCommand = `pandoc "${markdownOutputPath}" -o "${epubOutputPath}" --toc --metadata title="${bookTitle}" --metadata subtitle="${bookSubtitle}" --metadata author="Open Source Community" --metadata lang=${lang}`;
    }
    
    console.log(`Executing: ${epubCommand}`);
    execSync(epubCommand, { stdio: 'inherit' });
    console.log(`EPUB generated successfully: ${epubOutputPath}`);
    results.outputEpub = epubOutputPath;
  } catch (error) {
    console.error(`Error generating EPUB: ${error}`);
    
    // Try a fallback approach for EPUB generation
    try {
      const epubOutputPath = path.join(config.outputDir, outputEpub);
      console.log('Trying fallback EPUB generation...');
      const fallbackCommand = `pandoc "${markdownOutputPath}" -o "${epubOutputPath}" --toc`;
      console.log(`Executing: ${fallbackCommand}`);
      execSync(fallbackCommand, { stdio: 'inherit' });
      console.log(`EPUB generated successfully with fallback: ${epubOutputPath}`);
      results.outputEpub = epubOutputPath;
    } catch (fallbackError) {
      console.error(`Fallback EPUB generation also failed: ${fallbackError}`);
    }
  }
  
  return {
    success: true,
    outputs: {
      markdown: markdownOutputPath,
      pdf: results.outputPdf,
      html: results.outputHtml,
      epub: results.outputEpub
    }
  };
}

// Main execution logic
if (buildAllLanguages) {
  console.log('Building books for all available languages');
  const languages = getAvailableLanguages();
  const results = {};
  
  for (const lang of languages) {
    console.log(`\n========== Building ${lang} version ==========\n`);
    results[lang] = buildBook(lang);
  }
  
  // Print summary
  console.log('\n========== Build Summary ==========');
  for (const lang of languages) {
    const result = results[lang];
    if (result.success) {
      console.log(`${lang}: SUCCESS`);
      console.log(`  Markdown: ${result.outputs.markdown}`);
      console.log(`  PDF: ${result.outputs.pdf || 'Failed'}`);
      console.log(`  HTML: ${result.outputs.html || 'Failed'}`);
      console.log(`  EPUB: ${result.outputs.epub || 'Failed'}`);
    } else {
      console.log(`${lang}: FAILED - ${result.message}`);
    }
  }
} else {
  console.log(`Building book for single language: ${language}`);
  const result = buildBook(language);
  
  if (result.success) {
    console.log('\n========== Build Summary ==========');
    console.log(`${language}: SUCCESS`);
    console.log(`  Markdown: ${result.outputs.markdown}`);
    console.log(`  PDF: ${result.outputs.pdf || 'Failed'}`);
    console.log(`  HTML: ${result.outputs.html || 'Failed'}`);
    console.log(`  EPUB: ${result.outputs.epub || 'Failed'}`);
  } else {
    console.error(`\n========== Build Failed ==========`);
    console.error(`Error: ${result.message}`);
    process.exit(1);
  }
}