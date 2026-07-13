const fs = require('fs');
const path = require('path');

const gridPath = path.join(__dirname, 'src', 'ProductGrid.tsx');
let gridContent = fs.readFileSync(gridPath, 'utf8');

const productsRegex = /const products = \[[\s\S]*?\];/;
const productsReplacement = `const products = [];`;

gridContent = gridContent.replace(productsRegex, productsReplacement);
fs.writeFileSync(gridPath, gridContent, 'utf8');

const scrollerPath = path.join(__dirname, 'src', 'components', 'CollectionScroller.tsx');
let scrollerContent = fs.readFileSync(scrollerPath, 'utf8');

// Update item count for men collection
const menCountRegex = /(id:\s*'men',[\s\S]*?itemCount:\s*)\d+(,)/;
scrollerContent = scrollerContent.replace(menCountRegex, '$1 0$2');

fs.writeFileSync(scrollerPath, scrollerContent, 'utf8');

console.log('Update complete');
