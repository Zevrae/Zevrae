import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.css')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Clean up any double font weights like "font-archivo font-bold font-light"
  content = content.replace(/font-archivo font-bold (font-light|font-normal|font-medium|font-semibold)/g, 'font-archivo font-bold');
  content = content.replace(/(font-light|font-normal|font-medium|font-semibold) font-archivo font-bold/g, 'font-archivo font-bold');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned up weights in: ${filePath}`);
  }
}

walkDir('./src', processFile);
console.log("Cleanup done.");
