# Intermediate Challenge Set

Welcome to the intermediate challenges! These problems build upon the fundamentals and introduce more complex problem-solving scenarios. Take your time to analyze each problem before starting.

## Challenge 1: Pattern Generator ⭐⭐

### Problem Statement
Create an algorithm that generates a pyramid pattern of asterisks (*) with n rows.

### Required Skills
- Nested loops
- String manipulation
- Pattern recognition

### Example
```
Input: n = 3
Output:
  *
 ***
*****
```

### Workspace Setup
```
Number of rows: _____

Pattern analysis:
Row | Spaces | Stars | Total Width
----|---------|-------|-------------
1   |         |       |
2   |         |       |
3   |         |       |

Building steps:
1. _____________________
2. _____________________
3. _____________________
```

### Hints
1. Notice how the number of stars changes per row
2. Consider the spaces needed for alignment
3. Think about the relationship between row number and pattern

### Solution
```
Step 1: For i from 1 to n
Step 2:    Set spaces = n - i
Step 3:    Set stars = 2 * i - 1
Step 4:    Print spaces number of space characters
Step 5:    Print stars number of * characters
Step 6:    Move to next line
```

## Challenge 2: Array Rotator ⭐⭐

### Problem Statement
Create an algorithm that rotates an array of n elements to the right by k steps.

### Required Skills
- Array manipulation
- Modular arithmetic
- Loop control

### Example
```
Input: [1, 2, 3, 4, 5], k = 2
Output: [4, 5, 1, 2, 3]
```

### Workspace Setup
```
Original array: [ ] [ ] [ ] [ ] [ ]
Steps to rotate: _____

Tracking table:
Step | Current Array    | Operation
-----|-----------------|------------
0    |                 |
1    |                 |
2    |                 |
```

### Hints
1. Consider what happens to each element's position
2. Think about handling rotations larger than array size
3. Look for patterns in element movement

### Solution
```
Step 1: Handle the case where k > array length
        Set k = k % array length
Step 2: Reverse the entire array
Step 3: Reverse the first k elements
Step 4: Reverse the remaining elements from position k+1 to end

For example, with input [1, 2, 3, 4, 5] and k = 2:
- After step 2: [5, 4, 3, 2, 1]
- After step 3: [4, 5, 3, 2, 1]
- After step 4: [4, 5, 1, 2, 3]
```

## Challenge 3: Prime Factorizer ⭐⭐

### Problem Statement
Create an algorithm that finds all prime factors of a given number.

### Required Skills
- Prime numbers
- Division and modulo
- Loop control

### Example
```
Input: 84
Output: [2, 2, 3, 7] (because 2 × 2 × 3 × 7 = 84)
```

### Workspace Setup
```
Number to factorize: _____

Process table:
Step | Current Number | Factor Found | Remaining Number
-----|---------------|--------------|------------------
1    |               |              |
2    |               |              |
3    |               |              |
```

### Hints
1. Start with the smallest prime number
2. Consider when to move to the next potential factor
3. Think about when to stop

### Solution
```
Step 1: Initialize an empty array for factors
Step 2: Set n = input number
Step 3: Set divisor = 2
Step 4: While n > 1
Step 5:    If n is divisible by divisor
Step 6:        Add divisor to factors array
Step 7:        Divide n by divisor
Step 8:    Else
Step 9:        Increment divisor by 1
Step 10: Return factors array
```

## Challenge 4: Word Frequency Counter ⭐⭐

### Problem Statement
Create an algorithm that counts the frequency of each word in a sentence, ignoring case and punctuation.

### Required Skills
- String manipulation
- Data structures
- Counting algorithms

### Example
```
Input: "The cat and the dog saw the bird"
Output: 
the: 3
cat: 1
and: 1
dog: 1
saw: 1
bird: 1
```

### Workspace Setup
```
Sentence: _____________________

Processing steps:
1. Clean text: _____________________
2. Split words: _____________________
3. Count words: _____________________

Word tracking:
Word | Count
-----|-------
     |
     |
     |
```

### Hints
1. Consider how to handle uppercase and lowercase
2. Think about word separation
3. Plan how to store and update counts

### Solution
```
Step 1: Convert the sentence to lowercase
Step 2: Remove any punctuation
Step 3: Split the sentence into words by spaces
Step 4: Initialize an empty dictionary to store word counts
Step 5: For each word in the list of words
Step 6:    If the word exists in the dictionary
Step 7:        Increment its count by 1
Step 8:    Else
Step 9:        Add the word to the dictionary with count 1
Step 10: Return the dictionary
```

## Challenge 5: Number Sequence Finder ⭐⭐

### Problem Statement
Create an algorithm that identifies the next number in a sequence based on a pattern.

### Required Skills
- Pattern recognition
- Mathematical operations
- Conditional logic

### Example
```
Input: [2, 4, 8, 16, 32]
Output: 64 (each number is doubled)
```

### Workspace Setup
```
Sequence: [ ] [ ] [ ] [ ] [ ]

Analysis table:
Position | Number | Difference | Ratio | Pattern
---------|--------|------------|-------|--------
1 to 2   |        |            |       |
2 to 3   |        |            |       |
3 to 4   |        |            |       |
4 to 5   |        |            |       |
```

### Hints
1. Look for arithmetic and geometric patterns
2. Consider differences between consecutive numbers
3. Think about ratios between numbers

### Solution
```
Step 1: Calculate differences between consecutive terms
Step 2: Check if differences are constant (arithmetic sequence)
        If yes, next term = last term + common difference
Step 3: If not arithmetic, calculate ratios between consecutive terms
Step 4: Check if ratios are constant (geometric sequence)
        If yes, next term = last term * common ratio
Step 5: If neither pattern is found, look for more complex patterns
        (quadratic, cubic, etc.)
Step 6: Return the identified next term
```

## Working Through the Challenges

For each challenge:
1. Analyze the pattern or problem thoroughly
2. Draw diagrams or tables if helpful
3. Test your solution with multiple inputs
4. Optimize your solution if possible
5. Document your problem-solving process

## Reflection Questions

After completing these challenges, consider:
1. How did you identify patterns in each problem?
2. What strategies helped you break down complex problems?
3. How could you make your solutions more efficient?
4. What new concepts did you discover while solving these?

## Next Steps

After mastering these challenges:
1. Try combining multiple challenges into one
2. Create variations of these problems
3. Help others understand your solutions
4. Move on to the advanced challenge set

Remember: Focus on understanding the underlying patterns and principles in each challenge. This will help you develop stronger problem-solving skills for more complex challenges ahead.