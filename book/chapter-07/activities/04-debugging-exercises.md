# Debugging Exercises

Welcome to the debugging exercises! These activities will help you develop essential debugging skills by identifying and fixing common programming issues. Each exercise presents a problem with intentional bugs for you to solve.

## Exercise 1: Number Sequence Bug ⚠️

### Problem Description
The following algorithm is supposed to generate a sequence of numbers from 1 to n, but it's not working correctly.

### Buggy Version
```
Step 1: Set counter = 1
Step 2: While counter <= n
Step 3:    Print counter
Step 4: Add 1 to counter
Step 5: End while
```

### Expected vs Actual Output
```
Expected (n=5): 1, 2, 3, 4, 5
Actual: 1 (infinite loop)
```

### Debugging Workspace
```
Variables to track:
- counter: _____
- n: _____

Execution trace:
Step | Counter | Condition | Action
-----|---------|-----------|--------
1    |         |           |
2    |         |           |
3    |         |           |
4    |         |           |
```

### Hints
1. Look at the indentation
2. Think about when the counter changes
3. Consider the loop structure

### Encoded Solution
```
Fix: LQGHQWBVWHS4BLQBZKLOH
(Encoding: Shift each character back by 3)
```

## Exercise 2: Array Sum Calculator Bug ⚠️

### Problem Description
This algorithm should calculate the sum of all numbers in an array, but it's giving incorrect results.

### Buggy Version
```
Step 1: Set sum = 0
Step 2: For each number in array
Step 3:    sum = number
Step 4: End for
Step 5: Print sum
```

### Expected vs Actual Output
```
Input array: [1, 2, 3, 4, 5]
Expected: 15
Actual: 5
```

### Debugging Workspace
```
Test array: [ ] [ ] [ ] [ ] [ ]
Current sum: _____

Execution trace:
Step | Number | Old Sum | New Sum | Action
-----|---------|---------|---------|--------
1    |         |         |         |
2    |         |         |         |
3    |         |         |         |
4    |         |         |         |
5    |         |         |         |
```

### Hints
1. Look at how the sum is updated
2. Think about what happens to previous values
3. Consider the accumulation process

### Encoded Solution
```
Fix: VXPBSOXVBQXPEHU
(Encoding: Shift each character up by 3)
```

## Exercise 3: String Reversal Bug ⚠️

### Problem Description
This algorithm should reverse a string, but it's producing incorrect output.

### Buggy Version
```
Step 1: Set i = 0
Step 2: Set j = length of string
Step 3: While i < j
Step 4:    Swap characters at i and j
Step 5:    Increment i
Step 6:    Decrement j
Step 7: End while
```

### Expected vs Actual Output
```
Input: "HELLO"
Expected: "OLLEH"
Actual: "HELLO" (with error)
```

### Debugging Workspace
```
Input string: _____
Length: _____

Position tracking:
Step | i | j | Current String | Action
-----|---|---|----------------|--------
1    |   |   |                |
2    |   |   |                |
3    |   |   |                |
4    |   |   |                |
```

### Hints
1. Check the initial value of j
2. Think about array indexing
3. Consider string bounds

### Encoded Solution
```
Fix: MBHTXDOVBOHQJWKBPLQXV1
(Encoding: Shift each character back by 3)
```

## Exercise 4: Even Number Counter Bug ⚠️

### Problem Description
This algorithm should count even numbers in an array, but it's counting incorrectly.

### Buggy Version
```
Step 1: Set count = 0
Step 2: For each number in array
Step 3:    If number / 2 = 0
Step 4:        Increment count
Step 5: End for
Step 6: Print count
```

### Expected vs Actual Output
```
Input: [1, 2, 3, 4, 5, 6]
Expected: 3
Actual: 0
```

### Debugging Workspace
```
Test array: [ ] [ ] [ ] [ ] [ ] [ ]
Current count: _____

Number analysis:
Number | Division Result | Should Count? | Actual Count
-------|----------------|---------------|-------------
      |                |               |
      |                |               |
      |                |               |
```

### Hints
1. Look at the even number test
2. Think about division vs modulo
3. Consider operator precedence

### Encoded Solution
```
Fix: XVHBPRGXORBQRWBGLYLVLRQ
(Encoding: Shift each character up by 3)
```

## Exercise 5: Temperature Converter Bug ⚠️

### Problem Description
This algorithm should convert Celsius to Fahrenheit, but it's calculating wrong values.

### Buggy Version
```
Step 1: Set F = C * 9/5 + 32
Step 2: Print F
```

### Expected vs Actual Output
```
Input: C = 100°C
Expected: 212°F
Actual: 52°F
```

### Debugging Workspace
```
Test temperature: _____°C

Calculation breakdown:
Step | Operation | Result
-----|-----------|--------
1    | C * 9     |
2    | ÷ 5       |
3    | + 32      |
```

### Hints
1. Check operator precedence
2. Think about integer division
3. Consider parentheses placement

### Encoded Solution
```
Fix: DGGBSDUHQWKHVHVBF9B5
(Encoding: Shift each character up by 3)
```

## Debugging Process Guide

When working through these exercises:

1. Identify the Problem
   - What is the expected behavior?
   - What is actually happening?
   - What are the symptoms?

2. Gather Information
   - What inputs cause the problem?
   - What inputs work correctly?
   - Are there patterns in the behavior?

3. Analyze the Code
   - Read the code carefully
   - Check for common mistakes
   - Look for logic errors

4. Test Hypotheses
   - Make small changes
   - Test with different inputs
   - Verify fixes work consistently

5. Document Solutions
   - What was the root cause?
   - How did you fix it?
   - What did you learn?

## Reflection Questions

After fixing each bug:
1. What type of bug was it?
2. How could you prevent similar bugs?
3. What debugging techniques were most helpful?
4. How could you improve the code further?

## Next Steps

After completing these exercises:
1. Create your own debugging challenges
2. Practice explaining bugs to others
3. Build a collection of common bug patterns
4. Share your debugging strategies

Remember: Debugging is a crucial skill that improves with practice. Take time to understand each bug and its solution thoroughly.