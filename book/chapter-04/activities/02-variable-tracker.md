# Activity: Variable Tracker - Following the Data

## Overview
This activity helps you understand how variables store and change data during program execution. By tracing the values of variables step-by-step, you'll develop a clearer mental model of how programs track and manipulate information over time.

## Learning Objectives
- Visualize variables as containers that hold and change data
- Trace the flow of data through a series of operations
- Understand how variable values change during program execution
- Practice predicting the outcomes of data manipulations
- Develop debugging skills by identifying errors in variable usage

## Materials Needed
- Your notebook
- Pencil and eraser
- Optional: colored pencils or markers
- Optional: index cards or small pieces of paper

## Time Required
40-60 minutes

## Instructions

### Part 1: Creating a Variable Tracking System

First, let's set up a tracking system in your notebook to follow how variables change over time:

1. Draw a table with these columns:
   - Step Number
   - Code Operation
   - Variable Name(s)
   - Variable Value(s)
   - Notes/Explanation

2. Alternatively, you can create "variable boxes" on your page:
   - Draw labeled boxes for each variable
   - Leave space below to show how values change at each step
   - Use arrows to show data flow between variables

Choose the system that works best for your learning style. You'll use this to track variables through the exercises.

### Part 2: Basic Variable Tracking

For each of these code snippets, trace how the variables change at each step. Record the values in your tracking system:

#### Example 1: Simple Assignment
```
1. SET x = 5
2. SET y = 10
3. SET z = x + y
4. SET x = z - y
```

#### Example 2: Multiple Updates
```
1. SET counter = 0
2. SET counter = counter + 1
3. SET counter = counter + 2
4. SET counter = counter * 2
5. SET counter = counter - 1
```

#### Example 3: Text Manipulation
```
1. SET first_name = "Maria"
2. SET last_name = "Chen"
3. SET full_name = first_name + " " + last_name
4. SET greeting = "Hello, " + full_name + "!"
5. SET initials = first_name[0] + last_name[0]
```

### Part 3: Physical Variable Simulation

This exercise helps visualize variables using physical objects:

1. Get 5-10 small pieces of paper or index cards
2. Label each card with a variable name (e.g., "score", "name", "is_valid")
3. Use a pencil to write the current value inside each variable "container"
4. Now work through this scenario, erasing and updating values as needed:

```
1. SET score = 0
2. SET player_name = "Player 1"
3. SET is_active = true
4. SET score = score + 10
5. SET level = 1
6. SET score = score * level
7. SET level = level + 1
8. SET score = score * level
9. SET is_active = false
10. SET player_name = "Player 2"
11. SET is_active = true
12. SET score = 5
```

As you update each variable, announce what's happening out loud: "Now score starts at 0... now score changes to 10..."

### Part 4: Variable Challenge Scenarios

For each of these scenarios, trace the variables through each step. These are more complex, so take your time and follow carefully:

#### Scenario 1: Temperature Conversion
```
1. SET celsius = 25
2. SET conversion_factor = 9/5
3. SET adjustment = 32
4. SET fahrenheit = (celsius * conversion_factor) + adjustment
5. SET kelvin = celsius + 273.15
6. SET celsius = 30
7. SET fahrenheit = (celsius * conversion_factor) + adjustment
```

#### Scenario 2: Shopping Cart
```
1. SET item_price = 20
2. SET quantity = 3
3. SET subtotal = item_price * quantity
4. SET tax_rate = 0.08
5. SET tax_amount = subtotal * tax_rate
6. SET total = subtotal + tax_amount
7. SET discount = 10
8. SET total = total - discount
9. SET quantity = 4
10. SET subtotal = item_price * quantity
11. SET tax_amount = subtotal * tax_rate
12. SET total = subtotal + tax_amount - discount
```

#### Scenario 3: String Processing
```
1. SET message = "Hello, World!"
2. SET character_count = LENGTH(message)
3. SET first_five = SUBSTRING(message, 0, 5)
4. SET remainder = SUBSTRING(message, 7, 5)
5. SET new_message = first_five + " " + remainder
6. SET uppercase_message = UPPERCASE(new_message)
7. SET character_count = LENGTH(uppercase_message)
```

### Part 5: Variable Debugging Challenges

For each of these code snippets, there's a problem with how variables are used. Trace the execution, identify the issue, and propose a fix:

#### Debug Challenge 1:
```
1. SET total = 0
2. SET price = 25
3. SET total = price + tax
4. SET tax = price * 0.05
5. DISPLAY total
```

#### Debug Challenge 2:
```
1. SET first_name = "Alex"
2. SET greeting = "Hello, " + full_name + "!"
3. SET last_name = "Johnson"
4. SET full_name = first_name + " " + last_name
5. DISPLAY greeting
```

#### Debug Challenge 3:
```
1. SET x = 5
2. SET y = x + 2
3. SET x = 10
4. SET z = x + y
5. DISPLAY "x + y = " + z
```

### Part 6: Create Your Own Variable Sequence

Now it's your turn to create a sequence:

1. Write a short series of 5-10 operations involving at least 3 different variables
2. Trace through your sequence to determine the final values
3. Exchange with a partner (if possible) to trace each other's sequences
4. Compare results and discuss any differences

## Example Tracking Table

Here's how you might track variables for the first basic example:

| Step | Code Operation | Variable(s) | Value(s) | Notes |
|------|---------------|------------|----------|-------|
| 1 | SET x = 5 | x | 5 | Initialize x with value 5 |
| 2 | SET y = 10 | x, y | 5, 10 | y is created with value 10 |
| 3 | SET z = x + y | x, y, z | 5, 10, 15 | z gets the sum of x and y |
| 4 | SET x = z - y | x, y, z | 5, 10, 15 | x remains 5 because 15 - 10 = 5 |

## Example Variable Boxes

For the same example, using variable boxes:

```
x [5] → x [5] → x [5] → x [5]
                               
           y [10] → y [10] → y [10]
                               
                      z [15] → z [15]
                               
Step 1     Step 2     Step 3     Step 4
```

## Reflection Questions

After completing the activities, reflect on these questions:

1. How did tracking variables help you understand the flow of data in the programs?
2. What patterns did you notice about how variables change during program execution?
3. Which variable operations seemed most confusing to trace? Why?
4. How might you use variable tracking to find errors in programs?
5. How are variables in programming similar to or different from variables in mathematics?
6. What strategies helped you keep track of multiple variables changing over time?

## Extension Activities

1. **Predict and Verify**: Have someone give you a sequence of operations. Predict the final variable values without writing them down, then verify by tracking them formally.

2. **Real-World Analogy**: Create a real-world analogy for how variables work (e.g., mailboxes, containers, etc.) and explain how the analogy captures the key aspects of variables.

3. **Visual Story**: Create a comic strip or storyboard that illustrates the "life" of a variable from creation through multiple value changes.

4. **Algorithm Design**: Design a simple algorithm (like calculating an average or finding the largest of three numbers) and trace how the variables would change during execution.

## Connection to Programming

When you eventually write programs on a computer, variables will be fundamental to storing and manipulating data. The mental model you're developing now—of how variables are created, updated, and used in calculations—is exactly how variables work in actual programming.

Debugging—finding and fixing errors in code—often involves carefully tracing how variables change during execution to identify where things went wrong, just as you did in Part 5.

## Key Takeaways

- Variables are like containers that store data values
- The value of a variable can change during program execution
- Variables can depend on other variables
- The order of operations matters when working with variables
- Tracking variables helps visualize how data flows through a program
- Careful variable tracking is an essential debugging skill
- When a variable's value changes, its previous value is replaced completely
