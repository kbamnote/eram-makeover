import React from 'react';
import Hero from '../components/Hero';
import FeatureShowcase from '../components/FeatureShowcase';
import ProcessSection from '../components/ProcessSection';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
      </motion.div>

  
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <FeatureShowcase />
      </motion.div>

      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-32 bg-[#2c2c2c] text-white text-center px-8"
      >
         <h2 className="text-4xl md:text-6xl font-playfair italic mb-6">"Beauty is Power"</h2>
         <p className="text-xs tracking-[0.5em] uppercase text-gray-400">Transforming faces, empowering souls.</p>
      </motion.section>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <ProcessSection />
      </motion.div>

      
      <section className="py-24 bg-white px-8 md:px-20 border-t border-[#eee6de]">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl font-playfair italic mb-6">Expertise in Every Detail</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Whether it is the precision of a classic winged liner or the delicate balance of a dewy base, our techniques are backed by years of international training. We don't believe in 'one size fits all'. Every product chosen, from the primer to the setting spray, is selected based on your specific skin pH and environmental factors.
              </p>
              <ul className="space-y-3 text-[10px] tracking-widest uppercase font-bold text-[#a89078]">
                  <li className="flex items-center gap-3"> <span className="w-4 h-[1px] bg-[#a89078]"></span> HD Photography Ready</li>
                  <li className="flex items-center gap-3"> <span className="w-4 h-[1px] bg-[#a89078]"></span> Hypoallergenic Products Only</li>
                  <li className="flex items-center gap-3"> <span className="w-4 h-[1px] bg-[#a89078]"></span> 5+ Years of Industry Experience</li>
              </ul>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-[#fdfbf9] p-12 border border-[#eee6de] shadow-inner"
            >
              <h4 className="font-playfair italic text-2xl mb-4 text-center text-[#2c2c2c]">"Makeup is the final touch of jewelry for the skin."</h4>
            </motion.div>
        </motion.div>
      </section>

      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-white text-center"
      >
        <h2 className="text-3xl font-playfair italic mb-8">Ready to start your transformation?</h2>
        <Link to="/booking-info">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#c4b3a3] text-white px-12 py-5 text-xs uppercase tracking-widest hover:bg-[#b3a292] transition-all"
          >
            Secure Your Date Now
          </motion.button>
        </Link>
      </motion.section>
    </div>
  );
};

export default Home;