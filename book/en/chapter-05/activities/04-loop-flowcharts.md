# Activity: Loop Flowcharts - Mapping Repetition

## Overview
This activity focuses on visualizing loops through flowcharts. By creating flowcharts for various loop structures, you'll develop a clearer understanding of loop execution flow, decision points, and iterations. Flowcharts serve as powerful visual tools for planning and analyzing loops before implementing them.

## Learning Objectives
- Create flowcharts that accurately represent different loop structures
- Visualize the flow of control and decision points in loops
- Trace the execution path through a loop flowchart
- Translate pseudocode loops into flowcharts and vice versa
- Develop visual planning skills for loop-based algorithms

## Materials Needed
- Your notebook or blank paper
- Pencil and eraser
- Ruler (recommended for straight lines)
- Colored pencils or markers (optional)
- Flowchart symbol templates (provided below)

## Time Required
40-60 minutes

## Instructions

### Part 1: Flowchart Symbols and Conventions

Before creating loop flowcharts, review these standard flowchart symbols:

1. **Start/End** (Oval)
   - Used to indicate the beginning or end of a process

2. **Process** (Rectangle)
   - Used for computation or data manipulation steps

3. **Decision** (Diamond)
   - Used for conditions where flow can take different paths
   - Typically has two exit paths labeled "Yes/No" or "True/False"

4. **Input/Output** (Parallelogram)
   - Used for operations that input or output data

5. **Flow Lines** (Arrows)
   - Connect symbols to show the sequence of operations
   - Should include arrowheads to indicate direction

6. **Loop-Back Connector**
   - An arrow that goes back to a previous point in the flowchart
   - Creates the repetition in loop flowcharts

In your notebook, create a reference sheet with these symbols.

### Part 2: Basic Loop Flowchart Structures

Now, create flowcharts for the main loop types:

#### 1. WHILE Loop Flowchart

Create a flowchart for this pseudocode:
```
SET counter = 1
WHILE counter <= 5
    PRINT counter
    SET counter = counter + 1
END WHILE
```

Your flowchart should include:
- Initialization (setting counter to 1)
- Condition check (counter <= 5)
- Loop body (printing counter)
- Update step (incrementing counter)
- Loop-back connection to the condition
- Exit path when condition becomes false

#### 2. FOR Loop Flowchart

Create a flowchart for this pseudocode:
```
FOR i = 1 TO 5
    PRINT i * i
END FOR
```

Your flowchart should show:
- Initialization of the loop variable
- Condition check (is i <= 5?)
- Loop body (calculating and printing i * i)
- Update step (incrementing i)
- Loop-back connection
- Exit path when the loop completes

#### 3. FOR EACH Loop Flowchart

Create a flowchart for this pseudocode:
```
SET fruits = ["apple", "banana", "orange"]
FOR EACH fruit IN fruits
    PRINT "I like " + fruit
END FOR
```

Your flowchart should illustrate:
- Collection initialization
- How the loop moves through each item
- Processing each item
- Determining when all items have been processed

### Part 3: Tracing Loop Execution

For each flowchart you've created:

1. Add a space beside the flowchart for tracking variables

2. Trace through the execution by:
   - Writing the initial values of all variables
   - Following the flow path with your finger or pencil
   - Recording how variables change at each step
   - Noting the output at each iteration
   - Continuing until the loop terminates

3. Verify your trace by checking that:
   - Variables change as expected
   - The correct number of iterations occur
   - The loop exits at the right time

### Part 4: Flowcharting Complex Loops

Now, create flowcharts for these more complex loop scenarios:

#### 1. Nested Loops

Create a flowchart for this pseudocode:
```
FOR i = 1 TO 3
    FOR j = 1 TO 2
        PRINT i * j
    END FOR
END FOR
```

Your flowchart should clearly show:
- The outer loop structure
- The inner loop structure
- How the inner loop completes all iterations for each outer loop iteration
- The update of both loop variables

#### 2. Condition-Controlled Loop

Create a flowchart for this pseudocode:
```
SET number = 1
SET sum = 0
WHILE sum < 50
    SET sum = sum + number
    SET number = number + 2
END WHILE
```

Your flowchart should show:
- Initialization of variables
- Condition check (sum < 50)
- Loop body operations
- Variable updates
- How the loop eventually terminates

#### 3. Loop with Early Exit

Create a flowchart for this pseudocode:
```
SET found = false
SET position = 0
SET target = 7
SET numbers = [4, 2, 7, 9, 5]

WHILE position < LENGTH(numbers) AND NOT found
    IF numbers[position] == target THEN
        SET found = true
    ELSE
        SET position = position + 1
    END IF
END WHILE
```

Your flowchart should capture:
- The dual condition check
- The decision inside the loop body
- How the early exit works when the target is found

### Part 5: Converting Between Flowcharts and Pseudocode

Practice converting in both directions:

1. **Flowchart to Pseudocode**:
   - Choose one of the complex flowcharts you created
   - Write pseudocode that corresponds to the flowchart
   - Check that your pseudocode correctly implements all the logic shown in the flowchart

