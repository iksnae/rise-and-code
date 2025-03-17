# Activity: Advanced Challenges

## Overview

This activity presents five advanced coding challenges that will stretch your problem-solving abilities and require sophisticated approaches. These challenges integrate multiple concepts from previous chapters and demand careful planning, algorithmic thinking, and attention to detail. They represent the types of problems that professional programmers regularly encounter.

## Learning Objectives

- Tackle complex problems requiring multiple algorithmic techniques
- Develop advanced problem-solving strategies
- Apply critical thinking to identify optimal solutions
- Create efficient algorithms for challenging scenarios
- Build confidence in your ability to solve difficult programming problems

## Materials Needed

- Your notebook
- Pencil and eraser
- Ruler (for diagrams and tables)
- Optional: graph paper for grid-based problems
- Optional: colored pencils for algorithm visualization

## Time Required

90-120 minutes (approximately 18-24 minutes per challenge)

## Instructions

For each challenge:
1. Read the problem statement multiple times to ensure complete understanding
2. Break down the problem into smaller, manageable subproblems
3. Consider multiple solution approaches before selecting one
4. Plan your algorithm carefully before implementation
5. Implement your solution as pseudocode in your notebook
6. Test your solution with the provided examples and additional cases you create
7. Analyze the efficiency of your solution and optimize if necessary
8. Verify your answer using the encoded answer key

### Challenge 1: Path Through a Grid

**Problem**: Find the number of possible paths from the top-left corner to the bottom-right corner of an m×n grid. You can only move right or down at each step.

**Input**: Two positive integers m and n representing the grid dimensions
**Output**: The number of possible paths

**Example 1**:
- Input: m = 2, n = 3 (a 2×3 grid)
- Output: 3

**Example 2**:
- Input: m = 3, n = 3 (a 3×3 grid)
- Output: 6

**Hints**:
1. Consider the number of right and down moves required to reach the destination.
2. Think about whether you can use a formula based on combinations.
3. Alternatively, consider a recursive approach or dynamic programming.
4. Try solving smaller examples by hand to identify patterns.

**Approach**:
1. Observe that to reach the bottom-right corner from the top-left, you always need exactly (m-1) down moves and (n-1) right moves
2. The total number of moves is (m-1) + (n-1) = m+n-2
3. The number of possible paths is determined by how many ways you can arrange these moves
4. The mathematical formula is: (m+n-2)! / ((m-1)! × (n-1)!)
5. Alternatively, you can use a grid-based approach to build up the solution

**Encoded Answer (Keyword Cipher with keyword="GRID")**:
Tkjc jc g imbdjpgirjgec quideva. Tke pivdev id qgtkc jc tke pivdev id ygsc ti mkiice ykeve ti qegme (v-1) aiyp vifec gpa (p-1) vjwkt vifec gvipw tke qgtk. Tkjc jc ecujfgeept ti (v+p-2) mkiice (v-1), iv (v+p-2)!/(v-1)!(p-1)!

### Challenge 2: Longest Common Subsequence

**Problem**: Find the length of the longest common subsequence between two strings. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

**Input**: Two strings, str1 and str2
**Output**: The length of the longest common subsequence

**Example 1**:
- Input: str1 = "ABCBDAB", str2 = "BDCABA"
- Output: 4 (The longest common subsequence is "BCBA")

**Example 2**:
- Input: str1 = "PROGRAMMING", str2 = "GAMING"
- Output: 6 (The longest common subsequence is "GAMING")

**Hints**:
1. Consider comparing the strings character by character.
2. Think about what happens when characters match vs. when they don't.
3. This problem has an optimal substructure property, making it suitable for dynamic programming.
4. Consider building a table where cell (i,j) represents the length of the LCS for the substrings str1[0...i] and str2[0...j].

**Approach**:
1. Create a table of size (m+1)×(n+1), where m and n are the lengths of the two strings
2. Initialize the first row and column with zeros
3. For each character in str1 and str2:
   - If the characters match, the value at position (i,j) is 1 plus the value at position (i-1, j-1)
   - If the characters don't match, the value is the maximum of the values at positions (i-1, j) and (i, j-1)
4. The value at position (m, n) is the length of the longest common subsequence

