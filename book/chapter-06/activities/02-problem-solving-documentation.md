# Activity: Problem-Solving Documentation Practice

## Overview
This activity provides guided practice in documenting the problem-solving process from start to finish. You'll work through several programming challenges while focusing on capturing your thinking process, not just the solutions. Effective documentation of problem-solving helps you develop better solutions, learn from your approach, and build a valuable reference for similar problems in the future.

## Learning Objectives
- Document a complete problem-solving process from problem statement to final solution
- Practice capturing your thinking process, not just the end result
- Apply structured documentation techniques to programming challenges
- Develop the habit of recording alternative approaches and their trade-offs
- Create solution documentation that would be helpful to your future self

## Materials Needed
- Your coding notebook
- Pencil and eraser
- The problem-solving template from Activity 1 (or create a simpler version)
- Ruler (optional)
- Colored pencils (optional)

## Time Required
60-90 minutes

## Instructions

### Part 1: Problem-Solving Documentation Framework
Before tackling specific problems, let's establish a framework for documenting the problem-solving process:

1. Review (or create) your problem-solving template, which should include:
   - Problem statement
   - Inputs and outputs
   - Constraints
   - Approach(es) considered
   - Selected solution
   - Testing and validation
   - Reflections

2. Create a checklist of good documentation practices:
   - Record the date and time spent
   - State the problem in your own words
   - Draw diagrams where helpful
   - Document multiple approaches
   - Explain why you chose your solution
   - Include test cases
   - Note challenges and insights
   - Reference related concepts

### Part 2: Guided Problem Documentation

We'll work through a guided example together to practice thorough documentation.

**Problem: Palindrome Checker**

A palindrome is a word, phrase, or sequence that reads the same backward as forward (ignoring spaces, punctuation, and capitalization).

1. Document the problem statement:
   ```
   PROBLEM STATEMENT:
   Create an algorithm to determine if a given string is a palindrome.
   A palindrome reads the same forward and backward, ignoring spaces,
   punctuation, and capitalization.
   
   Purpose: This algorithm could be used for word games or text analysis.
   ```

2. Identify inputs and outputs:
   ```
   INPUTS:
   - A string of characters (letters, numbers, spaces, punctuation)
   
   EXPECTED OUTPUTS:
   - Boolean result: TRUE if the string is a palindrome, FALSE if not
   ```

3. Note constraints and special cases:
   ```
   CONSTRAINTS:
   - Must ignore spaces, punctuation, and capitalization
   - Should handle empty strings and single characters
   - Should work with any length of string
   ```

4. Brainstorm multiple approaches and document them:
   ```
   POSSIBLE APPROACHES:
   
   Approach #1: Reverse and Compare
   - Remove all spaces and punctuation from the string
   - Convert all characters to the same case (e.g., lowercase)
   - Create a reversed version of the cleaned string
   - Compare the clean string with its reverse
   - Return TRUE if they match, FALSE otherwise
   
   Approach #2: Two Pointers
   - Remove all spaces and punctuation from the string
   - Convert all characters to the same case
   - Use two pointers: one starting at the beginning, one at the end
   - Move pointers toward the middle, comparing characters
   - If any comparison fails, return FALSE
   - If pointers meet in the middle with all matches, return TRUE
   
   Approach #3: Character Counting
   - Count the frequency of each character in the string
   - A palindrome should have even counts for all characters
     (or one odd count for a center character in odd-length strings)
   - Return TRUE if it matches this pattern, FALSE otherwise
   ```

5. Analyze trade-offs and select an approach:
   ```
   ANALYSIS AND SELECTION:
   
   Approach #1 is straightforward but requires creating a reversed copy
   of the string, which uses extra memory.
   
   Approach #2 only uses two pointers, making it more memory efficient,
   and we can stop early if we find a mismatch.
   
   Approach #3 would work for simple palindromes but fails for ordered
   palindromes like "race car" where character position matters.
   
   SELECTED APPROACH: #2 (Two Pointers) because it's memory efficient
   and can provide early termination.
   ```

6. Document your algorithm in detail:
   ```
   ALGORITHM:
   
   1. Create a clean version of the input string:
      a. Convert all characters to lowercase
      b. Remove all spaces and punctuation
   
   2. If the clean string is empty or has only one character:
      a. Return TRUE (these are palindromes by definition)
   
   3. Set up two pointers:
      a. left_pointer = 0 (first character)
      b. right_pointer = length of clean string - 1 (last character)
   
   4. While left_pointer < right_pointer:
      a. If character at left_pointer != character at right_pointer:
         i. Return FALSE (not a palindrome)
      b. Increment left_pointer by 1
      c. Decrement right_pointer by 1
   
   5. If we complete the loop without returning FALSE:
      a. Return TRUE (it's a palindrome)
   ```

