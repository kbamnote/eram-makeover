import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Booking = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const generateDates = () => {
      const dates = [];
      const today = new Date();
      for (let i = 0; i < 90; i++) {
        const nextDate = new Date();
        nextDate.setDate(today.getDate() + i);
        dates.push({
          day: nextDate.toLocaleDateString('en-US', { weekday: 'short' }),
          date: nextDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
          fullDate: nextDate.toDateString(),
        });
      }
      setAvailableDates(dates);
    };
    generateDates();
  }, []);

  const slots = ["08:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "06:00 PM", "08:30 PM"];

  return (
    <div className="bg-[#fdfbf9] min-h-screen py-10 lg:py-24 px-4 sm:px-10 lg:px-20 font-montserrat">
      
      {/* Header - Mobile styling extended to Tablets (lg breakpoint used) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 lg:mb-16"
      >
        <h2 className="text-[9px] lg:text-sm tracking-[0.3em] lg:tracking-[0.4em] uppercase text-gray-400 mb-2">Availability</h2>
        <h1 className="text-2xl lg:text-5xl font-playfair italic text-[#2c2c2c]">Reserve Your Slot</h1>
        <div className="w-12 lg:w-16 h-[1px] bg-[#d4c3b3] mx-auto mt-4"></div>
      </motion.div>

      {/* Main Layout Grid - Will remain 1 column until Large screens (Laptops) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        
        {/* Left Section: Date & Time */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* 1. Date Selection - Horizontal Scroll for Mobile AND Tablets */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase text-[#a89078]">1. Select Date</h3>
              <span className="text-[9px] text-gray-400 italic lg:hidden">Swipe →</span>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x touch-pan-x">
              {availableDates.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDay(item)}
                  className={`flex-shrink-0 w-16 lg:w-20 py-4 flex flex-col items-center border transition-all snap-start ${
                    selectedDay?.fullDate === item.fullDate 
                    ? 'bg-[#2c2c2c] border-[#2c2c2c] text-white shadow-md scale-105' 
                    : 'bg-white border-[#eee6de] text-gray-500'
                  }`}
                >
                  <span className="text-[8px] lg:text-[10px] uppercase mb-1">{item.day}</span>
                  <span className="text-sm lg:text-base font-bold">{item.date.split(' ')[0]}</span>
                  <span className="text-[8px] lg:text-[9px] opacity-60 uppercase">{item.date.split(' ')[1]}</span>
                </button>
              ))}
            </div>
          </section>

          {/* 2. Time Slots - Stays in 2 columns for Tablets (Mobile style) */}
          <section>
            <h3 className="text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase mb-6 text-[#a89078]">2. Available Slots</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {slots.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 lg:py-4 text-[10px] lg:text-xs tracking-widest border transition-all ${
                    selectedTime === time 
                    ? 'bg-[#d4c3b3] border-[#d4c3b3] text-white' 
                    : 'bg-white border-[#eee6de] text-gray-600 hover:bg-[#fcfaf8]'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right Section: Summary Card - Will stack below on Tablets */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-[#eee6de] p-6 lg:p-8 lg:sticky lg:top-24 shadow-sm rounded-sm">
            <h3 className="text-xs lg:text-sm font-bold uppercase tracking-widest mb-6 border-b pb-4">Booking Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[11px] lg:text-xs">
                <span className="text-gray-400">Date:</span>
                <span className="font-medium">{selectedDay ? `${selectedDay.day}, ${selectedDay.date}` : "—"}</span>
              </div>
              <div className="flex justify-between text-[11px] lg:text-xs">
                <span className="text-gray-400">Time:</span>
                <span className="font-medium">{selectedTime || "—"}</span>
              </div>
              <div className="flex justify-between text-[11px] lg:text-xs">
                <span className="text-gray-400">Artist:</span>
                <span className="font-medium">Lead Artist</span>
              </div>
            </div>

            <button 
              disabled={!selectedDay || !selectedTime}
              className={`w-full py-4 text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg ${
                selectedDay && selectedTime 
                ? 'bg-[#2c2c2c] text-white hover:bg-black active:scale-95' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              onClick={() => alert("Redirecting to payment/confirmation...")}
            >
              Confirm Appointment
            </button>
            <p className="text-[9px] text-gray-400 mt-4 text-center italic leading-relaxed px-2">
              Appointment subject to final review.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Booking;