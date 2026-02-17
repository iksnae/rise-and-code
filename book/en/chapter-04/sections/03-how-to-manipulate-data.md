# How to Manipulate Data

## Introduction

Now that you know data types and variables, let's transform raw data into useful results. This is the heart of programming: taking input, processing it, and making something useful. This section teaches you how to work with and transform different types of data.

## Why We Manipulate Data

Raw data isn't always useful. We need to:
- Combine pieces (join names and addresses)
- Extract parts (get just the area code from a phone number)
- Convert formats (text "42" into number 42)
- Calculate (find totals, averages, percentages)
- Filter (keep only items that matter)

Manipulation turns raw data into actionable information.

## Working With Different Types

### Numbers 🔢

Basic math:
```
total = 5 + 3        # 8
difference = 10 - 4  # 6
product = 6 * 7      # 42
quotient = 20 / 4    # 5
remainder = 10 % 3   # 1
power = 2 ^ 3         # 8
```

Fancy functions:
```
absolute = ABS(-15)       # 15
root = SQRT(25)           # 5
rounded = ROUND(3.7)      # 4
```

Real example:
```
price = 4.99
quantity = 3
subtotal = price * quantity     # 14.97
tax = subtotal * 0.08           # 1.1976
total = subtotal + tax          # 16.1676
```

### Text (Strings) 📝

**Join**:
```
first = "Maria"
last = "Singh"
full = first + " " + last    # "Maria Singh"
```

**Extract**:
```
message = "Hello, World!"
first_char = message[0]      # "H"
word = SUBSTRING(message, 7, 5)  # "World"
```

**Transform**:
```
text = "Hello World"
upper = UPPERCASE(text)      # "HELLO WORLD"
lower = LOWERCASE(text)      # "hello world"
replaced = REPLACE(text, "World", "Sofia")  # "Hello Sofia"
```

### True/False ✓

```
is_sunny = true
is_warm = true
is_weekend = false

good_day = is_sunny AND is_warm     # true
go_out = is_sunny OR is_warm        # true
working = NOT is_weekend            # true
```

### Collections 📦

**Lists**:
```
fruits = ["apple", "banana", "orange"]
ADD fruits, "mango"              # Add item
REMOVE fruits, "banana"          # Remove item
first = fruits[0]                # "apple"
count = LENGTH(fruits)           # 3
has_orange = CONTAINS(fruits, "orange")  # true
```

**Dictionaries**:
```
student = {name: "Aisha", grade: 85}
student["age"] = 16              # Add new field
student["grade"] = 87            # Update field
name = student["name"]           # "Aisha"
```

## Type Conversion 🔄

Switch between types when needed:

```
# String → Number
age_string = "25"
age_number = NUMBER(age_string)      # 25

# Number → String
temp = 37.5
temp_string = STRING(temp)           # "37.5"

# Number → True/False
BOOLEAN(0)      # false
BOOLEAN(42)     # true

# String → True/False
BOOLEAN("true")    # true
BOOLEAN("")        # false
```

## Decisions With Data 🎯

Control what happens based on data:

```
age = 15

IF age >= 18
    message = "You are an adult"
ELSE
    message = "You are a minor"
END IF

# message = "You are a minor"
```

This is decision-making—we covered it in Chapter 2.

## Real Examples 💡

**Processing user info**:
```
full_name = "Maria Garcia Rodriguez"
birth_year = "1995"

# Split name and extract last name
names = SPLIT(full_name, " ")
first = names[0]           # "Maria"
last = names[2]            # "Rodriguez"

# Calculate age
age = 2025 - NUMBER(birth_year)  # 30

# Create profile
profile = "Name: " + first + " " + last + "\nAge: " + STRING(age)
```

**Shopping cart**:
```
items = [{name: "Pen", price: 2.50, qty: 3}, ...]

subtotal = 0
FOR EACH item IN items
    subtotal = subtotal + (item["price"] * item["qty"])
END FOR

tax = subtotal * 0.06
total = subtotal + tax
```

## Check Data Validity ✓

Make sure data makes sense before using it:

```
age_input = "25"
is_valid = false

IF IS_NUMBER(age_input)
    age = NUMBER(age_input)
    IF age >= 0 AND age <= 120
        is_valid = true
    END IF
END IF
```

## Common Patterns 🔄

**Format for display**: "$" + price, dates, times
**Count items**: How many match criteria?
**Filter**: Keep only items that meet conditions
**Search**: Find specific items

## Cautions ⚠️

- Types must match (can't add number + text directly)
- Decimal math can have rounding issues (0.1 + 0.2 ≠ 0.3 sometimes!)
- Big operations take more time
- Don't accidentally lose data when transforming

## Activity: Data Challenge 🎯

Given:
```
name = "Fatima Ibrahim"
birth_date = "15/04/2009"
scores = [88, 92, 79, 94, 85]
```

Write pseudocode to:
1. Create username: first letter of first name + last name (lowercase)
2. Calculate age (current year 2025)
3. Average score
4. Passed? (average >= 80)
5. Create summary string with all info

**See Activity Sheet 4C** for hints!

## Key Takeaways ✨

- Data manipulation transforms raw data into useful results
- Different types have different operations
- Type conversion bridges between types (but be careful!)
- Combine manipulations to solve complex problems
- Validate data before using it
- Understanding data manipulation is key to programming

**Next**: Loops—repeat operations to process lots of data efficiently!
