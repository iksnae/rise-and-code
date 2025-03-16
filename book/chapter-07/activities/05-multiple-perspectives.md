# Multiple Perspectives Exercises

Welcome to the multiple perspectives exercises! These activities will help you develop your ability to approach problems from different angles, enhancing your problem-solving skills.

## Exercise 1: The Multiple Hats Approach 🎩

### Concept
You can gain deeper insights by deliberately adopting different perspectives or "hats" during your problem-solving process.

### Problem Statement
Improve the following number sorting algorithm by examining it from multiple angles:

```
Step 1: Get list of numbers
Step 2: For each number (i) in list
Step 3:    For each number (j) after i
Step 4:        If number[i] > number[j]
Step 5:            Swap numbers
Step 6: Print sorted list
```

### Multi-Perspective Process

#### 1. The Code Reviewer Hat
With this hat, critically examine the code as if you were reviewing someone else's work:
- Is the algorithm clear and readable?
- Are there edge cases not being handled?
- Could variable names be improved?

#### 2. The Efficiency Expert Hat
Now focus exclusively on performance:
- What is the time complexity?
- Are there unnecessary operations?
- How could this be optimized?

#### 3. The User Experience Hat
Consider who will use this code:
- Is the output format user-friendly?
- Should there be input validation?
- Would error messages be helpful?

#### 4. The Integrator Hat
Finally, combine your insights:
- Which improvements are most important?
- Which should be implemented first?
- Create a final improved version incorporating the best ideas

### Sample Solution
```
From the Code Reviewer perspective:
- Add input validation to check if the list is empty
- Use more descriptive variable names
- Add comments explaining the algorithm

From the Efficiency Expert perspective:
- Note that this is a bubble sort with O(n²) time complexity
- Suggest faster sorting algorithms like quicksort O(n log n)
- Add an early exit if no swaps are made in a pass

From the User Experience perspective:
- Add progress indication for large lists
- Format the output to be readable
- Provide information about the sort time

Integrated solution:
Step 1: Get list of numbers
Step 2: If list is empty, return "Empty list"
Step 3: Set swapped = true
Step 4: While swapped is true
Step 5:    Set swapped = false
Step 6:    For each position i from 0 to length-2
Step 7:        If number[i] > number[i+1]
Step 8:            Swap number[i] and number[i+1]
Step 9:            Set swapped = true
Step 10: Print sorted list
```

## Exercise 2: Verbalization Debugging 🦆

### Concept
Explaining your code aloud can help you spot issues by forcing you to articulate your logic clearly.

### Problem Statement
Find and fix bugs in this calculator program by talking through the code:

```
Step 1: Get two numbers (a, b)
Step 2: Get operation (+, -, *, /)
Step 3: If operation is +
Step 4:    Result = a + b
Step 5: If operation is -
Step 6:    Result = a - b
Step 7: If operation is *
Step 8:    Result = a * b
Step 9: If operation is /
Step 10:   Result = a / b
Step 11: Print Result
```

### Verbalization Process
- Explain each line of the code out loud
- Be specific about what each step does
- Work through different input scenarios
- Listen for hesitations or uncertainties in your explanation

### Sample Solution
```
Bugs identified through verbalization:
1. The code uses separate "if" statements instead of "if/else if", meaning
   all conditions are checked regardless of whether a match was already found
2. There's no handling for division by zero
3. There's no validation for invalid operations

Fixed solution:
Step 1: Get two numbers (a, b)
Step 2: Get operation (+, -, *, /)
Step 3: If operation is +
Step 4:    Result = a + b
Step 5: Else if operation is -
Step 6:    Result = a - b
Step 7: Else if operation is *
Step 8:    Result = a * b
Step 9: Else if operation is /
Step 10:   If b is 0
Step 11:      Print "Error: Division by zero"
Step 12:   Else
Step 13:      Result = a / b
Step 14: Else
Step 15:   Print "Error: Invalid operation"
Step 16: If operation is valid and (operation is not / or b is not 0)
Step 17:   Print Result
```

## Exercise 3: Role-Shifting Development 🎭

### Concept
You can simulate different perspectives in the development process by deliberately shifting between different roles.

### Problem Statement
Create an algorithm for a simple text-based game where players guess a hidden pattern.

### Process
Approach this problem by adopting these different roles in sequence:

1. **Requirements Analyst**: Define exactly what the program should do
2. **Designer**: Sketch the algorithm structure
3. **Developer**: Write the actual algorithm
4. **Tester**: Create test cases and test the algorithm
5. **Reviewer**: Evaluate and improve the solution

