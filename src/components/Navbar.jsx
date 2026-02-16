import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'About Us', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Packages', path: '/packages' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Available Slots', path: '/booking' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#eee6de] px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-playfair italic font-bold tracking-tighter">
          ERAM <span className="text-[#a89078]">MAKEOVERS</span>
        </Link>

        {/* Desktop Menu - Hidden on both Mobile AND Tablets (lg breakpoint) */}
        <div className="hidden lg:flex space-x-8">
          {menuItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className="text-[10px] tracking-[0.4em] uppercase text-gray-500 hover:text-[#d4c3b3] transition-all font-montserrat"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile & Tablet Menu Button - Visible on lg screens and below */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#2c2c2c] p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Sidebar/Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-[#eee6de] overflow-hidden"
          >
            <div className="flex flex-col py-6 space-y-6 px-6">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-[11px] tracking-[0.3em] uppercase text-gray-600 font-montserrat"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;