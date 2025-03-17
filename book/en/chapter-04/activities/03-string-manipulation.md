# Activity: String Manipulation - Word Play

## Overview
This activity explores how to manipulate and transform text data (strings). By working with strings through hands-on exercises, you'll understand how programs process and modify text—one of the most common types of data in programming.

## Learning Objectives
- Understand how text data is stored and manipulated in programs
- Practice common string operations like concatenation, substring extraction, and case conversion
- Develop skills for working with text patterns and transformations
- Create visual representations of string operations
- Apply string manipulation to solve simple problems

## Materials Needed
- Your notebook
- Pencil and eraser
- Scissors
- Paper (preferably different colors)
- Tape or glue
- Optional: index cards

## Time Required
45-60 minutes

## Instructions

### Part 1: Paper String Representations

First, let's create physical representations of strings to understand how they work:

1. Cut out 10-15 small rectangles of paper (around 2-3cm × 5cm)
2. On each rectangle, write a single character (letter, number, or symbol)
3. Create these sample strings by arranging the papers in sequence:
   - "Hello"
   - "World"
   - "2025"
   - "Rise & Code"

Keep these paper strings for use in the following exercises.

### Part 2: String Operations with Paper

Now, let's perform string operations using our paper representation:

#### 1. Concatenation (Joining Strings)
Take your "Hello" and "World" strings and:
1. Arrange them side by side
2. Draw how the result looks: "HelloWorld"
3. Now insert a space character between them
4. Draw the new result: "Hello World"

In your notebook, write the operation as:
```
SET string1 = "Hello"
SET string2 = "World"
SET result = string1 + " " + string2
```

#### 2. Extracting Substrings
Using your "Rise & Code" string:
1. Identify each character's position (index), starting from 0
2. Extract the substring "Rise" by taking characters 0-3
3. Extract the substring "Code" by taking characters 6-9
4. In your notebook, write these operations as:
```
SET text = "Rise & Code"
SET first_word = SUBSTRING(text, 0, 4)  // "Rise"
SET second_word = SUBSTRING(text, 6, 4)  // "Code"
```

#### 3. String Transformation
Take your "hello" string (make a new one if needed):
1. Create an uppercase version by replacing each lowercase letter with its uppercase equivalent
2. Write the operation:
```
SET lowercase = "hello"
SET uppercase = UPPERCASE(lowercase)  // "HELLO"
```

### Part 3: String Manipulation Worksheets

In your notebook, complete these string manipulation exercises:

#### Exercise 1: Name Formatter
Given these inputs:
- first_name = "maria"
- last_name = "SILVA"

Write the operations to create:
1. A properly capitalized full name: "Maria Silva"
2. A username using first initial and last name: "msilva"
3. An email address: "maria.silva@example.com"

#### Exercise 2: Sentence Analyzer
Given this input:
- sentence = "The quick brown fox jumps over the lazy dog."

Write operations to find:
1. The length of the sentence
2. The first word
3. The last word
4. A list of all the words (hint: split by spaces)
5. The sentence with "fox" replaced by "cat"

#### Exercise 3: Password Validator
Given a password string:
- password = "Secure123!"

