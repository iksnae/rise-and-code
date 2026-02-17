# Logic Basics

## What is Logic?

Logic is the study of reasoning, particularly focused on how we determine whether statements are true or false. In our everyday lives, we use logic constantly:

- "If it's raining, I should bring an umbrella."
- "Since the store is closed today, I'll go tomorrow."
- "Either I take the bus or I'll be late for school."

In computer programming, logic works in a similar way, but with very strict rules. Computers can't handle the ambiguity that humans navigate easily. They need precise, clear instructions based on whether conditions are true or false.

## Boolean Logic: The Foundation of Computing

At its simplest, computer logic is based on a system called "Boolean logic," named after mathematician George Boole. It deals with only two possible values:

- **True** (often represented as 1, "yes," or "on")
- **False** (often represented as 0, "no," or "off")

This binary approach might seem limited, but it's actually incredibly powerful. Complex decisions in computing are built up from these basic true/false building blocks.

## Boolean Values in Real Life

Before we dive deeper, let's identify boolean values in everyday scenarios:

- The light switch is on (true) or off (false)
- The door is open (true) or closed (false)
- I have enough money to buy this item (true or false)
- It is currently raining (true or false)

Activity: In your notebook, list 5 boolean statements about your day today—things that can only be true or false.

## Boolean Operators: AND, OR, and NOT

To build more complex logical structures, we use three basic operators:

### 1. AND (Logical Conjunction)

The AND operator combines two boolean values and results in true ONLY if both values are true.

Think of AND as a demanding friend who is only satisfied when everything is perfect.

| Statement A | Statement B | A AND B |
|-------------|-------------|---------|
| true        | true        | true    |
| true        | false       | false   |
| false       | true        | false   |
| false       | false       | false   |

Example: "I will go to the park if it is sunny AND I have finished my homework."
- Sunny: true, Homework done: true → I go to the park (true)
- Sunny: true, Homework done: false → I don't go to the park (false)
- Sunny: false, Homework done: true → I don't go to the park (false)
- Sunny: false, Homework done: false → I don't go to the park (false)

### 2. OR (Logical Disjunction)

The OR operator combines two boolean values and results in true if at least one of the values is true.

Think of OR as an easy-going friend who is happy if anything good happens.

[VISUAL: type=truth-table-diagram, title="Boolean Logic: AND, OR, NOT", size=half-page, description="Visual diagrams showing how AND, OR, and NOT operators work with simple icons and color coding"]

| Statement A | Statement B | A OR B  |
|-------------|-------------|---------|
| true        | true        | true    |
| true        | false       | true    |
| false       | true        | true    |
| false       | false       | false   |

Example: "I will bring an umbrella if it is raining OR the forecast predicts rain."
- Raining: true, Forecast rain: true → Bring umbrella (true)
- Raining: true, Forecast rain: false → Bring umbrella (true)
- Raining: false, Forecast rain: true → Bring umbrella (true)
- Raining: false, Forecast rain: false → Don't bring umbrella (false)

### 3. NOT (Logical Negation)

The NOT operator simply reverses a boolean value. If something is true, NOT makes it false, and vice versa.

Think of NOT as someone who always contradicts what you say.

| Statement A | NOT A   |
|-------------|---------|
| true        | false   |
| false       | true    |

Example: "If it is NOT raining, I will go for a walk."
- Raining: true → NOT raining: false → Don't go for a walk
- Raining: false → NOT raining: true → Go for a walk

## Truth Tables: Mapping Out Logic

The tables we've been using are called "truth tables." They help us visualize all possible combinations of inputs and outputs for logical operations. Truth tables are especially useful when logic gets complex.

## Making Decisions Based on Logic

In programming, logic is used to make decisions. Here's the general pattern:

```
IF (some condition is true) THEN
    (do something)
ELSE
    (do something else)
END IF
```

This structure appears in virtually all programming languages, though the exact syntax may vary. It's the foundation of decision-making in code.

## Decision Making in Real Life

Let's explore a real-life decision through the lens of programming logic:

**Scenario: Deciding what to wear based on weather**

```
IF (it is raining) THEN
    Wear a raincoat and take an umbrella
ELSE
    IF (it is sunny AND hot) THEN
        Wear light clothing and a hat
    ELSE
        Wear regular clothes and maybe bring a light jacket
    END IF
END IF
```

Notice how we can nest decisions within decisions to handle more complex scenarios.

## Combining Multiple Conditions

Decision-making often involves multiple conditions:

```
IF (it is a weekend) AND (the weather is good) THEN
    Go to the park
ELSE
    Stay home and read a book
END IF
```

Using combinations of AND, OR, and NOT allows us to create sophisticated decision structures:

```
IF (it is a holiday) OR ((it is a weekend) AND (I have no homework)) THEN
    Plan something fun with friends
ELSE
    Catch up on studies
END IF
```

## Practice Example: The Party Decision

Let's walk through a more complex example:

**Scenario: Deciding whether to go to a party**

Conditions:
- It's on a school night
- You have an exam tomorrow
- Your best friend really wants you to come
- The party is close to your home

Let's express this as a logical decision:

```
IF (NOT school_night) OR (NOT have_exam_tomorrow AND party_is_close) THEN
    Go to the party
ELSE
    IF (best_friend_really_wants_you_to_come AND party_is_close AND NOT have_exam_tomorrow) THEN
        Go to the party but leave early
    ELSE
        Stay home
    END IF
END IF
```

## Activity: Logic in Action

In your notebook, write out the logic for at least two everyday decisions you make, using IF, THEN, ELSE, and the boolean operators AND, OR, and NOT. Try to include at least one complex decision with multiple conditions.

For example:
- Choosing what to eat for lunch
- Deciding whether to take the bus or walk
- Selecting which subject to study first

## Key Takeaways

- Boolean logic uses only two values: true and false
- The three basic boolean operators are AND, OR, and NOT
- Truth tables help visualize all possible outcomes of logical operations
- Decision structures in programming are built using IF-THEN-ELSE patterns
- Complex decisions can be modeled by combining and nesting logical structures

In the next section, we'll build on these foundations to explore conditional statements and flowcharts, which will give us powerful tools to visualize and structure more complex decision-making processes.
