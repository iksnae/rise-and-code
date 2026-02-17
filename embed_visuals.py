#!/usr/bin/env python3
"""Embed visual placeholders with actual image references"""

import os
import re

# Mapping: (file, [VISUAL placeholder pattern], image file, alt text)
EMBEDDINGS = [
    (
        "book/en/chapter-02/sections/01-basic-logic-and-decision-making.md",
        r'\[VISUAL: type=truth-table.*?\]',
        "ch2-truth-table.png",
        "Truth table for AND, OR, NOT logic gates showing all combinations"
    ),
    (
        "book/en/chapter-02/sections/02-conditional-statements-and-flowcharts.md",
        r'\[VISUAL: type=code-breakdown.*?\]',
        "ch2-ifelse-breakdown.png",
        "IF-ELSE statement with each component highlighted and labeled"
    ),
    (
        "book/en/chapter-02/sections/02-conditional-statements-and-flowcharts.md",
        r'\[VISUAL: type=symbol-reference.*?\]',
        "ch2-flowchart-symbols.png",
        "Flowchart symbols including oval, rectangle, diamond, arrow, parallelogram"
    ),
    (
        "book/en/chapter-03/sections/01-creating-simple-algorithms.md",
        r'\[VISUAL: type=step-by-step.*?\]',
        "ch3-paper-airplane.png",
        "Step-by-step illustrated guide to folding a paper airplane"
    ),
    (
        "book/en/chapter-03/sections/01-creating-simple-algorithms.md",
        r'\[VISUAL: type=comparison-chart.*?\]',
        "ch3-algorithm-formats.png",
        "Algorithm representation formats compared side-by-side: English, pseudocode, flowchart, code"
    ),
    (
        "book/en/chapter-03/sections/01-creating-simple-algorithms.md",
        r'\[VISUAL: type=infographic.*?\]',
        "ch3-algorithms-importance.png",
        "Five reasons why algorithms matter in programming"
    ),
    (
        "book/en/chapter-04/sections/02-types-of-data-and-variables.md",
        r'\[VISUAL: type=concept-map.*?\]',
        "ch4-data-types-map.png",
        "Data types concept map showing different types with examples and icons"
    ),
    (
        "book/en/chapter-04/sections/02-types-of-data-and-variables.md",
        r'\[VISUAL: type=illustration.*?\]',
        "ch4-variable-illustration.png",
        "Variables illustrated as labeled boxes showing names, values, and types"
    ),
    (
        "book/en/chapter-05/sections/01-understanding-loops.md",
        r'\[VISUAL: type=annotated-code.*?\]',
        "ch5-while-loop.png",
        "WHILE loop with initialization, condition, body, and update labeled"
    ),
    (
        "book/en/chapter-06/sections/01-benefits-of-coding-journal.md",
        r'\[VISUAL: type=benefit-icon.*?\]',
        "ch6-journal-icon.png",
        "Brain icon with notebook representing memory augmentation from journaling"
    ),
    (
        "book/en/chapter-06/sections/01-benefits-of-coding-journal.md",
        r'\[VISUAL: type=workflow-diagram.*?\]',
        "ch6-professional-workflow.png",
        "Professional work cycle showing Plan, Implement, Document, Review"
    ),
    (
        "book/en/chapter-08/sections/01-applying-programming-to-real-problems.md",
        r'\[VISUAL: type=cycle-diagram.*?\]',
        "ch8-problem-solving-cycle.png",
        "Circular problem-solving cycle with 6 steps showing iterative process"
    ),
    (
        "book/en/chapter-08/sections/01-applying-programming-to-real-problems.md",
        r'\[VISUAL: type=category-icons.*?\]',
        "ch8-problem-categories.png",
        "Five problem categories illustrated with icons and brief examples"
    ),
    (
        "book/en/chapter-01/sections/01-why-programming-matters.md",
        r'\[VISUAL: type=infographic.*?\]',
        "ch1-realworld-examples.png",
        "Real-world examples of programming in daily life with icons"
    ),
    (
        "book/en/chapter-01/sections/01-why-programming-matters.md",
        r'\[VISUAL: type=icons-grid.*?\]',
        "ch1-programming-benefits.png",
        "Six benefits of programming thinking illustrated with icons"
    ),
]

def embed_visuals():
    base_dir = os.path.expanduser("~/rise-and-code-ai-fork")
    embedded_count = 0
    
    for file_path, placeholder_pattern, image_file, alt_text in EMBEDDINGS:
        full_path = os.path.join(base_dir, file_path)
        
        if not os.path.exists(full_path):
            print(f"⚠️  File not found: {file_path}")
            continue
        
        # Read file
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if placeholder exists
        if not re.search(placeholder_pattern, content):
            print(f"⚠️  Placeholder not found in {file_path}")
            continue
        
        # Build markdown image reference with proper relative path
        # From book/en/chapter-XX/sections/ → ../../assets/phase3-visuals/
        markdown_img = f'![{alt_text}](../../assets/phase3-visuals/{image_file})'
        
        # Replace placeholder
        new_content = re.sub(placeholder_pattern, markdown_img, content)
        
        # Write back
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        embedded_count += 1
        print(f"✅ {file_path}")
        print(f"   └─ {image_file}")
    
    return embedded_count

if __name__ == "__main__":
    print("\n🎨 Embedding Visual Placeholders...\n")
    count = embed_visuals()
    print(f"\n✅ Embedded {count} visual references!")
