# Activity: Beginner Challenges

## Overview

This activity presents five foundational coding challenges designed to build your confidence and reinforce the basic programming concepts you've learned in previous chapters. Each challenge includes clear instructions, a step-by-step approach, and hints to help you succeed.

## Learning Objectives

- Apply basic programming concepts to solve simple problems
- Practice breaking down problems into algorithmic steps
- Develop systematic problem-solving approaches
- Build confidence in your coding abilities
- Learn to test and verify your solutions

## Materials Needed

- Your notebook
- Pencil and eraser
- Ruler (optional, for tables and diagrams)

## Time Required

45-60 minutes (approximately 10-12 minutes per challenge)

## Instructions

For each challenge:
1. Read the problem statement carefully
2. Write down your understanding of what the problem is asking
3. Plan your approach before writing code
4. Implement your solution using pseudocode in your notebook
5. Test your solution with the provided examples
6. Verify your answer using the encoded answer key

### Challenge 1: Sum of Numbers

**Problem**: Calculate the sum of all numbers from 1 to n, where n is a positive integer.

**Input**: A positive integer n (e.g., 5)
**Output**: The sum of all integers from 1 to n (e.g., 1 + 2 + 3 + 4 + 5 = 15)

**Example 1**:
- Input: n = 3
- Output: 6 (because 1 + 2 + 3 = 6)

**Example 2**:
- Input: n = 7
- Output: 28 (because 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28)

**Hints**:
1. Try writing out the calculation for small values of n to see if you notice a pattern.
2. You'll need a variable to keep track of the running sum.
3. This problem can be solved with a simple loop that adds each number to the sum.

**Approach**:
1. Initialize a variable `sum` to 0
2. Use a loop to iterate from 1 to n
3. In each iteration, add the current number to `sum`
4. After the loop completes, `sum` will contain the answer

**Encoded Answer (Caesar Cipher, shift=3)**:
For formula: wkh vxp ri qxpehuv iurp 1 wr q lv q * (q + 1) / 2

### Challenge 2: Even or Odd Counter

**Problem**: Count how many even and odd numbers exist in a list of integers.

**Input**: A list of integers (e.g., [3, 8, 4, 7, 2, 6, 9])
**Output**: The count of even numbers and the count of odd numbers

**Example 1**:
- Input: [1, 2, 3, 4, 5]
- Output: 2 even, 3 odd

**Example 2**:
- Input: [10, 21, 35, 42, 57, 68]
- Output: 3 even, 3 odd

**Hints**:
1. Remember that a number is even if it's divisible by 2 (or if the remainder when divided by 2 is 0).
2. You'll need two counter variables, one for even and one for odd numbers.
3. Check each number in the list one by one.

**Approach**:
1. Initialize two variables: `even_count = 0` and `odd_count = 0`
2. Iterate through each number in the list
3. For each number, check if it's even (divisible by 2)
4. If it's even, increment `even_count`; otherwise, increment `odd_count`
5. After checking all numbers, return both counts

**Encoded Answer (Keyword Cipher with keyword="COUNT")**:
Dpf srg rgtlcmct gql crioqa py lsab ogioqa mx tql vddt, mqlasmr mq ox ldmmco px 2.

### Challenge 3: Reverse a String

**Problem**: Write an algorithm to reverse a string.

**Input**: A string (e.g., "hello")
**Output**: The reversed string (e.g., "olleh")

**Example 1**:
- Input: "programming"
- Output: "gnimmargorp"

**Example 2**:
- Input: "algorithm"
- Output: "mhtirogla"

**Hints**:
1. Start by creating an empty result string.
2. Consider how you might iterate through the original string from end to beginning.
3. You can add each character to your result string one by one.

**Approach**:
1. Initialize an empty string `reversed`
2. Iterate through the original string from the last character to the first
3. Append each character to `reversed`
4. Return the `reversed` string

**Encoded Answer (Transposition Cipher, 3 columns)**:
Gtoeh srteaercet rhnhvaeicsr ftarrceo tmsre toetnsed.

### Challenge 4: Minimum and Maximum

**Problem**: Find the smallest and largest numbers in a list of integers.

**Input**: A list of integers (e.g., [12, 45, 7, 23, 56, 8])
**Output**: The minimum and maximum values in the list

**Example 1**:
- Input: [5, 2, 9, 1, 7]
- Output: Minimum: 1, Maximum: 9

