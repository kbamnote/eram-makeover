import React, { useState } from 'react';

const Booking = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    fullname: '',
    email: '',
    phonenumber: ''
  });

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i);

  const viewMonth = currentDate.getMonth();
  const viewYear = currentDate.getFullYear();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();

  const slots = ["08:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "06:00 PM", "08:30 PM"];

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    if (selectedDate && selectedTime && userData.fullname && userData.email && userData.phonenumber) {
      setLoading(true);
      const API_URL = "https://erammakeover-backend-production.up.railway.app/api/users/create";

      const payload = {
        fullname: userData.fullname,
        email: userData.email,
        phonenumber: userData.phonenumber,
        service: "Calendar Booking",
        message: `Time: ${selectedTime}`,
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
          setUserData({ fullname: '', email: '', phonenumber: '' });
          setSelectedDate(null);
          setSelectedTime(null);
        } else {
          alert("Failed to send booking request.");
        }
      } catch (error) {
        console.error("API Error:", error);
        alert("Network error.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill all details and select Date & Time.");
    }
  };

  return (
    <div className="bg-[#fdfbf9] py-12 lg:py-20 px-4 sm:px-10 font-montserrat min-h-screen">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#a89078] font-bold mb-2">Reservations</h2>
        <h1 className="text-3xl lg:text-4xl font-playfair italic text-[#1a1a1a]">Book Your Appointment</h1>
      </div>

      <div className="max-w-5xl mx-auto bg-white border border-[#eee6de] shadow-2xl rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left: Compact Calendar (Lg: Col-span-5) */}
        <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-[#f5f0eb]">
          <div className="flex justify-between items-center mb-8 px-2">
            <h3 className="text-[10px] font-bold tracking-widest uppercase">1. Select Date</h3>
            <div className="flex gap-2">
               <select value={viewMonth} onChange={(e) => setCurrentDate(new Date(viewYear, parseInt(e.target.value), 1))} className="text-[10px] font-bold bg-transparent outline-none">
                {months.map((m, i) => <option key={m} value={i}>{m.substring(0,3)}</option>)}
              </select>
              <select value={viewYear} onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value), viewMonth, 1))} className="text-[10px] font-bold bg-transparent outline-none">
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <div key={d} className="text-[9px] font-bold text-[#a89078] mb-4">{d}</div>
            ))}
            {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`}></div>)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const dateStr = new Date(viewYear, viewMonth, day).toDateString();
              const isSelected = selectedDate === dateStr;
              return (
                <button 
                  key={day} 
                  onClick={() => setSelectedDate(dateStr)} 
                  className={`h-10 w-10 mx-auto flex items-center justify-center text-[11px] rounded-full transition-all border ${isSelected ? 'bg-black border-black text-white shadow-md' : 'border-transparent text-gray-700 hover:border-[#eee6de] hover:text-black'}`}
                >
                  <span className={isSelected ? "font-bold" : ""}>{day}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Middle: Time Slots (Lg: Col-span-3) */}
        <div className="lg:col-span-3 p-6 bg-[#faf8f6] border-b lg:border-b-0 lg:border-r border-[#f5f0eb]">
          <h3 className="text-[10px] font-bold tracking-widest uppercase mb-8">2. Select Time</h3>
          <div className="flex flex-col gap-3">
            {slots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`w-full py-3 text-[10px] font-bold border rounded-sm transition-all ${
                  selectedTime === time 
                  ? 'bg-[#a89078] border-[#a89078] text-white' 
                  : 'bg-white border-[#eee6de] text-black hover:border-[#a89078]'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Personal Info (Lg: Col-span-4) */}
        <div className="lg:col-span-4 p-8 bg-black text-white">
          <h3 className="text-[10px] font-bold tracking-widest uppercase mb-8 text-[#d4c3b3]">3. Your Details</h3>
          
          <div className="space-y-6">
            <div>
              <label className="text-[9px] text-white-500 font-bold uppercase block mb-1">Full Name</label>
              <input type="text" name="fullname" placeholder="Enter name" value={userData.fullname} onChange={handleInputChange} className="w-full bg-transparent border-b border-golden-800 py-1 text-xs outline-none focus:border-[#a89078] transition-colors placeholder-white-700" />
            </div>
            <div>
              <label className="text-[9px] text-white-500 font-bold uppercase block mb-1">Email</label>
              <input type="email" name="email" placeholder="Enter email" value={userData.email} onChange={handleInputChange} className="w-full bg-transparent border-b border-golden-800 py-1 text-xs outline-none focus:border-[#a89078] transition-colors placeholder-white-700" />
            </div>
            <div>
              <label className="text-[9px] text-white-500 font-bold uppercase block mb-1">Phone</label>
              <input type="tel" name="phonenumber" placeholder="Enter number" value={userData.phonenumber} onChange={handleInputChange} className="w-full bg-transparent border-b border-golden-800 py-1 text-xs outline-none focus:border-[#a89078] transition-colors placeholder-white-700" />
            </div>
          </div>

          {/* <div className="mt-10 pt-6 border-t border-golden-800"> */}
            <div className="flex justify-between text-[10px] mb-2">
              <span className="text-white-500 uppercase">Selected Date:</span>
              <span className="text-[#d4c3b3]">{selectedDate ? selectedDate.substring(4) : "-"}</span>
            </div>
            <div className="flex justify-between text-[10px] mb-6">
              <span className="text-white-500 uppercase">Selected Slot:</span>
              <span className="text-[#d4c3b3]">{selectedTime || "-"}</span>
            </div>

            <button 
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime || !userData.fullname || loading}
              className={`w-full py-4 text-[11px] font-bold uppercase tracking-[0.3em] transition-all rounded-sm ${selectedDate && selectedTime && userData.fullname ? 'bg-[#d4c3b3] text-black hover:bg-white' : 'bg-gray-900 text-gray-600'}`}
            >
              {loading ? "Processing..." : "Confirm Now"}
            </button>
          {/* </div> */}
        </div>
      </div>

      {/* Success Popup remains the same as your code */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowPopup(false)}></div>
          <div className="relative bg-white p-8 lg:p-12 max-w-md w-full text-center shadow-2xl rounded-sm border-t-8 border-[#a89078]">
            <div className="w-16 h-16 bg-[#fdfbf9] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#eee6de]">
              <svg className="w-8 h-8 text-[#a89078]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-playfair italic text-black mb-4">Request Sent!</h2>
            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
              We've received your request for <span className="font-bold text-black">{selectedDate}</span>. We'll contact you shortly.
            </p>
            <button onClick={() => setShowPopup(false)} className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-[10px]">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;