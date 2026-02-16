import React from 'react';

const Contact = () => {
  return (
    <div className="bg-[#fdfbf9] min-h-screen py-16 md:py-24 px-6 md:px-20 font-montserrat">
      {/* Header */}
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-[10px] md:text-sm tracking-[0.4em] uppercase text-gray-400 mb-4">Get in Touch</h2>
        <h1 className="text-3xl md:text-5xl font-playfair italic text-[#2c2c2c]">Contact Us</h1>
        <div className="w-16 md:w-20 h-[1px] bg-[#d4c3b3] mx-auto mt-6"></div>
      </div>

      {/* Main Grid: flex-col mobile par, md:grid desktop par */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        
        {/* Left Side: Contact Info - Center align on mobile */}
        <div className="space-y-10 md:space-y-12 text-center md:text-left">
          <div>
            <h3 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mb-4 md:mb-6 text-[#a89078]">Our Studio</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              123 Beauty Lane, Fashion District<br />
              Mumbai, Maharashtra 400001
            </p>
          </div>

          <div>
            <h3 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mb-4 md:mb-6 text-[#a89078]">Appointments</h3>
            <p className="text-gray-600 text-sm">Email: hello@erammakeover.com</p>
            <p className="text-gray-600 text-sm mt-2">Phone: +91 98765 43210</p>
          </div>

          <div>
            <h3 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mb-4 md:mb-6 text-[#a89078]">Socials</h3>
            <div className="flex justify-center md:justify-start gap-8 text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#a89078] transition border-b border-transparent hover:border-[#a89078] pb-1"
              >
                Instagram
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#a89078] transition border-b border-transparent hover:border-[#a89078] pb-1"
              >
                Pinterest
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Booking Form */}
        <div className="bg-white p-6 md:p-12 shadow-sm border border-[#eee6de]">
          <form className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <input 
                type="text" 
                placeholder="FULL NAME" 
                className="w-full border-b border-[#eee6de] py-3 text-[10px] md:text-xs tracking-widest focus:border-[#d4c3b3] outline-none transition-colors bg-transparent"
              />
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full border-b border-[#eee6de] py-3 text-[10px] md:text-xs tracking-widest focus:border-[#d4c3b3] outline-none transition-colors bg-transparent"
              />
            </div>
            
            <select className="w-full border-b border-[#eee6de] py-3 text-[10px] md:text-xs tracking-widest text-gray-400 focus:border-[#d4c3b3] outline-none bg-transparent">
              <option>SELECT SERVICE</option>
              <option>Bridal Makeup</option>
              <option>Party Glam</option>
              <option>Editorial Shoot</option>
            </select>

            <textarea 
              rows="4" 
              placeholder="YOUR MESSAGE / EVENT DATE" 
              className="w-full border-b border-[#eee6de] py-3 text-[10px] md:text-xs tracking-widest focus:border-[#d4c3b3] outline-none transition-colors resize-none bg-transparent"
            ></textarea>

            <button className="w-full bg-[#c4b3a3] text-white py-4 md:py-5 text-[10px] md:text-xs uppercase tracking-[0.3em] hover:bg-[#b3a292] transition-all shadow-md active:scale-[0.98]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;