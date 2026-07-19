import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-archivo font-bold tracking-[0.1em] uppercase" style={{ fontStretch: '125%' }}>Zevrae</h3>
          <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
            Defining modern luxury through minimalist design and uncompromising quality.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-6 text-gray-500">Shop</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><Link to="/men" className="hover:text-white transition-colors">Men</Link></li>
            <li><Link to="/women" className="hover:text-white transition-colors">Women</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-6 text-gray-500">Support</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-6 text-gray-500">Newsletter</h4>
          <p className="text-xs text-gray-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="flex border-b border-white/20 pb-2">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-transparent w-full text-sm outline-none placeholder:text-gray-600"
            />
            <button className="text-xs uppercase tracking-wider hover:text-gray-300 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} ZEVRAE. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
