# Activity: Intermediate Challenges

## Overview

This activity presents five intermediate-level coding challenges that combine multiple programming concepts. These challenges will stretch your problem-solving abilities and require you to think more independently. Each challenge includes a problem statement, examples, hints, and an encoded answer key.

## Learning Objectives

- Apply multiple programming concepts to solve more complex problems
- Develop logical thinking through algorithmic problem-solving
- Practice breaking down complex problems into manageable steps
- Improve your ability to plan and implement solutions independently
- Learn to test and refine your solutions

## Materials Needed

- Your notebook
- Pencil and eraser
- Ruler (for diagrams and tables)
- Optional: colored pencils for visualizations

## Time Required

60-75 minutes (approximately 12-15 minutes per challenge)

## Instructions

For each challenge:
1. Read the problem statement carefully and make sure you understand what's being asked
2. Identify the key concepts and operations involved
3. Plan your solution approach before writing any code
4. Implement your solution using pseudocode in your notebook
5. Test your solution with the provided examples
6. Check edge cases (special inputs) to ensure your solution is robust
7. Verify your answer using the encoded answer key

### Challenge 1: Palindrome Checker

**Problem**: Determine if a given string is a palindrome. A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward, ignoring spaces, punctuation, and capitalization.

**Input**: A string (e.g., "racecar" or "A man, a plan, a canal: Panama")
**Output**: True if the string is a palindrome, False otherwise

**Example 1**:
- Input: "racecar"
- Output: True

**Example 2**:
- Input: "hello"
- Output: False

**Example 3**:
- Input: "A man, a plan, a canal: Panama"
- Output: True (after removing spaces and punctuation and ignoring case)

**Hints**:
1. You'll need to preprocess the string to remove spaces, punctuation, and standardize case.
2. Consider using the string reversal technique from the beginner challenges.
3. Think about how to efficiently compare the original string with its reversed version.

**Approach**:
1. Create a "cleaned" version of the input string by:
   - Converting all characters to lowercase
   - Removing spaces, punctuation, and special characters
2. Create a reversed version of the cleaned string
3. Compare the cleaned string with its reversed version
4. Return True if they match, False otherwise

**Encoded Answer (Caesar Cipher, shift=5)**:
Yt hmjhp nk f xywnsl nx f ufqnsiwtrj, hqjfs ymj xywnsl gd wjrtansl stsj-fqumfszrjwnh hmfwfhyjwx fsi htsajwynsl yt qtbjwhfxj, ymjs hmjhp nk ny jvzfqx nyx wjajwxj.

### Challenge 2: Fibonacci Sequence

**Problem**: Generate the first n numbers of the Fibonacci sequence. The Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the two preceding ones (0, 1, 1, 2, 3, 5, 8, 13, ...).

**Input**: A positive integer n representing how many Fibonacci numbers to generate
**Output**: A list containing the first n Fibonacci numbers

**Example 1**:
- Input: n = 5
- Output: [0, 1, 1, 2, 3]

**Example 2**:
- Input: n = 8
- Output: [0, 1, 1, 2, 3, 5, 8, 13]

**Hints**:
1. Remember that the sequence begins with 0 and 1.
2. To generate each new number, you need to keep track of the previous two numbers.
3. Think about how to handle the special cases of the first and second numbers.

**Approach**:
1. Handle the base cases:
   - If n = 1, return [0]
   - If n = 2, return [0, 1]
2. Initialize the result list with [0, 1]
3. Use a loop to generate the remaining n-2 Fibonacci numbers:
   - Calculate the next number by adding the last two numbers in the list
   - Append the new number to the list
4. Return the result list

**Encoded Answer (Keyword Cipher with keyword="FIBONACCI")**:
Vlp smfs Lfimdoccf dakqadca fk efoap md kqjjfde ria vtkr rum dqjiapk fd ria kakqadca. Kaas tvatr rm ria lftqak ml ria bpalrmqk rum raptk rm eadaptra ria dakr rapt.

### Challenge 3: Word Counter

**Problem**: Count the frequency of each word in a text. Words are separated by spaces, and the count should be case-insensitive. Punctuation should be ignored.

**Input**: A string of text (e.g., "The quick brown fox jumps over the lazy dog. The dog was not very lazy.")
**Output**: A list or dictionary of word frequencies

**Example**:
- Input: "The quick brown fox jumps over the lazy dog. The dog was not very lazy."
- Output: 
  - the: 3
  - quick: 1
  - brown: 1
  - fox: 1
  - jumps: 1
  - over: 1
  - lazy: 2
  - dog: 2
  - was: 1
  - not: 1
  - very: 1

**Hints**:
1. You'll need to preprocess the text to handle case and remove punctuation.
2. Consider using a dictionary or similar structure to track word counts.
3. Think about how to split the text into individual words.

**Approach**:
1. Convert the text to lowercase
2. Remove punctuation
3. Split the text into words using spaces as separators
4. Create an empty dictionary to store word frequencies
5. For each word in the list:
   - If the word is already in the dictionary, increment its count
   - Otherwise, add the word to the dictionary with a count of 1
6. Return the dictionary of word frequencies

**Encoded Answer (Transposition Cipher, 4 columns)**:
Urteo wtspo inra lltoh cieec rwado eutdt ohrfo qyenn.c clTw hroee pdnr tcupo untia onto .dTip eecrh tanis uaitn otnap ipotn croe naead tefh tqrso ueohd eercn.y

### Challenge 4: Prime Number Finder

**Problem**: Create an algorithm to find all prime numbers up to n using the Sieve of Eratosthenes method.

**Input**: A positive integer n
**Output**: A list of all prime numbers less than or equal to n

