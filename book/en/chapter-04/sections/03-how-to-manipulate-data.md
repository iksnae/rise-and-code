# Transform Your Data

## Introduction

Now that we understand what data is and how it's stored in variables with specific types, it's time to explore how we can work with and transform this data. Data manipulation is the heart of programming—it's where we turn raw information into meaningful results.

In this section, we'll learn about the various ways we can manipulate different types of data, transforming inputs into useful outputs. These skills form the foundation for solving problems through programming.

## The Power of Data Manipulation

Data rarely arrives in exactly the format we need. We often need to:
- Combine separate pieces of information
- Extract portions of data
- Convert between different formats or types
- Calculate new values based on existing data
- Filter information based on certain criteria

These transformations turn raw data into actionable information, helping us answer questions and solve problems.

## Basic Operations on Different Data Types

Let's explore the most common operations for each data type, with examples using pseudocode.

### Manipulating Numbers

Numbers are perhaps the most straightforward to manipulate, using familiar mathematical operations:

#### Arithmetic Operations
```
# Addition
SET total = 5 + 3           # total = 8

# Subtraction
SET difference = 10 - 4     # difference = 6

# Multiplication
SET product = 6 * 7         # product = 42

# Division
SET quotient = 20 / 4       # quotient = 5

# Remainder (modulus)
SET remainder = 10 % 3      # remainder = 1 (10 divided by 3 leaves remainder 1)

# Exponentiation (power)
SET power = 2 ^ 3           # power = 8 (2 raised to the power of 3)
```

#### More Complex Mathematical Operations
```
# Absolute value (distance from zero)
SET absolute = ABS(-15)     # absolute = 15

# Square root
SET root = SQRT(25)         # root = 5

# Rounding
SET rounded = ROUND(3.7)    # rounded = 4
```

#### Using Variables in Calculations
```
SET price = 4.99
SET quantity = 3
SET subtotal = price * quantity               # subtotal = 14.97
SET tax_rate = 0.08
SET tax_amount = subtotal * tax_rate          # tax_amount = 1.1976
SET total = subtotal + tax_amount             # total = 16.1676
SET rounded_total = ROUND(total * 100) / 100  # rounded_total = 16.17
```

### Manipulating Text (Strings)

Text manipulation is essential for working with names, messages, and other textual information:

#### Joining Strings (Concatenation)
```
SET first_name = "Maria"
SET last_name = "Singh"
SET full_name = first_name + " " + last_name     # full_name = "Maria Singh"

SET greeting = "Hello, " + full_name + "!"       # greeting = "Hello, Maria Singh!"
```

#### Accessing Parts of Strings
```
SET message = "Hello, World!"

# Get a single character (indexing usually starts at 0)
SET first_char = message[0]                 # first_char = "H"
SET sixth_char = message[5]                 # sixth_char = ","

# Get a substring (portion of the string)
# SUBSTRING(string, start_index, length)
SET substring = SUBSTRING(message, 7, 5)    # substring = "World"
```

#### String Transformations
```
SET sentence = "The quick brown fox jumps over the lazy dog."

# Convert to uppercase
SET upper = UPPERCASE(sentence)      # "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."

# Convert to lowercase
SET lower = LOWERCASE(sentence)      # "the quick brown fox jumps over the lazy dog."

# Replace text
SET replaced = REPLACE(sentence, "fox", "cat")  
# replaced = "The quick brown cat jumps over the lazy dog."

# Find the position of text
SET position = FIND(sentence, "jumps")     # position = 20
```

#### Combining String Operations
```
SET user_input = "  john.doe@example.com  "

# Remove extra spaces at beginning and end
SET trimmed = TRIM(user_input)              # "john.doe@example.com"

# Check if it contains the @ symbol (for email validation)
SET has_at_symbol = CONTAINS(trimmed, "@")  # true

# Extract username (everything before the @)
SET at_position = FIND(trimmed, "@")        # at_position = 8
SET username = SUBSTRING(trimmed, 0, at_position)  # username = "john.doe"
```

### Manipulating Boolean Values

Boolean manipulation involves logical operations that we covered in Chapter 2:

```
SET is_sunny = true
SET is_warm = true
SET weekend = false

# AND operation (both must be true)
SET good_beach_day = is_sunny AND is_warm           # good_beach_day = true

# OR operation (at least one must be true)
SET go_outside = is_sunny OR is_warm                # go_outside = true

# NOT operation (reverses the boolean)
SET work_day = NOT weekend                          # work_day = true

# Combining operations
SET perfect_day = (is_sunny AND is_warm) AND weekend    # perfect_day = false
```

### Working with Collections

Collections like lists and dictionaries have their own set of operations:

