# Translation Guidelines for Rise & Code

Thank you for your interest in translating Rise & Code! This document provides guidelines for contributing translations to make programming education accessible in multiple languages.

## Getting Started

1. **Choose a language**: Check if your target language already has a directory in the `book/` folder
2. **Fork the repository**: Create your own fork of the repository to work on
3. **Set up your development environment**: Follow the setup instructions in CONTRIBUTING.md
4. **Create a branch**: Name it according to the language you're working on (e.g., `translation/es`)

## Translation Workflow

### For New Languages

1. Create a new language directory in the `book/` folder (e.g., `book/es/` for Spanish)
2. Copy the directory structure from the English version
3. Start by translating the `title-page.md` and `README.md` files
4. Proceed with individual chapters in order

### For Existing Languages

1. Check the translation status to find content that needs translation
2. Focus on content marked as `needs-update` in the metadata
3. Ensure you're working with the latest version of the source material

## Translation Metadata

Every translated file should include this metadata at the top:

```markdown
---
language: [language code]
original_file: [path to original English file]
last_synced: [YYYY-MM-DD]
translation_status: [complete|in-progress|needs-update]
---
```

Example:
```markdown
---
language: es
original_file: en/chapter-01/sections/01-why-programming-matters.md
last_synced: 2025-03-16
translation_status: complete
---
```

## Translation Guidelines

### General Principles

1. **Maintain the original structure** of the document
2. **Preserve formatting** including headings, lists, code blocks, etc.
3. **Keep image references** - don't change image paths or filenames
4. **Translate in context** - understand the surrounding content
5. **Be consistent** with terminology throughout the translation

### Content-Specific Guidelines

#### Code Examples

- **DO NOT translate** variable names, function names, or programming keywords inside code blocks
- **DO translate** comments within code
- **DO translate** console output if it's natural language

#### Activities

- Translate all activity instructions, keeping the same format
- Preserve the learning objectives and connections to programming concepts
- Adapt cultural references if necessary for better understanding

### Language-Specific Resources

#### Spanish (Español)
- Use formal "usted" form for instructions
- Programming terms glossary: [link to future resource]

#### [Other Languages]
- Add guidelines specific to each language as needed

## Quality Assurance

1. **Self-review**: Check your translation for accuracy and completeness
2. **Peer review**: Translations should be reviewed by at least one other fluent speaker
3. **Technical validation**: Ensure all formatted elements (headings, lists, code) are preserved

## Tools and Resources

- Recommended dictionaries and glossaries for technical terms
- Style guides for specific languages
- Translation memory tools (if applicable)

## Getting Help

If you have questions about translation, please:
1. Check existing issues for similar questions
2. Open a new issue with the `translation` and `question` labels

## Recognition

All translators will be credited in:
- The CONTRIBUTORS.md file
- Release notes for the translated version
- The project's README

Thank you for helping make programming education accessible to more people around the world! 