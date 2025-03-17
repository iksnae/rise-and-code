/**
 * Translation Status Tracker
 * 
 * This script tracks the status of translations across the Rise & Code book.
 * Each language has its own tracking object with information about translated sections.
 */

const translationStatus = {
  es: {
    name: "Spanish",
    code: "es",
    translators: ["Claude AI"],
    lastUpdated: "2025-03-16",
    chapters: {
      "chapter-01": {
        name: "Introduction to Programming",
        sections: {
          "01-why-programming-matters": {
            status: "complete",
            lastUpdated: "2025-03-16"
          },
          "02-who-this-book-is-for": {
            status: "complete",
            lastUpdated: "2025-03-16"
          },
          "03-how-to-use-this-book": {
            status: "complete",
            lastUpdated: "2025-03-16"
          }
        },
        activities: {
          "01-first-algorithm": {
            status: "complete",
            lastUpdated: "2025-03-16"
          },
          "02-computational-thinking-in-everyday-life": {
            status: "complete",
            lastUpdated: "2025-03-16"
          },
          "03-setting-up-your-coding-notebook": {
            status: "complete",
            lastUpdated: "2025-03-16"
          }
        },
        "chapter-summary": {
          status: "complete",
          lastUpdated: "2025-03-16"
        },
        completionPercentage: 100
      }
    },
    overallCompletionPercentage: 8.33 // Assuming 12 chapters total (1/12 * 100)
  }
};

/**
 * Get the completion status for a specific language
 * @param {string} languageCode - The ISO code for the language
 * @returns {object} Status information for the language
 */
function getLanguageStatus(languageCode) {
  return translationStatus[languageCode] || { error: "Language not found" };
}

/**
 * Get completion percentage for a specific chapter in a language
 * @param {string} languageCode - The ISO code for the language
 * @param {string} chapterId - The chapter identifier (e.g., "chapter-01")
 * @returns {number} Completion percentage for the chapter
 */
function getChapterCompletionPercentage(languageCode, chapterId) {
  const language = translationStatus[languageCode];
  if (!language) return 0;
  
  const chapter = language.chapters[chapterId];
  if (!chapter) return 0;
  
  return chapter.completionPercentage || 0;
}

/**
 * Initialize tracking for a new language
 * @param {string} languageCode - The ISO code for the language
 * @param {string} languageName - The full name of the language
 * @param {Array} translators - Array of translator names
 * @returns {object} The newly created language tracking object
 */
function initializeLanguage(languageCode, languageName, translators = []) {
  if (translationStatus[languageCode]) {
    return { error: "Language already exists" };
  }
  
  translationStatus[languageCode] = {
    name: languageName,
    code: languageCode,
    translators: translators,
    lastUpdated: new Date().toISOString().split('T')[0],
    chapters: {},
    overallCompletionPercentage: 0
  };
  
  return translationStatus[languageCode];
}

// Export functions for use in other scripts
module.exports = {
  translationStatus,
  getLanguageStatus,
  getChapterCompletionPercentage,
  initializeLanguage
};