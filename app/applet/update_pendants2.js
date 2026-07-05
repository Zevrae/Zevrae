import fs from 'fs';

const updatedPendants = [
{
id: "p1",
name: "Bohemian Love Metal Waist Chain",
price: 599,
originalPrice: 1109,
discount: "46% OFF",
category: "pendants",
label: "Jewellery Premium",
sizes: ["Universal"],
frontImg: "https://i.ibb.co/vvxnzFys/Bohemian-Love-Metal-Waist-Chain-FRONT.png",
backImg: "https://i.ibb.co/rPdn3VQ/Bohemian-Love-Metal-Waist-Chain-BACK.png",
},
{
id: "p2",
name: "Bohemian Retro Metal Waist Chain",
price: 599,
originalPrice: 1109,
discount: "46% OFF",
category: "pendants",
label: "Jewellery Premium",
sizes: ["Universal"],
frontImg: "https://i.ibb.co/7tLBVS1m/Bohemian-Retro-Metal-Waist-Chain-FRONT.png",
backImg: "https://i.ibb.co/HLJF69cb/Bohemian-Retro-Metal-Waist-Chain-BACK.png",
},
{
id: "p3",
name: "Bow Knot Gold Platted Chain",
price: 359,
originalPrice: 665,
discount: "46% OFF",
category: "pendants",
label: "Jewellery Premium",
sizes: ["Universal"],
frontImg: "https://i.ibb.co/YFtXmfph/Bow-Knot-Gold-Platted-Chain.png",
},
{
id: "p4",
name: "Box Chain Small Cherry Chain",
price: 499,
originalPrice: 741,
discount: "46% OFF",
category: "pendants",
label: "Jewellery Premium",
sizes: ["Universal"],
frontImg: "https://i.ibb.co/TZZ6T57/Box-Chain-Small-Cherry-Chain.png",
},
{
id: "p5",
name: "Classic Versatile 18K Gold Plated Jewelry",
price: 499,
originalPrice: 741,
discount: "46% OFF",
category: "pendants",
label: "Jewellery Premium",
sizes: ["Universal"],
frontImg: "https://i.ibb.co/Kp4FH8tK/Classic-Versatile-18-K-Gold-Plated-Jewelry.png",
},
{
id: "p6",
name: "Dragon Totem Pendant Necklace",
price: 599,
originalPrice: 1109,
discount: "46% OFF",
category: "pendants",
label: "Jewellery Premium",
sizes: ["Universal"],
frontImg: "https://i.ibb.co/vxqSf1h9/Dragon-Totem-Pendant-Necklace-FRONT.png",
backImg: "https://i.ibb.co/gLjgx5J5/Dragon-Totem-Pendant-Necklace-BACK.png",
},
{
id: "p7",
name: "Gold Leaf Pendant",
price: 499,
originalPrice: 741,
discount: "46% OFF",
category: "pendants",
label: "Jewellery Premium",
sizes: ["Universal"],
frontImg: "https://i.ibb.co/yF4169V9/Gold-Leaf-Pendant.png",
},
{
id: "p8",
name: "Gold Sunflower Pendant",
price: 599,
originalPrice: 1109,
discount: "46% OFF",
category: "pendants",
label: "Jewellery Premium",
sizes: ["Universal"],
frontImg: "https://i.ibb.co/PzPQ3vgB/Gold-Sunflower-Pendant.png",
},
{
id: "p9",
name: "Retro Style Cross Necklace",
price: 599,
originalPrice: 1109,
discount: "46% OFF",
category: "pendants",
label: "Jewellery Premium",
sizes: ["Universal"],
frontImg: "https://i.ibb.co/LXpFjHV3/Retro-Style-Cross-Necklace-FRONT.png",
backImg: "https://i.ibb.co/5h2kKKnx/Retro-Style-Cross-Necklace-BACK.png",
},
{
id: "p10",
name: "Round Bead Chain Double-layer Women's",
price: 699,
originalPrice: 1209,
discount: "46% OFF",
category: "pendants",
label: "Jewellery Premium",
sizes: ["Universal"],
frontImg: "https://i.ibb.co/FLV0GmJR/Round-Bead-Chain-Double-layer-Women-s-FRONT.png",
backImg: "https://i.ibb.co/hxVSz8kJ/Round-Bead-Chain-Double-layer-Women-s-BACK.png",
},
{
id: "p11",
name: "Simple Style Hand",
price: 499,
originalPrice: 741,
discount: "46% OFF",
category: "pendants",
label: "Jewellery Premium",
sizes: ["Universal"],
frontImg: "https://i.ibb.co/hFy6j877/Simple-Style-Hand-FRONT.png",
backImg: "https://i.ibb.co/WpBVbzrj/Simple-Style-Hand-BACK.png",
},
{
id: "p12",
name: "Single Gold Platted Layered Ball Chain",
price: 499,
originalPrice: 741,
discount: "46% OFF",
category: "pendants",
label: "Jewellery Premium",
sizes: ["Universal"],
frontImg: "https://i.ibb.co/8nQtVmgL/Single-Gold-Platted-Layered-Ball-Chain.png",
},
{
id: "p13",
name: "Zircon Star Moon Chain",
price: 499,
originalPrice: 741,
discount: "46% OFF",
category: "pendants",
label: "Jewellery Premium",
sizes: ["Universal"],
frontImg: "https://i.ibb.co/DPhjc1S8/Zircon-Star-Moon-Chain.png",
}
];

