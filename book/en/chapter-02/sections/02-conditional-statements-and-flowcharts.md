# Making Choices

## Understanding Conditional Statements

Conditional statements are the backbone of decision-making in programming. They allow a program to perform different actions based on whether certain conditions are true or false.

The basic conditional statement structure is:

```
IF condition THEN
    do something
ELSE
    do something else
END IF
```

Let's examine each part:

- **IF**: Signals the start of a conditional statement
- **condition**: A boolean expression that evaluates to true or false
- **THEN**: Marks what happens if the condition is true
- **do something**: The actions that occur if the condition is true
- **ELSE**: Introduces the alternative actions
- **do something else**: The actions that occur if the condition is false
- **END IF**: Signals the end of the conditional statement

## Types of Conditional Statements

### 1. Simple IF Statement

The simplest form only executes code when a condition is true:

```
IF it is raining THEN
    take an umbrella
END IF
```

In this case, nothing specific happens if it's not raining. The program simply continues to the next instructions.

### 2. IF-ELSE Statement

This form provides two paths: one for when the condition is true and another for when it's false:

```
IF temperature > 30 degrees THEN
    wear light clothing
ELSE
    wear a jacket
END IF
```

### 3. Nested IF Statements

Conditional statements can be placed inside other conditional statements to handle more complex scenarios:

```
IF it is a weekday THEN
    IF it is morning THEN
        go to school
    ELSE
        do homework
    END IF
ELSE
    relax and play
END IF
```

### 4. ELSE IF (or ELIF) Statement

When we need to check multiple conditions in sequence:

```
IF score >= 90 THEN
    grade = "A"
ELSE IF score >= 80 THEN
    grade = "B"
ELSE IF score >= 70 THEN
    grade = "C"
ELSE IF score >= 60 THEN
    grade = "D"
ELSE
    grade = "F"
END IF
```

In this example, we're checking a series of conditions in order, and only one block of code will execute.

## Introducing Flowcharts

A flowchart is a diagram that represents a process or workflow, showing the steps as boxes of different kinds, and their order by connecting them with arrows. Flowcharts are particularly useful for visualizing the logic of programs, especially those with conditional statements.

### Basic Flowchart Symbols

Here are the most common symbols used in flowcharts:

1. **Start/End (Oval or Rounded Rectangle)**
   - Used to indicate the beginning or end of a process
   - Example: "Start" or "End"

2. **Process (Rectangle)**
   - Represents a step in the process or an action to be taken
   - Example: "Add 2 cups of flour" or "Calculate total price"

3. **Decision (Diamond)**
   - Shows a point where a decision must be made
   - Typically contains a question with a yes/no or true/false answer
   - Example: "Is it raining?" or "Is x > 10?"

4. **Flow Lines (Arrows)**
   - Connect the symbols to show the sequence of steps
   - Indicate the flow direction of the process

5. **Input/Output (Parallelogram)**
   - Represents input or output operations
   - Example: "Enter your name" or "Display total"

### Creating a Simple Flowchart

Let's create a flowchart for a simple morning routine:

[VISUAL: type=flowchart, title="Flowchart Symbols Guide", size=quarter-page, description="Visual reference showing Start/End ovals, Process rectangles, Decision diamonds, and flow arrows"]

```
Start
  |
  v
Is it a weekday?
  |
  |--> Yes --> Wake up at 6:30 AM
  |              |
  |              v
  |            Eat breakfast
  |              |
  |              v
  |            Go to school/work
  |
  |--> No --> Wake up at 8:00 AM
                |
                v
              Have a leisurely breakfast
                |
                v
              Enjoy free time
                |
                v
End
```

This flowchart clearly shows the different paths our morning might take depending on whether it's a weekday or not.

## Translating Between Conditional Statements and Flowcharts

The two representations—code and flowcharts—can be readily translated into each other. For example, the morning routine in code would be:

```
IF it is a weekday THEN
    Wake up at 6:30 AM
    Eat breakfast
    Go to school/work
ELSE
    Wake up at 8:00 AM
    Have a leisurely breakfast
    Enjoy free time
END IF
```

