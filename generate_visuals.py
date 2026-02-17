#!/usr/bin/env python3
"""Generate educational visuals for rise-and-code Phase 3c"""

from PIL import Image, ImageDraw, ImageFont
import os

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)

# Base colors
COLOR_BG = (250, 250, 250)
COLOR_DARK = (40, 40, 40)
COLOR_TEXT = (60, 60, 60)
COLOR_ACCENT1 = (52, 152, 219)  # Blue
COLOR_ACCENT2 = (46, 204, 113)  # Green
COLOR_ACCENT3 = (231, 76, 60)   # Red
COLOR_ACCENT4 = (241, 196, 15)  # Yellow
COLOR_TRUE = (46, 204, 113)     # Green for TRUE
COLOR_FALSE = (231, 76, 60)     # Red for FALSE

ASSETS_DIR = os.path.expanduser("~/rise-and-code-ai-fork/assets/phase3-visuals")
ensure_dir(ASSETS_DIR)

def create_truth_table_image():
    """Ch2: Truth table for AND, OR, NOT gates"""
    width, height = 1200, 800
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((50, 40), "Logic Gates: Truth Tables", fill=COLOR_DARK)
    
    # AND Table
    y_start = 120
    draw.text((50, y_start), "AND (True only if BOTH are true)", fill=COLOR_ACCENT1)
    tables_y = y_start + 40
    
    # Column headers
    draw.text((70, tables_y), "A", fill=COLOR_DARK)
    draw.text((150, tables_y), "B", fill=COLOR_DARK)
    draw.text((230, tables_y), "A AND B", fill=COLOR_DARK)
    draw.line([(50, tables_y+25), (320, tables_y+25)], fill=COLOR_ACCENT1, width=2)
    
    # AND rows
    and_data = [("T", "T", "T"), ("T", "F", "F"), ("F", "T", "F"), ("F", "F", "F")]
    for i, (a, b, result) in enumerate(and_data):
        y = tables_y + 40 + i*35
        draw.text((70, y), a, fill=COLOR_TEXT)
        draw.text((150, y), b, fill=COLOR_TEXT)
        result_color = COLOR_TRUE if result == "T" else COLOR_FALSE
        draw.text((230, y), result, fill=result_color)
    
    # OR Table
    y_start = y_start + 300
    draw.text((50, y_start), "OR (True if AT LEAST ONE is true)", fill=COLOR_ACCENT2)
    tables_y = y_start + 40
    draw.text((70, tables_y), "A", fill=COLOR_DARK)
    draw.text((150, tables_y), "B", fill=COLOR_DARK)
    draw.text((230, tables_y), "A OR B", fill=COLOR_DARK)
    draw.line([(50, tables_y+25), (320, tables_y+25)], fill=COLOR_ACCENT2, width=2)
    
    or_data = [("T", "T", "T"), ("T", "F", "T"), ("F", "T", "T"), ("F", "F", "F")]
    for i, (a, b, result) in enumerate(or_data):
        y = tables_y + 40 + i*35
        draw.text((70, y), a, fill=COLOR_TEXT)
        draw.text((150, y), b, fill=COLOR_TEXT)
        result_color = COLOR_TRUE if result == "T" else COLOR_FALSE
        draw.text((230, y), result, fill=result_color)
    
    # NOT Table
    draw.text((450, y_start), "NOT (Reverses the value)", fill=COLOR_ACCENT3)
    tables_y = y_start + 40
    draw.text((470, tables_y), "A", fill=COLOR_DARK)
    draw.text((550, tables_y), "NOT A", fill=COLOR_DARK)
    draw.line([(450, tables_y+25), (620, tables_y+25)], fill=COLOR_ACCENT3, width=2)
    
    not_data = [("T", "F"), ("F", "T")]
    for i, (a, result) in enumerate(not_data):
        y = tables_y + 40 + i*35
        draw.text((470, y), a, fill=COLOR_TEXT)
        result_color = COLOR_FALSE if a == "T" else COLOR_TRUE
        draw.text((550, y), result, fill=result_color)
    
    # Legend
    draw.text((450, 200), "T = True (✓)", fill=COLOR_TRUE)
    draw.text((450, 240), "F = False (✗)", fill=COLOR_FALSE)
    
    img.save(os.path.join(ASSETS_DIR, "ch2-truth-table.png"))
    print("✓ ch2-truth-table.png")

