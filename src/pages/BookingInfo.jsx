import React from 'react';
import { Link } from 'react-router-dom'; 

const BookingInfo = () => {
  return (
    <div className="bg-[#fdfbf9] min-h-screen py-20 px-8 md:px-20 font-montserrat">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-sm tracking-[0.4em] uppercase text-gray-400 mb-4">Reservation Process</h2>
        <h1 className="text-4xl font-playfair italic text-[#2c2c2c] mb-12">Booking Information</h1>
        
        <div className="space-y-10 text-left bg-white p-10 shadow-sm border border-[#eee6de]">
          <section>
            <h3 className="font-bold text-[#a89078] tracking-widest text-xs mb-3 uppercase">1. Availability Check</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Fill out our contact form with your event date. We usually respond within 24 hours to confirm if the date is open.</p>
          </section>

          <section>
            <h3 className="font-bold text-[#a89078] tracking-widest text-xs mb-3 uppercase">2. Secure Your Date</h3>
            <p className="text-gray-600 text-sm leading-relaxed">A 50% non-refundable deposit is required to officially book your slot. This ensures your time is dedicated solely to you.</p>
          </section>

          <section>
            <h3 className="font-bold text-[#a89078] tracking-widest text-xs mb-3 uppercase">3. Consultation & Trial</h3>
            <p className="text-gray-600 text-sm leading-relaxed">For bridal bookings, we recommend a trial session 4-6 weeks before the wedding to perfect your look.</p>
          </section>

          <Link to="/">
            <button className="w-full mt-6 py-4 bg-[#c4b3a3] text-white text-xs uppercase tracking-[0.3em] hover:bg-[#b3a292] transition-all">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;