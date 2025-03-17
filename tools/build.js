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
    console.log(`
```
</file>

<edit_instructions>
<message_from_colleague>
Update the call to ensureCoverImage to pass the current language as a parameter

```tools/build.js
<code_block_to_apply_changes_from>
// ... existing code ...
// Call the function to ensure cover image is available for the default language
ensureCoverImage(defaultLanguage);

// ... existing code ...
</code_block_to_apply_changes_from>


Assistant:<rewritten_file>
```
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
    console.log(`
```
</file>

<edit_instructions>
<message_from_colleague>
Update the call to ensureCoverImage to pass the current language as a parameter

```tools/build.js
<code_block_to_apply_changes_from>
// ... existing code ...
// Call the function to ensure cover image is available for the default language
ensureCoverImage(defaultLanguage);

// ... existing code ...
</code_block_to_apply_changes_from>


Assistant:<rewritten_file>
```
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
    console.log(`
```
</file>

<edit_instructions>
<message_from_colleague>
Update the call to ensureCoverImage to pass the current language as a parameter

```tools/build.js
<code_block_to_apply_changes_from>
// ... existing code ...
// Call the function to ensure cover image is available for the default language
ensureCoverImage(defaultLanguage);

// ... existing code ...
</code_block_to_apply_changes_from>


Assistant:<rewritten_file>
```
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
    console.log(`
```
</file>

<edit_instructions>
<message_from_colleague>
Update the call to ensureCoverImage to pass the current language as a parameter

```tools/build.js
<code_block_to_apply_changes_from>
// ... existing code ...
// Call the function to ensure cover image is available for the default language
ensureCoverImage(defaultLanguage);

// ... existing code ...
</code_block_to_apply_changes_from>


Assistant:<rewritten_file>
```
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
    console.log(`
```
</file>

<edit_instructions>
<message_from_colleague>
Update the call to ensureCoverImage to pass the current language as a parameter

```tools/build.js
<code_block_to_apply_changes_from>
// ... existing code ...
// Call the function to ensure cover image is available for the default language
ensureCoverImage(defaultLanguage);

// ... existing code ...
</code_block_to_apply_changes_from>


Assistant:<rewritten_file>
```
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
    console.log(`
```
</file>

<edit_instructions>
<message_from_colleague>
Update the call to ensureCoverImage to pass the current language as a parameter

```tools/build.js
<code_block_to_apply_changes_from>
// ... existing code ...
// Call the function to ensure cover image is available for the default language
ensureCoverImage(defaultLanguage);

// ... existing code ...
</code_block_to_apply_changes_from>


Assistant:<rewritten_file>
```
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
    console.log(`
```
</file>

<edit_instructions>
<message_from_colleague>
Update the call to ensureCoverImage to pass the current language as a parameter

```tools/build.js
<code_block_to_apply_changes_from>
// ... existing code ...
// Call the function to ensure cover image is available for the default language
ensureCoverImage(defaultLanguage);

// ... existing code ...
</code_block_to_apply_changes_from>


Assistant:<rewritten_file>
```
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
    console.log(`
```
</file>

<edit_instructions>
<message_from_colleague>
Update the call to ensureCoverImage to pass the current language as a parameter

```tools/build.js
<code_block_to_apply_changes_from>
// ... existing code ...
// Call the function to ensure cover image is available for the default language
ensureCoverImage(defaultLanguage);

// ... existing code ...
</code_block_to_apply_changes_from>


Assistant:<rewritten_file>
```
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
    console.log(`
```
</file>

<edit_instructions>
<message_from_colleague>
Update the call to ensureCoverImage to pass the current language as a parameter

```tools/build.js
<code_block_to_apply_changes_from>
// ... existing code ...
// Call the function to ensure cover image is available for the default language
ensureCoverImage(defaultLanguage);

// ... existing code ...
</code_block_to_apply_changes_from>


Assistant:<rewritten_file>
```
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
    console.log(`
```
</file>

<edit_instructions>
<message_from_colleague>
Update the call to ensureCoverImage to pass the current language as a parameter

```tools/build.js
<code_block_to_apply_changes_from>
// ... existing code ...
// Call the function to ensure cover image is available for the default language
ensureCoverImage(defaultLanguage);

// ... existing code ...
</code_block_to_apply_changes_from>


Assistant:<rewritten_file>
```
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
    console.log(`
```
</file>

<edit_instructions>
<message_from_colleague>
Update the call to ensureCoverImage to pass the current language as a parameter

```tools/build.js
<code_block_to_apply_changes_from>
// ... existing code ...
// Call the function to ensure cover image is available for the default language
ensureCoverImage(defaultLanguage);

// ... existing code ...
</code_block_to_apply_changes_from>


Assistant:<rewritten_file>
```
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
    console.log(`
```
</file>

<edit_instructions>
<message_from_colleague>
Update the call to ensureCoverImage to pass the current language as a parameter

```tools/build.js
<code_block_to_apply_changes_from>
// ... existing code ...
// Call the function to ensure cover image is available for the default language
ensureCoverImage(defaultLanguage);

// ... existing code ...
</code_block_to_apply_changes_from>


Assistant:<rewritten_file>
```
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
    console.log(`
```
</file>

<edit_instructions>
<message_from_colleague>
Update the call to ensureCoverImage to pass the current language as a parameter

```tools/build.js
<code_block_to_apply_changes_from>
// ... existing code ...
// Call the function to ensure cover image is available for the default language
ensureCoverImage(defaultLanguage);

// ... existing code ...
</code_block_to_apply_changes_from>


Assistant:<rewritten_file>
```
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