7. Include a visual representation:
   ```
   VISUAL REPRESENTATION:
   
   Input: "Race Car"
   
   Cleaned: "racecar"
   
   Iteration 1:
   [r] a c e c a [r] ← Pointers at positions 0 and 6
   Match! Continue.
   
   Iteration 2:
   r [a] c e c [a] r ← Pointers at positions 1 and 5
   Match! Continue.
   
   Iteration 3:
   r a [c] e [c] a r ← Pointers at positions 2 and 4
   Match! Continue.
   
   Iteration 4:
   r a c [e] c a r ← Pointers meet (l=3, r=3)
   Loop ends.
   
   Return TRUE
   ```

8. Provide test cases:
   ```
   TEST CASES:
   
   1. Input: "racecar" → Expected: TRUE
      - Classic palindrome
   
   2. Input: "A man, a plan, a canal: Panama" → Expected: TRUE
      - Phrase with spaces and punctuation
   
   3. Input: "hello" → Expected: FALSE
      - Non-palindrome
   
   4. Input: "Able , was I saw eLbA" → Expected: TRUE
      - Mixed case with spaces and punctuation
   
   5. Input: "" → Expected: TRUE
      - Empty string edge case
   
   6. Input: "a" → Expected: TRUE
      - Single character edge case
   ```

9. Document reflections and insights:
   ```
   REFLECTIONS:
   
   - The step of cleaning the string (removing spaces/punctuation and
     standardizing case) is critical for real-world palindrome checking
   
   - This is an example of how preprocessing data can simplify the
     main algorithm logic
   
   - The two-pointer approach is intuitive and efficient, working
     from outside inward
   
   - I initially forgot to handle empty strings and single characters,
     showing the importance of considering edge cases
   ```

### Part 3: Independent Problem Documentation

Now it's your turn to apply this documentation process to two problems independently.

#### Problem 1: FizzBuzz

For this classic programming challenge, document your solution process:

```
Create an algorithm that prints numbers from 1 to n, but:
- For multiples of 3, print "Fizz" instead of the number
- For multiples of 5, print "Buzz" instead of the number
- For multiples of both 3 and 5, print "FizzBuzz"
```

Follow these steps:
1. Document the problem statement in your own words
2. Identify inputs and outputs
3. Note any constraints or special cases
4. Brainstorm at least two different approaches
5. Select and justify your chosen approach
6. Document your algorithm in detail
7. Include at least three test cases
8. Reflect on your solution and any challenges

#### Problem 2: Word Counter

Document your solution to this text processing problem:

```
Create an algorithm that counts the number of words in a given text.
A word is defined as a sequence of characters separated by one or more spaces.
```

Apply the same documentation process as with Problem 1.

### Part 4: Problem-Solving Narratives

For this section, you'll create a narrative-style documentation of your problem-solving journey:

1. Choose one of the problems you've solved (either FizzBuzz or Word Counter)
2. On a new page, write a chronological narrative of your solution process:
   - What was your first reaction to the problem?
   - What questions or clarifications did you need?
   - What was your initial approach?
   - Where did you get stuck or change direction?
   - What insights led to your final solution?
   - What would you do differently next time?

3. Include "time stamps" or markers indicating your progress:
   ```
   Initial reaction (2 minutes in): Seemed straightforward at first...
   
   First approach (5 minutes in): Started by thinking about...
   
   Challenge encountered (10 minutes in): Realized I hadn't considered...
   
   Breakthrough (15 minutes in): Suddenly understood that...
   ```

This narrative style complements the structured template by capturing the messy, non-linear reality of problem-solving.

### Part 5: Documentation Review

Review your documentation for both problems using these criteria:

1. Completeness:
   - Did you include all elements of the framework?
   - Are there any gaps or missing explanations?

2. Clarity:
   - Would someone else understand your approach?
   - Are your explanations clear and concise?

3. Usefulness:
   - Would this documentation help you if you encountered a similar problem?
   - Does it capture insights that might be valuable later?

4. Process reflection:
   - What aspects of your documentation process worked well?
   - What would you improve next time?

## Example

Here's a sample documentation for a different problem to serve as a reference:

