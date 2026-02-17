# Visual Reference Guides

## Quick Reference Cheat Sheets

This section contains visual summaries and quick reference guides for the key programming concepts covered in this book. Print these pages and keep them handy for quick lookup!

---

## 1. Flowchart Symbols Quick Guide

### Standard Flowchart Symbols

```
┌─────────────┐
│   START     │  Oval/Ellipse: Start or End point
└──────┬──────┘

┌─────────────────┐
│   PROCESS       │  Rectangle: Action/Process
│  (do something) │
└────────┬────────┘

  ◇ ─ ◇ ◇  Diamond: Decision/Question
 ◇     ◇   (requires YES/NO answer)
  ◇ ─ ◇ ◇

┌──────────────┐
│   INPUT/     │  Parallelogram: Input or Output
│   OUTPUT     │
└──────┬───────┘

      ↓         Arrow: Flow direction
      →         (shows what happens next)
```

### Complete Flowchart Example

```
       ┌─────────────┐
       │   START     │
       └──────┬──────┘
              │
              ▼
       ┌──────────────────┐
       │ INPUT: number    │
       └──────┬───────────┘
              │
              ▼
         ◇ ─ ◇ ◇  Is number
        ◇     ◇    positive?
         ◇ ─ ◇ ◇
        /         \
      YES          NO
      /             \
     ▼               ▼
  ┌──────────┐   ┌──────────────────┐
  │ DISPLAY: │   │ DISPLAY:         │
  │ "Positive"   │ "Not positive"   │
  └─────┬────┘   └─────┬────────────┘
        │              │
        └──────┬───────┘
               ▼
        ┌────────────┐
        │    END     │
        └────────────┘
```

---

## 2. Boolean Logic Reference

### Logic Operators Truth Tables

**AND Operator** (both must be true)
```
A     B     A AND B
T     T     T
T     F     F
F     T     F
F     F     F

For AND: Result is TRUE only when BOTH inputs are TRUE
```

**OR Operator** (at least one must be true)
```
A     B     A OR B
T     T     T
T     F     T
F     T     T
F     F     F

For OR: Result is TRUE if AT LEAST ONE input is TRUE
```

**NOT Operator** (reverses the value)
```
A     NOT A
T     F
F     T

For NOT: Result is the opposite of the input
```

### Complex Expression Examples

```
(A AND B) OR C
─────────────
AND is evaluated first (higher priority)
THEN OR is applied to the result

Example: Is it warm AND sunny? OR Is it warm?
If: Warm=T, Sunny=T, Answer=T
If: Warm=T, Sunny=F, Answer=T (because warm is still true)
If: Warm=F, Sunny=T, Answer=F
```

---

## 3. Loop Structure Reference

### For Loop Pattern

```
FOR i = START TO END [STEP increment]
    BODY
    (code repeats here)
END FOR

Key Points:
• i is the counter variable
• Starts at START value
• Increments by STEP (default 1)
• Continues while i ≤ END
```

**Example: Count 1 to 5**
```
FOR i = 1 TO 5
    DISPLAY i
END FOR

Output: 1 2 3 4 5
```

**Example: Count backwards 5 to 1**
```
FOR i = 5 DOWN TO 1
    DISPLAY i
END FOR

Output: 5 4 3 2 1
```

### While Loop Pattern

```
WHILE condition is TRUE
    BODY
    (code repeats here)
END WHILE

Key Points:
• Condition is checked BEFORE each iteration
• Loop continues while condition is TRUE
• Loop stops when condition becomes FALSE
```

**Example: Keep asking until valid**
```
INPUT x
WHILE x < 0
    DISPLAY "Must be positive, try again"
    INPUT x
END WHILE
```

### Do-While Loop Pattern

```
DO
    BODY
    (code repeats here)
WHILE condition is TRUE

Key Points:
• Code runs FIRST
• THEN condition is checked
• Loop continues while condition is TRUE
• Runs at least once
```

---

## 4. Data Types Reference Chart

### Common Data Types

