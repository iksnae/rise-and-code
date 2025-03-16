# Advanced Challenge Set

Welcome to the advanced challenges! These problems are designed to test and expand your problem-solving abilities with complex scenarios that may require multiple approaches or optimization strategies.

## Challenge 1: Maze Solver ⭐⭐⭐

### Problem Statement
Create an algorithm that finds a path through a maze represented as a grid where:
- 0 represents open paths
- 1 represents walls
- S represents the start
- E represents the end

### Required Skills
- 2D array manipulation
- Path finding algorithms
- Backtracking

### Example
```
Input:
S 0 1 1
0 0 1 1
1 0 0 1
1 1 0 E

Output: Path coordinates [(0,0), (1,0), (1,1), (2,2), (3,2), (3,3)]
```

### Workspace Setup
```
Maze representation:
[ ][ ][ ][ ]
[ ][ ][ ][ ]
[ ][ ][ ][ ]
[ ][ ][ ][ ]

Path tracking:
Step | Current Position | Visited | Options | Choice
-----|-----------------|---------|----------|-------
1    |                 |         |          |
2    |                 |         |          |
3    |                 |         |          |
```

### Hints
1. Consider how to track visited positions
2. Think about handling dead ends
3. Plan for backtracking when needed

### Encoded Solution
```
Algorithm: GHSWKBILUVWBVHDUFKBEDFNWUDFN
(Encoding: Shift each character back by 3)
```

## Challenge 2: Expression Evaluator ⭐⭐⭐

### Problem Statement
Create an algorithm that evaluates mathematical expressions with parentheses, supporting basic operations (+, -, *, /).

### Required Skills
- Stack implementation
- String parsing
- Operator precedence
- Error handling

### Example
```
Input: "2 * (3 + 4) - 1"
Output: 13
```

### Workspace Setup
```
Expression: _____________________

Processing steps:
1. Tokenization
2. Operator stack
3. Value stack

Evaluation table:
Step | Token | Operator Stack | Value Stack | Action
-----|-------|---------------|-------------|--------
1    |       |               |             |
2    |       |               |             |
3    |       |               |             |
```

### Hints
1. Consider operator precedence rules
2. Think about handling parentheses
3. Plan for error cases

### Encoded Solution
```
Steps: VWDFNBHYDOXDWHBSUHFHGHQFH
(Encoding: Shift each character up by 3)
```

## Challenge 3: Data Compressor ⭐⭐⭐

### Problem Statement
Create an algorithm that compresses repeated characters in a string using run-length encoding, handling both uppercase and lowercase letters.

### Required Skills
- String manipulation
- Counting algorithms
- Edge case handling

### Example
```
Input: "AABBBCCCC"
Output: "2A3B4C"

Input: "aaBBBccc"
Output: "2a3B3c"
```

### Workspace Setup
```
Input string: _____________________

Processing table:
Position | Current Char | Count | Output So Far
---------|-------------|-------|---------------
1        |             |       |
2        |             |       |
3        |             |       |

Special cases:
1. Single characters
2. Case sensitivity
3. Non-letter characters
```

### Hints
1. Consider how to handle count transitions
2. Think about preserving case
3. Plan for single character sequences

### Encoded Solution
```
Process: FRXQWBEXLOGBVWULQJ
(Encoding: Shift each character up by 3)
```

## Challenge 4: Binary Tree Builder ⭐⭐⭐

### Problem Statement
Create an algorithm that constructs a binary search tree from a list of numbers and implements an in-order traversal.

### Required Skills
- Tree data structures
- Recursion
- Node manipulation

### Example
```
Input: [5, 3, 7, 1, 4, 6, 8]
Output: [1, 3, 4, 5, 6, 7, 8]
```

### Workspace Setup
```
Node structure:
value: _____
left: _____
right: _____

Tree visualization:
     [ ]
    /   \
  [ ]   [ ]
 /  \   /  \
[ ] [ ] [ ] [ ]

Build steps:
1. _____________________
2. _____________________
3. _____________________
```

### Hints
1. Consider the rules for node placement
2. Think about balancing conditions
3. Plan traversal order

### Encoded Solution
```
Build: LQVHUWBWUDYHUVHBUHFXUVH
(Encoding: Shift each character back by 3)
```

## Challenge 5: Game State Analyzer ⭐⭐⭐

### Problem Statement
Create an algorithm that analyzes a Tic-Tac-Toe board state to determine if there's a winner, it's a draw, or the game can continue.

### Required Skills
- 2D array analysis
- Pattern matching
- State evaluation

### Example
```
Input:
X O X
O X O
X - -

Output: "X wins" (diagonal victory)
```

### Workspace Setup
```
Board representation:
[ ][ ][ ]
[ ][ ][ ]
[ ][ ][ ]

Check sequence:
1. Row analysis
2. Column analysis
3. Diagonal analysis
4. Space availability

State tracking:
Pattern | Cells | Result
--------|-------|--------
Row 1   |       |
Row 2   |       |
Row 3   |       |
Col 1   |       |
Col 2   |       |
Col 3   |       |
Diag 1  |       |
Diag 2  |       |
```

### Hints
1. Consider all winning patterns
2. Think about efficient checking methods
3. Plan for all possible states

### Encoded Solution
```
Check: OLQHVBGLDJRQDOVBVSDFHV
(Encoding: Shift each character up by 3)
```

## Approaching Advanced Challenges

For each challenge:
1. Break down the problem into smaller components
2. Design data structures before implementation
3. Consider edge cases and error conditions
4. Test with various input scenarios
5. Look for optimization opportunities

## Reflection Questions

After completing these challenges, analyze:
1. How did you approach breaking down complex problems?
2. What data structures were most useful and why?
3. How did you handle edge cases and error conditions?
4. What optimization strategies did you discover?

## Next Steps

After conquering these challenges:
1. Create your own complex problems
2. Explore different solutions to the same problem
3. Analyze time and space complexity
4. Share your solutions and learn from others

Remember: These advanced challenges are meant to stretch your problem-solving abilities. Take time to understand each component thoroughly before moving forward.