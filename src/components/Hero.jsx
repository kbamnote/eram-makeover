import React from 'react';
import { Link } from 'react-router-dom'; 
import heroImg from '../assets/hero-bg.png';

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row min-h-0 w-full">
      {/* Left: Image Side */}
      <div className="flex-1 overflow-hidden">
        <img 
          src={heroImg} 
          alt="Makeup Artistry" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Content Side */}
      <div className="flex-1 bg-[#fdfbf9] flex flex-col justify-center py-12 px-8 md:px-20 relative">
        <div className="relative z-10">
          <h1 className="font-montserrat text-5xl md:text-7xl font-bold leading-tight text-black mb-6">
            Makeup Services <br /> at Your Place
          </h1>
          <p className="text-gray-600 text-lg mb-10 max-w-md">
            Professional artistry for everyday looks, weddings, and high-fashion events.
          </p>
          
          <Link to="/booking-info">
            <button className="border border-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
              Book an Appointment
            </button>
          </Link>
        </div>
        
        {/* Subtle Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>
    </section>
  );
}