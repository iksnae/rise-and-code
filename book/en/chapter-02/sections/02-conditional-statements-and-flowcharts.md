# Conditional Statements and Flowcharts

## Logic Needs to Make Decisions

In the last section, we learned that Logic can answer YES/NO questions using AND, OR, and NOT.

But knowing an answer isn't enough. Logic needs to know **what to do with that answer.**

That's where **conditional statements** come in.

A conditional statement is just a fancy way of saying: "**If this is true, then do that. Otherwise, do something else.**"

## IF, THEN, ELSE: Logic's Decision Structure

Here's the pattern Logic uses:

```
IF (some condition is true)
THEN (do this)
ELSE (do that instead)
END IF
```

That's it. That's how computers make decisions.

### Real-World Example: Morning Decision

```
IF (my alarm is going off AND it's a school day)
THEN (get out of bed)
ELSE (sleep 5 more minutes)
END IF
```

Logic asks the condition. The condition is either TRUE or FALSE. Based on that, Logic does one thing or the other.

### Another Example: Should I Wear a Coat?

```
IF (it's cold AND I'm going outside)
THEN (wear a coat)
ELSE (don't wear a coat)
END IF
```

Logic doesn't think about it. Doesn't debate. Checks the condition. Does one thing or the other.

## Nesting: Decisions Within Decisions

Sometimes Logic needs to make a decision, and then make another decision based on that.

```
IF (it's raining)
THEN (take an umbrella)
  IF (it's also cold)
  THEN (wear a jacket too)
  ELSE (just take umbrella)
  END IF
ELSE (no umbrella needed)
  IF (it's sunny)
  THEN (wear sunscreen)
  ELSE (it's just cloudy)
  END IF
END IF
```

This is called "nesting" — decisions inside decisions.

Computers do this constantly. It looks complicated, but it's just: ask a question, do something, ask another question, do something else.

## Flowcharts: Drawing Logic's Thinking

Words are great, but sometimes it's easier to DRAW how Logic thinks.

That's what flowcharts are for.

A flowchart is a visual map of Logic's decisions.

### Flowchart Symbols

Here's what each shape means:

```
   ┌─────────────┐
   │   START     │   (Circle or oval = start/stop)
   └──────┬──────┘
          │
     ┌────▼────┐
     │ rectangle│   (Rectangle = action/process)
     └────┬────┘
          │
     ◇─────◇    (Diamond = decision/question)
    ╱       ╲
  YES      NO
  │         │
```

### Simple Flowchart Example: Should I Get Up?

```
          ┌──────────────┐
          │    START     │
          └──────┬───────┘
                 │
          ┌──────▼──────────┐
          │ Alarm going     │
          │ off?            │
          └─┬──────────┬────┘
            │ YES      │ NO
            │          └─────────────┐
      ┌─────▼──────────┐       ┌─────▼──┐
      │ Get out of     │       │ Sleep  │
      │ bed            │       │ 5 min  │
      └─────┬──────────┘       └─────┬──┘
            │                        │
            └───────────┬────────────┘
                        │
                   ┌────▼────┐
                   │   END    │
                   └──────────┘
```

This flowchart shows exactly how Logic thinks.

### Complex Flowchart Example: What to Eat for Lunch

```
        ┌──────────────┐
        │    START     │
        └──────┬───────┘
               │
        ┌──────▼───────────┐
        │ Am I hungry?     │
        └─┬──────────┬─────┘
          │ YES      │ NO
          │          │
    ┌─────▼──────┐   │
    │ Do I like  │   │
    │ pizza?     │   │
    └─┬──────┬───┘   │
      │ YES  │ NO    │
      │      │       │
 ┌────▼──┐ ┌─▼───┐  │
 │ Eat   │ │Eat  │  │
 │pizza  │ │fruit│  │
 └────┬──┘ └─┬───┘  │
      │      │  ┌───▼────┐
      │      │  │Make     │
      │      │  │snack    │
      └──┬───┴──┴──┬──┬───┘
         │         │  │
      ┌──▼─────────▼──▼──┐
      │      END         │
      └──────────────────┘
```

This shows more complex decision-making.

## Why Flowcharts Matter

Flowcharts show you exactly how Logic will behave BEFORE you test it.

You can:
- **Spot mistakes** — "Oh, what if it's 3 AM? The logic breaks."
- **Communicate clearly** — You can show someone your flowchart and they understand
- **Plan before coding** — Work out all the decisions before you write code
- **Test mentally** — Follow the flowchart with different inputs and see what happens

## Drawing Your Own Flowchart

Let's practice.

**Scenario: Should I go to the park?**

**Logic's questions:**
1. Is it sunny?
2. Do I have free time?
3. Do I want exercise?

**Logic's decision:**
- If it's sunny AND I have time, then go
- Else, if I want exercise, then go anyway
- Else, stay home

**Flowchart:**

```
        ┌──────────┐
        │  START   │
        └─────┬────┘
              │
        ┌─────▼──────┐
        │ Is it      │
        │ sunny?     │
        └─┬──────┬───┘
          │ YES  │ NO
          │      │
     ┌────▼──┐ ┌─▼──────────┐
     │Go to  │ │ Want       │
     │park   │ │ exercise?  │
     └────┬──┘ └─┬──────┬───┘
          │      │ YES  │ NO
          │      │      │
          │   ┌──▼──┐ ┌─▼────┐
          │   │Go   │ │Stay  │
          │   │park │ │home  │
          │   └──┬──┘ └─┬────┘
          │      │      │
          └──┬───┴──┬───┘
             │      │
          ┌──▼──────▼──┐
          │    END      │
          └─────────────┘
```

See? It's just drawing Logic's thinking.

## From Flowchart to Code-Like Thinking

Once you have a flowchart, you can translate it into code-like instructions (called **pseudocode**, which we'll learn more about).

Flowchart → Pseudocode → Code → Computer

But for now, just know: **Flowcharts are how you show Logic's thinking visually.**

---

## 🎮 Activity: Create Your Own Flowchart

(See "Decision Flowchart Challenge" activity sheet)
