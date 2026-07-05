import fs from 'fs';

let content = fs.readFileSync('src/ProductGrid.tsx', 'utf8');

content = content.replace(/<span className="text-\[13px\] font-mono tracking-wider text-\[#EAE6E1\]">₹\{item\.price\}<\/span>/g, `<span className="text-[13px] font-mono tracking-wider text-[#EAE6E1]">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.price)}</span>`);

content = content.replace(/<span className="text-\[10px\] font-mono tracking-wider text-\[#EAE6E1\]\/50 line-through">₹\{item\.originalPrice\}<\/span>/g, `<span className="text-[10px] font-mono tracking-wider text-[#EAE6E1]/50 line-through">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.originalPrice as number)}</span>`);

fs.writeFileSync('src/ProductGrid.tsx', content);
