import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { products } from '../data';
import { ProductCard } from '../components/ProductCard';

interface CatalogProps {
  category: 'men' | 'women';
}

export const Catalog: React.FC<CatalogProps> = ({ category }) => {
  const categoryProducts = products.filter(p => p.category === category);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-archivo font-bold tracking-widest uppercase mb-4">
            {category}'s Collection
          </h1>
          <p className="text-sm text-gray-500 tracking-wider">
            {category === 'men' ? 'Refined tailoring and elevated essentials.' : 'Curated pieces for the modern silhouette.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {categoryProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