**Example 2**:
- Input: [15, 15, 15]
- Output: Minimum: 15, Maximum: 15

**Hints**:
1. You can start by assuming the first number is both the minimum and maximum.
2. Then compare each subsequent number with your current min and max values.
3. Update your min and max variables whenever you find a new smallest or largest value.

**Approach**:
1. Initialize `min_value` and `max_value` to the first number in the list
2. Iterate through the list starting from the second number
3. If the current number is less than `min_value`, update `min_value`
4. If the current number is greater than `max_value`, update `max_value`
5. After the loop, return `min_value` and `max_value`

**Encoded Answer (Binary)**:
01010100 01101111 00100000 01100110 01101001 01101110 01100100 00100000 01101101 01101001 01101110 00100000 01100001 01101110 01100100 00100000 01101101 01100001 01111000 00101100 00100000 01110100 01110010 01100001 01100011 01101011 00100000 01100010 01101111 01110100 01101000 00100000 01110110 01100001 01101100 01110101 01100101 01110011 00100000 01100001 01110011 00100000 01111001 01101111 01110101 00100000 01101001 01110100 01100101 01110010 01100001 01110100 01100101 00101110

### Challenge 5: Count Vowels and Consonants

**Problem**: Count the number of vowels and consonants in a string.

**Input**: A string containing alphabetic characters (e.g., "Hello World")
**Output**: The number of vowels and the number of consonants

**Example 1**:
- Input: "Programming"
- Output: Vowels: 3, Consonants: 8

**Example 2**:
- Input: "Algorithm"
- Output: Vowels: 3, Consonants: 5

**Hints**:
1. The vowels in English are A, E, I, O, U (both uppercase and lowercase).
2. Consider how to handle spaces and non-alphabetic characters.
3. You'll need to check each character individually.

**Approach**:
1. Initialize two counters: `vowel_count = 0` and `consonant_count = 0`
2. Define a list of vowels: [a, e, i, o, u, A, E, I, O, U]
3. Iterate through each character in the string
4. For each character:
   - If it's a vowel (in the vowel list), increment `vowel_count`
   - If it's a consonant (alphabetic but not a vowel), increment `consonant_count`
   - Ignore spaces and non-alphabetic characters
5. Return `vowel_count` and `consonant_count`

**Encoded Answer (Caesar Cipher, shift=5)**:
Dijhp nkw jfhm hmfwfhyjw nx fq fumfgjynh hmfwfhyjw tw sty. Ymjs hmjhp nk ny nx f, j, n, t, z (tw ymjnw zujwhfxj ajwxntsx). Nx ny nx fq fumfgjynh hmfwfhyjw gzy sty f atbqj, ny nx f htsxtsfy.

## Extension Activities

1. **Pattern Challenge**: Modify the sum of numbers challenge to find the sum of only the even numbers from 1 to n.

2. **Character Frequency**: Extend the vowel/consonant counter to track the frequency of each individual letter in the string.

3. **Advanced Reversal**: Modify the string reversal challenge to reverse each word in a sentence, but keep the words in their original order. For example, "hello world" would become "olleh dlrow".

4. **List Operations**: Create a program that merges two sorted lists of numbers into a single sorted list.

5. **String Transformation**: Write an algorithm that converts a sentence to "title case" (where the first letter of each word is capitalized).

## Reflection Questions

1. Which challenge did you find easiest to solve? Why?

2. Which challenge was most difficult? What made it challenging?

3. Did you notice any patterns or techniques that were useful across multiple challenges?

4. How did breaking down the problems into steps help you develop solutions?

5. What would you do differently if you were to solve these challenges again?

## Connection to Programming

These beginner challenges introduce fundamental programming patterns that appear in many real-world applications:

- **Accumulation Pattern** (Challenge 1): Used when you need to build up a result by processing each element in a sequence - common in data processing and statistics.

- **Counting and Classification** (Challenges 2 and 5): Used when categorizing or analyzing data - essential for data analysis and reporting.

- **Data Transformation** (Challenge 3): Used when data needs to be converted from one form to another - common in data processing and user interface development.

- **Finding Extremes** (Challenge 4): Used to identify outliers or boundaries in data sets - important for data analysis and decision-making algorithms.

As you progress to more advanced programming, you'll combine these patterns in increasingly sophisticated ways to solve complex problems.