```
┌──────────────┬──────────────┬──────────────────┐
│ Data Type    │ Description  │ Examples         │
├──────────────┼──────────────┼──────────────────┤
│ Integer      │ Whole number │ 42, -5, 0        │
├──────────────┼──────────────┼──────────────────┤
│ Float        │ Decimal      │ 3.14, -0.5, 9.0  │
├──────────────┼──────────────┼──────────────────┤
│ String       │ Text         │ "Hello", "123"   │
├──────────────┼──────────────┼──────────────────┤
│ Boolean      │ True/False   │ true, false      │
├──────────────┼──────────────┼──────────────────┤
│ Array        │ Collection   │ [1,2,3]          │
├──────────────┼──────────────┼──────────────────┤
│ Dictionary   │ Key-Value    │ name: "Alice"    │
└──────────────┴──────────────┴──────────────────┘

Use this chart to identify which type fits your data!
```

### Type Conversion Examples

```
String → Integer:
"42" becomes 42 (the text becomes a number)

Integer → String:
42 becomes "42" (the number becomes text)

Boolean → Integer:
TRUE might become 1, FALSE might become 0

Integer → Float:
5 becomes 5.0
```

---

## 5. Comparison Operators Reference

### Comparison Symbols and Meanings

```
=   or  ==   :  Equal to
           Example: 5 = 5 is TRUE

≠   or  !=   :  Not equal to
           Example: 5 ≠ 3 is TRUE

<        :  Less than
           Example: 3 < 5 is TRUE

>        :  Greater than
           Example: 5 > 3 is TRUE

≤   or  <=   :  Less than or equal
           Example: 5 ≤ 5 is TRUE

≥   or  >=   :  Greater than or equal
           Example: 5 ≥ 5 is TRUE
```

### Using Comparisons in Conditions

```
IF x > 10
    DISPLAY "X is greater than 10"
END IF

IF name = "Alice"
    DISPLAY "Hello Alice!"
END IF

IF (age ≥ 18) AND (score > 80)
    DISPLAY "You qualify!"
END IF
```

---

## 6. Algorithm Complexity Quick Reference

### Big O Notation Guide

```
O(1)     Constant      Best! Same speed regardless of size
O(log n) Logarithmic   Very good. Time grows slowly
O(n)     Linear        Good. Time grows with size
O(n²)    Quadratic     Fair. Time grows quickly
O(2ⁿ)    Exponential   Avoid! Time grows very very quickly

Visualization (operations for 1000 items):
O(1)    : ~1 operation
O(log n): ~10 operations
O(n)    : ~1,000 operations
O(n²)   : ~1,000,000 operations
O(2ⁿ)   : Way too many!
```

### Algorithm Comparison

```
┌─────────────────┬──────────┬──────────┬──────────┐
│ Algorithm       │ Best     │ Average  │ Worst    │
├─────────────────┼──────────┼──────────┼──────────┤
│ Linear Search   │ O(1)     │ O(n)     │ O(n)     │
├─────────────────┼──────────┼──────────┼──────────┤
│ Binary Search   │ O(1)     │ O(log n) │ O(log n) │
├─────────────────┼──────────┼──────────┼──────────┤
│ Bubble Sort     │ O(n)     │ O(n²)    │ O(n²)    │
├─────────────────┼──────────┼──────────┼──────────┤
│ Merge Sort      │ O(n log) │ O(n log) │ O(n log) │
└─────────────────┴──────────┴──────────┴──────────┘
```

---

## 7. Common Algorithm Patterns

### The Accumulator Pattern

```
total = 0
FOR each item in collection
    total = total + item
END FOR
RETURN total

Use when: You need to combine values (sum, count, etc.)

Example: Sum all numbers
numbers = [2, 3, 5, 7]
total = 0
total = 0 + 2 = 2
total = 2 + 3 = 5
total = 5 + 5 = 10
total = 10 + 7 = 17
Result: 17
```

### The Counter Pattern

```
count = 0
FOR each item in collection
    IF item matches criteria
        count = count + 1
    END IF
END FOR
RETURN count

Use when: You need to count items matching a condition

Example: Count positive numbers
numbers = [3, -2, 5, -1, 4]
count = 0
3 > 0? YES → count = 1
-2 > 0? NO → count = 1
5 > 0? YES → count = 2
-1 > 0? NO → count = 2
4 > 0? YES → count = 3
Result: 3
```

