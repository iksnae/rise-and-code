# Activity: Secret Codes - Introduction to Cryptography

## Overview
This activity introduces simple cryptography through the creation and deciphering of secret codes. By encoding and decoding messages, you'll practice data transformation techniques while learning how information can be secured and transmitted confidentially.

## Learning Objectives
- Understand how data can be transformed while preserving its meaning
- Apply systematic rules to encode and decode information
- Practice following algorithms for data transformation
- Create and implement simple encryption systems
- Recognize patterns in encoded data

## Materials Needed
- Your notebook
- Pencil and eraser
- Ruler (optional)
- Scissors
- Paper strips (for creating cipher wheels/tools)
- Paper clips or brass fasteners (optional, for creating cipher tools)
- Optional: colored pencils or markers

## Time Required
45-60 minutes

## Instructions

### Part 1: Understanding Simple Substitution Ciphers

A substitution cipher replaces each letter in a message with a different letter or symbol according to a fixed rule.

#### The Caesar Cipher

The Caesar cipher is one of the oldest and simplest encryption techniques. It works by shifting each letter in the message by a fixed number of positions in the alphabet.

1. Create a simple reference table in your notebook:
   ```
   Plain:  ABCDEFGHIJKLMNOPQRSTUVWXYZ
   Cipher: DEFGHIJKLMNOPQRSTUVWXYZABC
   ```
   (This shows a Caesar cipher with a shift of 3)

2. Practice encoding these words using the shift-3 Caesar cipher:
   - HELLO
   - CODE
   - DATA
   - YOUR NAME

3. Practice decoding these words (which were encoded with a shift-3 Caesar cipher):
   - FRPSXWHU
   - SURJUDP
   - YDULDEOH

4. In your notebook, write pseudocode for the encoding and decoding processes.

### Part 2: Creating a Cipher Wheel

A cipher wheel is a practical tool for applying substitution ciphers:

1. Cut out two circles of paper, one slightly smaller than the other
2. On the larger circle, write the 26 letters of the alphabet in order around the edge
3. On the smaller circle, write the 26 letters in order as well
4. Pierce the center of both circles and connect them with a paper clip or brass fastener
5. By rotating the inner circle, you can create different cipher settings

To use your cipher wheel:
1. Rotate the inner wheel to your chosen shift (e.g., lining up inner A with outer D creates a shift-3 cipher)
2. To encode, find the letter from your message on the outer wheel and substitute it with the corresponding letter on the inner wheel
3. To decode, find the letter from the encoded message on the inner wheel and substitute it with the corresponding letter on the outer wheel

Try encoding and decoding messages with different shift values.

### Part 3: Keyword Ciphers

A more complex substitution cipher uses a keyword to create the cipher alphabet:

1. Choose a keyword (e.g., "PROGRAM")
2. Write the keyword, removing any duplicate letters (e.g., "PROGAM")
3. Fill in the rest of the alphabet in order, skipping any letters already used
4. Create a reference table:
   ```
   Plain:  ABCDEFGHIJKLMNOPQRSTUVWXYZ
   Cipher: PROGAMABCDEFHIJKLNQSTUVWXYZ
   ```

5. Encode these words using your keyword cipher:
   - HELLO
   - VARIABLE
   - DATA

6. Create your own message, encode it, and challenge a partner to decode it (if possible)

### Part 4: Transposition Ciphers

Transposition ciphers rearrange the letters rather than replacing them:

#### The Reverse Cipher
The simplest transposition cipher is reversing the characters:
```
"HELLO" → "OLLEH"
```

Try encoding several words using the reverse cipher.

#### The Route Cipher
1. Write your message in a grid, row by row
2. Read off the letters in a different pattern (column by column, spiraling in, etc.)

Example using a 3×3 grid with the message "VARIABLES":
```
V A R
I A B
L E S
```

Reading column by column gives: "VILARES"
(Note that the last column is incomplete in this example)

Try creating your own route cipher with a short message.

### Part 5: Code Breaking Challenges

Now let's practice breaking some simple codes:

1. Decode this message (Caesar cipher):
   ```
   SURJUDPPLQJ LV IXQ
   ```

2. This message was encoded with a keyword cipher using the keyword "CIPHER". Decode it:
   ```
   RGLVMCFR YCKC KFGMJ
   ```

3. Decode this message (simple transposition):
   ```
   DTCAEOSEDR
   ```
   Hint: Write the letters in two rows of 5 characters each, then read down the columns.

### Part 6: Creating Your Own Cipher System

Develop your own unique cipher system:

1. Design a set of rules for encoding messages
2. Create a clear instruction manual so others could use your system
3. Include examples of encoded and decoded messages
4. Ensure your system is reversible (can be decoded)
5. Test your system by encoding a message and asking a partner to decode it using your instructions

