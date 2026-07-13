const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src', 'Admin.tsx');
let content = fs.readFileSync(p, 'utf8');

// 1. Fix the broken table header
const brokenTable = `<div className="bg-[#111] border border-[#EAE6E1]/10 rounded-sm overflow-hidden opacity-60">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
                    <td className="p-4 text-[11px] font-mono text-[#EAE6E1]/40">{formatVal(p.price)}</td>`;

const fixedTable = `<div className="bg-[#111] border border-[#EAE6E1]/10 rounded-sm overflow-hidden opacity-60">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#EAE6E1]/10 text-[9px] uppercase tracking-[0.2em] font-sans text-[#EAE6E1]/30 bg-[#0a0a0a]/50">
                  <th className="p-4 font-normal">Product</th>
                  <th className="p-4 font-normal">Category</th>
                  <th className="p-4 font-normal">Price</th>
                  <th className="p-4 font-normal">Stock</th>
                  <th className="p-4 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredMock.map(p => (
                  <tr key={p.id} className="border-b border-[#EAE6E1]/5">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0a0a0a] rounded-sm overflow-hidden flex-shrink-0 border border-[#EAE6E1]/10">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover opacity-50" />
                        </div>
                        <span className="text-[11px] font-sans text-[#EAE6E1]/50 uppercase tracking-[0.05em]">{p.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-[10px] font-sans text-[#EAE6E1]/30">{p.category}</td>
                    <td className="p-4 text-[11px] font-mono text-[#EAE6E1]/40">{formatVal(p.price)}</td>`;

if (content.includes(brokenTable)) {
  content = content.replace(brokenTable, fixedTable);
} else {
  console.log("Broken table not found exactly as expected. Be careful.");
}

// 2. Fix the Category form
const oldForm = `            <div className="grid grid-cols-2 gap-3">
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

const newForm = `            <div className="grid grid-cols-2 gap-3">
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

if (content.includes(oldForm)) {
  content = content.replace(oldForm, newForm);
  console.log('Replaced form successfully');
} else {
  // Try line by line or robust replace
  console.log("oldForm not found exactly. Doing robust regex replace.");
  const robustOldFormRegex = /<FormField label="Category">[\s\S]*?<input value="Men" readOnly className=\{`\$\{inputCls\} opacity-50 cursor-not-allowed`\} \/>[\s\S]*?<\/FormField>[\s\S]*?<FormField label="Subcategory">[\s\S]*?<select[\s\S]*?value=\{form.subcategory\}[\s\S]*?onChange=\{e => setForm\(f => \(\{ \.\.\.f, subcategory: e.target.value \}\)\)\}[\s\S]*?className=\{selectCls\}[\s\S]*?>[\s\S]*?<option>T-Shirts<\/option>[\s\S]*?<option>Lowers<\/option>[\s\S]*?<\/select>[\s\S]*?<\/FormField>/m;
  
  const newFormContent = `<FormField label="Category">
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
              </FormField>`;
              
  content = content.replace(robustOldFormRegex, newFormContent);
}

fs.writeFileSync(p, content, 'utf8');
console.log('Admin.tsx fixed');