The correspondence between the two representations is direct and intentional. Flowcharts provide a visual overview of the program logic, while code provides the detailed instructions.

## When to Use Flowcharts

Flowcharts are particularly useful when:

1. Planning a program before writing code
2. Explaining your logic to others
3. Debugging complex decision structures
4. Documenting how a program works

## Activity: Decision Making with Flowcharts

Let's practice by creating a flowchart for deciding what to do on a Saturday afternoon.

Here's a set of rules:
- If it's raining, you'll stay inside and read a book or watch a movie
- If it's not raining but very hot (over 35°C), you'll go to the swimming pool
- If it's not raining and the temperature is pleasant, you'll go to the park
- If it's not raining but cold (below 15°C), you'll visit a friend's house

Draw the flowchart for this decision process in your notebook. Make sure to use the proper symbols for start/end, decisions, and processes.

## Complex Conditions in Flowcharts

Flowcharts can also represent complex boolean conditions:

### AND Condition
When using AND, both conditions must be true to follow the "Yes" path:

```
Is it sunny?
  |
  |--> Yes --> Do I have free time?
  |              |
  |              |--> Yes --> Go to the beach
  |              |
  |              |--> No --> Stay home and look out the window
  |
  |--> No --> (next decision)
```

### OR Condition
When using OR, either condition being true is enough to follow the "Yes" path:

```
Is it raining OR snowing?
  |
  |--> Yes --> Stay indoors
  |
  |--> No --> (next decision)
```

## Nested Decisions vs. Compound Conditions

There are often multiple ways to represent the same logic. Consider these equivalent approaches:

### Approach 1: Nested Decisions
```
Is it a weekend?
  |
  |--> Yes --> Is the weather good?
  |              |
  |              |--> Yes --> Go to the park
  |              |
  |              |--> No --> Stay home
  |
  |--> No --> Stay home
```

### Approach 2: Compound Condition
```
Is it a weekend AND is the weather good?
  |
  |--> Yes --> Go to the park
  |
  |--> No --> Stay home
```

Both approaches lead to the same outcomes, but the second is more concise. As you gain experience with programming logic, you'll develop an intuition for which representation works best in different situations.

## Common Pitfalls in Conditional Logic

### 1. Forgetting Edge Cases
Always consider all possible paths through your logic. What happens in special or extreme cases?

### 2. Overlapping Conditions
Be careful when conditions can overlap. For example:

```
IF score > 90 THEN
    grade = "A"
IF score > 80 THEN
    grade = "B"
...
```

In this case, a score of 95 would first set the grade to "A", but then immediately overwrite it with "B". The correct approach is to use ELSE IF to make the conditions mutually exclusive.

### 3. Infinite Loops
When using flowcharts to represent repetitive processes (which we'll explore more in future chapters), be careful not to create paths that never end.

## Activity: Flowcharting a Real-Life Decision

Think about a significant decision you recently made or need to make (like choosing a course to study, deciding on a purchase, or planning an event).

1. List all the factors that influence the decision.
2. Determine how these factors relate to each other (using AND, OR, NOT).
3. Draw a flowchart representing the decision process.
4. Test your flowchart with different scenarios to see if it produces the expected outcomes.

For example, buying a new pair of shoes might involve factors like price, comfort, style, and need.

## Key Takeaways

- Conditional statements (IF-THEN-ELSE) allow programs to make decisions based on conditions
- There are several types of conditional statements: simple IF, IF-ELSE, nested IF, and ELSE IF
- Flowcharts are visual representations of program logic using standardized symbols
- Decisions in flowcharts are represented by diamond shapes with Yes/No paths
- Complex conditions using AND, OR, and NOT can be represented in flowcharts
- Both code and flowcharts are tools for expressing the same underlying logic

In the next section, we'll explore pseudocode—a way to write program-like instructions in a form that's easier for humans to read and write, bridging the gap between natural language and formal programming languages.
