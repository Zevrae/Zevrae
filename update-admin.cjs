const fs = require('fs');
const path = require('path');

const adminPath = path.join(__dirname, 'src', 'Admin.tsx');
let content = fs.readFileSync(adminPath, 'utf8');

// Replace fetch url
content = content.replace("fetch('/api/products?category=Men')", "fetch('/api/products')");
content = content.replace("setDbError('Could not load Men\\'s products. Make sure the database is connected.');", "setDbError('Could not load products. Make sure the database is connected.');");

// Replace titles
content = content.replace('action="Add Men\'s Product"', 'action="Add Product"');
content = content.replace("Men's — Database", "Database Products");
content = content.replace("No Men's products yet. Click \"Add Men's Product\" to create one.", "No products yet. Click \"Add Product\" to create one.");
content = content.replace("editingId ? 'Edit Men\\'s Product' : 'Add Men\\'s Product'", "editingId ? 'Edit Product' : 'Add Product'");
content = content.replace("Live Men's products from Supabase", "Live products from DB");

// Replace the category/subcategory inputs
const oldCategoryInputs = `            <div className="grid grid-cols-2 gap-3">
              <FormField label="Category">
                <input value="Men" readOnly className={\`\${inputCls} opacity-50 cursor-not-allowed\`} />
              </FormField>
              <FormField label="Subcategory">
                <select
                  value={form.subcategory}
                  onChange={e => setForm(f => ({ ...f, subcategory: e.target.value }))}
                  className={selectCls}
                >
                  <option>T-Shirts</option>
                  <option>Lowers</option>
                </select>
              </FormField>
            </div>`;

const newCategoryInputs = `            <div className="grid grid-cols-2 gap-3">
              <FormField label="Category">
                <select
                  value={form.category}
                  onChange={e => {
                    const cat = e.target.value;
                    const subcats = mockCategories.find(c => c.name === cat)?.subcategories || [];
                    setForm(f => ({ ...f, category: cat, subcategory: subcats[0] || '' }));
                  }}
                  className={selectCls}
                >
                  {mockCategories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </FormField>
              <FormField label="Subcategory">
                <select
                  value={form.subcategory}
                  onChange={e => setForm(f => ({ ...f, subcategory: e.target.value }))}
                  className={selectCls}
                >
                  {(mockCategories.find(c => c.name === form.category)?.subcategories || []).map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </FormField>
            </div>`;

if (!content.includes('value={form.category}')) {
  content = content.replace(oldCategoryInputs, newCategoryInputs);
}

// Add category column to table headers
const oldTableHeaders = `<th className="p-4 font-normal">Product</th>
                  <th className="p-4 font-normal">Subcategory</th>`;
const newTableHeaders = `<th className="p-4 font-normal">Product</th>
                  <th className="p-4 font-normal">Category</th>
                  <th className="p-4 font-normal">Subcategory</th>`;

if (!content.includes('<th className="p-4 font-normal">Category</th>')) {
  content = content.replace(oldTableHeaders, newTableHeaders);
}

// Add category column to table data
const oldTableData = `<td className="p-4 text-[10px] font-sans text-[#EAE6E1]/50">{p.subcategory}</td>`;
const newTableData = `<td className="p-4 text-[10px] font-sans text-[#EAE6E1]/50">{p.category}</td>
                      <td className="p-4 text-[10px] font-sans text-[#EAE6E1]/50">{p.subcategory}</td>`;

if (content.includes(oldTableData)) {
  content = content.replace(oldTableData, newTableData);
}

// Update colSpan
content = content.replace(/colSpan={7}/g, "colSpan={8}");

fs.writeFileSync(adminPath, content, 'utf8');
console.log('Admin.tsx updated successfully');
