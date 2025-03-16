# Beginner Coding Challenges

This set of beginner-level challenges is designed to build your programming fundamentals through hands-on practice. Each challenge includes a clear problem statement, examples, hints, and a complete solution.

## Challenge 1: Even Number Counter

### Problem Statement
Create an algorithm that counts the number of even numbers in a list of integers.

### Required Skills
- Basic loops
- Conditional statements
- Modulo operation

### Example
Input: `[1, 2, 3, 4, 5, 6, 7, 8]`
Output: `4` (the even numbers are 2, 4, 6, and 8)

### Workspace Setup
- `numbers` - The input list
- `count` - Running total of even numbers found
- Loop structure to iterate through the list

### Hints
1. Remember that even numbers can be divided by 2 with no remainder
2. Use the modulo operator (`%`) to check for even numbers
3. Initialize a counter variable before your loop begins

### Solution
```
function countEvenNumbers(numbers):
    count = 0
    for num in numbers:
        if num % 2 == 0:
            count = count + 1
    return count
```

## Challenge 2: String Reversal

### Problem Statement
Create an algorithm that reverses a string without using built-in reverse functions.

### Required Skills
- String manipulation
- Loop structures
- Variable assignment

### Example
Input: `"hello"`
Output: `"olleh"`

### Workspace Setup
- `input_string` - The original string
- `reversed_string` - The string being built in reverse order
- Loop structure to iterate through the input

### Hints
1. Consider processing the input string one character at a time
2. You can build a new string by adding characters to the front
3. Try working through the input string from right to left

### Solution
```
function reverseString(input_string):
    reversed_string = ""
    for i = length(input_string) - 1; i >= 0; i--:
        reversed_string = reversed_string + input_string[i]
    return reversed_string
```

## Challenge 3: Sum of Digits

### Problem Statement
Create an algorithm that calculates the sum of all digits in a given integer.

### Required Skills
- Number manipulation
- Modulo and integer division
- Loop structures

### Example
Input: `123`
Output: `6` (1 + 2 + 3 = 6)

### Workspace Setup
- `number` - The input integer
- `sum` - Running total of digits
- Loop to extract and add each digit

### Hints
1. You can extract the rightmost digit of a number using the modulo operator (`%`)
2. After extracting a digit, you can remove it by integer division (`//`)
3. Continue this process until the number becomes zero

### Solution
```
function sumDigits(number):
    sum = 0
    while number > 0:
        digit = number % 10
        sum = sum + digit
        number = number // 10
    return sum
```

## Challenge 4: Find Maximum Value

### Problem Statement
Create an algorithm that finds the maximum value in a list of numbers without using built-in max functions.

### Required Skills
- Variables and assignment
- Loop structures
- Comparison operators

### Example
Input: `[12, 45, 7, 23, 56, 9]`
Output: `56`

### Workspace Setup
- `numbers` - The input list
- `max_value` - The current maximum value
- Loop to compare each value

### Hints
1. Start by assuming the first number is the maximum
2. Compare each subsequent number with the current maximum
3. If a larger number is found, update the maximum

### Solution
```
function findMaximum(numbers):
    if length(numbers) == 0:
        return null  # Handle empty list case
    max_value = numbers[0]
    for i = 1; i < length(numbers); i++:
        if numbers[i] > max_value:
            max_value = numbers[i]
    return max_value
```

## Challenge 5: Word Counter

### Problem Statement
Create an algorithm that counts the number of words in a string, assuming words are separated by spaces.

### Required Skills
- String manipulation
- Counting techniques
- Basic loops

### Example
Input: `"The quick brown fox jumps over the lazy dog"`
Output: `9`

### Workspace Setup
- `sentence` - The input string
- `word_count` - Running count of words
- Logic to identify word boundaries

### Hints
1. Spaces typically separate words in a sentence
2. Consider the edge cases of having multiple consecutive spaces
3. Think about how to handle an empty string

### Solution
```
function countWords(sentence):
    if length(sentence) == 0:
        return 0
    
    word_count = 0
    is_word = false
    
    for i = 0; i < length(sentence); i++:
        # If current character is not a space
        if sentence[i] != ' ':
            # If we weren't previously in a word, we found a new word
            if is_word == false:
                word_count = word_count + 1
                is_word = true
        else:
            # We found a space, so we're not in a word anymore
            is_word = false
    
    return word_count
```

## Reflection Questions

After completing these challenges, consider:

1. Which challenge was most difficult for you and why?
2. Did you develop any reusable problem-solving patterns?
3. How would you modify these algorithms to handle different input conditions?
4. Could any of these solutions be written more efficiently or clearly?

## Next Steps

Once you're comfortable with these beginner challenges, move on to the intermediate challenges which will combine multiple concepts and require more advanced problem-solving approaches.