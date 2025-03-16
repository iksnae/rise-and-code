/**
 * Rise & Code Build Trigger
 * 
 * This script makes a simple change to trigger the build workflow.
 * It adds a timestamp to the end of this file to ensure the repository changes.
 */

const fs = require('fs');
const path = require('path');

// Get the path to this file
const thisFile = path.resolve(__dirname, 'trigger-build.js');

// Read the current file content
let content = fs.readFileSync(thisFile, 'utf8');

// Remove any previous timestamp if it exists
content = content.replace(/\/\/ Last build triggered: .+$/, '');

// Add a timestamp to the end of the file
const timestamp = new Date().toISOString();
content += `\n// Last build triggered: ${timestamp}\n`;

// Write the updated content back to the file
fs.writeFileSync(thisFile, content);

console.log(`Build trigger updated at ${timestamp}`);
console.log('Commit and push this change to trigger a new build.');