Write operations to check if it meets these criteria:
1. Is at least 8 characters long
2. Contains at least one uppercase letter
3. Contains at least one number
4. Contains at least one special character (!@#$%^&*)

### Part 4: Creative String Challenges

Now, try these more creative string manipulation challenges. Draw or construct your solution in your notebook:

#### Challenge 1: Message Reverser
Create a step-by-step process to reverse the characters in a string.
Example: "hello" → "olleh"

1. Draw each step of your process
2. Test it on at least three different words
3. Write the pseudocode for your solution

#### Challenge 2: Word Scrambler
Design a method to scramble the middle letters of words while keeping the first and last letters in place.
Example: "programming" → "prgrmoaming"

1. Create a visual diagram of your approach
2. Test it on at least three different words
3. Write the pseudocode for your solution

#### Challenge 3: String Calculator
Create a function that takes a string like "12+34" and calculates the result.

1. Break down the steps to extract the numbers and operator
2. Show how you'd convert the string numbers to actual numbers
3. Demonstrate how to perform the calculation
4. Test with examples like "5+7", "20-5", and "4*6"

### Part 5: String Art Project

Create a visual "string art" project that demonstrates at least three different string operations:

1. Choose a starting string (your name, a favorite word, etc.)
2. Apply three different operations to transform it
3. Create a visual diagram showing each step of the transformation
4. Label each operation and explain what's happening

Example transformations:
- Concatenation with another string
- Extracting a substring
- Changing case (upper/lower)
- Replacing characters
- Reversing the string

### Part 6: Real-World String Processing

Strings are used in many real-world applications. For each of these scenarios, describe how string processing would be used:

1. A search engine finding relevant web pages
2. A spell checker in a word processor
3. A messaging app showing previews of conversations
4. A contact management system organizing names
5. A language translation tool

In your notebook, write a brief explanation of what string operations would be needed for each scenario.

## Example Solutions

Here's an example solution for Exercise 1 (Name Formatter):

```
# Start with the input
SET first_name = "maria"
SET last_name = "SILVA"

# Properly capitalize the first name
SET first_letter = UPPERCASE(SUBSTRING(first_name, 0, 1))  // "M"
SET rest_of_first = LOWERCASE(SUBSTRING(first_name, 1, LENGTH(first_name) - 1))  // "aria"
SET capitalized_first = first_letter + rest_of_first  // "Maria"

# Properly capitalize the last name
SET first_letter_last = UPPERCASE(SUBSTRING(last_name, 0, 1))  // "S"
SET rest_of_last = LOWERCASE(SUBSTRING(last_name, 1, LENGTH(last_name) - 1))  // "ilva"
SET capitalized_last = first_letter_last + rest_of_last  // "Silva"

# Create full name
SET full_name = capitalized_first + " " + capitalized_last  // "Maria Silva"

# Create username
SET username = LOWERCASE(SUBSTRING(first_name, 0, 1) + last_name)  // "msilva"

# Create email
SET email = LOWERCASE(first_name) + "." + LOWERCASE(last_name) + "@example.com"  // "maria.silva@example.com"
```

## Reflection Questions

After completing the activities, reflect on these questions:

1. What patterns did you notice in the string manipulation operations?
2. Which string operations seemed most useful for everyday programming tasks?
3. How are strings similar to or different from other data types we've learned about?
4. What challenges did you encounter when manipulating strings?
5. What real-world problems could you solve using string manipulation?
6. How might a computer store and process text differently than how we visualized it?

## Extension Activities

1. **Pattern Matching**: Create a simple wildcard pattern matcher that can check if a string matches a pattern like "a*b" (any string that starts with 'a' and ends with 'b').

2. **Morse Code Translator**: Design a system that converts English text to Morse code (or vice versa).

3. **Text Adventure**: Create a simple text adventure game that uses string commands like "go north" or "take key" and parses them to determine actions.

4. **Data Extractor**: Design a process to extract structured information from text strings like "Name: John Doe, Age: 25, Location: New York".

## Connection to Programming

String manipulation is a fundamental skill in programming. Almost all programs deal with text in some form, from user interfaces to data processing. The operations you've practiced here—concatenation, substring extraction, case conversion, and replacement—are among the most common string operations in programming languages.

These exercises have given you hands-on experience with how programs process and transform text data, which will serve as a foundation when you begin coding in a specific programming language.

## Key Takeaways

- Strings are sequences of characters that can be manipulated through various operations
- Common string operations include concatenation, substring extraction, and character replacement
- String indexes usually start at 0, not 1
- String operations often create new strings rather than modifying existing ones
- String manipulation is essential for processing text input, formatting output, and validating data
- The ability to process and transform text is a fundamental programming skill
