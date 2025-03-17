# Types of Data and Variables

## Introduction

In the previous section, we learned that data is information that programs can work with. But not all data is the same—a name, a temperature reading, and a yes/no answer are fundamentally different kinds of information that need to be handled differently. This is where data types come in.

Additionally, programs need a way to store and reference data. This is where variables become essential—they're like labeled containers that hold our data. In this section, we'll explore both data types and variables, which together form the foundation for working with information in programming.

## Data Types: Categories of Information

A data type defines what kind of data we're working with and what operations we can perform on it. Just as containers in your kitchen come in different shapes for different purposes (cups for liquids, boxes for solid food), data types are specialized for different kinds of information.

### Common Data Types

In most programming languages, you'll encounter these fundamental data types:

#### 1. Numbers

Numbers are used for counting, measuring, and calculating. Most programming languages distinguish between different kinds of numbers:

- **Integers**: Whole numbers without decimals, like 42, -7, or 0.
- **Floating-point (or decimal) numbers**: Numbers with decimal points, like 3.14, -0.001, or 98.6.

Number data can be used for:
- Counting items
- Measuring quantities
- Calculating results
- Representing scores or values

Numbers allow mathematical operations like addition, subtraction, multiplication, and division.

#### 2. Text (Strings)

Text data, often called "strings," consists of sequences of characters: letters, numbers, spaces, and symbols. Examples include:
- "Hello, world!"
- "Nairobi, Kenya"
- "42 Main Street"
- "✨🌟✨"

String data can be used for:
- Names and descriptions
- Messages and communication
- Labels and identifiers
- Textual data like stories or articles

Strings allow operations like concatenation (joining), searching, and extracting parts of the text.

#### 3. Booleans

Boolean data has only two possible values: true or false. Think of it as a simple yes/no or on/off switch. Examples include:
- Is it raining? (true/false)
- Has the task been completed? (true/false)
- Is the number greater than 10? (true/false)

Boolean data is used for:
- Making decisions in programs
- Checking conditions
- Storing the state of options (enabled/disabled)
- Logical operations

Booleans can be combined using logical operations like AND, OR, and NOT (which we learned about in Chapter 2).

#### 4. Collections of Data

While the above are simple data types, programs often need to work with collections of data:

- **Lists (or Arrays)**: Ordered collections of items, like a shopping list.
  Example: [1, 2, 3, 4, 5] or ["apple", "banana", "orange"]

- **Key-Value Pairs (or Dictionaries)**: Collections where each value has a unique label (key).
  Example: {name: "Sofia", age: 25, city: "Lima"}

Collections allow us to group related data together and manipulate it as a unit.

#### 5. Special Types

Many programming languages also include special types for specific purposes:

- **Date and Time**: For representing calendar dates and clock times.
- **Null or None**: Representing the absence of a value.
- **Custom Types**: In advanced programming, you can create your own data types.

### Type Compatibility and Conversion

An important concept with data types is that certain operations only work with compatible types:

- You can add two numbers (5 + 3) → 8
- You can join (concatenate) two strings: "Hello, " + "world!" → "Hello, world!"
- But you cannot directly add a number and a string: 5 + "apples" would cause an error in many languages

Programs often need to convert between data types. For example:
- Converting the string "42" to the number 42
- Converting the number 3.14159 to the string "3.14159"
- Converting a number to a boolean (0 is usually false, other numbers are true)

This process is called type conversion or casting.

## Variables: Named Containers for Data

While understanding data types is important, we also need a way to store and use data in our programs. This is where variables come in.

### What is a Variable?

A variable is a named container that holds a piece of data. Think of it like a labeled box where you can store information for later use. Variables have:

1. **A name**: How you refer to the variable in your code
2. **A value**: The data currently stored in the variable
3. **A type**: What kind of data the variable holds

### Variable Metaphors

There are several helpful ways to think about variables:

- **Labeled Boxes**: Variables are like boxes with labels, storing a value you can retrieve.
- **Nametags**: Variables give names to pieces of data so you can refer to them easily.
- **Memory Addresses**: Variables provide named locations in the computer's memory.

### Working with Variables

