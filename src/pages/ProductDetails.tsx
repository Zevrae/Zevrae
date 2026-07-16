import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { products } from '../data';
import { ChevronLeft, Minus, Plus } from 'lucide-react';
import { useCart } from '../CartContext';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addToCart, setIsCartOpen } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<'front' | 'back'>('front');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-archivo font-bold tracking-widest uppercase mb-4">Product Not Found</h2>
          <Link to="/" className="text-xs uppercase tracking-widest border-b border-white pb-1">Return Home</Link>
        </div>
      </div>
    );
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity,
      image: product.frontImage,
      category: product.category
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity,
      image: product.frontImage,
      category: product.category
    });
    setIsCartOpen(true);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Link 
          to={`/${product.category}`} 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-8 md:mb-12"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to {product.category}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {/* Images */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 order-2 md:order-1 overflow-x-auto pb-2 md:pb-0 scrollbar-hide shrink-0">
              <button 
                onClick={() => setActiveImage('front')}
                className={`w-16 md:w-20 aspect-[3/4] shrink-0 overflow-hidden border ${activeImage === 'front' ? 'border-white' : 'border-transparent opacity-50 hover:opacity-100'} transition-all`}
              >
                <img src={product.frontImage} alt={`${product.name} Front`} className="w-full h-full object-cover" />
              </button>
              <button 
                onClick={() => setActiveImage('back')}
                className={`w-16 md:w-20 aspect-[3/4] shrink-0 overflow-hidden border ${activeImage === 'back' ? 'border-white' : 'border-transparent opacity-50 hover:opacity-100'} transition-all`}
              >
                <img src={product.backImage} alt={`${product.name} Back`} className="w-full h-full object-cover" />
              </button>
            </div>
            
            <div className="flex-1 max-h-[45vh] md:max-h-none aspect-[3/4] md:aspect-auto overflow-hidden bg-[#111] order-1 md:order-2">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={activeImage === 'front' ? product.frontImage : product.backImage} 
                alt={product.name}
                className="w-full h-full object-contain md:object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-start md:justify-center pb-24 md:pb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-2 md:mb-4">{product.category}</p>
              <h1 className="text-2xl md:text-4xl font-archivo font-bold tracking-widest uppercase mb-2 md:mb-4">{product.name}</h1>
              <p className="text-lg md:text-xl font-light mb-6 md:mb-8">${product.price}</p>
              
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed mb-8 md:mb-12 max-w-md">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-6 md:mb-8">
                <div className="flex justify-between items-center mb-3 md:mb-4">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest">Size</span>
                  <button className="text-[10px] md:text-xs text-gray-500 underline underline-offset-4 hover:text-white transition-colors">Size Guide</button>
                </div>
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 md:py-3 text-[10px] md:text-xs uppercase tracking-wider border transition-all ${
                        selectedSize === size 
                          ? 'border-white bg-white text-black' 
                          : 'border-white/20 hover:border-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8 md:mb-12 hidden md:block">
                <span className="text-xs uppercase tracking-widest block mb-4">Quantity</span>
                <div className="flex items-center border border-white/20 w-32">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-white/10 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center text-sm">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-white/10 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions Desktop */}
              <div className="hidden md:block space-y-4">
                <button 
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-white text-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="w-full py-4 border border-white text-white text-xs uppercase tracking-widest hover:bg-white/5 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Actions Mobile Sticky */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#050505] border-t border-white/10 p-4 z-50">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-4">
             <span className="text-xs uppercase tracking-widest text-gray-400">Qty</span>
             <div className="flex items-center border border-white/20 w-24">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white/10 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="flex-1 text-center text-xs">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-white/10 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
             </div>
          </div>
          <p className="text-lg font-light">${product.price * quantity}</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleAddToCart}
            className="flex-1 py-3 bg-white text-black text-[10px] uppercase tracking-widest font-bold"
          >
            Add to Cart
          </button>
          <button 
            onClick={handleBuyNow}
            className="flex-1 py-3 border border-white text-white text-[10px] uppercase tracking-widest font-bold bg-[#111]"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
