import React from 'react';
import { motion } from 'framer-motion';

const ProcessSection = () => {
  const steps = [
    { num: "01", title: "Digital Consultation", desc: "We begin with an in-depth analysis of your skin's history, style, and event theme." },
    { num: "02", title: "Luxury Skin Prep", desc: "Using premium hydration masks to create a plump, luminous canvas for makeup." },
    { num: "03", title: "Professional Execution", desc: "Achieving sweat-proof and camera-ready results for the entire event." },
  ];

  // Container variants for staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className="py-16 md:py-24 bg-[#f3efea] px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20 space-y-4"
        >
          <h2 className="text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] uppercase text-gray-400">Our Methodology</h2>
          <h3 className="text-3xl md:text-4xl font-playfair italic text-[#2c2c2c]">How we achieve perfection</h3>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-16"
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={cardVariants} className="group relative">
              {/* Number Background: Mobile par size thoda chota kiya taaki overlap handle ho sake */}
              <span className="text-7xl md:text-8xl font-playfair italic text-white absolute -top-10 -left-2 md:-top-12 md:-left-4 z-0 group-hover:text-[#d4c3b3] transition-colors duration-500">
                {step.num}
              </span>
              
              <div className="relative z-10 pt-4">
                <h4 className="text-base md:text-lg tracking-widest uppercase font-bold mb-4 border-b border-[#d4c3b3] pb-2 inline-block text-[#2c2c2c]">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm leading-[1.8] text-justify md:text-left">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;