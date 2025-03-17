# Activity: Debugging Exercises

## Overview

This activity focuses on developing your debugging skills—a critical ability for any programmer. You'll be presented with algorithms that contain intentional errors or bugs. Your task is to identify these problems, understand why they occur, and fix them to create working solutions.

## Learning Objectives

- Develop systematic debugging techniques
- Identify common programming errors and pitfalls
- Practice tracing through code to find logical mistakes
- Learn to test and verify solutions methodically
- Build troubleshooting skills essential for programming

## Materials Needed

- Your notebook
- Pencil and eraser
- Ruler (optional, for tables and diagrams)

## Time Required

60-75 minutes (approximately 12-15 minutes per exercise)

## Instructions

For each debugging exercise:
1. Read the problem statement to understand what the algorithm should do
2. Study the provided buggy algorithm carefully
3. Trace through the algorithm step-by-step with the given examples
4. Identify where and why the algorithm fails
5. Fix the algorithm to solve the original problem correctly
6. Test your fixed algorithm with multiple examples
7. Document the bugs you found and your fixes

### Exercise 1: Counting Sum Bug

**Problem**: The following algorithm is supposed to count how many pairs of numbers in an array sum to a target value. However, it's not working correctly.

**Buggy Algorithm**:
```
FUNCTION countPairsWithSum(numbers, target)
    SET count = 0
    FOR i = 0 TO LENGTH(numbers) - 1
        FOR j = 0 TO LENGTH(numbers) - 1
            IF numbers[i] + numbers[j] = target THEN
                SET count = count + 1
            END IF
        END FOR
    END FOR
    RETURN count
END FUNCTION
```

**Example**:
- Input: numbers = [1, 5, 7, 1, 5], target = 6
- Expected Output: 4 (The pairs are: (1,5), (5,1), (1,5), (5,1))
- Actual Output: 8 (Incorrect)

**Hints**:
1. Trace through the algorithm with a small example. What counts are you getting that you shouldn't?
2. Are pairs being counted more than once? Or is something else going on?
3. Consider what happens when i = j.
4. Think about how to avoid counting the same pair twice or counting a number paired with itself.

**Bugs to Find**:
1. The algorithm counts pairs twice (both (i,j) and (j,i))
2. The algorithm counts a number paired with itself when i = j

**Encoded Answer (Caesar Cipher, shift=5)**:
Ymj htwwjhy fqltwnymr xmtzqi tsqd htzsyy ufnwx bmjwj n < o yt fatin htzsynsl ymj xfrj ufnw ybnhj, fsi xmtzqi jaxzwj ymj ajwhnkd ymfy n fsi o fwj inggjwjsy nsinhjx.

### Exercise 2: Palindrome Checker Bug

**Problem**: This algorithm is supposed to check if a string is a palindrome (reads the same forwards and backwards), but it's not working for all cases.

**Buggy Algorithm**:
```
FUNCTION isPalindrome(text)
    SET start = 0
    SET end = LENGTH(text) - 1
    
    WHILE start < end
        IF text[start] != text[end] THEN
            RETURN false
        END IF
        SET start = start + 1
        SET end = end - 1
    END WHILE
    
    RETURN true
END FUNCTION
```

**Examples**:
- Input: "radar"
- Expected Output: true
- Actual Output: true (Correct)

- Input: "A man, a plan, a canal: Panama"
- Expected Output: true
- Actual Output: false (Incorrect)

**Hints**:
1. What's special about the second example that might cause issues?
2. The algorithm works for simple palindromes but fails for more complex ones. Why?
3. Consider how the algorithm handles spaces, punctuation, and capitalization.
4. Should these characters be part of the palindrome check?

**Bugs to Find**:
1. The algorithm doesn't ignore spaces, punctuation, and case differences
2. The direct character comparison fails when there are non-alphabetic characters

