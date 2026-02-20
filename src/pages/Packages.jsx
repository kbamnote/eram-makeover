import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Packages = () => {
  const plans = [
    {
      title: "Party Glam",
      price: "₹3,500",
      description: "Perfect for bridesmaids, birthdays, or a night out.",
      features: ["Full Face Makeup", "Lashes Included", "Hair Styling (Basic)", "Travel to Venue"]
    },
    {
      title: "Bridal Signature",
      price: "₹15,000",
      description: "The ultimate luxury experience for your big day.",
      features: ["HD/Airbrush Makeup", "Premium Lashes", "Drape & Jewelry Setting", "Trial Session Included", "Luxury Touch-up Kit"]
    },
    {
      title: "Editorial / Shoot",
      price: "₹7,000",
      description: "High-definition makeup for fashion and photography.",
      features: ["Concept Makeup", "Contour & Highlight", "On-set Assistance", "Skin Prep"]
    }
  ];

  return (
    <div className="bg-[#fdfbf9] py-16 md:py-24 px-6 md:px-20 font-montserrat">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 md:mb-20"
      >
        <h2 className="text-[10px] md:text-sm tracking-[0.4em] uppercase text-gray-400 mb-4">Investment</h2>
        <h1 className="text-3xl md:text-5xl font-playfair italic text-[#2c2c2c]">Service Packages</h1>
        <div className="w-16 md:w-20 h-[1px] bg-[#d4c3b3] mx-auto mt-6"></div>
      </motion.div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {plans.map((plan, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={`p-8 md:p-10 border border-[#eee6de] flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl ${
              index === 1 ? 'bg-white shadow-xl border-[#d4c3b3] scale-100 lg:scale-105 z-10' : 'bg-transparent'
            }`}
          >
            {/* Featured Badge for Bridal */}
            {index === 1 && (
              <span className="bg-[#d4c3b3] text-white text-[9px] tracking-widest uppercase px-4 py-1 mb-4 rounded-full">
                Most Popular
              </span>
            )}

            <h3 className="text-lg md:text-xl font-playfair font-bold mb-2 uppercase tracking-widest text-[#2c2c2c]">{plan.title}</h3>
            <div className="text-xl md:text-2xl font-light text-[#a89078] mb-6">{plan.price}</div>
            
            {/* description height fixed for alignment on desktop */}
            <p className="text-gray-500 text-xs md:text-sm mb-8 leading-relaxed h-auto md:h-12">
              {plan.description}
            </p>
            
            <ul className="space-y-4 mb-10 text-xs md:text-sm text-gray-600 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center justify-center gap-3">
                  <span className="w-1 h-[1px] bg-[#d4c3b3]"></span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link 
              to="/inquiry" 
              state={{ packageName: plan.title }} 
              className="w-full mt-auto"
            >
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all border ${
                  index === 1 
                  ? 'bg-[#2c2c2c] text-white border-[#2c2c2c] hover:bg-black' 
                  : 'border-[#d4c3b3] text-[#a89078] hover:bg-[#d4c3b3] hover:text-white'
                }`}
              >
                Inquire Now
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Note Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 text-center max-w-2xl mx-auto border-t border-[#eee6de] pt-10"
      >
        <p className="text-black-400 italic text-[11px] md:text-sm leading-relaxed">
          *Custom packages are available for group bookings, destination weddings, and multi-day events. 
          Please contact us for a personalized quote.
        </p>
      </motion.div>
    </div>
  );
};

export default Packages;