```
PROBLEM SOLUTION                 Date: March 16, 2025
Time spent: 25 minutes

PROBLEM STATEMENT:
Create an algorithm to find the second largest value in an array of numbers.

INPUTS:
- An array of numbers (may contain duplicates)

EXPECTED OUTPUTS:
- The second largest number in the array
- If all numbers are the same, return that number
- If the array has fewer than 2 elements, return an error or indication

CONSTRAINTS:
- Must handle arrays of any size (including empty arrays and single-element arrays)
- Must work with duplicate values
- Should be as efficient as possible

POSSIBLE APPROACHES:

Approach #1: Sort and Select
- Sort the array in descending order
- Return the element at index 1 (second position)
- If all values are the same, return the value
- Handle edge cases for empty or single-element arrays

Approach #2: Two-Pass Linear Scan
- First pass: Find the maximum value
- Second pass: Find the largest value that's less than the maximum
- If no such value exists, return the maximum
- Handle edge cases for empty or single-element arrays

Approach #3: Single-Pass with Two Variables
- Track both largest and second largest values as we iterate
- Initialize both to some minimum value
- Update them as we encounter larger values
- Handle edge cases for empty or single-element arrays

ANALYSIS AND SELECTION:

Approach #1 is simple but has O(n log n) time complexity due to sorting.

Approach #2 has O(n) time complexity but requires two passes through the array.

Approach #3 has O(n) time complexity with only one pass, making it the most efficient.

SELECTED APPROACH: #3 (Single-Pass with Two Variables)

ALGORITHM:

1. If the array is empty:
   a. Return an error or special value indicating an empty array

2. If the array has only one element:
   a. Return an error or special value indicating insufficient elements

3. Initialize variables:
   a. largest = first element of array
   b. second_largest = minimum possible value

4. For each element in the array starting from the second position:
   a. If element > largest:
      i. second_largest = largest
      ii. largest = element
   b. Else if element < largest AND element > second_largest:
      i. second_largest = element

5. If second_largest is still the minimum possible value:
   a. Return largest (all elements are the same)
   
6. Otherwise:
   a. Return second_largest

VISUAL REPRESENTATION:

Input: [7, 3, 19, 1, 19, 8]

Iteration 1 (starting state):
- largest = 7
- second_largest = minimum value

Iteration 2 (element = 3):
- 3 not > 7, and 3 > minimum value
- largest = 7
- second_largest = 3

Iteration 3 (element = 19):
- 19 > 7
- largest = 19
- second_largest = 7

Iteration 4 (element = 1):
- 1 not > 19, and 1 not > 7
- No change

Iteration 5 (element = 19):
- 19 not > 19, and 19 not > 7
- No change

Iteration 6 (element = 8):
- 8 not > 19, but 8 > 7
- largest = 19
- second_largest = 8

Result: 8

TEST CASES:

1. Input: [5, 3, 8, 1, 9, 2] → Expected: 8
   - Standard case with clear first and second largest

2. Input: [5, 5, 5, 5] → Expected: 5
   - All elements are the same

3. Input: [9, 3, 9, 8] → Expected: 8
   - Duplicate maximum values

4. Input: [3] → Expected: Error/Indication
   - Single element edge case

5. Input: [] → Expected: Error/Indication
   - Empty array edge case

REFLECTIONS:

- Initially, I considered the sorted approach because it's straightforward,
  but realized it's inefficient for larger datasets.

- The two-variable tracking approach requires careful handling of updates
  to ensure we don't overwrite the second largest incorrectly.

- I initially missed the case where all elements are the same value.

- Real-world consideration: For very large arrays, this in-place algorithm
  would be much more efficient than sorting approaches.

RELATED CONCEPTS:
- Array traversal (→ p.48)
- Finding maximum value (→ p.52)
- Sorting algorithms (→ p.65)
```

## Variations

### Timed Documentation Challenge
Set a timer for 15-20 minutes and challenge yourself to document a complete solution within this timeframe. This simulates the pressure of documenting under time constraints while still maintaining quality.

### Pictorial Documentation
For more visual learners, create a solution that emphasizes diagrams, flowcharts, and visual representations, with text serving as supporting information rather than the primary documentation.

### Paired Documentation
If working with a partner, have one person solve a problem while the other documents their process in real-time based on what they observe and verbal explanations.

### Reverse Engineering
Start with a working solution and create retrospective documentation, analyzing why the solution works and what the thought process might have been.

## Extension Activities

### 1. Create a Problem-Solving Journal
Dedicate a section of your notebook as a problem-solving journal where you document at least one problem solution per day for a week, noting patterns in your approach and improvements over time.

### 2. Compare Documentation Styles
Document the same problem using three different formats:
- Formal template
- Narrative style
- Visual flowchart/diagram-centered

Reflect on the strengths and limitations of each style.

### 3. Problem Documentation Library
Create a collection of well-documented solutions to common programming problems that you can reference later, organized by problem type or algorithm used.

### 4. Teach Through Documentation
Use your documentation to teach someone else how to solve one of the problems. Note any gaps in your documentation that became apparent when explaining it to another person.

## Reflection Questions
1. How did documenting your thought process influence how you approached the problems?
2. Which parts of the documentation were most challenging to create? Why?
3. How might this documentation process change as you tackle more complex problems?
4. In what ways could your documentation be improved to be more useful to your future self?
5. What did you learn about your own problem-solving style through this documentation process?

## Connection to Programming
Professional software developers spend a significant portion of their time documenting their work:

- **Design Documents**: Before writing code, developers often create design documents explaining their planned approach
- **Code Comments**: Well-written code includes comments explaining why certain decisions were made
- **Technical Specifications**: Larger projects require detailed specifications that document requirements and implementation plans
- **Postmortems**: After solving difficult bugs, developers document the root cause and solution for future reference
- **Knowledge Bases**: Teams maintain documentation of solutions to common problems

By practicing thorough documentation of your problem-solving process now, you're developing skills that are highly valued in professional software development environments. This practice also helps you become more methodical and thoughtful in your approach to problems, leading to better solutions over time.
