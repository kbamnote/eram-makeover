import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const InquiryPage = () => {
  const location = useLocation();
  // Agar user kisi specific package se aaya hai toh uska naam dikhayega
  const packageName = location.state?.packageName || "Service";

  return (
    <div className="bg-[#fdfbf9] min-h-screen py-20 px-8 md:px-20 font-montserrat">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm tracking-[0.4em] uppercase text-gray-400 mb-4">Reservation Inquiry</h2>
          <h1 className="text-4xl font-playfair italic text-[#2c2c2c]">Inquire for {packageName}</h1>
          <div className="w-16 h-[1px] bg-[#d4c3b3] mx-auto mt-6"></div>
        </div>

        <div className="bg-white p-10 shadow-sm border border-[#eee6de]">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2">Full Name</label>
                <input type="text" className="border-b border-[#eee6de] py-2 outline-none focus:border-[#d4c3b3] transition-colors" placeholder="Your Name" />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2">Event Date</label>
                <input type="date" className="border-b border-[#eee6de] py-2 outline-none focus:border-[#d4c3b3] transition-colors text-gray-500" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2">Selected Package</label>
              <input type="text" value={packageName} readOnly className="border-b border-[#eee6de] py-2 outline-none text-[#a89078] font-bold" />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2">Tell us more about your vision</label>
              <textarea rows="4" className="border-b border-[#eee6de] py-2 outline-none focus:border-[#d4c3b3] transition-colors resize-none" placeholder="Details about venue, number of people, etc."></textarea>
            </div>

            <button className="w-full bg-[#c4b3a3] text-white py-4 text-xs uppercase tracking-[0.3em] hover:bg-[#b3a292] transition-all shadow-md">
              Submit Inquiry
            </button>
          </form>
          
          <p className="text-center text-[10px] text-gray-400 mt-8 tracking-widest">
            WE WILL CONTACT YOU WITHIN 24 HOURS VIA EMAIL OR PHONE.
          </p>
        </div>

        <div className="text-center mt-10">
          <Link to="/packages" className="text-xs text-gray-400 hover:text-black transition">← Back to Packages</Link>
        </div>
      </div>
    </div>
  );
};

export default InquiryPage;