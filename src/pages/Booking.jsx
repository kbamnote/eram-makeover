import React, { useState } from 'react';

const Booking = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false); 

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i);

  const viewMonth = currentDate.getMonth();
  const viewYear = currentDate.getFullYear();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();

  const slots = ["08:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "06:00 PM", "08:30 PM"];

  // --- API INTEGRATION ---
  const handleConfirm = async () => {
    if (selectedDate && selectedTime) {
      setLoading(true);
      const API_URL = "https://erammakeover-backend-production.up.railway.app/api/users/create";

      const payload = {
        date: selectedDate,            
        time: selectedTime               
      };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          setShowPopup(true);
        } else {
          alert("Failed to send booking request. Please try again.");
        }
      } catch (error) {
        console.error("API Error:", error);
        alert("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please select both Date and Time first.");
    }
  };

  return (
    <div className="bg-[#fdfbf9] py-10 lg:py-20 px-4 sm:px-10 lg:px-20 font-montserrat min-h-screen relative">
      
      <div className="text-center mb-12">
        <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#a89078] font-bold mb-2">Appointments</h2>
        <h1 className="text-3xl lg:text-5xl font-playfair italic text-[#1a1a1a]">Booking Calendar</h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Section: Calendar & Time Slots */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* 1. Calendar Box */}
          <div className="bg-white p-6 lg:p-10 border-2 border-[#eee6de] shadow-xl rounded-md">
            <div className="flex gap-4 mb-10 pb-6 border-b border-[#f5f0eb]">
              <select 
                value={viewMonth} 
                onChange={(e) => setCurrentDate(new Date(viewYear, parseInt(e.target.value), 1))} 
                className="bg-white border border-[#d4c3b3] text-sm font-bold py-2 px-4 rounded focus:outline-none"
              >
                {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
              </select>
              <select 
                value={viewYear} 
                onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value), viewMonth, 1))} 
                className="bg-white border border-[#d4c3b3] text-sm font-bold py-2 px-4 rounded focus:outline-none"
              >
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="text-[11px] font-black text-black mb-4 uppercase">{d}</div>
              ))}
              {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`}></div>)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const dateStr = new Date(viewYear, viewMonth, day).toDateString();
                const isSelected = selectedDate === dateStr;
                return (
                  <button 
                    key={day} 
                    onClick={() => setSelectedDate(dateStr)} 
                    className={`aspect-square flex items-center justify-center text-sm rounded-full border-2 transition-all ${isSelected ? 'bg-black border-black text-white shadow-lg' : 'border-transparent text-gray-700 hover:bg-[#fdfbf9] hover:border-[#eee6de]'}`}
                  >
                    <span className="font-bold">{day}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Time Slots Box */}
          <div className="bg-white p-6 lg:p-10 border-2 border-[#eee6de] shadow-lg rounded-md">
            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-8 text-[#a89078] border-b pb-4">Select Available Time</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {slots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-4 text-[11px] font-bold border-2 transition-all rounded-sm ${
                    selectedTime === time 
                    ? 'bg-[#a89078] border-[#a89078] text-white shadow-md' 
                    : 'bg-white border-[#eee6de] text-black hover:border-[#a89078]'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-black text-white p-8 lg:sticky lg:top-24 rounded-lg shadow-2xl">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-10 border-b border-gray-800 pb-4">Booking Details</h3>
            <div className="space-y-6 mb-12">
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-[10px] uppercase font-bold">Date</span>
                <span className="text-sm font-medium text-[#d4c3b3]">{selectedDate || "Not selected"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-[10px] uppercase font-bold">Time Slot</span>
                <span className="text-sm font-medium text-[#d4c3b3]">{selectedTime || "Not selected"}</span>
              </div>
            </div>
            <button 
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime || loading}
              className={`w-full py-5 text-[11px] font-bold uppercase tracking-[0.3em] transition-all rounded ${selectedDate && selectedTime ? 'bg-[#d4c3b3] text-black hover:bg-white cursor-pointer' : 'bg-gray-900 text-white-600 cursor-not-allowed'}`}
            >
              {loading ? "Sending Request..." : "Confirm Appointment"}
            </button>
          </div>
        </div>
      </div>

      {/* --- SUCCESS POP-UP --- */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowPopup(false)}></div>
          
          <div className="relative bg-white p-8 lg:p-12 max-w-md w-full text-center shadow-2xl rounded-sm border-t-8 border-[#a89078]">
            <div className="w-20 h-20 bg-[#fdfbf9] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#eee6de]">
              <svg className="w-10 h-10 text-[#a89078]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-playfair italic text-black mb-4">Request Sent!</h2>
            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
              We have received your booking request for:<br/>
              <span className="font-bold text-black">{selectedDate}</span> at <span className="font-bold text-black">{selectedTime}</span>.
              <br/><br/>
              Our team will review the artist's schedule and confirm your appointment shortly via email.
            </p>
            <button 
              onClick={() => setShowPopup(false)}
              className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-[10px] hover:bg-[#a89078] transition-all"
            >
              Close and Return
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;