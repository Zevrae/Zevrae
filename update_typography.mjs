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

  // For headings
  content = content.replace(/(text-(?:xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl)[^"']*)font-serif([^"']*)/g, (match, p1, p2) => {
    // If it has font-light, we might want to keep it or remove it? Archivo is bold. Let's just use font-archivo.
    return `${p1}font-archivo font-bold${p2}`;
  });

  // For small text / labels / buttons
  content = content.replace(/(text-(?:\[10px\]|\[11px\]|\[12px\]|\[13px\]|\[14px\]|xs|sm|base)[^"']*)font-serif([^"']*)/g, (match, p1, p2) => {
    return `${p1}font-plex-mono${p2}`;
  });

  // For remaining font-serif (which might be anything else)
  content = content.replace(/font-serif/g, 'font-sans');
  
  // Also replace any hardcoded font-[Playfair...] if it exists
  content = content.replace(/font-\['Playfair[^']*'\]/g, 'font-sans');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

walkDir('./src', processFile);
console.log("Done typography update.");
