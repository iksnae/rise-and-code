# Rise & Code Book Content

This directory contains all the chapters and content for the Rise & Code book, organized by language.

## Multilingual Structure

The book content is organized by language directories:

- `en/` - English (original source)
- `es/` - Spanish (español)
- Additional language directories as they are added

## Chapter Structure

Within each language directory, each chapter is organized with the following structure:

- `chapter-X/` - Main chapter directory
  - `README.md` - Chapter overview
  - `sections/` - Individual section content
  - `activities/` - Hands-on activities
  - `resources/` - Additional resources related to the chapter

## Translation Metadata

Translated files should include metadata in the frontmatter:

```markdown
---
language: es
original_file: en/chapter-01/sections/01-why-programming-matters.md
last_synced: YYYY-MM-DD
translation_status: complete|in-progress|needs-update
---
```

This metadata helps track translation status and synchronization with source content.

## Contributing Translations

Please see the TRANSLATION.md file in the project root for guidelines on contributing translations.

Please follow the established structure when contributing new content or translations.