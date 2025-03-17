# Activity: Obstacle Course Navigation

## Overview
The Obstacle Course Navigation activity puts algorithmic thinking into physical space by challenging you to create precise navigation instructions for others to follow. This exercise demonstrates the importance of spatial awareness, clarity, and error handling in algorithms, while also being a fun, interactive experience that can be set up anywhere with simple household objects.

## Learning Objectives
- Create algorithms for spatial navigation
- Practice giving precise directional and positional instructions
- Experience the consequences of imprecise or incomplete algorithms
- Learn to anticipate and handle potential errors in execution
- Develop spatial reasoning and communication skills

## Materials Needed
- Household objects to create obstacles (chairs, pillows, boxes, books, etc.)
- Blindfold (optional but recommended)
- Notebook and pencil for writing algorithms
- Measuring tool (ruler, tape measure, or counting steps)
- Chalk, tape, or string to mark start and finish points
- Timer or stopwatch (optional)
- Open space (indoor or outdoor) of at least 3×3 meters (10×10 feet)

## Time Required
45-60 minutes

## Instructions

### Part 1: Setting Up the Obstacle Course

1. Clear a space in a room, hallway, or outdoor area
2. Place 5-10 objects throughout the space to create obstacles
3. Mark a clear "Start" and "Finish" point
4. Create a simple path that requires:
   - Turning in different directions
   - Stepping over or around obstacles
   - Avoiding "dangerous" areas (marked with tape or chalk)
5. Map your course in your notebook, noting the positions of all obstacles

### Part 2: Measuring and Mapping

1. Decide on a standard unit of measurement:
   - Standard units (meters, feet)
   - Body-based units (steps, arm spans)
   - Improvised units (book lengths, tile squares)
2. Create a coordinate system for your space:
   - Mark the starting point as the origin (0,0)
   - Define the positive x-direction (e.g., "toward the door")
   - Define the positive y-direction (e.g., "toward the window")
3. Measure and record the coordinates of:
   - All obstacles (position and dimensions)
   - The finish point
   - Any "dangerous" areas to avoid

### Part 3: Creating Your Navigation Algorithm

1. Plan a path from start to finish that avoids all obstacles
2. Write an algorithm with precise, step-by-step instructions:
   - Include exact distances ("move 3 steps forward")
   - Specify precise turn angles ("turn 90 degrees right")
   - Describe actions for navigating each obstacle ("step over the book")
3. Add safety checks and error handling:
   - "If you touch an obstacle, stop and back up one step"
   - "If you're unsure of your position, pause and request confirmation"
4. Use clear, consistent terminology throughout your algorithm
5. Number each step for easy reference

### Part 4: Testing Your Algorithm

1. Find a partner to be the "navigator" (if working alone, you can ask a family member)
2. The navigator stands at the starting point
3. Blindfold the navigator (optional but creates a better simulation of computer-like following of instructions)
4. Read your algorithm instructions aloud, one step at a time
5. The navigator must follow the instructions exactly as stated
6. Record any points where the navigator:
   - Encounters an unexpected obstacle
   - Misinterprets an instruction
   - Successfully navigates a challenging section
7. Note the overall success or failure of the navigation attempt

### Part 5: Debugging and Improvement

1. Analyze what went wrong in the testing phase
2. Identify specific instructions that were:
   - Too vague or ambiguous
   - Missing crucial details
   - Incorrectly measured
   - In the wrong sequence
3. Revise your algorithm to address all issues
4. Add additional safety checks or error handling
5. Test your improved algorithm with the same or a different navigator
6. Continue the debugging cycle until navigation is successful

### Part 6: Reflection

In your notebook, reflect on your experience:

1. What was most challenging about creating spatial navigation instructions?
2. How did your algorithm improve between the first and final versions?
3. What types of errors were most common during testing?
4. How did the experience of navigating differ from creating the algorithm?
5. How is this activity similar to how a computer would follow a program?

## Example

Here's an example of a simple navigation algorithm:

```
Algorithm: Navigate from Kitchen Door to Sink

Starting position: Standing at kitchen door, facing into kitchen
Finish position: Standing in front of sink

1. Move forward 4 steps
2. Turn 90 degrees right
3. Move forward 2 steps
4. IF you bump into the chair THEN
   a. Step 1 step backward
   b. Move 1 step to the left
   c. Continue forward 2 steps
   END IF
5. Turn 90 degrees left
6. Move forward 3 steps
7. Stop when your hands touch the edge of the sink
8. You have reached the destination
```

## Variations

### Team Navigation Challenge
Form teams of 3-4 people where:
- One person creates the algorithm
- One person is the navigator (blindfolded)
- One person observes and notes errors
- One person times the navigation

Teams compete to create the fastest successful navigation algorithm.

### Remote Navigation
The algorithm creator cannot see the obstacle course directly but must create instructions based on a verbal description or simple diagram. This simulates programming for an environment you cannot directly observe.

### Multi-Path Algorithm
Create an algorithm with decision points that can handle multiple possible routes:
```
IF pathway to the right is blocked THEN
   Turn left and proceed 2 steps
ELSE
   Turn right and proceed 3 steps
END IF
```

### Extreme Obstacle Course
For an outdoor version, create a more complex course with varied terrain, requiring actions like:
- Crawling under obstacles
- Stepping into specific safe zones
- Navigating around trees or playground equipment

## Extension Activities

### Algorithm Optimization Challenge
After creating a successful navigation algorithm, challenge yourself to optimize it by:
1. Reducing the total number of steps required
2. Minimizing the number of turns
3. Creating the shortest possible written algorithm

Compare the original and optimized versions to see the improvements.

### Robot Simulation
Enhance the realism of the simulation by adding additional "robot-like" constraints:
- The navigator can only turn in 90-degree increments
- Forward movement must be in consistent units (e.g., always 1 step at a time)
- The navigator cannot see or process any information not explicitly provided by the algorithm

### Navigation with Loops
Introduce loops into your algorithm to handle repetitive movements:
```
Repeat 3 times:
   Move forward 1 step
   Turn right 90 degrees
End repeat
```

### Algorithm Translation Challenge
Convert your natural language navigation algorithm into a more formal notation or pseudocode format:
```
FUNCTION navigate_kitchen()
   move_forward(4)
   turn_right(90)
   move_forward(2)
   IF obstacle_detected() THEN
      move_backward(1)
      move_left(1)
      move_forward(2)
   END IF
   turn_left(90)
   move_forward(3)
   WHILE NOT touching_sink()
      move_forward(1)
   END WHILE
   RETURN success
END FUNCTION
```

## Connection to Programming

The Obstacle Course Navigation activity directly relates to several important programming concepts:

1. **Spatial Algorithms**: Many computer programs deal with navigation and spatial relationships, from video games to robotics to GPS systems.

2. **Precision in Instructions**: Computers require the same level of precision demonstrated in this activity—they cannot "figure out" vague or ambiguous commands.

3. **Error Handling**: Just as your algorithm needed to account for unexpected obstacles, computer programs need exception handling to deal with unexpected situations.

4. **Testing and Debugging**: The cycle of testing, identifying problems, and improving your algorithm mirrors the software development process.

5. **Coordinate Systems**: The mapping exercise introduces the concept of coordinate systems, which are fundamental in programming graphics, games, and spatial applications.

6. **User Experience**: Navigating based on someone else's algorithm helps develop empathy for the users of programs you might write.

By experiencing these concepts physically, you've gained insights that will be valuable when you begin programming computers to navigate virtual or physical spaces.