Ideas for your cipher system:
- Combine substitution and transposition methods
- Use a mathematical formula to determine letter shifts
- Include special symbols or numbers
- Base your cipher on a pattern like odd/even letter positions

### Part 7: Binary Encoding (Extension)

As an extension, explore how computers represent text using binary code:

1. Create a table showing the letters A-Z and their ASCII values in binary:
   A = 01000001
   B = 01000010
   etc.

2. Encode a short message (3-4 letters) into binary
3. Decode a binary message:
   ```
   01001000 01000101 01001100 01001100 01001111
   ```

## Example Solution

Here's how to encode "HELLO" using a Caesar cipher with a shift of 3:

1. H → K (shift H by 3 letters)
2. E → H (shift E by 3 letters)
3. L → O (shift L by 3 letters)
4. L → O (shift L by 3 letters)
5. O → R (shift O by 3 letters)

Result: "HELLO" encodes to "KHOOR"

To decode "KHOOR":
1. K → H (shift K back by 3 letters)
2. H → E (shift H back by 3 letters)
3. O → L (shift O back by 3 letters)
4. O → L (shift O back by 3 letters)
5. R → O (shift R back by 3 letters)

Result: "KHOOR" decodes to "HELLO"

## Pseudocode for Caesar Cipher

Here's pseudocode for encoding with a Caesar cipher:

```
FUNCTION CaesarEncode(message, shift)
    SET alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    SET encoded = ""
    
    FOR EACH character IN message
        IF character is in alphabet
            SET position = INDEX of character in alphabet
            SET new_position = (position + shift) % 26
            SET new_character = alphabet[new_position]
            SET encoded = encoded + new_character
        ELSE
            SET encoded = encoded + character  # Keep spaces and punctuation as is
        END IF
    END FOR
    
    RETURN encoded
END FUNCTION
```

And for decoding:

```
FUNCTION CaesarDecode(encoded_message, shift)
    SET alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    SET decoded = ""
    
    FOR EACH character IN encoded_message
        IF character is in alphabet
            SET position = INDEX of character in alphabet
            SET original_position = (position - shift) % 26
            IF original_position < 0
                SET original_position = original_position + 26
            END IF
            SET original_character = alphabet[original_position]
            SET decoded = decoded + original_character
        ELSE
            SET decoded = decoded + character  # Keep spaces and punctuation as is
        END IF
    END FOR
    
    RETURN decoded
END FUNCTION
```

## Reflection Questions

After completing the activities, reflect on these questions:

1. How are encryption techniques similar to the data transformations we learned about in this chapter?
2. What patterns did you notice that helped you decrypt encoded messages?
3. How does understanding ciphers help you understand how computers process data?
4. Why might it be important to encode information in the real world?
5. What made some ciphers more difficult to break than others?
6. How have encryption methods changed with the development of computers?

## Extension Activities

1. **Historical Cryptography**: Research a historical cipher like the Enigma machine, Vigenère cipher, or Navajo code talkers. Create a presentation explaining how it worked.

2. **Digital Security**: Investigate how modern encryption protects our digital information. How are concepts from simple ciphers still used today?

3. **Steganography**: Explore steganography—hiding messages within other information. Create a simple steganographic method, such as hiding a message by using the first letter of each sentence in a paragraph.

4. **Error Detection**: Research how checksums and error detection codes help ensure data integrity. Create a simple checksum algorithm for verifying messages.

## Connection to Programming

Cryptography is closely related to programming concepts:

- **Data transformation**: Encryption transforms data just like the manipulation techniques we've learned
- **Algorithms**: Ciphers follow specific, repeatable steps—just like programming algorithms
- **Reversible operations**: Encryption and decryption demonstrate how some operations can be reversed
- **Pattern recognition**: Breaking codes involves finding patterns in data

Cryptography is an essential part of computer science and cybersecurity. The concepts you've learned here serve as a foundation for understanding how modern computers protect sensitive information.

## Real-World Applications

Encryption is used in many aspects of our digital lives:
- Secure website connections (HTTPS)
- Password protection
- Private messaging apps
- Digital banking
- Data privacy and security
- Government and military communications

By understanding the basics of cryptography, you're beginning to understand how our modern digital world secures information—a critical aspect of computer science and programming.

## Key Takeaways

- Data can be transformed according to specific rules while preserving its meaning
- Encryption transforms data to keep it secret while decryption reverses the process
- Simple patterns can be used to encode and decode information
- Creating effective ciphers requires creativity and systematic thinking
- Cryptography is an important application of data transformation in the real world
