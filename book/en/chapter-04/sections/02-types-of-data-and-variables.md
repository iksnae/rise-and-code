# Types of Data and Variables

## Introduction

Different data is different. A name isn't like a number. A yes/no answer isn't like a temperature. This section teaches you the main data types and how to store data in labeled containers called **variables**. Together, data types and variables are the foundation of working with information in programming.

## Main Data Types

Different data types, different powers.

### 1. Numbers 🔢

**Integers**: Whole numbers (42, -7, 0)
**Decimals**: Numbers with fractions (3.14, 98.6, -0.5)

**Use for**: Counting, measuring, calculating, scoring

**Operations**: Add, subtract, multiply, divide

### 2. Text (Strings) 📝

Sequences of characters: letters, numbers, symbols, spaces.

**Examples**: "Hello!", "Sofia", "42 Main St", "✨🌟"

**Use for**: Names, messages, labels, descriptions

**Operations**: Join strings, search, extract parts

### 3. True/False (Booleans) ✓

Only two values: true or false (yes or no, on or off)

**Examples**: Is it raining? (true/false), Is 5 > 3? (true)

**Use for**: Decisions, checking conditions, storing on/off states

**Operations**: AND, OR, NOT

### 4. Collections 📦

**Lists**: Ordered groups of items
- [1, 2, 3, 4, 5]
- ["apple", "banana", "orange"]

**Key-Value Pairs (Dictionaries)**: Labeled groups
- {name: "Sofia", age: 25, city: "Lima"}

**Use for**: Grouping related data

### 5. Special Types

**Date/Time**: Calendar dates and clock times
**Null/None**: The absence of data
**Custom**: You can create your own types (advanced)

### Type Compatibility

Different types follow different rules:
- ✓ Add numbers: 5 + 3 = 8
- ✓ Join strings: "Hello " + "world" = "Hello world"
- ✗ Add number + string: 5 + "apples" → ERROR

**Type Conversion**: Switch between types
- String "42" → Number 42
- Number 3.14 → String "3.14"
- 0 → False, any other number → True

## Variables: Data Containers 📦

A variable is a labeled box that holds data. Every variable has:

1. **Name**: How you refer to it (age, name, score)
2. **Value**: What's inside (25, "Sofia", 98)
3. **Type**: What kind of data (number, text, true/false)

### Three Ways to Think About Variables

- **Labeled boxes**: Store data, grab it later by the label
- **Name tags**: Give names to data so you can talk about it
- **Memory homes**: Computer reserves a spot to remember your data

### Working With Variables

**Create and store**:
```
SET age = 25
```

**Use it**:
```
SET price = 5
SET quantity = 3
SET total = price * quantity  # total = 15
```

**Change it**:
```
SET counter = 1
SET counter = counter + 1  # Now 2
SET counter = counter + 1  # Now 3
```

It's called a "variable" because the value can change.

### Naming Variables

Good names are:
- **Clear**: `age` not `x`; `total_cost` not `t`
- **Short**: Not too long, not too short
- **Consistent**: Follow a style (all lowercase, use underscores, etc.)
- **Valid**: Follow language rules

```
# Good names
age, name, total_price, is_valid

# Poor names
x, stuff, a, temp123
```

### Examples in Code

```
# Numbers
SET age = 25
SET price = 4.99

# Text
SET name = "Sofia"
SET message = "Hello!"

# True/False
SET is_registered = true
SET has_permission = false

# Collections
SET fruits = ["apple", "banana", "mango"]
SET person = {name: "Carlos", age: 15, grade: "A"}

# Using them
SET greeting = "Hi, " + name
SET total = price * quantity
SET ready = is_registered AND has_permission
```

### How Computers Remember

When you create a variable, the computer:
1. Finds a spot in memory
2. Links your variable name to that spot
3. Stores your data there

When you ask for the variable, the computer finds that spot and gets the data.

## Operations by Type

Different types, different actions:

**Numbers**: `+`, `-`, `*`, `/`, `%` (remainder), `^` (power)
- 5 + 3 = 8
- 10 % 3 = 1 (remainder)
- 2 ^ 3 = 8

**Text**: Join, find, count, extract
- "Hello " + "world" = "Hello world"
- LENGTH("hello") = 5
- Search for patterns

**True/False**: AND, OR, NOT
- true AND false = false
- NOT true = false

**Collections**: Add, remove, access, count
- Add "orange" to list
- Get item at position [0]
- COUNT how many items

## Activity: Name the Type! 🏷️

What type is each?

1. 42 → ?
2. "42" → ?
3. 3.14 → ?
4. true → ?
5. "true" → ?
6. [1, 2, 3] → ?
7. {name: "Sofia"} → ?

**Answers**: 1. Number, 2. String, 3. Number (decimal), 4. Boolean, 5. String, 6. List, 7. Dictionary

**See Activity Sheet 4B!**

## Key Takeaways ✨

- Data types organize information: numbers, text, true/false, collections
- Variables are named containers for data
- Different types support different operations
- You can convert between types (e.g., "42" → 42)
- Learning types prevents errors and powers your programs

**Next**: Transforming and manipulating data—making it useful!
