# Activity: Truth Tables and Logic Puzzles

## Overview
This activity provides hands-on practice with boolean logic using truth tables and logic puzzles. By working through these exercises, you'll develop your understanding of how logical operators (AND, OR, NOT) work and how they can be combined to express complex conditions.

## Learning Objectives
- Create and interpret truth tables for basic logical operations
- Evaluate complex logical expressions
- Translate everyday scenarios into logical expressions
- Identify patterns in logical operations
- Develop logical reasoning skills essential for programming

## Materials Needed
- Your notebook
- Pencil (and eraser)
- Optional: Ruler for drawing tables

## Time Required
45-60 minutes

## Part 1: Creating Basic Truth Tables

### Step 1: Set Up Truth Tables for Basic Operations
In your notebook, create three separate truth tables for the basic logical operations: AND, OR, and NOT.

For AND and OR, set up your tables with three columns:
- A
- B
- Result (A AND B) or (A OR B)

For NOT, you'll need only two columns:
- A
- Result (NOT A)

### Step 2: Fill in the Truth Values
Fill in all possible combinations of TRUE and FALSE values for each table and determine the results based on the rules:

- AND: Returns TRUE only when both inputs are TRUE
- OR: Returns TRUE when at least one input is TRUE
- NOT: Returns the opposite of the input value

### Example:
For the AND operation, your completed table should look like this:

| A     | B     | A AND B |
|-------|-------|---------|
| TRUE  | TRUE  | TRUE    |
| TRUE  | FALSE | FALSE   |
| FALSE | TRUE  | FALSE   |
| FALSE | FALSE | FALSE   |

## Part 2: Compound Logic Expressions

Now let's practice with more complex expressions that combine multiple operators.

### Step 1: Set Up Truth Tables for Compound Expressions
Create truth tables for each of the following expressions:

1. (A AND B) OR C
2. A AND (B OR C)
3. NOT (A AND B)
4. (NOT A) OR (NOT B)

For each expression, your table will need four columns:
- A
- B
- C
- Result

### Step 2: Fill in All Possible Combinations
Each table will have 8 rows (2³ = 8 possible combinations with three variables).

### Step 3: Evaluate Step by Step
For each expression, work through the logic step by step. For example, for "(A AND B) OR C":
1. First calculate (A AND B)
2. Then calculate the final result: (A AND B) OR C

### Example:
For the expression (A AND B) OR C, the first few rows might look like:

| A     | B     | C     | (A AND B) | (A AND B) OR C |
|-------|-------|-------|-----------|----------------|
| TRUE  | TRUE  | TRUE  | TRUE      | TRUE           |
| TRUE  | TRUE  | FALSE | TRUE      | TRUE           |
| TRUE  | FALSE | TRUE  | FALSE     | TRUE           |
| ...   | ...   | ...   | ...       | ...            |

You can create an intermediate column as shown to help with calculations, or just work it out step by step in your mind.

## Part 3: Logical Equivalences

Some different logical expressions can be equivalent—they always produce the same results for the same inputs.

### Step 1: Compare Your Truth Tables
Look at your completed truth tables for expressions 3 and 4:
- NOT (A AND B)
- (NOT A) OR (NOT B)

Compare the results columns. Are they the same for all input combinations?

### Step 2: Discover De Morgan's Laws
What you've just verified is one of De Morgan's Laws, an important principle in logic:
- NOT (A AND B) is equivalent to (NOT A) OR (NOT B)

The other De Morgan's Law states:
- NOT (A OR B) is equivalent to (NOT A) AND (NOT B)

### Step 3: Verify the Second Law
Create truth tables to verify the second De Morgan's Law.

## Part 4: Logic Puzzles

Now let's apply boolean logic to solve some puzzles!

### Puzzle 1: Detecting Lies
Three people (Ali, Bo, and Cal) each make a statement, but you know that only one of them is telling the truth.

- Ali says: "I am telling the truth."
- Bo says: "Ali is lying."
- Cal says: "Bo is lying."

Who is telling the truth?

To solve this, create a truth table with all possibilities (each person either tells truth T or lies L), and check which scenario matches the condition that exactly one person tells the truth.

### Puzzle 2: The Light Switches
You're in a room with three light switches, each connected to a different light bulb in another room. You can't see the light bulbs from where the switches are, and you can only go to the other room once to check the bulbs.

How can you determine which switch controls which bulb?

Think about this puzzle in terms of the states (ON/OFF) and what information you can gather with just one visit to the other room.

### Puzzle 3: Logical Deduction
Based on these clues, determine who has which pet:
- There are three friends: Xia, Yoon, and Zach
- They each have one pet: a dog, a cat, or a bird
- Xia does not have the bird
- If Yoon has the cat, then Zach has the bird
- If Zach doesn't have the dog, then Xia has the dog

Create a table to track possibilities and use boolean logic to narrow down the answer.

## Part 5: Real-World Applications

### Application 1: Eligibility Criteria
A scholarship has the following eligibility requirements:
- Student must have a GPA of at least 3.5 OR
- Student must have completed at least 30 hours of community service AND have a GPA of at least 3.0

Write this as a logical expression using variables:
- Let G = "GPA is at least 3.5"
- Let H = "Completed at least 30 hours of community service"
- Let M = "GPA is at least 3.0"

Then create a truth table to show all combinations of these variables and whether each combination would qualify for the scholarship.

### Application 2: Menu Customization
A restaurant's ordering system uses logic to determine meal combinations:
- Every meal comes with either rice OR potatoes (but not both)
- If you choose the fish entrée, you must have vegetables
- If you choose vegetables, you can have either sauce A OR sauce B (but not both)

Create variables for each choice and write logical expressions for valid meal combinations.

## Extension Activities

### 1. Create Your Own Logic Puzzle
Design a logic puzzle similar to those in Part 4, and provide its solution. Exchange puzzles with classmates if possible.

### 2. Explore NAND and NOR
Research two additional logic operations: NAND (NOT AND) and NOR (NOT OR). Create their truth tables and explore how any logical expression can be constructed using only NAND operations or only NOR operations.

### 3. Venn Diagrams
Draw Venn diagrams to represent AND, OR, and NOT operations visually. Then use Venn diagrams to illustrate the compound expressions from Part 2.

## Reflection Questions

In your notebook, answer these questions:
1. Which logical operation (AND, OR, NOT) was easiest for you to understand? Which was most challenging?
2. How does De Morgan's Law help simplify complex logical expressions?
3. How might you use boolean logic in your everyday decision-making?
4. What patterns did you notice in the truth tables you created?
5. How do you think computers use these logical operations to make decisions?

## Connection to Programming

The boolean logic you've practiced in this activity forms the foundation of decision-making in programming. Every conditional statement (IF-THEN-ELSE) relies on evaluating logical expressions. Understanding these principles will help you write clear, effective code and debug logical errors in your programs when you eventually start coding on a computer.
