# Crafting Repetitive Tasks

## Introduction

Now let's build loops that actually solve problems. Crafting loops means: knowing when you need repetition, picking the right loop type, and structuring it correctly.

## When Do You Need a Loop?

Signs you need a loop:
1. **Same action repeated**: Do this multiple times
2. **Process collections**: Work with each item in a list
3. **Unknown repetitions**: Continue until something happens
4. **Accumulating results**: Build something through steps
5. **Patterns**: Repeating elements

**Example**: Hand-washing clothes. Don't write "wash shirt, rinse shirt, dry shirt, wash pants..." Just loop: "For each garment: wash, rinse, dry."

## Pick the Right Loop Type

**FOR loop** when:
- You know exactly how many times (1 to 10)
- Working with a list/collection
- Counting up or down

**WHILE loop** when:
- Unknown how many times
- Keep going until condition met
- Iterations depend on data

| Task | Type | Why |
|------|------|-----|
| Sum 1 to 10 | FOR | Know exact count |
| Find a word in text | WHILE | Unknown lines |
| Grade each student | FOR EACH | Have collection |
| Roll die until 6 | WHILE | Unknown rolls |
| Count 10 to 1 | FOR | Known count |

## Loop Parts: Design Them

### 1. Setup 🎬

Prepare variables before looping:
```
sum = 0                 # Will accumulate
counter = 1             # Start counting
found = false           # Track if found
result = ""             # Build result
```

### 2. Condition ✓

Test to continue or stop:
```
counter <= 10           # While less than 10
sum < 100               # While under 100
NOT found               # While not found
length(input) > 0       # While has input
```

### 3. Body 📋

What happens each iteration:
```
Print counter
sum = sum + counter
IF item == target: found = true
result = result + char
```

### 4. Update ↗️

Change toward completion:
```
counter = counter + 1   # Increment
current = next_item     # Move forward
index = index + 2       # Skip by 2
```

## Example Loops 💡

**Sum 1 to n**:
```
sum = 0
current = 1
WHILE current <= n
    sum = sum + current
    current = current + 1
END WHILE
```

**Find value**:
```
found = false
index = 0
WHILE index < LENGTH(list) AND NOT found
    IF list[index] == target
        found = true
    END IF
    index = index + 1
END WHILE
```

**Build pattern**:
```
pattern = ""
position = 0
WHILE LENGTH(pattern) < n
    IF position % 2 == 0
        pattern = pattern + "X"
    ELSE
        pattern = pattern + "O"
    END IF
    position = position + 1
END WHILE
```

## Common Loop Patterns 🎯

**Counter**: Count up to a number
```
counter = 1
WHILE counter <= max
    DO(something)
    counter = counter + 1
END WHILE
```

**Accumulator**: Build a total
```
total = 0
FOR EACH num IN numbers
    total = total + num
END FOR
```

**Search**: Find something
```
found = false
FOR EACH item IN items
    IF item == target: found = true
END FOR
```

**Filter**: Keep only matching items
```
results = []
FOR EACH item IN items
    IF meets_criteria(item)
        ADD item TO results
    END IF
END FOR
```

**Transform**: Change each item
```
transformed = []
FOR EACH item IN items
    new = transform(item)
    ADD new TO transformed
END FOR
```

## Common Loop Mistakes ⚠️

**Off-by-one**: Loop runs 1 time too many or too few
- Fix: Check start/end values carefully

**Infinite**: Never stops
- Fix: Update variable and check condition

**Messing with loop variable**: Changing counter inside loop
- Fix: Use separate variables for other needs

**Complex exit**: Multiple ways to stop
- Fix: Combine conditions with AND/OR or use flags

## Make Loops Better 🚀

1. **Move math outside**: Calculate once before, not each iteration
2. **Combine loops**: If two loops process same data, make one
3. **Exit early**: Stop when you find what you need
4. **Pick right type**: FOR, WHILE, FOR EACH—choose best fit
5. **Clear names**: `counter`, `sum`, `found` not `x`, `s`, `f`

## Activity: Design Loops! 🎨

Create loops for:
1. Print all even numbers 1-20
2. Find largest value in list
3. Calculate 5! (5×4×3×2×1)
4. Reverse a string
5. Print triangle:
```
*
**
***
```

For each: Pick loop type, design parts, trace execution.

**See Activity Sheet 5B!**

## Key Takeaways ✨

- Recognize when you need loops
- Pick the right loop type
- Design: setup, condition, do, update
- Use common patterns (counter, accumulator, search, filter, transform)
- Avoid off-by-one errors and infinite loops
- Optimize with better code placement and early exits

**Next**: Real-world loops in action!
