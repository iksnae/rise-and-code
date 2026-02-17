# Building Complexity

## Introduction

Welcome back, **Patterns**! 🧩

You've mastered simple algorithms and played with them. Now let's build bigger ones using basic blocks. This section teaches you how to combine simple steps into sophisticated solutions—and why some algorithms are faster than others.

## The Four Building Blocks

Complex algorithms are built from four simple pieces:

### Block 1: Sequence
Steps done one after another.
```
1. Pick up pencil
2. Place on paper
3. Draw a line
4. Lift pencil
```

### Block 2: Selection (If-Then)
Different paths based on conditions.
```
1. Check if it's raining
2. If raining: take umbrella
3. If not: leave it home
4. Go outside
```

### Block 3: Repetition (Loops)
Do the same thing multiple times.
```
While dishes remain in sink:
   1. Pick up dish
   2. Wash it
   3. Rinse it
   4. Place in rack
After: Wipe counter
```

### Block 4: Modularity (Reusable Steps)
Break big tasks into named smaller tasks.
```
Making Breakfast:
   1. Make coffee (see Coffee subprocedure)
   2. Cook eggs (see Eggs subprocedure)
   3. Toast bread
   4. Serve

Coffee subprocedure:
   1. Boil water
   2. Add grounds
   3. Pour hot water
   4. Wait 4 minutes
   5. Pour into mug
```

Combine these four blocks and you can build algorithms of incredible power.

## Example: Sorting Papers by Date

Let's build a real algorithm combining all four blocks.

```
Algorithm: Sort Papers by Date

1. Make three piles: "This Month," "Last Month," "Older"
2. While unsorted papers exist:
   - Pick up next paper
   - Find its date
   - If this month: put in "This Month"
   - Else if last month: put in "Last Month"
   - Else: put in "Older"
3. Sort each pile by day (oldest to newest)
4. Combine piles in order
5. Return sorted papers
```

Notice the blocks:
- **Sequence**: Overall steps in order
- **Selection**: Which pile does this paper go to?
- **Repetition**: Process all papers, then sort each pile
- **Modularity**: The pile-sorting is its own subprocedure

## Nested Structures (Loops Inside Loops)

As algorithms get complex, you might have loops inside loops or decisions inside loops.

```
Algorithm: Clean the House

1. For each room:
   - If room is messy: collect items, throw away trash
   - Dust all surfaces
   - If floor needs sweeping: sweep
   - If floor needs mopping: mop
   - If bathroom/kitchen: disinfect
```

Multiple levels let you express complex processes concisely.

## Edge Cases: The "What If?"

What happens when things don't go as planned? Smart algorithms handle special cases.

**Original**: Our paper-sorting assumes all papers have dates.
**What if?** Some papers have no date.

**Fixed version**:
```
2. While unsorted papers exist:
   - Pick up next paper
   - Try to find the date
   - If no date found: put in "No Date" pile
   - Else if this month: put in "This Month" pile
   - Else: continue as normal
```

Always ask: What could go wrong? What special situations need different handling?

## Algorithm Efficiency: The Speed Question ⚡

We don't just care *if* an algorithm works—we care *how fast* it works.

**Time efficiency**: How long does it take?
**Space efficiency**: How much storage does it need?

For big problems, efficiency is the difference between seconds and hours.

## Common Speed Patterns

### Constant Time
Check if a light is on—same speed whether 1 switch or 1,000 switches.

### Linear Time
Look through papers one by one to find one. Twice the papers = twice as long.

### Quadratic Time
Compare each paper to every other paper. Twice the papers = four times as long!

### Logarithmic Time
Smart divide-and-conquer approach. Find a name in a phone book by halving remaining pages each time. Very efficient for large inputs.

## Making Algorithms Faster

Strategies that work:

1. **Skip unnecessary work**: Don't repeat calculations
2. **Organize information smartly**: How you structure data matters
3. **Stop early**: Once you find it, you're done
4. **Divide and conquer**: Break big problems into smaller ones
5. **Use known solutions**: Some problems have patterns

**Original**: Three piles, sort each (slower for lots of papers)

**Improved**: One pile per month, sort within months (faster!)

```
Better Algorithm:
1. Create a pile for each month that appears
2. Distribute papers to correct month pile
3. Sort papers within each pile
4. Combine piles in order
```

## Trade-offs in Design

You can't always have everything:

- **Simple vs. Fast**: Easy-to-understand algorithms might be slow
- **Speed vs. Memory**: Sometimes you use more memory to save time
- **Flexible vs. Fast**: General algorithms work for everything but slow; specialized ones are faster but narrow
- **Exact vs. Quick**: Sometimes approximate is fast enough

The best algorithm depends on your real-world situation.

## Breaking It Down (Decomposition)

The most powerful skill? Breaking big problems into smaller pieces.

**Principles**:
1. Find natural divisions
2. Create clear boundaries
3. Minimize dependencies
4. Reuse patterns that repeat
5. Start high-level, then add details

**Example**: Planning a community event breaks into:
- Budget planning
- Venue selection
- Activity scheduling
- Volunteer coordination
- Promotion

Each piece is its own small algorithm.

## Problem-Solving Formula

Use this anywhere—not just programming:

1. **Understand** the problem
2. **Break it down** into smaller parts
3. **Solve** each part
4. **Combine** the solutions
5. **Test and fix** until it works well

## Activity: Evolve an Algorithm 🚀

Take a simple algorithm you created earlier. Now:

1. Add if-then decisions for different cases
2. Add loops for repetition
3. Create subprocedures for complex steps
4. Make it faster
5. Handle special cases

How much more powerful is the evolved version? How much harder to explain?

**See Activity Sheet 3H!**

## Key Takeaways ✨

- Complex algorithms = simple blocks combined (sequence, selection, repetition, modularity)
- Nesting (loops in loops) handles complex patterns
- Edge cases make algorithms robust
- Efficiency matters: time vs. space, speed vs. simplicity
- Speed patterns: constant, linear, quadratic, logarithmic
- Decomposition breaks monsters into manageable pieces
- Algorithmic thinking solves life problems, not just code

**Next**: Data and variables—the ingredients algorithms work with!
