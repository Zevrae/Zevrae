import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { products } from '../data';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const menPreview = products.filter(p => p.category === 'men').slice(0, 3);
  const womenPreview = products.filter(p => p.category === 'women').slice(0, 3);

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 text-center flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-archivo font-bold tracking-widest uppercase mb-6"
          >
            Zevrae
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-sm md:text-base tracking-[0.3em] uppercase text-gray-300 mb-12 max-w-md mx-auto"
          >
            The New Standard of Minimalist Luxury
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex gap-6"
          >
            <Link 
              to="/women" 
              className="px-8 py-4 bg-white text-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors"
            >
              Shop Women
            </Link>
            <Link 
              to="/men" 
              className="px-8 py-4 border border-white text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              Shop Men
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Women Preview Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl font-archivo font-bold tracking-widest uppercase mb-4">Women's Collection</h2>
            <p className="text-sm text-gray-500 tracking-wider">Curated pieces for the modern silhouette.</p>
          </div>
          <Link 
            to="/women" 
            className="hidden md:inline-block text-xs uppercase tracking-[0.2em] border-b border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-all"
          >
            View More
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {womenPreview.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link 
            to="/women" 
            className="inline-block px-8 py-4 border border-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            View More Women
          </Link>
        </div>
      </section>

      {/* Men Preview Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl font-archivo font-bold tracking-widest uppercase mb-4">Men's Collection</h2>
            <p className="text-sm text-gray-500 tracking-wider">Refined tailoring and elevated essentials.</p>
          </div>
          <Link 
            to="/men" 
            className="hidden md:inline-block text-xs uppercase tracking-[0.2em] border-b border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-all"
          >
            View More
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menPreview.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link 
            to="/men" 
            className="inline-block px-8 py-4 border border-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            View More Men
          </Link>
        </div>
      </section>
    </div>
  );
};
