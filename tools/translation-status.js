/**
 * Translation Status Tool
 * 
 * This script helps monitor and manage translation status for the Rise & Code book.
 * It scans the book directory structure and reports on:
 * - Available languages
 * - Translation status for each file
 * - Which files need translation/updates
 * - Overall completion status by language
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const config = {
  bookDir: path.resolve(__dirname, '../book'),
  sourceLanguage: 'en',
  excludePatterns: ['.DS_Store', 'node_modules', '.git']
};

// Get list of available languages
function getLanguages() {
  return fs.readdirSync(config.bookDir)
    .filter(item => {
      const fullPath = path.join(config.bookDir, item);
      return fs.statSync(fullPath).isDirectory() &&
        !config.excludePatterns.includes(item);
    });
}

// Recursively get files in a directory
function getFilesRecursively(dir) {
  let results = [];
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    if (config.excludePatterns.includes(item)) continue;
    
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else if (item.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  
  return results;
}

// Check if file has translation metadata
function hasTranslationMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    return !!(data.language && data.original_file && data.last_synced && data.translation_status);
  } catch (error) {
    return false;
  }
}

// Get translation metadata for a file
function getTranslationMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    return {
      language: data.language,
      originalFile: data.original_file,
      lastSynced: data.last_synced,
      status: data.translation_status
    };
  } catch (error) {
    return null;
  }
}

// Check if source file has been modified since last translation sync
function isOutdated(translationFile) {
  const metadata = getTranslationMetadata(translationFile);
  if (!metadata) return false;
  
  const sourceFilePath = path.join(config.bookDir, metadata.originalFile);
  if (!fs.existsSync(sourceFilePath)) return false;
  
  const sourceStat = fs.statSync(sourceFilePath);
  const sourceModified = sourceStat.mtime;
  const lastSynced = new Date(metadata.lastSynced);
  
  return sourceModified > lastSynced;
}

// Generate translation status report
function generateReport() {
  console.log('\n=== TRANSLATION STATUS REPORT ===\n');
  
  const languages = getLanguages();
  const sourceLanguageIndex = languages.indexOf(config.sourceLanguage);
  
  if (sourceLanguageIndex === -1) {
    console.error(`Error: Source language '${config.sourceLanguage}' not found`);
    return;
  }
  
  // Move source language to front
  languages.splice(sourceLanguageIndex, 1);
  languages.unshift(config.sourceLanguage);
  
  console.log(`Available languages: ${languages.join(', ')}\n`);
  console.log(`Source language: ${config.sourceLanguage}\n`);
  
  // Skip source language in detailed report
  const translationLanguages = languages.slice(1);
  
  // Get all source files
  const sourceDir = path.join(config.bookDir, config.sourceLanguage);
  const sourceFiles = getFilesRecursively(sourceDir);
  const sourceFileCount = sourceFiles.length;
  
  console.log(`Source files: ${sourceFileCount}\n`);
  
  // Process each language
  for (const lang of translationLanguages) {
    console.log(`\n=== ${lang.toUpperCase()} ===\n`);
    
    const langDir = path.join(config.bookDir, lang);
    const translatedFiles = getFilesRecursively(langDir);
    
    // Track statistics
    let stats = {
      total: translatedFiles.length,
      complete: 0,
      inProgress: 0,
      needsUpdate: 0,
      missingMetadata: 0,
      outdated: 0
    };
    
    // Check each file
    for (const file of translatedFiles) {
      const relativePath = path.relative(langDir, file);
      
      if (!hasTranslationMetadata(file)) {
        console.log(`[MISSING METADATA] ${relativePath}`);
        stats.missingMetadata++;
        continue;
      }
      
      const metadata = getTranslationMetadata(file);
      
      if (isOutdated(file)) {
        console.log(`[OUTDATED] ${relativePath} (original changed since last sync)`);
        stats.outdated++;
      }
      
      // Update statistics based on status
      switch (metadata.status) {
        case 'complete':
          stats.complete++;
          break;
        case 'in-progress':
          stats.inProgress++;
          console.log(`[IN PROGRESS] ${relativePath}`);
          break;
        case 'needs-update':
          stats.needsUpdate++;
          console.log(`[NEEDS UPDATE] ${relativePath}`);
          break;
        default:
          console.log(`[UNKNOWN STATUS] ${relativePath}: ${metadata.status}`);
      }
    }
    
    // Check for missing files
    for (const sourceFile of sourceFiles) {
      const relativePath = path.relative(sourceDir, sourceFile);
      const translationFilePath = path.join(langDir, relativePath);
      
      if (!fs.existsSync(translationFilePath)) {
        console.log(`[MISSING] ${relativePath}`);
      }
    }
    
    // Calculate completion percentage
    const completionPercentage = ((stats.complete / sourceFileCount) * 100).toFixed(2);
    
    // Print summary
    console.log(`\nSummary for ${lang}:`);
    console.log(`- Complete: ${stats.complete}/${sourceFileCount} (${completionPercentage}%)`);
    console.log(`- In Progress: ${stats.inProgress}`);
    console.log(`- Needs Update: ${stats.needsUpdate}`);
    console.log(`- Outdated: ${stats.outdated}`);
    console.log(`- Missing Metadata: ${stats.missingMetadata}`);
    console.log(`- Missing Files: ${sourceFileCount - stats.total}`);
  }
  
  console.log('\n=== END REPORT ===\n');
}

// Run the report
generateReport(); 