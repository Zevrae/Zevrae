import React, { useState } from 'react';

const images = [
  "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1612422656768-d5e4ec31fac0?q=80&w=1974&auto=format&fit=crop",
];

const sizes = ["XS", "S", "M", "L"];

export default function ProductPage() {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#EAE6E1] font-sans selection:bg-[#C5A059]/30 selection:text-[#EAE6E1]">
      {/* Global Film Grain */}
      <div 
        className="fixed inset-0 opacity-[0.015] pointer-events-none z-50 mix-blend-difference"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Minimal Header for Context */}
      <header className="w-full py-10 px-6 md:px-12 flex justify-between items-center border-b border-[#C5A059]/10">
        <a href="/" className="text-[10px] uppercase tracking-[0.3em] font-serif text-[#EAE6E1]/70 hover:text-[#EAE6E1] transition-colors duration-700">
          BACK TO COLLECTION
        </a>
        <a href="/" className="text-xl font-serif tracking-[0.4em] font-light text-[#EAE6E1]">
          ZEVRAE
        </a>
        <a href="#cart" className="text-[10px] uppercase tracking-[0.3em] font-serif text-[#EAE6E1]/70 hover:text-[#EAE6E1] transition-colors duration-700">
          CART (0)
        </a>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Images */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible md:w-24 shrink-0 scrollbar-hide">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-[3/4] w-20 md:w-full overflow-hidden bg-[#111111] transition-all duration-500 ${activeImage === img ? 'opacity-100 ring-1 ring-[#C5A059]/40 ring-offset-2 ring-offset-[#0a0a0a]' : 'opacity-50 hover:opacity-80'}`}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${idx + 1}`} 
                    className="w-full h-full object-cover grayscale-[20%]"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="w-full aspect-[3/4] md:aspect-[4/5] bg-[#111111] overflow-hidden relative">
              <img 
                src={activeImage} 
                alt="Structured Wool Coat" 
                className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out grayscale-[10%]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-12">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light tracking-[0.15em] text-[#EAE6E1] mb-6 uppercase">
                Structured Wool Coat
              </h1>
              <p className="text-[13px] font-serif tracking-[0.05em] text-[#EAE6E1]/60">
                €2,450
              </p>
            </div>

            <div className="mb-12">
              <p className="text-[13px] md:text-[14px] font-serif leading-relaxed text-[#EAE6E1]/70 tracking-[0.02em]">
                A masterclass in architectural tailoring. Forged from heavyweight European wool, this coat defines the silhouette with uncompromising precision. The drape is fluid yet deliberate, offering a sanctuary of warmth and an armor of quiet authority.
              </p>
            </div>

            {/* Size Selector */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] font-serif text-[#EAE6E1]/50">Size</span>
                <button className="text-[9px] uppercase tracking-[0.1em] font-sans text-[#EAE6E1]/40 hover:text-[#EAE6E1]/80 transition-colors duration-300 underline underline-offset-4 decoration-[#C5A059]/30">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 text-[11px] font-serif tracking-[0.1em] transition-all duration-500 border ${
                      selectedSize === size 
                        ? 'border-[#C5A059]/60 text-[#EAE6E1] bg-[#C5A059]/5' 
                        : 'border-[#EAE6E1]/10 text-[#EAE6E1]/60 hover:border-[#EAE6E1]/30'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full py-6 bg-[#EAE6E1] text-[#0a0a0a] text-[10px] uppercase tracking-[0.3em] font-serif hover:bg-[#C5A059] hover:text-[#0a0a0a] transition-colors duration-700 mb-16">
              Add to Cart
            </button>

            {/* Accordion / Details */}
            <div className="border-t border-[#EAE6E1]/10">
              <details className="group" open>
                <summary className="flex justify-between items-center py-6 cursor-pointer list-none">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-serif text-[#EAE6E1]/70 group-hover:text-[#EAE6E1] transition-colors duration-300">
                    Fabric & Care
                  </span>
                  <span className="text-[#EAE6E1]/40 group-open:rotate-45 transition-transform duration-500 font-light text-lg">+</span>
                </summary>
                <div className="pb-6 text-[12px] font-serif leading-relaxed text-[#EAE6E1]/50 tracking-[0.02em]">
                  <p className="mb-2">100% Virgin Wool. Woven in Biella, Italy.</p>
                  <p className="mb-2">Lining: 100% Cupro.</p>
                  <p>Dry clean only. Do not bleach. Iron at low temperature.</p>
                </div>
              </details>

              <details className="group border-t border-[#EAE6E1]/10">
                <summary className="flex justify-between items-center py-6 cursor-pointer list-none">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-serif text-[#EAE6E1]/70 group-hover:text-[#EAE6E1] transition-colors duration-300">
                    Shipping & Returns
                  </span>
                  <span className="text-[#EAE6E1]/40 group-open:rotate-45 transition-transform duration-500 font-light text-lg">+</span>
                </summary>
                <div className="pb-6 text-[12px] font-serif leading-relaxed text-[#EAE6E1]/50 tracking-[0.02em]">
                  <p className="mb-2">Complimentary express shipping on all orders.</p>
                  <p>Returns accepted within 14 days of delivery. Items must be in original condition with tags attached.</p>
                </div>
              </details>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