**Example 1**:
- Input: n = 10
- Output: [2, 3, 5, 7]

**Example 2**:
- Input: n = 20
- Output: [2, 3, 5, 7, 11, 13, 17, 19]

**Hints**:
1. The Sieve of Eratosthenes is an efficient way to find all primes up to a given limit.
2. Start by assuming all numbers from 2 to n are prime.
3. Then, systematically mark as non-prime all multiples of each prime, starting from the smallest prime (2).

**Approach**:
1. Create a list of booleans, indexed from 0 to n, initially all set to True (assuming all numbers are prime)
2. Set positions 0 and 1 to False (as 0 and 1 are not prime numbers)
3. Starting from 2, for each number that is marked as prime:
   - Mark all its multiples as non-prime (False)
4. Collect all the positions that are still marked as True - these are the prime numbers
5. Return the list of prime numbers

**Encoded Answer (Binary)**:
01010100 01101000 01100101 00100000 01010011 01101001 01100101 01110110 01100101 00100000 01101111 01100110 00100000 01000101 01110010 01100001 01110100 01101111 01110011 01110100 01101000 01100101 01101110 01100101 01110011 00100000 01101101 01100001 01110010 01101011 01110011 00100000 01100001 01101100 01101100 00100000 01101101 01110101 01101100 01110100 01101001 01110000 01101100 01100101 01110011 00100000 01101111 01100110 00100000 01100101 01100001 01100011 01101000 00100000 01110000 01110010 01101001 01101101 01100101 00100000 01100001 01110011 00100000 01101110 01101111 01101110 00101101 01110000 01110010 01101001 01101101 01100101 00101110

### Challenge 5: Calendar Date Validator

**Problem**: Create an algorithm to determine if a given date is valid. Consider leap years, different month lengths, and basic date format.

**Input**: Three integers representing year, month, and day (e.g., 2025, 3, 16)
**Output**: True if the date is valid, False otherwise

**Example 1**:
- Input: 2025, 2, 28
- Output: True (February 28, 2025 is valid)

**Example 2**:
- Input: 2024, 2, 29
- Output: True (February 29, 2024 is valid because 2024 is a leap year)

**Example 3**:
- Input: 2025, 2, 29
- Output: False (February 29, 2025 is invalid because 2025 is not a leap year)

**Example 4**:
- Input: 2025, 4, 31
- Output: False (April only has 30 days)

**Hints**:
1. Different months have different numbers of days: 31 days (1, 3, 5, 7, 8, 10, 12), 30 days (4, 6, 9, 11), and February (28 or 29 days).
2. A leap year is divisible by 4, except for century years which must be divisible by 400 (e.g., 2000 was a leap year, but 1900 was not).
3. Break the problem down: first validate the month, then validate the day based on the month and year.

**Approach**:
1. Check if the month is valid (between 1 and 12)
2. Determine the number of days in the given month:
   - For months 1, 3, 5, 7, 8, 10, 12: 31 days
   - For months 4, 6, 9, 11: 30 days
   - For month 2 (February):
     - 29 days if the year is a leap year
     - 28 days otherwise
3. Determine if the year is a leap year:
   - If the year is divisible by 400, it is a leap year
   - Otherwise, if the year is divisible by 100, it is not a leap year
   - Otherwise, if the year is divisible by 4, it is a leap year
   - Otherwise, it is not a leap year
4. Check if the day is valid (between 1 and the number of days in that month)
5. Return True if all checks pass, False otherwise

**Encoded Answer (Caesar Cipher, shift=7)**:
Ã¥ zçkhz pm h khav pz chspk, mpyza jvumpyt aola aol tvaao pz iladllu 1 huk 12. Aolu joljr pm aol khf pz iladllu 1 huk aol theptbt khfz pu aola tvaao, ahruon puav hjjvbua slhw flhyz mvy Mliybhyf.

## Extension Activities

1. **Palindrome Enhancement**: Modify the palindrome checker to find the longest palindromic substring within a given string.

2. **Fibonacci Optimization**: Implement an optimized version of the Fibonacci sequence generator that uses memoization to avoid redundant calculations.

3. **Text Analysis**: Extend the word counter to also track the average word length, most frequent word, and longest word in the text.

4. **Prime Number Extension**: Modify the prime number finder to determine if a given large number is prime using the Miller-Rabin primality test.

5. **Date Calculator**: Create an algorithm that calculates the number of days between two valid dates.

## Reflection Questions

1. How did your approach to these challenges differ from the beginner challenges?

2. Which problem-solving techniques were most useful for these intermediate challenges?

3. Did you find yourself reusing any algorithms or patterns from earlier challenges?

4. How did you break down the more complex problems into manageable steps?

5. What strategies did you use when you got stuck on a challenge?

## Connection to Programming

These intermediate challenges demonstrate several important programming concepts and patterns:

- **Data Preprocessing** (Challenge 1 & 3): Cleaning and normalizing data before processing it is a common requirement in real-world applications.

- **Sequence Generation** (Challenge 2): Generating sequences according to specific rules is fundamental to many mathematical and simulation algorithms.

- **Data Structure Selection** (Challenge 3): Choosing the right data structure (like a dictionary for word counting) is critical for efficient algorithm implementation.

- **Mathematical Algorithms** (Challenge 4): The Sieve of Eratosthenes demonstrates how mathematical knowledge can lead to efficient algorithms.

- **Business Rules Implementation** (Challenge 5): Date validation represents how complex real-world rules (like leap year calculations) are translated into logical code sequences.

As you continue to develop your programming skills, you'll find these patterns recurring in different contexts and applications.