In programming, we use variables through several operations:

#### 1. Declaration and Assignment

First, we create a variable and put some data in it. This is called declaration (creating the variable) and assignment (putting a value in it):

```
SET age = 25
```

This creates a variable named "age" and stores the value 25 in it.

#### 2. Using Variable Values

Once a variable has a value, we can use it in our program:

```
SET price = 5
SET quantity = 3
SET total = price * quantity
```

After these operations, the variable `total` contains the value 15.

#### 3. Changing Variable Values

A key feature of variables is that their values can change during program execution:

```
SET counter = 1
SET counter = counter + 1  # Now counter holds 2
SET counter = counter + 1  # Now counter holds 3
```

This is why they're called "variables"—their values can vary over time.

### Variable Naming

Variables need names so we can refer to them in our code. Good variable names are:

- **Descriptive**: They tell you what data they contain (e.g., `age`, `username`, `total_cost`)
- **Concise**: Not unnecessarily long
- **Consistent**: Following a consistent style or pattern
- **Valid**: Following the rules of the programming language

Poor variable names like `x`, `temp`, or `stuff` don't clearly communicate what data they hold, making programs harder to understand.

### Variable Examples in Pseudocode

Let's see some example pseudocode using variables of different types:

```
# Number variables
SET temperature = 22.5
SET count = 10
SET price = 4.99

# String variables  
SET name = "Aminata"
SET message = "Welcome to our store!"
SET address = "123 Main Street"

# Boolean variables
SET is_registered = true
SET has_completed = false

# Collection variables
SET fruits = ["apple", "banana", "mango"]
SET student = {name: "Carlos", grade: "A", age: 15}

# Using variables
SET greeting = "Hello, " + name + "!"
SET total_price = price * count
SET can_proceed = is_registered AND NOT has_completed
```

### Variables and Memory

Behind the scenes, variables are stored in the computer's memory. When you create a variable, the computer:

1. Allocates a section of memory
2. Associates your variable name with that memory location
3. Stores the value at that location

When you reference the variable later, the computer looks up the memory location and retrieves the value.

## Data Types and Operations

Different data types support different operations. Understanding which operations work with which types is crucial for effective programming.

### Number Operations
- Addition: `5 + 3` → `8`
- Subtraction: `10 - 4` → `6`
- Multiplication: `6 * 7` → `42`
- Division: `20 / 4` → `5`
- Modulus (remainder): `10 % 3` → `1`
- Exponentiation: `2 ^ 3` → `8`

### String Operations
- Concatenation (joining): `"Hello" + " World"` → `"Hello World"`
- Length: `LENGTH("hello")` → `5`
- Accessing characters: `"hello"[1]` → `"e"` (in many languages, indexing starts at 0)
- Substring: `SUBSTRING("hello", 1, 3)` → `"ell"`

### Boolean Operations
- AND: `true AND false` → `false`
- OR: `true OR false` → `true`
- NOT: `NOT true` → `false`

### Collection Operations
- Adding items: `fruits.ADD("orange")`
- Removing items: `fruits.REMOVE("banana")`
- Accessing items: `fruits[0]` → `"apple"`
- Counting items: `LENGTH(fruits)` → `3`

## Activity: Identifying Data Types

To practice recognizing data types, look at these examples and identify which type each represents:

1. 42
2. "42"
3. 3.14159
4. true
5. "true"
6. [1, 2, 3, 4]
7. {name: "Ahmed", country: "Egypt"}
8. ""
9. 0
10. false

(Answers: 1. Integer, 2. String, 3. Float/Decimal, 4. Boolean, 5. String, 6. List/Array, 7. Dictionary/Object, 8. String (empty), 9. Integer, 10. Boolean)

## Key Takeaways

- Data types categorize information and determine what operations can be performed on the data
- Common data types include numbers, strings (text), booleans (true/false), and collections
- Variables are named containers that store data values
- Variables can be created, read, updated, and used in calculations or decisions
- Different data types support different operations
- Understanding data types helps prevent errors and allows for more effective programming

In the next section, we'll explore how to manipulate and transform data, allowing us to create programs that process information in useful ways.
