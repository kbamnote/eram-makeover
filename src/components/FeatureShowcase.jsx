import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import bridalImg from '../assets/bridal.jpg';

const FeatureShowcase = () => (
  <section className="py-16 md:py-24 bg-white px-6 md:px-20 overflow-hidden">
    {/* flex-col mobile ke liye, md:flex-row desktop ke liye */}
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
      
      {/* Left Image Section */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full md:flex-1 relative"
      >
        <img 
          src={bridalImg} 
          alt="Bridal Work" 
          className="w-full h-[400px] md:h-[650px] object-cover shadow-2xl relative z-10" 
        />
        <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-full h-full border-[8px] md:border-[12px] border-[#f3efea] -z-0"></div>
      </motion.div>
      
      {/* Right Text Section */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="w-full md:flex-1 space-y-8 md:space-y-10 text-center md:text-left"
      >
        <div className="space-y-4">
          <h2 className="text-[10px] md:text-sm tracking-[0.4em] md:tracking-[0.5em] uppercase text-[#a89078] font-bold">The Gold Standard</h2>
          <h3 className="text-4xl md:text-6xl font-playfair italic leading-tight text-[#2c2c2c]">Signature Artistry & Luxury Bridal Care</h3>
        </div>
        
        <p className="text-gray-600 leading-relaxed text-base md:text-lg text-justify">
          At Eram Makeover, we believe that every face tells a unique story. Our approach to bridal artistry isn't just about applying products; it's about a deep understanding of skin anatomy and color theory.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-[#eee6de] pt-8 text-left">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-2 text-[#2c2c2c]">Long-Wear Finish</h4>
            <p className="text-gray-500 text-xs leading-relaxed">18-hour stay techniques for high-humidity environments.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-2 text-[#2c2c2c]">Bespoke Styling</h4>
            <p className="text-gray-500 text-xs leading-relaxed">Tailored specifically to your unique bone structure.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FeatureShowcase;