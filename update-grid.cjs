const fs = require('fs');
const path = require('path');

const gridPath = path.join(__dirname, 'src', 'ProductGrid.tsx');
let content = fs.readFileSync(gridPath, 'utf8');

// 1. Rename dbMenProducts hook
if (content.includes('const [dbMenProducts, setDbMenProducts]')) {
  content = content.replace('const [dbMenProducts, setDbMenProducts] = useState<any[]>([]);', 'const [dbProducts, setDbProducts] = useState<any[]>([]);');
}

// 2. Update useEffect
const useEffectStart = content.indexOf('  useEffect(() => {');
const openProductIdx = content.indexOf('  const openProduct =');
if (useEffectStart !== -1 && openProductIdx !== -1) {
  const oldUseEffect = content.substring(useEffectStart, openProductIdx);

  const newUseEffect = `  useEffect(() => {
    const fetchDbProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        
        const formatted = (data || []).filter((p: any) => p.status === 'active').map((p: any) => {
          const isJewellery = p.category?.toLowerCase() === 'jewellery';
          return {
            id: p.id,
            name: p.name,
            price: p.price,
            originalPrice: p.compare_price,
            label: \`\${p.category} Premium\`,
            category: isJewellery ? p.subcategory?.toLowerCase() : p.category?.toLowerCase() || '',
            gender: p.category?.toLowerCase() || '',
            type: p.subcategory?.toLowerCase() === 'lowers' ? 'lower' : (p.subcategory?.toLowerCase() || 'tshirt'),
            sizes: p.sizes,
            description: p.description,
            frontImg: p.images?.[0] || '',
            backImg: p.images?.[1] || p.images?.[0] || '',
          };
        });
        setDbProducts(formatted);
      } catch (err) {
        console.error('Failed to fetch DB products', err);
      }
    };
    fetchDbProducts();
  }, [categoryFilter]);

  const dbMenProducts = dbProducts.filter((p: any) => p.gender === 'men');
  const dbWomenProducts = dbProducts.filter((p: any) => p.gender === 'women');
  const dbJewelleryProducts = dbProducts.filter((p: any) => p.gender === 'jewellery');

`;
  content = content.replace(oldUseEffect, newUseEffect);
}

// 3. Fix women and jewellery display products for 'all' filter
if (content.includes("const displayWomenProducts = categoryFilter === 'all' ? womenProducts.slice(0, 3) : womenProducts;")) {
  content = content.replace(
    "const displayWomenProducts = categoryFilter === 'all' ? womenProducts.slice(0, 3) : womenProducts;",
    "const allWomenProducts = [...womenProducts, ...dbWomenProducts];\n  const displayWomenProducts = categoryFilter === 'all' ? allWomenProducts.slice(0, 3) : allWomenProducts;"
  );
}

if (content.includes("const displayJewelleryProducts = categoryFilter === 'all' ? jewelleryProducts.slice(0, 3) : jewelleryProducts;")) {
  content = content.replace(
    "const displayJewelleryProducts = categoryFilter === 'all' ? jewelleryProducts.slice(0, 3) : jewelleryProducts;",
    "const allJewelleryProducts = [...jewelleryProducts, ...dbJewelleryProducts];\n  const displayJewelleryProducts = categoryFilter === 'all' ? allJewelleryProducts.slice(0, 3) : allJewelleryProducts;"
  );
}

// 4. In gendered sections, replace womenProducts
content = content.replace(/\(categoryFilter\.startsWith\('men'\) \? \[\.\.\.products, \.\.\.dbMenProducts\] \: womenProducts\)/g, "(categoryFilter.startsWith('men') ? [...products, ...dbMenProducts] : allWomenProducts)");

// 5. In jewellery section, replace jewelleryProducts
content = content.replace(/\{jewelleryProducts\.filter/g, "{allJewelleryProducts.filter");

fs.writeFileSync(gridPath, content, 'utf8');
console.log('ProductGrid.tsx updated successfully');