### The Search Pattern

```
FOR each item in collection
    IF item = target
        RETURN position (or item)
    END IF
END FOR
RETURN not found

Use when: You need to find something in a collection

Example: Find "Alice" in a list
names = ["Bob", "Alice", "Charlie"]
Looking for: "Alice"
Position 1: "Bob" = "Alice"? NO
Position 2: "Alice" = "Alice"? YES
Result: Found at position 2
```

### The Filter Pattern

```
result = empty collection
FOR each item in collection
    IF item matches criteria
        ADD item to result
    END IF
END FOR
RETURN result

Use when: You want a subset of items

Example: Filter even numbers
numbers = [1, 2, 3, 4, 5, 6]
result = []
1 even? NO
2 even? YES → result = [2]
3 even? NO
4 even? YES → result = [2, 4]
5 even? NO
6 even? YES → result = [2, 4, 6]
Result: [2, 4, 6]
```

---

## 8. Problem-Solving Decision Tree

### Choosing Your Approach

```
                     Problem?
                        |
              ┌─────────┴──────────┐
              ▼                    ▼
        Need to          Need to
        REPEAT?          DECIDE?
         / \               / \
        Y   N             Y   N
        |   |             |   |
        ▼   ▼             ▼   ▼
       USE  NEXT    USE IF    NEXT
      LOOP  STEP    THEN      STEP
                    ELSE

              More complex?
                    |
              ┌─────┴─────┐
              ▼           ▼
         BREAK      COMBINE
        INTO        PATTERNS
       SMALLER      TOGETHER
        PARTS
```

---

## 9. Variable Naming Quick Guide

### Good Variable Names

```
✓ student_age       Descriptive, clear
✓ total_price       Explains what it stores
✓ is_valid          Boolean: starts with "is"
✓ number_of_items   Clear meaning

✗ x                 Too vague
✗ data              Too generic
✗ temp              Unclear purpose
✗ a1b2c3            Meaningless
```

### Naming Conventions

```
Lowercase with underscores:
  student_name
  max_attempts
  is_complete

Common prefixes for booleans:
  is_valid
  has_permission
  can_access
  should_repeat

Counter variables (loop-specific):
  i, j, k (acceptable for short loops)
```

---

## 10. Common Mistakes Reference

### Mistakes to Avoid

```
MISTAKE                    HOW TO AVOID
────────────────────────────────────────────
Off-by-one errors          Double-check loop bounds
  (loop runs 5 times,
   need 4)

Infinite loops             Always verify loop condition
  (condition never         changes during loop
   becomes false)

Using wrong operator       Remember: = for assignment
  (if x = 5 instead        == or = for comparison
   of if x == 5)

Not handling edge cases    Test with empty, single item,
  (empty list, null        null values
   value)

Variable scope errors      Know where variables exist
  (using variable          (inside vs outside functions)
   outside its scope)
```

---

## 11. Pseudocode Templates

### Function Template

```
PROCEDURE FunctionName(parameter1, parameter2)
    // Input validation
    IF parameter1 is invalid
        RETURN error
    END IF
    
    // Main logic
    [Your algorithm here]
    
    // Return result
    RETURN result
END PROCEDURE
```

### Loop Template

```
FOR i = 1 TO n
    // Check condition
    IF condition met
        // Handle special case
    ELSE
        // Process normally
    END IF
END FOR
```

### Conditional Template

```
IF condition1
    [Action A]
ELSE IF condition2
    [Action B]
ELSE
    [Default action]
END IF
```

---

## How to Use These Guides

1. **Print and Post**: Put your favorite guides on your wall for quick reference
2. **Study**: Review one guide before working on related problems
3. **Quick Lookup**: When you forget syntax, check the relevant guide
4. **Compare**: Use examples to verify your own solution approaches
5. **Teach**: Explaining these guides to someone else reinforces your learning

**Pro Tip**: Create your own customized version of these guides with annotations and additional examples from your learning journey!
