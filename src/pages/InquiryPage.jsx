import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const InquiryPage = () => {
  const location = useLocation();
  const packageName = location.state?.packageName || "Service";

  const API_URL = "https://erammakeover-backend-production.up.railway.app/api/users/create";

  const [formData, setFormData] = useState({
    fullname: '',     
    email: '',        
    phonenumber: '',  
    service: packageName,
    message: '',      
    date: '',         
    time: '10:30 AM'  
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Inquiry submitted successfully!");
        setFormData({ fullname: '', email: '', phonenumber: '', date: '', service: packageName, message: '', time: '10:30 AM' });
      } else {
        const errorData = await response.json();
        alert(`Failed: ${errorData.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Network error. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fdfbf9] min-h-screen py-20 px-8 md:px-20 font-montserrat">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm tracking-[0.4em] uppercase text-gray-400 mb-4 font-bold">Reservation Inquiry</h2>
          <h1 className="text-4xl font-playfair italic text-[#2c2c2c]">Inquire for {packageName}</h1>
          <div className="w-16 h-[1px] bg-[#d4c3b3] mx-auto mt-6"></div>
        </div>

        <div className="bg-white p-10 shadow-sm border border-[#eee6de]">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label className="text-[10px] tracking-widest uppercase text-black font-bold mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="fullname" 
                  required
                  value={formData.fullname}
                  onChange={handleChange}
                  className="border-b border-[#eee6de] py-2 outline-none focus:border-[#d4c3b3] transition-colors font-medium text-black" 
                  placeholder="Your Name" 
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] tracking-widest uppercase text-black font-bold mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="border-b border-[#eee6de] py-2 outline-none focus:border-[#d4c3b3] transition-colors font-medium text-black" 
                  placeholder="email@example.com" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label className="text-[10px] tracking-widest uppercase text-black font-bold mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phonenumber"
                  required
                  value={formData.phonenumber}
                  onChange={handleChange}
                  className="border-b border-[#eee6de] py-2 outline-none focus:border-[#d4c3b3] transition-colors font-medium text-black" 
                  placeholder="9876543210" 
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] tracking-widest uppercase text-black font-bold mb-2">Event Date</label>
                <input 
                  type="date" 
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="border-b border-[#eee6de] py-2 outline-none focus:border-[#d4c3b3] transition-colors text-black font-medium" 
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] tracking-widest uppercase text-black font-bold mb-2">Tell us more about your vision</label>
              <textarea 
                rows="4" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                className="border-b border-[#eee6de] py-2 outline-none focus:border-[#d4c3b3] transition-colors resize-none font-medium text-black" 
                placeholder="Details about venue, number of people, etc."
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#c4b3a3]'} text-white py-4 text-xs uppercase tracking-[0.3em] hover:bg-[#b3a292] transition-all shadow-md font-bold`}
            >
              {loading ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryPage;