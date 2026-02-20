import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import bridalImg from '../assets/bridal.jpg';
import editorialImg from '../assets/editorial.png';
import softImg from '../assets/soft.png';
import hennaImg from '../assets/henna.png';
import modernImg from '../assets/modern.png';
import nightImg from '../assets/night.png';

const Portfolio = () => {
  const categories = ["All", "Bridal", "Editorial", "Party"];
  
  const portfolioItems = [
    { id: 1, title: "Classic Bridal", category: "Bridal", img: bridalImg },
    { id: 2, title: "Editorial Bold", category: "Editorial", img: editorialImg },
    { id: 3, title: "Soft Glam", category: "Party", img: softImg },
    { id: 4, title: "Traditional Henna", category: "Bridal", img: hennaImg },
    { id: 5, title: "Modern Muse", category: "Editorial", img: modernImg },
    { id: 6, title: "Night Out", category: "Party", img: nightImg },
  ];

  // Container variant for staggered image reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#fdfbf9] py-16 md:py-24 px-6 md:px-20 font-montserrat">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-[10px] md:text-sm tracking-[0.4em] uppercase text-gray-400 mb-4">Our Work</h2>
        <h1 className="text-3xl md:text-5xl font-playfair italic text-[#2c2c2c]">The Portfolio</h1>
        <div className="w-16 md:w-20 h-[1px] bg-[#d4c3b3] mx-auto mt-6"></div>
      </motion.div>

      {/* Category Filter - Responsive Flex */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16 text-[10px] md:text-xs tracking-widest uppercase text-gray-500">
        {categories.map((cat) => (
          <Link 
            key={cat} 
            to={cat === "All" ? "/portfolio" : `/portfolio/${cat.toLowerCase()}`} 
            className="hover:text-black transition-colors border-b border-transparent hover:border-[#d4c3b3] pb-1"
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Image Grid - Responsive Columns */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
      >
        {portfolioItems.map((item) => (
          <motion.div 
            key={item.id} 
            variants={itemVariants}
            className="group relative overflow-hidden bg-white shadow-sm transition-all hover:shadow-2xl"
          >
            {/* Aspect Ratio Fix for consistent grid */}
            <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
              />
            </div>
            
            {/* Hover Overlay - Hidden on touch devices by default, visible on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="bg-white/95 px-6 py-3 text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#2c2c2c] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   {item.title}
                </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Note */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <p className="text-black-400 italic text-xs md:text-sm">Every face is a unique masterpiece.</p>
      </motion.div>
    </div>
  );
};

export default Portfolio;