2. **Pseudocode to Flowchart**:
   - Create a flowchart for this accumulator pattern:
   ```
   SET sum = 0
   SET count = 0
   SET average = 0
   
   WHILE NOT done
       DISPLAY "Enter a number (or -1 to finish):"
       INPUT number
       
       IF number == -1 THEN
           SET done = true
       ELSE
           SET sum = sum + number
           SET count = count + 1
       END IF
   END WHILE
   
   IF count > 0 THEN
       SET average = sum / count
       DISPLAY "The average is: " + average
   ELSE
       DISPLAY "No numbers were entered."
   END IF
   ```

### Part 6: Loop Flowchart Analysis

For each of these scenarios, create a flowchart and answer the analysis questions:

#### Scenario 1: Finding the Largest Value

```
SET numbers = [12, 5, 19, 8, 15]
SET largest = numbers[0]
FOR i = 1 TO LENGTH(numbers) - 1
    IF numbers[i] > largest THEN
        SET largest = numbers[i]
    END IF
END FOR
```

Analysis Questions:
- How many times does the loop body execute?
- When does the value of `largest` change?
- What would happen if the array were empty?

#### Scenario 2: Guessing Game

```
SET secret_number = 42
SET guessed_correctly = false
SET attempts = 0

WHILE NOT guessed_correctly AND attempts < 5
    DISPLAY "Guess the number (1-100):"
    INPUT guess
    SET attempts = attempts + 1
    
    IF guess == secret_number THEN
        SET guessed_correctly = true
        DISPLAY "Correct! You found it in " + attempts + " attempts."
    ELIF attempts == 5 THEN
        DISPLAY "Sorry, you've used all your attempts. The number was " + secret_number
    ELIF guess < secret_number THEN
        DISPLAY "Too low. Try again."
    ELSE
        DISPLAY "Too high. Try again."
    END IF
END WHILE
```

Analysis Questions:
- What are the possible ways this loop can terminate?
- What is the minimum and maximum number of iterations possible?
- How could you optimize this flowchart?

### Part 7: Creating Your Own Loop Flowchart

Design a flowchart for an original loop-based algorithm that solves a real-world problem. Your algorithm should:

1. Include at least one loop
2. Use variables that change across iterations
3. Have clear start and end points
4. Produce a useful result

Create both the flowchart and matching pseudocode, then explain how your algorithm works and what problem it solves.

## Example Flowchart

Here's an example of a simple WHILE loop flowchart for counting from 1 to 5:

```
    ┌─────────┐
    │  Start  │
    └────┬────┘
         │
         ▼
┌─────────────────┐
│ SET counter = 1 │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ Is counter <= 5?    │
└────┬──────────┬─────┘
     │          │
    Yes         No
     │          │
     ▼          ▼
┌────────────┐  ┌─────┐
│Print counter│  │ End │
└────┬───────┘  └─────┘
     │
     ▼
┌───────────────────────┐
│ SET counter = counter + 1 │
└────────────┬──────────────┘
             │
             └───────────────┐
                             │
                             ▼
                   (back to condition check)
```

## Flowchart Templates

You can use these simplified templates to help draw your flowcharts:

```
Start/End (Oval):
  .--------.
 /          \
(            )
 \          /
  '--------'

Process (Rectangle):
  .-----------.
  |           |
  |           |
  '-----------'

Decision (Diamond):
      .---.
     /     \
    /       \
   <         >
    \       /
     \     /
      '---'

Input/Output (Parallelogram):
  .-----------.
 /             \
/               \
'--------------'

Flow Lines:
  ------->

Loop Back:
  <-------
```

## Reflection Questions

After completing the activities, reflect on these questions:

1. How do flowcharts help visualize the repetitive nature of loops?
2. Which was more challenging: creating flowcharts from pseudocode or pseudocode from flowcharts?
3. What patterns did you notice in the flowcharts for different types of loops?
4. How might flowcharts help identify and fix problems in loop logic?
5. How could you use flowcharts to explain loops to someone who has never programmed before?
6. What was the most difficult part of creating flowcharts for nested loops?

## Extension Activities

1. **Flowchart Optimization**: Take one of your complex flowcharts and redesign it to use fewer steps or a different loop structure while achieving the same result.

2. **Comparative Flowcharting**: Create flowcharts for the same problem using different loop types (WHILE vs. FOR) and compare them.

3. **Real-World Flowcharts**: Find a repetitive process in your community (like a manufacturing process, agricultural cycle, or classroom routine) and create a flowchart representing it.

4. **Animated Flowchart**: Create a simple "animation" of your flowchart by drawing multiple versions showing the state at different points in execution.

## Connection to Programming

Flowcharts are widely used in software development for:

- Planning algorithms before writing code
- Documenting how existing programs work
- Communicating program logic to team members
- Debugging complex control flow issues
- Teaching programming concepts

The skills you're developing here—visualizing program flow, tracing execution, and analyzing loop behavior—directly transfer to actual programming on computers.

## Key Takeaways

- Flowcharts provide a visual representation of loops and program flow
- Different loop types have characteristic flowchart patterns
- Tracing through a flowchart helps predict program behavior
- Converting between flowcharts and pseudocode reinforces understanding of loop logic
- Flowcharts are valuable tools for planning, analyzing, and debugging loop structures
- Visual representation of loops helps identify opportunities for optimization