### Sample Solution
```
Requirements Analysis:
- Generate a random pattern of colors (R, G, B, Y)
- Allow player to guess the pattern
- Provide feedback on correct colors and positions
- Track number of attempts
- Declare victory when pattern is guessed correctly

Design:
- Pattern generation function
- User input function
- Feedback calculation function
- Game loop structure
- Victory condition checking

Implementation:
Step 1: Generate a random pattern of 4 colors
Step 2: Initialize attempts counter to 0
Step 3: While pattern not guessed:
Step 4:    Get player's guess
Step 5:    Increment attempts counter
Step 6:    Calculate correct positions and correct colors
Step 7:    Display feedback to player
Step 8:    If all positions correct, break loop
Step 9: Congratulate player and show number of attempts

Testing:
- Test with correct guess on first try
- Test with partially correct guesses
- Test with invalid inputs
- Test edge cases like repeating colors

Refinements:
- Add difficulty levels with different pattern lengths
- Implement a maximum number of attempts
- Add hints after certain number of failed attempts
```

## Exercise 4: The Incremental Builder 🏗️

### Concept
Breaking a complex task into smaller, achievable steps makes large projects manageable. This exercise teaches you to build solutions incrementally.

### Problem Statement
Extend a basic todo list program with new features, adding one feature at a time.

### Base Program
```
Step 1: Initialize empty todo list
Step 2: Show menu (Add, List, Done, Quit)
Step 3: If Add selected
Step 4:    Get task description
Step 5:    Add to list
Step 6: If List selected
Step 7:    Show all tasks
Step 8: If Done selected
Step 9:    Remove first task
Step 10: If Quit selected
Step 11:    End program
```

### Incremental Development Process
For each feature:
1. Define specific requirements
2. Design the feature addition
3. Implement the feature
4. Test thoroughly
5. Document what you learned

### Sample Solution
```
Feature 1: Priority Levels
Requirements: Allow tasks to have high, medium, or low priority
Implementation: 
- Modify the Add function to also ask for priority
- Store tasks as [description, priority] pairs
- Update List function to display priorities
- Update Done function to remove by task number

Feature 2: Due Dates
Requirements: Allow tasks to have due dates
Implementation:
- Further modify the Add function to ask for an optional due date
- Store tasks as [description, priority, due date] triples
- Update List function to display due dates
- Add sorting by due date

Feature 3: Task Search
Requirements: Allow searching for tasks by keyword
Implementation:
- Add Search option to the menu
- Get search term from user
- Display only tasks containing the search term
```

## Exercise 5: The Optimization Cycle 🔄

### Concept
Professional developers iterate through cycles of implementation and optimization. This exercise teaches this iterative approach.

### Problem Statement
Create and then optimize an algorithm that processes data efficiently.

### Initial Requirements
```
Process a list of numbers to:
1. Find all prime numbers
2. Calculate the average
3. Identify the highest and lowest values
4. Group numbers into ranges (0-9, 10-19, etc.)
5. Count frequency of each digit
```

### Sample Solution
```
Initial Implementation:
Step 1: Initialize results structure
Step 2: For each number in the list:
Step 3:    Check if it's prime and add to prime list if so
Step 4:    Add to sum for average calculation
Step 5:    Update max and min values
Step 6:    Add to appropriate range group
Step 7:    Count digits and update frequency counts
Step 8: Calculate average by dividing sum by count
Step 9: Return all results

First Optimization (Time Complexity):
- Replace naive prime checking with Sieve of Eratosthenes
- Calculate min, max, and sum in a single pass
- Use buckets for range grouping instead of checking ranges

Second Optimization (Memory Usage):
- Use counting sort for digit frequency
- Implement lazy evaluation for prime calculation
- Only calculate statistics that are requested

Final Optimized Version:
Step 1: Make one pass through the data:
Step 2:    Track running sum, count, min, and max
Step 3:    Place numbers in range buckets
Step 4:    Update digit frequency counters
Step 5: Calculate average from sum and count
Step 6: Use optimized Sieve algorithm for primes only when needed
Step 7: Return requested statistics
```

## Multiple Perspectives Guidelines

### Creating Your Ideal Thinking Environment
1. **Minimize distractions** - Create a dedicated thinking space
2. **Physical separation** - Move to different locations for different mental modes
3. **Visual aids** - Use different colored notes for different perspectives
4. **Time boundaries** - Set clear timeboxes for each role or activity

Remember: By deliberately adopting different perspectives, you can enhance your problem-solving abilities and develop more robust solutions!