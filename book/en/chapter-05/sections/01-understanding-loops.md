# Understanding Loops

## Introduction

Welcome, **Patterns**! Time to learn the magic of repetition. 🔁

Imagine teaching someone to wash dishes. Would you say: "Wash plate 1, dry plate 1, wash plate 2, dry plate 2..." for 50 plates? No! You'd say: "For each dirty dish: wash it and dry it."

That's a loop—instructions that repeat until they're done. Loops let computers do repetitive work incredibly fast, doing in seconds what would take humans hours.

## What is a Loop?

A loop is a set of instructions that repeats until a condition is met. Instead of writing the same thing over and over, write it once and tell the computer to repeat it.

Loops say:
- "Do this task 10 times"
- "Keep doing this until done"
- "For each item in this list, do this"

## Why Loops Matter

Loops are powerful because they:

1. **Save work**: Write once, run many times
2. **Scale**: Same loop works for 5 items or 5 million
3. **Easy to fix**: Change it once, it works everywhere
4. **Clear**: Separate the action from the repetition
5. **Natural**: Many problems need repetition

## Three Types of Loops

### 1. Count Loop (For) 🔢

Repeat a specific number of times.

```
FOR count = 1 TO 5
    Print "Hello"
END FOR
```

Prints "Hello" 5 times.

### 2. Condition Loop (While) ⏳

Repeat while something is true.

```
number = 1
WHILE number < 6
    Print number
    SET number = number + 1
END WHILE
```

Prints 1, 2, 3, 4, 5.

### 3. Collection Loop (For Each) 📦

Process each item in a list.

```
fruits = ["apple", "banana", "orange"]
FOR EACH fruit IN fruits
    Print "I like " + fruit
END FOR
```

Prints:
- I like apple
- I like banana
- I like orange

## Loop Parts

Every loop has four pieces:

1. **Setup**: Starting conditions (counter = 1)
2. **Check**: Test to keep or stop (counter <= 5?)
3. **Do**: Instructions to repeat
4. **Update**: Change for next time (counter = counter + 1)

```
SET counter = 1              # Setup
WHILE counter <= 5           # Check
    Print "Count: " + counter  # Do
    SET counter = counter + 1  # Update
END WHILE
```

This counts 1 to 5.

## Loop Variables and Iterations

A loop variable tracks progress. Each full run through is an **iteration**.

Example trace:
| Iteration | Value Start | Check | Do | Value After |
|---|---|---|---|---|
| 1 | 1 | 1≤5? Yes | Print "1" | 2 |
| 2 | 2 | 2≤5? Yes | Print "2" | 3 |
| 3 | 3 | 3≤5? Yes | Print "3" | 4 |
| 4 | 4 | 4≤5? Yes | Print "4" | 5 |
| 5 | 5 | 5≤5? Yes | Print "5" | 6 |
| 6 | 6 | 6≤5? No | Stop | - |

Tracing helps you predict what will happen.

## Infinite Loops ⚠️

**Oops!** A loop that never stops.

```
counter = 1
WHILE counter > 0
    Print "Never stops!"
    SET counter = counter + 1
END WHILE
```

Counter keeps growing. Always > 0. Never ends!

**How to prevent**:
1. Make sure condition can become false
2. Update moves toward the condition being false
3. Don't accidentally change loop variables inside

## Nested Loops (Loops in Loops) 🎯

Loops inside loops. Inner loop runs fully for each outer loop iteration.

```
FOR i = 1 TO 3
    FOR j = 1 TO 3
        Print i + " × " + j
    END FOR
END FOR
```

Prints: 1×1, 1×2, 1×3, 2×1, 2×2, 2×3, 3×1, 3×2, 3×3

Powerful but tricky. Trace carefully.

## Loops Everywhere 🌍

Real-world loops:
- Washing dishes: each dish gets washed, rinsed, dried
- Attendance: check each student
- Making necklaces: string beads until done
- Planting: seeds in each row
- Music: repeat the chorus

Spot loops in everyday life to understand programming!

## Activity: Find the Loops! 🔍

List 5 repetitive things you do. For each:
- What repeats? (the body)
- When does it stop? (condition)
- What changes? (variables)

**Example**: Brushing teeth
- **Repeats**: Brush teeth, rinse, spit
- **Stops**: When all teeth are clean (or timer ends)
- **Changes**: Position of brush, how many teeth left

**See Activity Sheet 5A!**

## Key Takeaways ✨

- Loops repeat actions—huge timesaver
- Three types: count loops, condition loops, collection loops
- Every loop: setup, check, do, update
- Loop variables track where you are
- Infinite loops are the common mistake—avoid them!
- Nested loops run inside each other
- Loops are in everyday life—recognize them!

**Next**: Designing loops for specific tasks!