def create_ifelse_breakdown_image():
    """Ch2: IF-ELSE statement breakdown"""
    width, height = 1200, 700
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((50, 40), "IF-ELSE Statement Breakdown", fill=COLOR_DARK)
    
    # Code box background
    draw.rectangle([(50, 100), (1150, 600)], outline=COLOR_ACCENT1, width=3, fill=(245, 250, 255))
    
    # Code
    code_lines = [
        "IF (temperature > 30) THEN",
        "    wear light clothing",
        "ELSE",
        "    wear a jacket",
        "END IF"
    ]
    
    colors_line = [COLOR_ACCENT1, COLOR_TRUE, COLOR_ACCENT2, COLOR_TRUE, COLOR_ACCENT1]
    descriptions = [
        "Condition Check",
        "Action if TRUE",
        "Alternative path",
        "Action if FALSE",
        "End condition"
    ]
    
    y = 130
    for i, (line, color, desc) in enumerate(zip(code_lines, colors_line, descriptions)):
        draw.text((70, y), line, fill=color)
        draw.text((700, y), f"← {desc}", fill=COLOR_TEXT)
        y += 85
    
    img.save(os.path.join(ASSETS_DIR, "ch2-ifelse-breakdown.png"))
    print("✓ ch2-ifelse-breakdown.png")

def create_flowchart_symbols_image():
    """Ch2: Flowchart symbols reference"""
    width, height = 1200, 800
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((50, 40), "Flowchart Symbols", fill=COLOR_DARK)
    
    symbols = [
        ("Start/End", "Oval", 100, 150),
        ("Process", "Rectangle", 100, 350),
        ("Decision", "Diamond", 100, 550),
        ("Input/Output", "Parallelogram", 650, 150),
        ("Arrow", "Direction", 650, 350),
    ]
    
    y_pos = 150
    x_pos = 100
    
    for i, (name, shape, x, y) in enumerate(symbols):
        draw.text((x, y-30), name, fill=COLOR_DARK)
        draw.text((x, y+120), shape, fill=COLOR_TEXT)
        
        # Draw shapes
        if shape == "Oval":
            draw.ellipse([(x, y), (x+80, y+80)], outline=COLOR_ACCENT1, width=3, fill=(220, 240, 255))
        elif shape == "Rectangle":
            draw.rectangle([(x, y), (x+80, y+80)], outline=COLOR_ACCENT2, width=3, fill=(220, 250, 220))
        elif shape == "Diamond":
            draw.polygon([(x+40, y), (x+80, y+40), (x+40, y+80), (x, y+40)], outline=COLOR_ACCENT3, width=3, fill=(255, 220, 220))
        elif shape == "Parallelogram":
            draw.polygon([(x+20, y), (x+80, y), (x+60, y+80), (x, y+80)], outline=COLOR_ACCENT4, width=3, fill=(255, 250, 220))
        elif shape == "Direction":
            draw.line([(x, y+40), (x+80, y+40)], fill=COLOR_DARK, width=4)
            draw.polygon([(x+80, y+40), (x+60, y+30), (x+60, y+50)], fill=COLOR_DARK)
    
    img.save(os.path.join(ASSETS_DIR, "ch2-flowchart-symbols.png"))
    print("✓ ch2-flowchart-symbols.png")

