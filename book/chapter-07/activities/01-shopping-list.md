# Shopping List Calculator

**Difficulty Level: ★☆☆ (Beginner)**

## Problem Statement
Create an algorithm that helps calculate the total cost of a shopping list. The algorithm should handle multiple items with their quantities and prices, apply a sales tax, and calculate the final total.

## Learning Objectives
- Practice basic arithmetic operations
- Handle multiple variables
- Apply percentage calculations
- Format currency output
- Manage lists of data

## Requirements
1. Accept a list of items with:
   - Item name
   - Quantity
   - Price per item
2. Calculate subtotal before tax
3. Apply 8% sales tax
4. Calculate final total
5. Show a formatted receipt

## Example Input
```
Item List:
1. Milk (2 units at $3.50 each)
2. Bread (1 unit at $2.25 each)
3. Eggs (1 dozen at $4.00 each)
```

## Expected Output
```
Receipt:
-------------
Milk (2x)    $7.00
Bread (1x)   $2.25
Eggs (1x)    $4.00
-------------
Subtotal:    $13.25
Tax (8%):    $1.06
Total:       $14.31
```

## Constraints
- All prices are in dollars and cents
- Quantities must be whole numbers
- Round all calculations to 2 decimal places
- Maximum 10 items in the list

## Step-by-Step Hints
1. Create a table to organize your items
2. Calculate the cost for each line item
3. Sum up all line items for subtotal
4. Calculate tax amount
5. Add tax to subtotal for final total
6. Format the receipt

## Common Pitfalls
- Forgetting to multiply quantity by price
- Incorrect rounding of decimals
- Missing to align decimal points
- Forgetting to show units

## Testing Your Solution
Try these test cases:
1. Single item with quantity 1
2. Multiple items with different quantities
3. Items with prices requiring rounding
4. Empty list
5. Maximum number of items (10)

## Extension Ideas
- Add discounts for bulk purchases
- Include different tax rates for different item types
- Add a budget limit warning
- Calculate change from payment

## Answer Key (Encoded)
```
Rot13 encoded for self-checking:
1. Perngr n gnoyr jvgu 4 pbyhzaf: Vgrz, Dgl, Cevpr, Gbgny
2. Zhygvcyl dgl * cevpr sbe rnpu vgrz
3. Fhz nyy gbgnyf sbe fhogbgny
4. Zhygvcyl fhogbgny * 0.08 sbe gnk
5. Nqq fhogbgny + gnk sbe svany gbgny
6. Ebhaq nyy pnyphyngvbaf gb 2 qrpvzny cynprf
```

## Reflection Questions
1. How did you organize the data?
2. What was your strategy for handling decimals?
3. How would you modify your solution for different tax rates?
4. What other features could make this more useful?

Remember to document your solution process in your notebook, including any challenges you faced and how you overcame them.