let data = fs.readFileSync('src/ProductGrid.tsx', 'utf8');

// Find all objects in jewelleryProducts that match category: "pendants" or category: 'pendants'
// This will be tricky with regex on raw code. Let's just generate the entire array.
// But we don't have the whole array.
// Better: split the file content by lines, when we are inside const jewelleryProducts = [, parse it out.

import { createRequire } from "module";
const require = createRequire(import.meta.url);
import * as ts from 'typescript';

// We basically should just write a quick parser, but since it's just pendants... let's just do a string replace if possible
// Or read the whole file, string match `{ ... category: 'pendants', ... }` and remove them, and insert the new ones at the end.

const str = fs.readFileSync('src/ProductGrid.tsx', 'utf8');

// Let's use a simpler regex approach to drop old pendants.
// We will look for { ... } blocks that contain category: 'pendants' or category: "pendants"
// We'll replace them with empty string, then add our new array items.

const lines = str.split('\n');
let newLines = [];
let insideObject = false;
let currentObjectLines = [];
let inPendants = false;

let inJewelleryProductsArray = false;

for (let i = 0; i < lines.length; i++) {
   const line = lines[i];
   if (line.includes('const jewelleryProducts = [')) {
       inJewelleryProductsArray = true;
       newLines.push(line);
       continue;
   }
   
   if (inJewelleryProductsArray) {
       if (line.trim() === '];') {
           inJewelleryProductsArray = false;
           // Append new pendants here!
           
           for (const pendant of updatedPendants) {
              let pStr = `  {\n    id: '${pendant.id}',\n    name: "${pendant.name.replace(/"/g, '\\"')}",\n    price: ${pendant.price},\n`;
              if (pendant.originalPrice) pStr += `    originalPrice: ${pendant.originalPrice},\n`;
              if (pendant.discount) pStr += `    discount: "${pendant.discount}",\n`;
              pStr += `    category: "${pendant.category}",\n    label: "${pendant.label}",\n    sizes: ["Universal"],\n`;
              pStr += `    frontImg: "${pendant.frontImg}",\n`;
              if (pendant.backImg) pStr += `    backImg: "${pendant.backImg}",\n`;
              pStr += `  },\n`;
              newLines.push(pStr);
           }
           
           newLines.push(line); // push the '];'
           continue;
       }
       
       if (line.includes('{') && !insideObject && (line.trim() === '{' || line.includes('{ id:'))) {
           insideObject = true;
           currentObjectLines = [line];
           inPendants = false;
           continue;
       }
       
       if (insideObject) {
           currentObjectLines.push(line);
           if (line.includes("category: 'pendants'") || line.includes('category: "pendants"')) {
               inPendants = true;
           }
           if (line.includes('},') && line.trim() === '},') {
               insideObject = false;
               if (!inPendants) {
                   newLines.push(...currentObjectLines);
               }
               // if inPendants, we discard this object entirely!
               continue;
           }
           continue;
       }
   }
   
   newLines.push(line);
}

fs.writeFileSync('src/ProductGrid.tsx', newLines.join('\n'));
console.log("Done updating pendants!");
