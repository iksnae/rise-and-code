/**
 * Translation Initialization Tool
 * 
 * This script helps set up a new language for translation in the Rise & Code book.
 * It creates the necessary directory structure and copies key files with translation
 * metadata templates.
 * 
 * Usage: node tools/init-translation.js [language-code]
 * Example: node tools/init-translation.js fr
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Error: Language code required');
  console.log('Usage: node tools/init-translation.js [language-code]');
  console.log('Example: node tools/init-translation.js fr');
  process.exit(1);
}

const languageCode = args[0].toLowerCase();

// Configuration
const config = {
  bookDir: path.resolve(__dirname, '../book'),
  sourceLanguage: 'en',
  targetLanguage: languageCode,
  today: new Date().toISOString().split('T')[0],
  excludePatterns: ['.DS_Store', 'node_modules', '.git']
};

// Language name mapping (for validation)
const validLanguages = {
  en: 'English',
  es: 'Spanish (Español)',
  fr: 'French (Français)',
  pt: 'Portuguese (Português)',
  de: 'German (Deutsch)',
  it: 'Italian (Italiano)',
  zh: 'Chinese (中文)',
  ja: 'Japanese (日本語)',
  ko: 'Korean (한국어)',
  ru: 'Russian (Русский)',
  ar: 'Arabic (العربية)',
  hi: 'Hindi (हिन्दी)',
  sw: 'Swahili (Kiswahili)'
};

// Validate language code
if (!Object.keys(validLanguages).includes(languageCode)) {
  console.warn(`Warning: '${languageCode}' is not in the list of known language codes.`);
  console.log('Known language codes:');
  Object.entries(validLanguages).forEach(([code, name]) => {
    console.log(`- ${code}: ${name}`);
  });
  
  const confirmPrompt = 'Do you want to continue with this language code? (y/n): ';
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question(confirmPrompt, (answer) => {
    if (answer.toLowerCase() !== 'y') {
      console.log('Aborting initialization.');
      process.exit(0);
    } else {
      readline.close();
      initializeLanguage();
    }
  });
} else {
  initializeLanguage();
}

// Create directory structure and initialize translation files
function initializeLanguage() {
  console.log(`\nInitializing translation for language: ${languageCode}`);
  
  const sourceDir = path.join(config.bookDir, config.sourceLanguage);
  const targetDir = path.join(config.bookDir, config.targetLanguage);
  
  // Check if source language exists
  if (!fs.existsSync(sourceDir)) {
    console.error(`Error: Source language directory '${config.sourceLanguage}' not found`);
    process.exit(1);
  }
  
  // Check if target language already exists
  if (fs.existsSync(targetDir)) {
    console.log(`Target language directory '${config.targetLanguage}' already exists.`);
    console.log('Will only create missing directories and files.\n');
  } else {
    console.log(`Creating target language directory: ${targetDir}`);
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Get all chapter directories from source
  const chapterDirs = fs.readdirSync(sourceDir)
    .filter(item => {
      const fullPath = path.join(sourceDir, item);
      return fs.statSync(fullPath).isDirectory() && 
             item.startsWith('chapter-');
    })
    .sort((a, b) => {
      const numA = parseInt(a.split('-')[1]);
      const numB = parseInt(b.split('-')[1]);
      return numA - numB;
    });
  
  // Copy title page first - special handling
  copyTitlePage(sourceDir, targetDir);
  
  // Create chapter directories and initialize key files
  for (const chapterDir of chapterDirs) {
    console.log(`\nInitializing chapter: ${chapterDir}`);
    
    const sourceChapterDir = path.join(sourceDir, chapterDir);
    const targetChapterDir = path.join(targetDir, chapterDir);
    
    // Create chapter directory if it doesn't exist
    if (!fs.existsSync(targetChapterDir)) {
      console.log(`  Creating directory: ${targetChapterDir}`);
      fs.mkdirSync(targetChapterDir, { recursive: true });
    }
    
    // Copy README.md with translation template
    copyWithMetadata(
      path.join(sourceChapterDir, 'README.md'),
      path.join(targetChapterDir, 'README.md')
    );
    
    // Create sections directory and template files
    const sourceSectionsDir = path.join(sourceChapterDir, 'sections');
    const targetSectionsDir = path.join(targetChapterDir, 'sections');
    
    if (fs.existsSync(sourceSectionsDir)) {
      if (!fs.existsSync(targetSectionsDir)) {
        console.log(`  Creating sections directory: ${targetSectionsDir}`);
        fs.mkdirSync(targetSectionsDir, { recursive: true });
      }
      
      // Get section files
      const sectionFiles = fs.readdirSync(sourceSectionsDir)
        .filter(file => file.endsWith('.md'));
      
      // Copy first section file as template
      if (sectionFiles.length > 0) {
        const firstSectionFile = sectionFiles[0];
        copyWithMetadata(
          path.join(sourceSectionsDir, firstSectionFile),
          path.join(targetSectionsDir, firstSectionFile)
        );
      }
    }
    
    // Create activities directory
    const sourceActivitiesDir = path.join(sourceChapterDir, 'activities');
    const targetActivitiesDir = path.join(targetChapterDir, 'activities');
    
    if (fs.existsSync(sourceActivitiesDir)) {
      if (!fs.existsSync(targetActivitiesDir)) {
        console.log(`  Creating activities directory: ${targetActivitiesDir}`);
        fs.mkdirSync(targetActivitiesDir, { recursive: true });
      }
      
      // Get activity files
      const activityFiles = fs.readdirSync(sourceActivitiesDir)
        .filter(file => file.endsWith('.md'));
      
      // Copy first activity file as template
      if (activityFiles.length > 0) {
        const firstActivityFile = activityFiles[0];
        copyWithMetadata(
          path.join(sourceActivitiesDir, firstActivityFile),
          path.join(targetActivitiesDir, firstActivityFile)
        );
      }
    }
    
    // Copy chapter summary if exists
    const sourceSummaryPath = path.join(sourceChapterDir, 'chapter-summary.md');
    if (fs.existsSync(sourceSummaryPath)) {
      copyWithMetadata(
        sourceSummaryPath,
        path.join(targetChapterDir, 'chapter-summary.md')
      );
    }
  }
  
  console.log(`\nTranslation initialized for ${languageCode}.`);
  console.log('\nNext Steps:');
  console.log(`1. Translate the template files in: ${targetDir}`);
  console.log('2. Create additional translated files for each chapter');
  console.log('3. Run the translation status tool to track progress:');
  console.log('   npm run translation:status');
  console.log('\nBuild the book in this language with:');
  console.log(`npm run build -- --lang=${languageCode}`);
}

// Create a translation template file with metadata
function copyWithMetadata(sourcePath, targetPath) {
  if (fs.existsSync(targetPath)) {
    console.log(`  Skipping existing file: ${path.basename(targetPath)}`);
    return;
  }
  
  console.log(`  Creating template: ${path.basename(targetPath)}`);
  
  try {
    // Read source content
    const sourceContent = fs.readFileSync(sourcePath, 'utf8');
    
    // Create relative path for original_file
    const relativePath = path.relative(
      path.join(config.bookDir, config.targetLanguage),
      targetPath
    );
    const originalFile = path.join(config.sourceLanguage, relativePath);
    
    // Add translation metadata
    const metadata = {
      language: config.targetLanguage,
      original_file: originalFile,
      last_synced: config.today,
      translation_status: 'in-progress'
    };
    
    // Format metadata section
    const metadataSection = '---\n' +
      Object.entries(metadata)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n') +
      '\n---\n\n';
    
    // Write the file with metadata + original content as reference
    fs.writeFileSync(targetPath, metadataSection + sourceContent);
  } catch (error) {
    console.error(`  Error creating template for ${targetPath}:`, error);
  }
}

// Special handling for title page
function copyTitlePage(sourceDir, targetDir) {
  const sourceTitlePath = path.join(sourceDir, 'title-page.md');
  const targetTitlePath = path.join(targetDir, 'title-page.md');
  
  if (!fs.existsSync(sourceTitlePath)) {
    console.log('Warning: Source title-page.md not found, skipping');
    return;
  }
  
  if (fs.existsSync(targetTitlePath)) {
    console.log('Skipping existing title-page.md');
    return;
  }
  
  console.log('Creating title-page.md template');
  copyWithMetadata(sourceTitlePath, targetTitlePath);
} 