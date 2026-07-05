import fs from 'fs';

const file = 'src/ProductGrid.tsx';
let content = fs.readFileSync(file, 'utf8');

// Find all matches of frontImg and backImg in objects
// Let's just do a regex replace where backImg has the exact same URL as frontImg.
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('backImg:')) {
    // try to find the previous frontImg
    let frontImgLine = -1;
    for (let j = i - 1; j >= Math.max(0, i - 5); j--) {
      if (lines[j].includes('frontImg:')) {
        frontImgLine = j;
        break;
      }
    }
    
    if (frontImgLine !== -1) {
      // extract URLs
      const frontUrlMatch = lines[frontImgLine].match(/['"]([^'"]+)['"]/);
      const backUrlMatch = lines[i].match(/['"]([^'"]+)['"]/);
      
      if (frontUrlMatch && backUrlMatch && frontUrlMatch[1] === backUrlMatch[1]) {
        // Remove the backImg line
        // We also need to handle the comma on the previous line if this was the last property
        lines[i] = ''; // clear the line
        
        // If the frontImg line ended with a comma, it's fine. 
        // We might leave a dangling comma on frontImg line but JS allows trailing commas.
      }
    }
  }
}

fs.writeFileSync(file, lines.filter(line => line !== '').join('\n'));
console.log('Done cleaning duplicates.');