**Encoded Answer (Transposition Cipher, 5 columns)**:
Tghmeo oetdol tnssc baqmsu nehuieo ncnswe  cteai ltdosrl ecaotn. neWsh i,jr(  =t1+i) j(ec,a) hsacrt ietrwm saalhc ent,h eriot sfehrw esii,ej  )hhc=t maeof i1j-,(  andj1)-.(

### Challenge 3: Coin Change Problem

**Problem**: Given a set of coin denominations and a target amount, find the minimum number of coins needed to make up that amount. Assume you have an infinite supply of each coin denomination.

**Input**: An array of coin denominations [c₁, c₂, ..., cₙ] and a target amount
**Output**: The minimum number of coins needed to make up the amount, or -1 if it's not possible

**Example 1**:
- Input: coins = [1, 5, 10, 25], amount = 36
- Output: 3 (25 + 10 + 1)

**Example 2**:
- Input: coins = [5, 10, 25], amount = 3
- Output: -1 (not possible to make 3 with the given denominations)

**Hints**:
1. Consider a greedy approach first, but note that it doesn't always work for arbitrary coin denominations.
2. Think about how to break down the problem into smaller subproblems.
3. For each amount from 1 to the target, determine the minimum number of coins needed.
4. Dynamic programming can be applied effectively here.

**Approach**:
1. Create an array dp of size amount+1, initialized with infinity (or a value larger than possible coin count)
2. Set dp[0] = 0 (it takes 0 coins to make an amount of 0)
3. For each coin denomination and for each amount from the coin value to the target:
   - Update dp[amount] to be the minimum of its current value and 1 + dp[amount - coin value]
4. If dp[target amount] is still infinity, return -1 (not possible)
5. Otherwise, return dp[target amount]

**Encoded Answer (Caesar Cipher, shift=7)**:
Bzl aopz wyvisltz, dpao hwwyvhjo dpao kfuhtpj wyvnyhttpun. Jylhal hu hyyhf kw aol zpgl vm aol ayvnla htvbua + 1, pupa ph spgl dp ao pumapu paf. Zla kw[0] = 0. Mv ylhjo jvpu huk mv ylhjo htvbua myvt aoha jvpu ahssl aolahynla, bwkhalkw[htvbu] av tpupt bt vm kw[htvbua] huk 1 + kw[htvbua - jvpudhs bl].

### Challenge 4: Connected Components in a Graph

**Problem**: Given an undirected graph represented as an adjacency list, count the number of connected components.

**Input**: A list of edges representing connections between nodes in a graph with n nodes (labeled from 0 to n-1)
**Output**: The number of connected components in the graph

**Example 1**:
- Input: n = 5, edges = [[0,1], [1,2], [3,4]]
- Output: 2 (Components: [0,1,2] and [3,4])

**Example 2**:
- Input: n = 6, edges = [[0,1], [1,2], [2,0], [3,4]]
- Output: 3 (Components: [0,1,2], [3,4], and [5])

**Hints**:
1. You can use either breadth-first search (BFS) or depth-first search (DFS) to traverse a connected component.
2. Keep track of visited nodes to avoid processing the same node multiple times.
3. For each unvisited node, start a new traversal and increment your component counter.
4. Consider how to handle nodes that have no connections.

**Approach**:
1. Create an adjacency list representation of the graph from the edge list
2. Initialize a visited array or set to keep track of visited nodes
3. Initialize a counter for connected components
4. For each node in the graph:
   - If the node has not been visited:
     - Increment the component counter
     - Perform a DFS or BFS starting from this node, marking all reachable nodes as visited
5. Return the component counter

**Encoded Answer (Binary)**:
01010100 01101111 00100000 01100110 01101001 01101110 01100100 00100000 01100011 01101111 01101110 01101110 01100101 01100011 01110100 01100101 01100100 00100000 01100011 01101111 01101101 01110000 01101111 01101110 01100101 01101110 01110100 01110011 00101100 00100000 01110101 01110011 01100101 00100000 01000100 01000110 01010011 00100000 01101111 01110010 00100000 01000010 01000110 01010011 00100000 01100110 01110010 01101111 01101101 00100000 01100101 01100001 01100011 01101000 00100000 01110101 01101110 01110110 01101001 01110011 01101001 01110100 01100101 01100100 00100000 01101110 01101111 01100100 01100101 00101110

### Challenge 5: Longest Increasing Subsequence

**Problem**: Find the length of the longest strictly increasing subsequence in an array of integers. A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.

**Input**: An array of integers
**Output**: The length of the longest strictly increasing subsequence

**Example 1**:
- Input: [10, 9, 2, 5, 3, 7, 101, 18]
- Output: 4 (The longest increasing subsequence is [2, 5, 7, 101])

**Example 2**:
- Input: [0, 1, 0, 3, 2, 3]
- Output: 4 (The longest increasing subsequence is [0, 1, 2, 3])

**Hints**:
1. Consider what information you need to track for each position in the array.
2. Think about how the solution for a prefix of the array relates to the solution for the entire array.
3. For each position, consider how to use the solutions for previous positions.
4. There are both O(n²) and O(n log n) solutions to this problem.

**Approach**:
1. Create an array dp where dp[i] represents the length of the longest increasing subsequence ending at index i
2. Initialize all values in dp to 1 (a single element is always an increasing subsequence of length 1)
3. For each position i and for each previous position j < i:
   - If nums[i] > nums[j], update dp[i] to the maximum of dp[i] and dp[j] + 1
4. Return the maximum value in the dp array

**Encoded Answer (Mixed Cipher - Caesar shift=4 followed by word reversal)**:
Irj evspsptw etxw, ix aer ywe gmqerch kipsvklxmq. Ixeivg re cvvec th ivilA .1 sx petkrip lx lxkrip jsv leeg tswmxmsr. Vsj leeg tswmxmsr m, aosp xe pep tvizsysm tswmxmsrw n. Jm xlI[m] > xlI[n], ixetty th[m] xs xlI qybmqeq js th[m] hre th[n] + 1. Xlir hivyx xlI qybmqeq iypez rm xlI th cvvec.

## Extension Activities

1. **Grid Variations**: Modify the grid path problem to include obstacles that cannot be traversed.

2. **Sequence Analysis**: Extend the longest common subsequence problem to find and print the actual subsequence, not just its length.

3. **Currency Optimization**: Adapt the coin change problem to find all possible combinations using the minimum number of coins.

4. **Graph Exploration**: For the connected components problem, implement an algorithm to determine if the graph is bipartite (can be divided into two groups where no two vertices within the same group are adjacent).

5. **Sequence Patterns**: Modify the longest increasing subsequence problem to find the longest alternating subsequence (where elements alternate between increasing and decreasing).

## Guided Learning Pathways

For these advanced challenges, here are some suggested learning pathways to break down the problems:

### Path for Grid Problem:
1. Start by manually counting paths for very small grids (2×2, 2×3, 3×3)
2. Identify the pattern of how many ways you can reach each cell
3. Build a table showing the number of ways to reach each cell
4. Discover the recursive relation: ways(i,j) = ways(i-1,j) + ways(i,j-1)
5. Implement the solution using dynamic programming

### Path for Dynamic Programming Problems (Challenges 2, 3, and 5):
1. Start with a small example and solve it by hand
2. Identify the subproblems and how they relate to the original problem
3. Define a state representation (what information needs to be tracked)
4. Determine the recursive relation between states
5. Decide between top-down (memoization) or bottom-up approach
6. Implement and test with small examples first

## Reflection Questions

1. How did you approach breaking down these complex problems into manageable parts?

2. Which algorithmic techniques did you find most useful for these advanced challenges?

3. Did you notice any common patterns or strategies across different problems?

4. How did your problem-solving approach evolve as you worked through the challenges?

5. Which problem was most challenging, and what did you learn from it?

6. How would you apply what you've learned to real-world problem-solving?

## Connection to Programming

These advanced challenges demonstrate sophisticated programming concepts and techniques used in competitive programming and professional software development:

- **Dynamic Programming** (Challenges 2, 3, and 5): A powerful technique for solving problems by breaking them down into overlapping subproblems and avoiding redundant calculations.

- **Combinatorial Mathematics** (Challenge 1): Understanding how to apply mathematical formulas and combinations to solve computational problems.

- **Graph Theory** (Challenge 4): Working with node and edge relationships to analyze connectivity and structural properties of networks.

- **Algorithm Optimization**: Each challenge presents opportunities to consider both brute-force and optimized approaches, demonstrating the importance of algorithm efficiency.

- **Problem Decomposition**: Breaking complex problems into smaller, more manageable subproblems is a fundamental skill in all areas of programming and software development.

These techniques form the foundation of many real-world applications, from route planning and network analysis to pattern recognition and optimization problems in various domains.