#### List Operations
```
# Create a list
SET fruits = ["apple", "banana", "orange"]

# Add an item
ADD fruits, "mango"                      # fruits = ["apple", "banana", "orange", "mango"]

# Remove an item
REMOVE fruits, "banana"                  # fruits = ["apple", "orange", "mango"]

# Access an item (indexing usually starts at 0)
SET first_fruit = fruits[0]              # first_fruit = "apple"

# Find the number of items
SET fruit_count = LENGTH(fruits)         # fruit_count = 3

# Check if an item exists
SET has_orange = CONTAINS(fruits, "orange")   # has_orange = true

# Join items into a string
SET fruit_list = JOIN(fruits, ", ")      # fruit_list = "apple, orange, mango"
```

#### Working with Dictionary/Object Data
```
# Create a dictionary (key-value pairs)
SET student = {name: "Aisha", grade: 85, passed: true}

# Add or update a value
SET student["age"] = 16                   # Adds a new key-value pair
SET student["grade"] = 87                 # Updates existing value

# Access a value
SET student_name = student["name"]        # student_name = "Aisha"

# Get all keys
SET fields = KEYS(student)                # fields = ["name", "grade", "passed", "age"]

# Check if a key exists
SET has_address = CONTAINS(KEYS(student), "address")   # has_address = false
```

## Data Conversion (Type Casting)

Often, we need to convert data between different types:

```
# String to number
SET age_string = "25"
SET age_number = NUMBER(age_string)        # age_number = 25 (as a number)

# Number to string
SET temperature = 37.5
SET temp_string = STRING(temperature)      # temp_string = "37.5"

# Number to boolean
SET zero_as_bool = BOOLEAN(0)              # zero_as_bool = false
SET nonzero_as_bool = BOOLEAN(42)          # nonzero_as_bool = true

# String to boolean
SET true_string = BOOLEAN("true")          # true_string = true
SET empty_string = BOOLEAN("")             # empty_string = false (in many languages)
```

Converting between data types is necessary but can sometimes lead to errors or unexpected results. For example, trying to convert "hello" to a number would typically result in an error.

## Controlling the Flow of Data

In addition to manipulating individual pieces of data, programs often need to control how data flows through the program based on conditions:

```
SET age = 15

# Conditional data flow (if statements)
IF age >= 18 THEN
    SET message = "You are an adult."
ELSE
    SET message = "You are a minor."
END IF

# At this point, message = "You are a minor."
```

This is how programs make decisions based on data, which we covered in detail in Chapter 2.

## Practical Data Manipulation Examples

Let's look at some real-world examples that combine multiple data manipulation techniques:

### Example 1: Processing User Information
```
# Starting with user input
SET full_name = "Maria Garcia Rodriguez"
SET birth_year = "1995"
SET favorite_colors = "blue, green, purple"

# Process the data
SET name_parts = SPLIT(full_name, " ")
SET first_name = name_parts[0]
SET last_name = name_parts[LENGTH(name_parts) - 1]

SET current_year = 2025
SET age = current_year - NUMBER(birth_year)

SET color_list = SPLIT(favorite_colors, ", ")
SET color_count = LENGTH(color_list)
SET primary_color = color_list[0]

# Create formatted output
SET profile = "User Profile:\n"
SET profile = profile + "Name: " + first_name + " " + last_name + "\n"
SET profile = profile + "Age: " + STRING(age) + "\n"
SET profile = profile + "Colors (" + STRING(color_count) + "): " + favorite_colors

# Result:
# User Profile:
# Name: Maria Rodriguez
# Age: 30
# Colors (3): blue, green, purple
```

### Example 2: Shopping Cart Calculation
```
# Shopping cart items with prices
SET cart = [
    {name: "Notebook", price: 4.99, quantity: 2},
    {name: "Pens (pack)", price: 3.49, quantity: 1},
    {name: "Highlighters", price: 5.99, quantity: 3}
]

# Calculate the total
SET subtotal = 0
SET item_count = 0

# Loop through each item (we'll learn more about loops in the next chapter)
FOR EACH item IN cart DO
    SET item_total = item["price"] * item["quantity"]
    SET subtotal = subtotal + item_total
    SET item_count = item_count + item["quantity"]
END FOR

# Apply discount if subtotal is over 20
SET discount = 0
IF subtotal > 20 THEN
    SET discount = subtotal * 0.1  # 10% discount
    SET subtotal = subtotal - discount
END IF

# Add tax
SET tax_rate = 0.06  # 6% tax
SET tax = subtotal * tax_rate
SET total = subtotal + tax

# Format the receipt
SET receipt = "Receipt:\n"
SET receipt = receipt + "Items: " + STRING(item_count) + "\n"
SET receipt = receipt + "Subtotal: $" + STRING(ROUND(subtotal * 100) / 100) + "\n"

IF discount > 0 THEN
    SET receipt = receipt + "Discount: $" + STRING(ROUND(discount * 100) / 100) + "\n"
END IF

SET receipt = receipt + "Tax: $" + STRING(ROUND(tax * 100) / 100) + "\n"
SET receipt = receipt + "Total: $" + STRING(ROUND(total * 100) / 100)

# Result would be something like:
# Receipt:
# Items: 6
# Subtotal: $25.44
# Discount: $2.83
# Tax: $1.53
# Total: $26.97
```