**Encoded Answer (Binary)**:
01010100 01101000 01100101 00100000 01100001 01101100 01100111 01101111 01110010 01101001 01110100 01101000 01101101 00100000 01101110 01100101 01100101 01100100 01110011 00100000 01110100 01101111 00100000 01110000 01110010 01100101 01110000 01110010 01101111 01100011 01100101 01110011 01110011 00100000 01110100 01101000 01100101 00100000 01110011 01110100 01110010 01101001 01101110 01100111 00100000 01100010 01111001 00100000 01110010 01100101 01101101 01101111 01110110 01101001 01101110 01100111 00100000 01101110 01101111 01101110 00101101 01100001 01101100 01110000 01101000 01100001 01101110 01110101 01101101 01100101 01110010 01101001 01100011 00100000 01100011 01101000 01100001 01110010 01100001 01100011 01110100 01100101 01110010 01110011 00100000 01100001 01101110 01100100 00100000 01100011 01101111 01101110 01110110 01100101 01110010 01110100 01101001 01101110 01100111 00100000 01100001 01101100 01101100 00100000 01101100 01100101 01110100 01110100 01100101 01110010 01110011 00100000 01110100 01101111 00100000 01110100 01101000 01100101 00100000 01110011 01100001 01101101 01100101 00100000 01100011 01100001 01110011 01100101 00101110

### Exercise 3: Maximum Subarray Bug

**Problem**: This algorithm is supposed to find the maximum sum of a contiguous subarray within an array of integers. However, it doesn't work correctly for all inputs.

**Buggy Algorithm**:
```
FUNCTION maxSubarraySum(numbers)
    IF LENGTH(numbers) = 0 THEN
        RETURN 0
    END IF
    
    SET maxSum = 0
    SET currentSum = 0
    
    FOR i = 0 TO LENGTH(numbers) - 1
        SET currentSum = currentSum + numbers[i]
        
        IF currentSum > maxSum THEN
            SET maxSum = currentSum
        END IF
        
        IF currentSum < 0 THEN
            SET currentSum = 0
        END IF
    END FOR
    
    RETURN maxSum
END FUNCTION
```

**Examples**:
- Input: [1, -2, 3, 10, -4, 7, 2, -5]
- Expected Output: 18 (from the subarray [3, 10, -4, 7, 2])
- Actual Output: 18 (Correct)

- Input: [-2, -3, -1, -5]
- Expected Output: -1 (from the subarray [-1])
- Actual Output: 0 (Incorrect)

**Hints**:
1. The algorithm works for arrays containing positive numbers but fails for all-negative arrays. Why?
2. Look at how maxSum is initialized. Is this appropriate for all cases?
3. Consider what happens if all numbers in the array are negative.
4. Is there a problem with how the algorithm handles empty subarrays?

**Bugs to Find**:
1. The algorithm initializes maxSum to 0, which is problematic for arrays with all negative numbers
2. The algorithm incorrectly handles the case where the best subarray has a negative sum

**Encoded Answer (Keyword Cipher with keyword="DEBUG")**:
Tif esrpfct qpmxtjpo jq tp jojujbmjaf nbySxn tp uif gjsqu fmfnfou pg uif bssbz, opu afsp. Uijq iboemfq uif dbqf xifsf bmm ovncfsq bsf ofhbujwf. Bmqp, uif bsnbz difdl qipvme cf sfdphojaih uibu ui cnvtz bssbz dbqf jq ejggfsfou gspn bo bmm-ofhbujwf bssbz dbqf.

### Exercise 4: Binary Search Bug

**Problem**: This binary search algorithm is supposed to find a target value in a sorted array and return its index (or -1 if not found). However, it has issues with certain inputs.

**Buggy Algorithm**:
```
FUNCTION binarySearch(array, target)
    SET left = 0
    SET right = LENGTH(array) - 1
    
    WHILE left <= right
        SET mid = (left + right) / 2
        
        IF array[mid] = target THEN
            RETURN mid
        ELSE IF array[mid] < target THEN
            SET left = mid + 1
        ELSE
            SET right = mid - 1
        END IF
    END WHILE
    
    RETURN -1
END FUNCTION
```

**Examples**:
- Input: array = [1, 2, 3, 4, 5, 6, 7], target = 5
- Expected Output: 4 (index of 5)
- Actual Output: 4 (Correct)

- Input: array = [10, 20, 30, 40, 50], target = 45
- Expected Output: -1 (not found)
- Actual Output: -1 (Correct)

- Input: array = [100, 200, 300, 400, 500], target = 100
- Expected Output: 0 (index of 100)
- Actual Output: (varies/incorrect for large numbers)

**Hints**:
1. The algorithm works for small arrays but might fail for large ones. Why?
2. Look carefully at how the middle index is calculated.
3. Could there be an issue with integer division or potential overflow?
4. Consider extreme cases with very large arrays or indices.

**Bugs to Find**:
1. The mid calculation `(left + right) / 2` can cause integer overflow for large arrays
2. Division might truncate decimals incorrectly in some implementations

