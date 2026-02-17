# Real-world Looping Examples

## Introduction

Loops aren't just programming tricks. They're everywhere—in nature, culture, and real work. This section shows loops solving actual problems across many domains.

## Loops in Nature & Culture 🌍

**Natural cycles**:
- Water cycle: evaporate, condense, precipitate, repeat
- Seasons: Spring → Summer → Fall → Winter → repeat
- Day/night cycles
- Growth: seed → plant → flower → seed

**Cultural patterns**:
- Music: verse, chorus, verse, chorus, chorus
- Dance: moves repeated with variations
- Textiles: patterns repeating across fabric
- Architecture: repeated building elements
- Stories: recurring themes and lessons

Recognizing loops everywhere helps us code loops naturally.

## Loop Examples 💡

### 1. Sum Scores 📊

Teacher adds student test scores:
```
scores = [85, 92, 78, 90, 88]
total = 0
FOR EACH score IN scores
    total = total + score
END FOR
# total = 433
```

Like counting coins in a jar—add each one to the running total.

### 2. Average Rainfall 🌧️

Farmer tracks month's rainfall:
```
rainfall = [2.5, 0, 4.2, 1.0, 0, 3.8, 2.2, ...]
total = 0
FOR EACH measure IN rainfall
    total = total + measure
END FOR
average = total / LENGTH(rainfall)
```

Like calculating average daily spending—total/number of days.

### 3. Search Shelves 🔍

Librarian finds a specific book:
```
found = false
position = 0
WHILE position < bookcount AND NOT found
    IF books[position] == target
        found = true
        location = position
    ELSE
        position = position + 1
    END IF
END WHILE
```

Like hunting through papers for one with a name on it.

### 4. Validate Input ✓

Health worker confirms age:
```
age = -1
WHILE age <= 0
    DISPLAY "Enter age (positive):"
    INPUT age
    IF age <= 0
        DISPLAY "Try again"
    END IF
END WHILE
```

Like asking someone to repeat until you hear correctly.

### 5. Generate Pattern 🎨

Weaver creates textile:
```
pattern = []
FOR position = 0 TO 30
    IF position % 6 < 2: ADD "red"
    ELIF position % 6 < 4: ADD "blue"
    ELSE: ADD "yellow"
    ADD TO pattern
END FOR
```

Like threading colored beads in a pattern.

### 6. Batch Processing 🍪

Baker bakes cookies in batches (oven holds 12):
```
cookies_baked = 0
total = 48
batch = 12

WHILE cookies_baked < total
    size = MIN(batch, total - cookies_baked)
    DISPLAY "Baking " + size
    cookies_baked = cookies_baked + size
END WHILE
```

Like washing dishes—drying rack holds only 10 at once.

### 7. Simulate Growth 🌲

Forest manager tracks 20 years:
```
trees = 1000
FOR year = 1 TO 20
    growth = trees * 0.05      # Grow 5%
    trees = trees + growth
    harvest = trees * 0.03     # Harvest 3%
    trees = trees - harvest
    DISPLAY "Year " + year + ": " + trees
END FOR
```

Like tracking savings with deposits and withdrawals.

### 8. Math Practice 📐

Teacher: practice until 5 correct:
```
correct = 0
WHILE correct < 5
    num1 = RANDOM(1, 10)
    num2 = RANDOM(1, 10)
    DISPLAY num1 + " × " + num2 + "?"
    INPUT answer
    IF answer == num1 * num2
        DISPLAY "Correct!"
        correct = correct + 1
    END IF
END WHILE
```

Like practicing scales until you nail it 5 times.

### 9. Convert Currency 💱

Vendor converts prices:
```
original = [10, 25, 15, 30]
converted = []
rate = 1.25

FOR EACH price IN original
    new_price = price * rate
    ADD new_price TO converted
END FOR
```

Like translating each word to another language.

### 10. Workout Routine 💪

Trainer creates 3 sets of 4 exercises:
```
exercises = ["Push-ups", "Squats", "Sit-ups", "Jumping Jacks"]
reps = [15, 20, 15, 30]

FOR set = 1 TO 3
    FOR EACH exercise IN exercises
        DISPLAY exercise + " × " + reps
    END FOR
END FOR
```

Nested loops: exercises inside sets.

## Patterns Across Domains 🎯

**Accumulation** (add things up):
- Totals, rainfall, growth, building strings

**Filtering** (keep matching items):
- Good candidates, safe roads, ripe fruit, relevant books

## Spot Loop Opportunities 👀

Look for:
- "For each...", "Until...", "While...", "Repeat..."
- Collections needing same processing
- Accumulating results
- Until something happens
- Repeating patterns
- Tracking changes over time

## Activity: Match Loop Patterns! 🎲

Which pattern fits each?

1. Check each egg for cracks → ?
2. Count sheep until sleep → ?
3. Add up monthly expenses → ?
4. Braid hair in pattern → ?
5. Take meds every 8 hours → ?

**Patterns**: Collection (B), Condition (A), Accumulator (C), Pattern (D), Time (E)

**Answers**: 1-B, 2-A, 3-C, 4-D, 5-A

## Key Takeaways ✨

- Loops are in nature, culture, and real work everywhere
- Same patterns work across totally different domains
- Common: sum, average, search, validate, generate, simulate
- Nested loops repeat-within-repeat
- Spot loops by finding repetition in problems

**You did it!** You understand loops—one of programming's superpowers!
