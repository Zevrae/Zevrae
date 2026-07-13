const fs = require('fs');
const path = require('path');

const gridPath = path.join(__dirname, 'src', 'ProductGrid.tsx');
let gridContent = fs.readFileSync(gridPath, 'utf8');

const productsRegex = /const products = \[[\s\S]*?\];/;
const productsReplacement = `const products = [
  {
    id: 'm6',
    name: 'CARNAGE',
    price: 799,
    originalPrice: 1599,
    discount: '49% OFF',
    label: 'Men Premium',
    category: 'men',
    gender: 'men',
    type: 'tshirt',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    frontImg: 'https://i.ibb.co/k6VLyf0x/CARNAGE-FRONT.png',
    backImg: 'https://i.ibb.co/fdx9sHwf/CARNAGE-BACK.png',
    stock: 50
  }
];`;

gridContent = gridContent.replace(productsRegex, productsReplacement);
fs.writeFileSync(gridPath, gridContent, 'utf8');

const scrollerPath = path.join(__dirname, 'src', 'components', 'CollectionScroller.tsx');
let scrollerContent = fs.readFileSync(scrollerPath, 'utf8');

// Update item count for men collection
const menCountRegex = /(id:\s*'men',[\s\S]*?itemCount:\s*)\d+(,)/;
scrollerContent = scrollerContent.replace(menCountRegex, '$1 1$2');

fs.writeFileSync(scrollerPath, scrollerContent, 'utf8');

console.log('Update complete');