**Encoded Answer (Transposition Cipher, 3 columns)**:
Tehi  ebgunay rsehca atrlogimh sha a opntteila vnftlimeero gisb nithe 
mlcacianoult foth e dildem niesx. hWne lfet +tgrih anc eoverflw rfo 
aglre raras,y oushdl odecr tpuocem dim sa telft +i(rght -flet ) /. 2

### Exercise 5: Recursive Factorial Bug

**Problem**: This recursive algorithm is supposed to calculate the factorial of a non-negative integer (n! = n × (n-1) × ... × 2 × 1). However, it doesn't always work correctly.

**Buggy Algorithm**:
```
FUNCTION factorial(n)
    IF n = 0 THEN
        RETURN 1
    END IF
    
    RETURN n * factorial(n-1)
END FUNCTION
```

**Examples**:
- Input: n = 5
- Expected Output: 120
- Actual Output: 120 (Correct)

- Input: n = 0
- Expected Output: 1
- Actual Output: 1 (Correct)

- Input: n = -1
- Expected Output: Error (factorial is not defined for negative numbers)
- Actual Output: (runs indefinitely or crashes)

**Hints**:
1. The algorithm works for positive integers and zero, but what about negative inputs?
2. Trace through what happens when n is negative.
3. Think about the termination condition for the recursion.
4. What safeguards should be added to handle invalid inputs?

**Bugs to Find**:
1. The algorithm doesn't check for negative input values
2. The recursion never terminates for negative inputs, leading to infinite recursion

**Encoded Answer (Caesar Cipher, shift=4)**:
Xli jegxsvmep epksvmxlq wlsyph gligo mj r mw rikexmzi erh imxliv xlvsa er ivvsv sv vixyvrw e wtigmep zepyi. Xli jyrgxmsr wlsyph zspmhexi mrtyxw fijsvi tvsgiihmrk amxl xli vigyvwmzi gepgypexmsr.

## Common Debugging Techniques

Throughout these exercises, you've employed several key debugging techniques that are essential for all programmers:

### 1. Tracing

Walking through the algorithm step-by-step, tracking variable values and execution flow. This helps identify exactly where things go wrong.

### 2. Edge Case Testing

Testing algorithms with boundary conditions, such as empty arrays, negative numbers, or extreme values, to expose hidden bugs.

### 3. Input-Output Analysis

Comparing expected outputs with actual outputs to identify discrepancies and pinpoint issues.

### 4. Root Cause Analysis

Going beyond finding what's wrong to understand why it's happening—the underlying cause of the bug.

### 5. Incremental Fixing

Making one change at a time and verifying that it works, rather than making multiple changes simultaneously.

## Reflection Questions

1. Which types of bugs did you find most challenging to identify? Why?

2. What systematic approaches helped you most when debugging the algorithms?

3. Did you notice any common patterns among the bugs in different exercises?

4. How might you prevent similar bugs when writing your own algorithms?

5. How does the process of debugging help deepen your understanding of the algorithms?

## Extension Activities

1. **Bug Creation**: Create your own "buggy" algorithm with intentional errors for a classmate to debug.

2. **Multiple Bugs**: Take one of the fixed algorithms and introduce 2-3 different bugs. Practice finding and fixing multiple issues.

3. **Performance Debugging**: Analyze the fixed algorithms for performance issues. Can any of them be optimized to run more efficiently?

4. **Test Case Development**: For each algorithm, create a comprehensive set of test cases that would reveal the bugs.

5. **Documentation Practice**: Write clear documentation for one of the fixed algorithms, explaining how it works and potential edge cases.

## Connection to Programming

Debugging is a fundamental skill for programmers of all levels. Professional developers often spend more time debugging existing code than writing new code. The techniques you've practiced in these exercises apply directly to real-world programming:

- **Systematic Problem Isolation**: Locating exactly where an issue occurs is the first step in fixing it.

- **Logical Error Detection**: Identifying flaws in the algorithm's logic, not just syntax errors.

- **Edge Case Handling**: Ensuring code works for all possible inputs, not just the typical ones.

- **Error Prevention**: Learning from bugs to write more robust code in the future.

- **Testing Strategy**: Developing effective approaches to verify code correctness.

As you continue your programming journey, these debugging skills will become increasingly valuable. The ability to troubleshoot and fix problems efficiently is often what distinguishes experienced programmers.
