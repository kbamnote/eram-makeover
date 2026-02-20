import React, { useState } from 'react';

const Contact = () => {
  // Pop-up state
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    // API URL
    const API_URL = "https://erammakeover-backend-production.up.railway.app/api/users/create";

    const formData = new FormData(e.target);
    const data = {
      fullname: e.target[0].value,     
      email: e.target[1].value,        
      service: e.target[2].value,     
      message: e.target[3].value,      
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setShowPopup(true);
        e.target.reset(); 
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fdfbf9] min-h-screen py-16 md:py-24 px-6 md:px-20 font-montserrat relative">
      {/* Header */}
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-[10px] md:text-sm tracking-[0.4em] uppercase text-gray-400 mb-4">Get in Touch</h2>
        <h1 className="text-3xl md:text-5xl font-playfair italic text-[#2c2c2c]">Contact Us</h1>
        <div className="w-16 md:w-20 h-[1px] bg-[#d4c3b3] mx-auto mt-6"></div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        
        {/* Left Side: Contact Info */}
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
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#a89078] transition border-b border-transparent hover:border-[#a89078] pb-1">Instagram</a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#a89078] transition border-b border-transparent hover:border-[#a89078] pb-1">Pinterest</a>
            </div>
          </div>
        </div>

        {/* Right Side: Booking Form */}
        <div className="bg-white p-6 md:p-12 shadow-sm border border-[#eee6de]">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <input 
                required
                type="text" 
                placeholder="FULL NAME" 
                className="w-full border-b border-[#eee6de] py-3 text-[10px] md:text-xs tracking-widest focus:border-[#d4c3b3] outline-none transition-colors bg-transparent text-black placeholder-black"
              />
              <input 
                required
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full border-b border-[#eee6de] py-3 text-[10px] md:text-xs tracking-widest focus:border-[#d4c3b3] outline-none transition-colors bg-transparent text-black placeholder-black"
              />
            </div>
            
            <select className="w-full border-b border-[#eee6de] py-3 text-[10px] md:text-xs tracking-widest text-black-400 focus:border-[#d4c3b3] outline-none bg-transparent">
              <option>SELECT SERVICE</option>
              <option>Bridal Makeup</option>
              <option>Party Glam</option>
              <option>Editorial Shoot</option>
            </select>

            <textarea 
              required
              rows="4" 
              placeholder="YOUR MESSAGE / EVENT DATE" 
              className="w-full border-b border-[#eee6de] py-3 text-[10px] md:text-xs tracking-widest focus:border-[#d4c3b3] outline-none transition-colors resize-none bg-transparent text-black placeholder-black"
            ></textarea>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#c4b3a3]'} text-white py-4 md:py-5 text-[10px] md:text-xs uppercase tracking-[0.3em] hover:bg-[#b3a292] transition-all shadow-md active:scale-[0.98]`}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      {/* --- SUCCESS POP-UP --- */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setShowPopup(false)}
          ></div>
          
          {/* Pop-up Box */}
          <div className="relative bg-white p-8 md:p-12 max-w-sm w-full text-center shadow-2xl border-t-4 border-[#a89078]">
            <div className="mb-6 flex justify-center text-[#a89078]">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-playfair italic text-black mb-4">Message Sent</h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              Thank you for reaching out! We have received your inquiry and will get back to you within 24 hours.
            </p>
            <button 
              onClick={() => setShowPopup(false)}
              className="w-full bg-black text-white py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-[#a89078] transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;