## Data Validation and Error Handling

An important part of data manipulation is making sure the data we're working with is valid and handling any errors that might occur:

### Validation Examples
```
# Check if input is a valid age
SET age_input = "25"
SET is_valid_age = false

# Try to convert to number
IF IS_NUMBER(age_input) THEN
    SET age = NUMBER(age_input)
    
    # Check if age is reasonable
    IF age >= 0 AND age <= 120 THEN
        SET is_valid_age = true
    END IF
END IF

# Validate an email address (simplified)
SET email = "user@example.com"
SET is_valid_email = false

IF CONTAINS(email, "@") AND CONTAINS(email, ".") THEN
    SET at_position = FIND(email, "@")
    SET dot_position = FIND(email, ".")
    
    # Check if @ comes before . and neither is at start or end
    IF at_position > 0 AND dot_position > at_position + 1 AND dot_position < LENGTH(email) - 1 THEN
        SET is_valid_email = true
    END IF
END IF
```

## Common Data Manipulation Patterns

Certain data manipulation patterns appear frequently in programming. Here are some common ones:

### Formatting Data for Display
```
# Format currency
SET price = 1234.56
SET formatted_price = "$" + STRING(price)  # $1234.56

# Format with thousand separators and 2 decimal places
SET better_format = "$" + FORMAT_NUMBER(price, 2, ",")  # $1,234.56

# Format a date (assuming we have date components)
SET year = 2025
SET month = 3
SET day = 16
SET formatted_date = STRING(day) + "/" + STRING(month) + "/" + STRING(year)  # 16/3/2025
```

### Counting and Aggregating
```
# Count specific items
SET text = "How much wood would a woodchuck chuck if a woodchuck could chuck wood?"
SET words = SPLIT(text, " ")
SET word_count = LENGTH(words)  # 13

# Count occurrences of a specific word
SET target = "wood"
SET occurrences = 0

FOR EACH word IN words DO
    IF LOWERCASE(word) == target THEN
        SET occurrences = occurrences + 1
    END IF
END FOR  # occurrences = 2
```

### Filtering and Searching
```
# Find students with grades above 80
SET students = [
    {name: "Alex", grade: 78},
    {name: "Bianca", grade: 92},
    {name: "Carlos", grade: 85},
    {name: "Diana", grade: 76}
]

SET high_performers = []

FOR EACH student IN students DO
    IF student["grade"] > 80 THEN
        ADD high_performers, student
    END IF
END FOR  # high_performers contains Bianca and Carlos
```

## Limitations and Considerations

When manipulating data, be aware of these important considerations:

1. **Type Compatibility**: Operations require compatible data types. For example, you can't directly add numbers and strings.

2. **Precision Issues**: Floating-point numbers (decimals) can have precision problems. For example, 0.1 + 0.2 might not be exactly 0.3 in some languages.

3. **Performance**: Some operations are more computationally expensive than others, especially with large datasets.

4. **Data Integrity**: When manipulating data, be careful not to lose information accidentally.

5. **Immutability vs. Mutability**: Some operations create new data values while others modify existing ones.

## Activity: Data Transformation Challenge

Try this exercise to practice data manipulation:

Given this information about a student:
```
name = "Fatima Ibrahim"
birth_date = "15/04/2009"
scores = [88, 92, 79, 94, 85]
```

Write pseudocode to:
1. Create a username from the first letter of the first name and the full last name, all lowercase
2. Calculate the student's age (assuming current year is 2025)
3. Calculate the average score
4. Determine if the student passed (average >= 80)
5. Create a formatted summary string with all this information

(Hint: You'll need to use string manipulation, calculations, and type conversions)

## Key Takeaways

- Data manipulation is essential for transforming raw data into useful information
- Different data types have different operations available to them
- Converting between data types is often necessary but requires care
- Combining multiple data manipulations allows you to solve complex problems
- Data validation ensures your operations work with valid inputs
- Understanding how to manipulate data effectively is key to creating useful programs

In the next chapter, we'll build on these concepts to explore how to repeat operations using loops, which will allow us to process larger amounts of data efficiently.
