# Contributing to Rise & Code

Thank you for your interest in contributing to Rise & Code! This document provides comprehensive guidelines and instructions for contributing to this project.

## How to Contribute

There are several ways you can contribute to the Rise & Code book:

1. **Content Writing**: Help write chapters, sections, or exercises
2. **Review & Editing**: Review content for clarity, accuracy, and accessibility
3. **Illustrations & Diagrams**: Create visual aids to support learning concepts
4. **Translation**: Translate content into other languages
5. **Testing Activities**: Try out the unplugged activities and provide feedback
6. **Technical Improvements**: Enhance build scripts and PDF generation

## Getting Started

1. **Browse Issues**: Check the existing issues to see what's needed
2. **Pick a Task**: Choose an issue that matches your interests and skills
3. **Comment on the Issue**: Let others know you're working on it
4. **Fork & Clone**: Fork the repository and clone it to your local machine
5. **Create a Branch**: Create a branch for your contribution
6. **Submit Changes**: Push your changes and create a pull request

## Project Structure

The Rise & Code repository is organized as follows:

```
book/
├── chapter-XX/           # Each chapter has its own directory
│   ├── README.md         # Chapter introduction and overview
│   ├── sections/         # Core content sections
│   │   ├── 01-section-name.md
│   │   ├── 02-section-name.md
│   │   └── 03-section-name.md
│   ├── activities/       # Hands-on exercises
│   │   ├── 01-activity-name.md
│   │   ├── 02-activity-name.md
│   │   └── 03-activity-name.md
│   └── chapter-summary.md # Recap and reflection
templates/               # LaTeX templates for PDF output
tools/                   # Build scripts and utilities
```

## Chapter Structure Guidelines

Each chapter should follow this consistent structure:

1. **README.md** - Chapter introduction containing:
   - Chapter title and brief introduction
   - Chapter objectives (what the reader will learn)
   - List of sections with links
   - List of activities with links
   - Reference to chapter summary

2. **Sections** - Core content divided into 2-4 main sections:
   - Each section focuses on a specific concept
   - Sections build progressively in complexity
   - Include examples, explanations, and small exercises
   - Use short paragraphs and clear headings
   - Name files with numeric prefixes for proper ordering (e.g., `01-section-name.md`)

3. **Activities** - Hands-on exercises:
   - 3-5 activities per chapter
   - Include clear learning objectives
   - List required materials (minimal and accessible)
   - Provide step-by-step instructions
   - Include example solutions or expected outcomes
   - Add variations and extensions
   - Explain connections to programming concepts
   - Name files with numeric prefixes for proper ordering (e.g., `01-activity-name.md`)

4. **Chapter Summary** - Recap and reflection:
   - Summarize key concepts covered
   - List main learning points
   - Include reflection questions
   - Preview the next chapter
   - Suggest additional resources or practice ideas

## Content Guidelines

When writing content for Rise & Code, please follow these guidelines:

1. **Accessibility**: 
   - Use clear, simple language accessible to various reading levels (aim for age 10+)
   - Explain jargon and technical terms when they're first introduced
   - Structure content with frequent headings for easy navigation
   - Keep paragraphs short (3-5 sentences maximum)

2. **Inclusivity**:
   - Use culturally diverse examples and scenarios
   - Avoid references that are specific to one country or culture
   - Use gender-neutral language and diverse names in examples
   - Consider various learning styles in your presentation

3. **Practicality**:
   - Focus on activities that can be done with just paper and pencil
   - Don't assume access to specific technology or resources
   - Include alternatives for materials that might not be available
   - Test activities to ensure they work as described

4. **Progression**:
   - Build on concepts from previous chapters
   - Introduce one new concept at a time
   - Provide sufficient practice before moving to complex applications
   - Clearly connect new material to previously learned concepts

5. **Engagement**:
   - Use stories, analogies, and real-world connections
   - Incorporate elements of play and discovery
   - Balance instruction with exploration
   - Encourage reflection and creative application

## Activity Template

When creating activities, use this template structure:

```markdown
# Activity: [Activity Name]

## Overview
[Brief description of the activity and what it teaches]

## Learning Objectives
- [Objective 1]
- [Objective 2]
- [Objective 3]

## Materials Needed
- [Item 1]
- [Item 2]
- [Optional: Item 3]

## Time Required
[Estimated time to complete]

## Instructions

### Part 1: [First Phase]
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Part 2: [Second Phase]
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Example
[Provide a worked example of the activity]

## Variations
[Suggest different ways to adapt the activity]

## Extension Activities
[Advanced challenges that build on the main activity]

## Connection to Programming
[Explain how this activity relates to actual programming concepts]
```

## Formatting Guidelines

- Use Markdown for all content
- Follow the established heading hierarchy:
  - `# Title`: Activity or section title
  - `## Major Section`: Primary divisions within an activity or section
  - `### Subsection`: Components within major sections
  - `#### Minor points`: Used sparingly for special callouts
- Use bold (`**text**`) for emphasis and highlighting key terms
- Use italic (`*text*`) for secondary emphasis or introducing terminology
- Use blockquotes (`> text`) for special notes, tips, or quotes
- Use ordered lists (`1. Item`) for sequential steps
- Use unordered lists (`- Item`) for non-sequential items
- For code examples, use triple backticks with the language specified:
  ```
  ```python
  # Code example
  print("Hello, World!")
  ```
  ```

### Images and Diagrams

- Keep images simple and line-drawing based (accessible for printing)
- Include alt text for all images
- Use plain text diagrams when possible (ASCII art)
- Include a text description of all visual elements
- Avoid relying on color to convey information

### LaTeX and PDF Formatting

- Each section automatically starts on a new page in the PDF
- Use `\newpage` in markdown if you need an explicit page break
- Use standard markdown tables which convert well to PDF
- For mathematical notation, use LaTeX syntax: `$formula$` for inline math, `$$formula$$` for display math

## Quality Standards

Before submitting your contribution, please check:

1. **Accuracy**: Is all information correct and up-to-date?
2. **Clarity**: Would a beginner understand the explanations?
3. **Completeness**: Are all necessary steps included?
4. **Consistency**: Does it match the style of existing content?
5. **Accessibility**: Is it usable by people with various backgrounds?
6. **Practicality**: Can activities be done with minimal resources?
7. **Flow**: Does it build logically on previous concepts?
8. **Value**: Does it teach important programming fundamentals?

## Submission Process

1. **Create Pull Request**: Once your contribution is ready, create a pull request
2. **Describe Changes**: Clearly describe what your contribution adds or modifies
3. **Link to Issues**: Reference any issues your PR addresses
4. **Review Process**: Maintainers will review your submission
5. **Revision**: Be open to feedback and make requested changes
6. **Merge**: Once approved, your contribution will be merged into the project

## Building and Testing

Before submitting your changes, it's helpful to build the book locally to see how your changes appear in the final output:

1. Install Node.js (v14 or higher)
2. Install dependencies: `npm install`
3. Build the book: `npm run build`
4. Check the output in the `build` directory

## Code of Conduct

All contributors are expected to adhere to the project's code of conduct. Please be respectful and constructive in all interactions.

## Questions?

If you have any questions about contributing, please open an issue with the "question" label.

Thank you for helping make programming education more accessible!
