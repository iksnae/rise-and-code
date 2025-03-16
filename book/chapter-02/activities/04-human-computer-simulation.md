# Activity: The Human Computer - Acting Out Simple Programs

## Overview
This hands-on activity transforms students into "human computers" who execute code by physically acting out the logic and flow of simple programs. By embodying the role of a computer processor, students gain a deeper understanding of how computers interpret and execute instructions, particularly conditional logic and decision-making structures.

## Learning Objectives
- Experience firsthand how computers execute instructions
- Understand the precise, literal nature of program execution
- Visualize the flow of control in programs with conditional statements
- Recognize how computers maintain and update variable values
- Develop an intuition for debugging by identifying where programs might go wrong

## Materials Needed
- Large index cards with instructions written on them (one instruction per card)
- Sticky notes or small notepads to represent variables and their values
- Masking tape to mark "execution paths" on the floor
- Optional: Props related to the program scenarios (umbrella, backpack, etc.)
- Optional: Role badges (e.g., "CPU", "Memory", "Input/Output")

## Time Required
60-90 minutes

## Preparation
Before the activity, create instruction cards for at least two simple programs. Each card should contain one instruction that corresponds to a line of pseudocode. Number the cards to show the sequence.

For example, for a "Morning Routine" program:
1. START
2. IF (it is raining) THEN go to card #3, ELSE go to card #5
3. Take umbrella
4. Go to card #6
5. Do not take umbrella
6. IF (temperature < 15°C) THEN go to card #7, ELSE go to card #9
7. Wear heavy jacket
8. Go to card #10
9. Wear light jacket
10. Walk to bus stop
11. END

## Part 1: Introduction to Being a Computer

### Step 1: Explain the Activity
Explain that in this activity, the students will become "human computers," following instructions exactly as a computer would. Emphasize that computers:
- Follow instructions step-by-step
- Cannot skip ahead or make assumptions
- Can only do exactly what they are told
- Can only make decisions based on specific conditions

### Step 2: Assign Roles
Assign different roles to students:
- "CPU" - follows instructions and makes decisions
- "Memory" - holds values of variables (using sticky notes)
- "Input" - provides information from the outside world
- "Output" - communicates results to the outside world

Rotate roles so everyone gets to experience being the CPU.

## Part 2: Basic Program Execution

### Program 1: Morning Routine

#### Setup
- Arrange the instruction cards in numerical order but spaced apart
- Mark paths on the floor with tape to show the different execution routes
- Set up variable values on sticky notes (e.g., "weather = rainy", "temperature = 10°C")
- Place appropriate props at different stations

#### Execution
1. The "CPU" student starts at card #1 (START)
2. They read each instruction aloud and perform the specified action
3. For conditional statements, they check with the "Memory" student to get the value of variables
4. Based on the condition, they follow the appropriate path to the next instruction
5. If the instruction updates a variable, the "Memory" student updates the sticky note
6. The "Output" student records or announces any output actions
7. Continue until reaching the END card

#### Discussion
After completing the program:
- What was it like to follow instructions exactly?
- Were there any ambiguous instructions? How did you resolve them?
- How did the path change when you changed the variable values?

## Part 3: More Complex Programs

### Program 2: Testing Eligibility

Create a more complex program that determines if someone is eligible for a specific activity based on multiple conditions:

1. START
2. SET eligible = false
3. GET age
4. IF age >= 13 THEN go to card #5, ELSE go to card #11
5. GET has_permission
6. IF has_permission == true THEN go to card #7, ELSE go to card #11
7. GET skill_level
8. IF skill_level == "beginner" THEN go to card #9
9. SET eligible = true
10. Go to card #11
11. IF eligible == true THEN go to card #12, ELSE go to card #14
12. DISPLAY "You can join the intermediate class"
13. Go to card #15
14. DISPLAY "Sorry, you cannot join this class"
15. END

#### Variables to Track
- age (e.g., 10, 15)
- has_permission (true/false)
- skill_level ("beginner", "intermediate", "advanced")
- eligible (true/false)

#### Execution
Run this program multiple times with different input values to see how the outcome changes.

## Part 4: Debugging Simulation

### Step 1: Introduce Bugs
Create a version of one of the previous programs with intentional "bugs" such as:
- Missing instructions
- Incorrect condition checks
- Infinite loops (paths that never reach the END)

### Step 2: Debug as a Group
Have students execute the program and identify where things go wrong.

### Step 3: Fix the Bugs
Discuss how to fix each bug and modify the instruction cards accordingly.

## Part 5: Creating Your Own Programs

### Step 1: Group Design
Divide students into small groups and have each group design a simple program that:
- Uses at least two variables
- Includes at least two decision points (IF statements)
- Has a clear beginning and end
- Relates to a real-life scenario

### Step 2: Create Instruction Cards
Each group creates instruction cards for their program.

### Step 3: Execute Each Other's Programs
Groups exchange programs and act them out.

### Step 4: Feedback
Groups provide feedback on each other's programs:
- Was the program clear to follow?
- Were there any ambiguous instructions?
- Were there any bugs or logical errors?
- How could the program be improved?

## Extension Activities

### 1. Add Loops
Introduce simple loop structures (WHILE or FOR loops) into your programs. Mark a "loop back" path on the floor.

### 2. Multiple Execution Paths
Run the same program with different input values and use different colored tape to mark each execution path, creating a visual map of all possible paths through the program.

### 3. Concurrent Execution
Simulate multiple "CPUs" executing different parts of a program simultaneously, and discuss the challenges of coordination.

## Reflection Questions

In your notebook, answer these questions:
1. How did it feel to be a "human computer"? What was challenging about it?
2. How did tracing through the programs help you understand conditional logic?
3. Were you surprised by any of the execution paths or results?
4. How might this experience help you when writing your own programs in the future?
5. In what ways do you think actual computers differ from our "human computer" simulation?

## Connection to Programming

The step-by-step execution process you experienced mirrors how actual computers process code. When you eventually program on a computer, this understanding will help you:
- Write clearer, more precise instructions
- Predict how your program will behave with different inputs
- Debug problems by mentally tracing through execution
- Understand how the computer maintains state through variables

This simulation also demonstrates why computers need such precise instructions—they can only follow exactly what they're told, without the human ability to infer, assume, or understand context.
