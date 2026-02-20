import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#f3efea] border-t border-[#eee6de] pt-16 pb-8 px-8 lg:px-20 font-montserrat overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Section */}
        <div className="col-span-1">
          <h2 className="font-playfair italic text-2xl text-[#2c2c2c] mb-4">Eram Makeover</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Enhancing your natural beauty with a touch of elegance and modern artistry.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-[#a89078]">Explore</h3>
          <ul className="space-y-4 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-black transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-black transition">About</Link></li>
            <li><Link to="/portfolio" className="hover:text-black transition">Portfolio</Link></li>
            <li><Link to="/packages" className="hover:text-black transition">Packages</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-[#a89078]">Services</h3>
          <ul className="space-y-4 text-sm text-gray-600">
            <li><Link to="/portfolio/bridal" className="hover:text-black transition">Bridal Makeup</Link></li>
            <li><Link to="/portfolio/editorial" className="hover:text-black transition">Editorial</Link></li>
            <li><Link to="/portfolio/party" className="hover:text-black transition">Party Glam</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-[#a89078]">Follow Us</h3>
          <div className="flex flex-col space-y-4 text-sm text-gray-600">
            <a href="#" className="hover:text-black transition italic">Instagram</a>
            <a href="#" className="hover:text-black transition italic">Pinterest</a>
            <a href="#" className="hover:text-black transition italic">Facebook</a>
          </div>
        </div>
      </div>

      <Link to="/admin-login" className="text-[10px] text-black-300 opacity-90 hover:opacity-100">
        Admin Access
      </Link>

      {/* Copyright */}
      <div className="border-t border-[#eee6de] pt-8 text-center text-[10px] tracking-[0.2em] text-black-400 uppercase">
        © 2026 Eram Makeover. Artistry. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;