def create_paper_airplane_steps_image():
    """Ch3: Paper airplane folding step-by-step"""
    width, height = 1200, 900
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((50, 40), "Algorithm: Paper Airplane Folding Steps", fill=COLOR_DARK)
    
    steps = [
        ("1. Start", "Unfolded\npaper"),
        ("2. Fold", "Diagonal\ncorner"),
        ("3. Fold again", "Other\ncorner"),
        ("4. Fold center", "Down the\nmiddle"),
        ("5. Fold wings", "Both sides\ndown"),
        ("6. Complete", "Ready to\nthrow")
    ]
    
    x_start = 80
    y_start = 150
    box_width = 170
    box_height = 200
    spacing = 30
    
    for i, (step, desc) in enumerate(steps):
        x = x_start + i * (box_width + spacing)
        if i == 3:
            x_start = 80
            y_start = 450
            x = x_start + (i - 3) * (box_width + spacing)
        
        y = y_start if i < 3 else y_start
        
        # Box
        draw.rectangle([(x, y), (x+box_width, y+box_height)], 
                      outline=COLOR_ACCENT1, width=2, fill=(240, 248, 255))
        
        # Step number
        draw.text((x+10, y+10), step, fill=COLOR_ACCENT1)
        
        # Simple line art representation (diagonal lines for folds)
        if i < 2:
            draw.line([(x+20, y+60), (x+box_width-20, y+box_height-20)], fill=COLOR_DARK, width=2)
        elif i < 4:
            draw.line([(x+box_width//2, y+40), (x+box_width//2, y+box_height-20)], fill=COLOR_DARK, width=2)
        else:
            draw.line([(x+10, y+80), (x+box_width//2, y+40)], fill=COLOR_DARK, width=2)
            draw.line([(x+box_width-10, y+80), (x+box_width//2, y+40)], fill=COLOR_DARK, width=2)
        
        # Description
        draw.text((x+10, y+box_height-40), desc, fill=COLOR_TEXT)
    
    img.save(os.path.join(ASSETS_DIR, "ch3-paper-airplane.png"))
    print("✓ ch3-paper-airplane.png")

def create_algorithm_representation_image():
    """Ch3: Algorithm representation formats comparison"""
    width, height = 1200, 800
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((50, 40), "Algorithm Representation Formats", fill=COLOR_DARK)
    
    formats = [
        ("English", "1. Get two numbers\n2. Add them together\n3. Show result"),
        ("Pseudocode", "INPUT a, b\nSUM = a + b\nOUTPUT SUM"),
        ("Flowchart", "START → INPUT → ADD\n        ↓\n      OUTPUT → END"),
        ("Code", "a = input()\nb = input()\nprint(a + b)")
    ]
    
    box_width = 250
    box_height = 250
    x_start = 50
    y_start = 150
    spacing = 30
    
    for i, (fmt, content) in enumerate(formats):
        x = x_start + (i % 2) * (box_width + spacing + 50)
        y = y_start + (i // 2) * (box_height + spacing + 80)
        
        colors = [COLOR_ACCENT1, COLOR_ACCENT2, COLOR_ACCENT3, COLOR_ACCENT4]
        color = colors[i % len(colors)]
        
        # Box
        draw.rectangle([(x, y), (x+box_width, y+box_height)], 
                      outline=color, width=3, fill=(250, 250, 250))
        
        # Format name
        draw.text((x+10, y+10), fmt, fill=color)
        
        # Content
        draw.text((x+10, y+50), content, fill=COLOR_TEXT)
    
    # Footer
    draw.text((50, 750), "All represent the SAME algorithm—add two numbers!", fill=COLOR_TEXT)
    
    img.save(os.path.join(ASSETS_DIR, "ch3-algorithm-formats.png"))
    print("✓ ch3-algorithm-formats.png")

def create_algorithms_importance_image():
    """Ch3: Why algorithms matter infographic"""
    width, height = 1200, 700
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((50, 40), "Why Algorithms Matter in Programming", fill=COLOR_DARK)
    
    reasons = [
        "✓ Solve problems\nefficiently",
        "✓ Reusable\npatterns",
        "✓ Foundation of\nall software",
        "✓ Save time &\nresources",
        "✓ Build complex\nsolutions"
    ]
    
    box_width = 200
    box_height = 180
    x_start = 60
    y_start = 150
    spacing = 30
    
    for i, reason in enumerate(reasons):
        x = x_start + i * (box_width + spacing)
        y = y_start
        
        colors = [COLOR_ACCENT1, COLOR_ACCENT2, COLOR_ACCENT3, COLOR_ACCENT4, COLOR_TRUE]
        color = colors[i % len(colors)]
        
        # Circle background
        draw.ellipse([(x+20, y+20), (x+box_width-20, y+box_width-20)], 
                    outline=color, width=3, fill=(240, 250, 255))
        
        # Number/icon
        draw.text((x+60, y+50), str(i+1), fill=color)
        
        # Text
        draw.text((x+10, y+box_width+20), reason, fill=COLOR_TEXT)
    
    img.save(os.path.join(ASSETS_DIR, "ch3-algorithms-importance.png"))
    print("✓ ch3-algorithms-importance.png")

def create_data_types_concept_map_image():
    """Ch4: Data types concept map"""
    width, height = 1200, 800
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((50, 40), "Data Types Concept Map", fill=COLOR_DARK)
    
    # Center: Data Types
    center_x, center_y = 600, 400
    draw.ellipse([(center_x-80, center_y-40), (center_x+80, center_y+40)], 
                outline=COLOR_DARK, width=3, fill=(230, 240, 250))
    draw.text((center_x-60, center_y-15), "DATA TYPES", fill=COLOR_DARK)
    
    # Types around center
    types_info = [
        ("Numbers", 200, 200, COLOR_ACCENT1),
        ("Text", 1000, 200, COLOR_ACCENT2),
        ("Boolean", 200, 600, COLOR_ACCENT3),
        ("Collections", 1000, 600, COLOR_ACCENT4),
    ]
    
    for type_name, x, y, color in types_info:
        # Box
        draw.rectangle([(x-60, y-40), (x+60, y+40)], outline=color, width=2, fill=(250, 250, 250))
        draw.text((x-40, y-15), type_name, fill=color)
        
        # Line to center
        draw.line([(center_x, center_y), (x, y)], fill=color, width=2)
        
        # Examples
        examples = {
            "Numbers": ("42, 3.14", y+60),
            "Text": ('"Hello"', y+60),
            "Boolean": ("True/False", y+60),
            "Collections": ("[1,2,3]", y+60)
        }
        if type_name in examples:
            text, text_y = examples[type_name]
            draw.text((x-40, text_y), text, fill=COLOR_TEXT)
    
    img.save(os.path.join(ASSETS_DIR, "ch4-data-types-map.png"))
    print("✓ ch4-data-types-map.png")

def create_variable_illustration_image():
    """Ch4: Variable illustration (name, value, type)"""
    width, height = 1200, 700
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((50, 40), "Variables: Name, Value, and Type", fill=COLOR_DARK)
    draw.text((50, 80), "Think of a variable as a labeled box that holds information", fill=COLOR_TEXT)
    
    # Three example boxes
    examples = [
        ("name", '"Alice"', "Text (String)", COLOR_ACCENT1),
        ("age", "25", "Number (Integer)", COLOR_ACCENT2),
        ("active", "True", "Boolean", COLOR_ACCENT3)
    ]
    
    x_positions = [150, 550, 950]
    
    for (var_name, value, var_type, color), x in zip(examples, x_positions):
        y = 200
        
        # Main box
        draw.rectangle([(x, y), (x+220, y+300)], outline=color, width=3, fill=(250, 250, 250))
        
        # Label: Name
        draw.rectangle([(x+10, y+10), (x+210, y+60)], outline=color, width=2, fill=(240, 250, 255))
        draw.text((x+20, y+25), f"Name: {var_name}", fill=color)
        
        # Section divider
        draw.line([(x+10, y+80), (x+210, y+80)], fill=color, width=1)
        
        # Label: Value
        draw.rectangle([(x+10, y+100), (x+210, y+170)], outline=color, width=2, fill=(250, 250, 250))
        draw.text((x+20, y+130), f"Value: {value}", fill=COLOR_DARK)
        
        # Section divider
        draw.line([(x+10, y+190), (x+210, y+190)], fill=color, width=1)
        
        # Label: Type
        draw.rectangle([(x+10, y+210), (x+210, y+280)], outline=color, width=2, fill=(240, 250, 255))
        draw.text((x+20, y+240), f"Type: {var_type}", fill=color)
    
    img.save(os.path.join(ASSETS_DIR, "ch4-variable-illustration.png"))
    print("✓ ch4-variable-illustration.png")

def create_while_loop_annotated_image():
    """Ch5: Annotated WHILE loop code"""
    width, height = 1200, 700
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((50, 40), "WHILE Loop Breakdown", fill=COLOR_DARK)
    
    # Code box background
    draw.rectangle([(50, 100), (1150, 600)], outline=COLOR_ACCENT2, width=3, fill=(245, 255, 245))
    
    # Code
    code_lines = [
        ("count = 1", COLOR_ACCENT1, "← Initialization (start value)"),
        ("WHILE (count <= 5) DO", COLOR_ACCENT2, "← Condition check"),
        ("    print(count)", COLOR_TRUE, "← Loop body (repeats)"),
        ("    count = count + 1", COLOR_TRUE, "← Update (increment)"),
        ("END WHILE", COLOR_ACCENT2, "← End loop"),
    ]
    
    y = 130
    for code, code_color, annotation in code_lines:
        draw.text((70, y), code, fill=code_color)
        draw.text((700, y), annotation, fill=COLOR_TEXT)
        y += 85
    
    img.save(os.path.join(ASSETS_DIR, "ch5-while-loop.png"))
    print("✓ ch5-while-loop.png")

def create_problem_solving_cycle_image():
    """Ch8: Problem-solving cycle diagram"""
    width, height = 1000, 1000
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((350, 40), "Problem-Solving Cycle", fill=COLOR_DARK)
    
    center_x, center_y = 500, 500
    radius = 280
    
    steps = ["UNDERSTAND", "PLAN", "CODE", "TEST", "DEBUG", "REVIEW"]
    colors = [COLOR_ACCENT1, COLOR_ACCENT2, COLOR_ACCENT3, COLOR_ACCENT4, COLOR_TRUE, (155, 89, 182)]
    
    import math
    for i, (step, color) in enumerate(zip(steps, colors)):
        angle = (i * 360 / len(steps) - 90) * math.pi / 180
        
        # Circle position
        x = center_x + radius * math.cos(angle)
        y = center_y + radius * math.sin(angle)
        
        # Draw circle
        r = 50
        draw.ellipse([(x-r, y-r), (x+r, y+r)], outline=color, width=3, fill=(250, 250, 250))
        
        # Step number
        draw.text((x-15, y-15), str(i+1), fill=color)
        
        # Step name
        text_angle = i * 360 / len(steps)
        draw.text((x-40, y+40), step, fill=color)
        
        # Arrow to next step
        if i < len(steps) - 1:
            next_angle = ((i+1) * 360 / len(steps) - 90) * math.pi / 180
            next_x = center_x + radius * math.cos(next_angle)
            next_y = center_y + radius * math.sin(next_angle)
            
            # Arrow body
            draw.line([(x + 50*math.cos(angle), y + 50*math.sin(angle)),
                      (next_x - 50*math.cos(next_angle), next_y - 50*math.sin(next_angle))],
                     fill=COLOR_DARK, width=2)
        else:
            # Arrow back to start
            next_angle = (-90) * math.pi / 180
            next_x = center_x + radius * math.cos(next_angle)
            next_y = center_y + radius * math.sin(next_angle)
            draw.line([(x + 50*math.cos(angle), y + 50*math.sin(angle)),
                      (next_x - 50*math.cos(next_angle), next_y - 50*math.sin(next_angle))],
                     fill=COLOR_DARK, width=2)
    
    # Center text
    draw.text((420, 480), "Repeat", fill=COLOR_DARK)
    
    img.save(os.path.join(ASSETS_DIR, "ch8-problem-solving-cycle.png"))
    print("✓ ch8-problem-solving-cycle.png")

def create_problem_categories_image():
    """Ch8: Problem categories with icons"""
    width, height = 1200, 800
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((50, 40), "Problem Categories in Programming", fill=COLOR_DARK)
    
    categories = [
        ("Math", "Calculate, transform", COLOR_ACCENT1),
        ("Data", "Store, organize, filter", COLOR_ACCENT2),
        ("Logic", "Decide, branch, loop", COLOR_ACCENT3),
        ("Text", "Match, replace, parse", COLOR_ACCENT4),
        ("Real-World", "Combine all above", COLOR_TRUE),
    ]
    
    box_width = 200
    box_height = 220
    x_start = 60
    y_start = 150
    spacing = 40
    
    for i, (category, examples, color) in enumerate(categories):
        x = x_start + (i % 3) * (box_width + spacing)
        y = y_start + (i // 3) * (box_height + spacing + 80)
        
        # Box
        draw.rectangle([(x, y), (x+box_width, y+box_height)], 
                      outline=color, width=3, fill=(250, 250, 250))
        
        # Icon (simple shape)
        icon_y = y + 30
        if category == "Math":
            draw.text((x+40, icon_y), "π", fill=color)
        elif category == "Data":
            draw.rectangle([(x+30, icon_y), (x+70, icon_y+40)], outline=color, width=2)
        elif category == "Logic":
            draw.polygon([(x+50, icon_y), (x+70, icon_y+30), (x+30, icon_y+30)], outline=color, width=2)
        elif category == "Text":
            draw.text((x+35, icon_y), "ABC", fill=color)
        else:
            draw.ellipse([(x+25, icon_y), (x+75, icon_y+40)], outline=color, width=2)
        
        # Category name
        draw.text((x+30, y+90), category, fill=color)
        
        # Examples
        draw.text((x+10, y+130), examples, fill=COLOR_TEXT)
    
    img.save(os.path.join(ASSETS_DIR, "ch8-problem-categories.png"))
    print("✓ ch8-problem-categories.png")

def create_programming_realworld_image():
    """Ch1: Real-world programming examples"""
    width, height = 1200, 700
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((50, 40), "Programming in Real Life", fill=COLOR_DARK)
    
    examples = [
        ("Smartphones", "Apps notify, calculate, store", COLOR_ACCENT1),
        ("Games", "Graphics, physics, AI", COLOR_ACCENT2),
        ("Social Media", "Connect people, share content", COLOR_ACCENT3),
        ("Weather", "Forecast, alerts, maps", COLOR_ACCENT4),
        ("Money", "Banks, payments, crypto", COLOR_TRUE),
        ("Healthcare", "Records, diagnostics, tracking", (155, 89, 182)),
    ]
    
    box_width = 180
    box_height = 150
    x_start = 60
    y_start = 150
    spacing = 30
    
    for i, (title, desc, color) in enumerate(examples):
        x = x_start + (i % 3) * (box_width + spacing)
        y = y_start + (i // 3) * (box_height + spacing + 60)
        
        # Box
        draw.rectangle([(x, y), (x+box_width, y+box_height)], 
                      outline=color, width=2, fill=(250, 250, 250))
        
        # Title
        draw.text((x+10, y+10), title, fill=color)
        
        # Description
        draw.text((x+10, y+50), desc, fill=COLOR_TEXT)
    
    img.save(os.path.join(ASSETS_DIR, "ch1-realworld-examples.png"))
    print("✓ ch1-realworld-examples.png")

def create_programming_benefits_image():
    """Ch1: Programming benefits icons grid"""
    width, height = 1200, 700
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((50, 40), "Benefits of Learning Programming", fill=COLOR_DARK)
    
    benefits = [
        ("Problem\nSolving", "Critical thinking skills", COLOR_ACCENT1),
        ("Creativity", "Build your own ideas", COLOR_ACCENT2),
        ("Career", "In-demand skill", COLOR_ACCENT3),
        ("Automation", "Save time, reduce work", COLOR_ACCENT4),
        ("Understanding", "How tech works", COLOR_TRUE),
        ("Confidence", "Build something real", (155, 89, 182)),
    ]
    
    box_width = 170
    box_height = 170
    x_start = 60
    y_start = 150
    spacing = 40
    
    for i, (benefit, desc, color) in enumerate(benefits):
        x = x_start + (i % 3) * (box_width + spacing)
        y = y_start + (i // 3) * (box_height + spacing + 50)
        
        # Circle
        draw.ellipse([(x, y), (x+box_width, y+box_height)], 
                    outline=color, width=3, fill=(250, 250, 250))
        
        # Benefit text
        draw.text((x+15, y+35), benefit, fill=color)
        
        # Description below
        draw.text((x-20, y+box_height+10), desc, fill=COLOR_TEXT)
    
    img.save(os.path.join(ASSETS_DIR, "ch1-programming-benefits.png"))
    print("✓ ch1-programming-benefits.png")

def create_journal_benefit_icon_image():
    """Ch6: Brain icon with notebook"""
    width, height = 600, 600
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((100, 50), "Coding Journal Benefits", fill=COLOR_DARK)
    
    # Brain outline
    brain_x, brain_y = 150, 200
    draw.ellipse([(brain_x, brain_y), (brain_x+200, brain_y+200)], 
                outline=COLOR_ACCENT1, width=3, fill=(230, 245, 255))
    draw.text((brain_x+70, brain_y+85), "BRAIN", fill=COLOR_ACCENT1)
    
    # Notebook/pencil
    notebook_x, notebook_y = 350, 200
    draw.rectangle([(notebook_x, notebook_y), (notebook_x+150, notebook_y+200)], 
                  outline=COLOR_ACCENT2, width=3, fill=(255, 250, 235))
    draw.text((notebook_x+20, notebook_y+20), "NOTES", fill=COLOR_ACCENT2)
    
    # Simple lines for writing
    for i in range(4):
        draw.line([(notebook_x+20, notebook_y+60+i*30), (notebook_x+130, notebook_y+60+i*30)], 
                 fill=COLOR_TEXT, width=2)
    
    # Arrow and text
    draw.line([(brain_x+200, brain_y+100), (notebook_x, notebook_y+100)], 
             fill=COLOR_DARK, width=3)
    draw.polygon([(notebook_x, notebook_y+100), (notebook_x-15, notebook_y+90), 
                 (notebook_x-15, notebook_y+110)], fill=COLOR_DARK)
    
    # Benefits text below
    benefits_text = "Remembering\nUnderstanding\nReflecting"
    draw.text((100, 450), benefits_text, fill=COLOR_TEXT)
    
    img.save(os.path.join(ASSETS_DIR, "ch6-journal-icon.png"))
    print("✓ ch6-journal-icon.png")

def create_professional_workflow_image():
    """Ch6: Professional workflow cycle"""
    width, height = 1000, 700
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((300, 40), "Professional Work Cycle", fill=COLOR_DARK)
    
    steps = ["PLAN", "IMPLEMENT", "DOCUMENT", "REVIEW"]
    colors = [COLOR_ACCENT1, COLOR_ACCENT2, COLOR_ACCENT3, COLOR_ACCENT4]
    
    # Draw boxes in a cycle
    positions = [
        (150, 200),   # Plan
        (750, 200),   # Implement
        (750, 500),   # Document
        (150, 500),   # Review
    ]
    
    box_width = 150
    box_height = 100
    
    for i, ((x, y), step, color) in enumerate(zip(positions, steps, colors)):
        # Box
        draw.rectangle([(x, y), (x+box_width, y+box_height)], 
                      outline=color, width=3, fill=(250, 250, 250))
        
        # Step name
        draw.text((x+20, y+40), step, fill=color)
        
        # Arrow to next step
        next_i = (i + 1) % len(positions)
        next_x, next_y = positions[next_i]
        
        # Calculate arrow direction
        start_x = x + box_width
        start_y = y + box_height // 2
        end_x = next_x
        end_y = next_y + box_height // 2
        
        draw.line([(start_x, start_y), (end_x, end_y)], fill=COLOR_DARK, width=2)
        
        # Arrowhead
        if i < len(positions) - 1 or i == len(positions) - 1:
            dx = end_x - start_x
            dy = end_y - start_y
            length = (dx**2 + dy**2) ** 0.5
            if length > 0:
                dx /= length
                dy /= length
                arrow_x = end_x - 15 * dx
                arrow_y = end_y - 15 * dy
                draw.polygon([(end_x, end_y), 
                            (arrow_x - 8*dy, arrow_y + 8*dx),
                            (arrow_x + 8*dy, arrow_y - 8*dx)], fill=COLOR_DARK)
    
    # Center text
    draw.text((420, 340), "Continuous\nImprovement", fill=COLOR_TEXT)
    
    img.save(os.path.join(ASSETS_DIR, "ch6-professional-workflow.png"))
    print("✓ ch6-professional-workflow.png")

if __name__ == "__main__":
    print("\n📊 Generating Phase 3c Visual Assets...\n")
    
    # Batch 1: Core Concepts
    print("Batch 1: Truth Table & Core Concepts")
    create_truth_table_image()
    create_ifelse_breakdown_image()
    create_flowchart_symbols_image()
    create_paper_airplane_steps_image()
    
    # Batch 2: Data & Structures
    print("\nBatch 2: Data Types & Algorithm Formats")
    create_algorithm_representation_image()
    create_algorithms_importance_image()
    create_data_types_concept_map_image()
    create_variable_illustration_image()
    
    # Batch 3: Application & Benefits
    print("\nBatch 3: Loops, Applications & Benefits")
    create_while_loop_annotated_image()
    create_programming_realworld_image()
    create_programming_benefits_image()
    create_journal_benefit_icon_image()
    
    # Batch 4: Problem-Solving
    print("\nBatch 4: Problem-Solving & Workflow")
    create_problem_solving_cycle_image()
    create_problem_categories_image()
    create_professional_workflow_image()
    
    print("\n✅ All 15 visual assets generated!")
    print(f"📁 Saved to: {ASSETS_DIR}")
