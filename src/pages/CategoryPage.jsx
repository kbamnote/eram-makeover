import React from 'react';
import { useParams, Link } from 'react-router-dom';

// 1. Apni sari local images yahan import karein
import bridalImg from '../assets/bridal.jpg';
import editorialImg from '../assets/editorial.png';
import softImg from '../assets/soft.png';
import hennaImg from '../assets/henna.png';
import modernImg from '../assets/modern.png';
import nightImg from '../assets/night.png';

const CategoryPage = () => {
  const { categoryName } = useParams(); // URL se 'bridal', 'party' etc. nikaalta hai

  // 2. Wahi data array jo Portfolio mein tha (Local images ke saath)
  const allItems = [
    { id: 1, title: "Classic Bridal", category: "bridal", img: bridalImg },
    { id: 2, title: "Editorial Bold", category: "editorial", img: editorialImg },
    { id: 3, title: "Soft Glam", category: "party", img: softImg },
    { id: 4, title: "Traditional Henna", category: "bridal", img: hennaImg },
    { id: 5, title: "Modern Muse", category: "editorial", img: modernImg },
    { id: 6, title: "Night Out", category: "party", img: nightImg },
  ];

  const filteredItems = allItems.filter(
    (item) => item.category === categoryName.toLowerCase()
  );

  return (
    <div className="bg-[#fdfbf9] min-h-screen py-16 px-8 md:px-20 font-montserrat">
      {/* Navigation & Header */}
      <div className="text-center mb-12">
        <Link to="/portfolio" className="text-xs tracking-[0.2em] text-gray-400 hover:text-black transition">
          ← BACK TO PORTFOLIO
        </Link>
        <h1 className="text-4xl font-playfair italic mt-6 capitalize text-[#2c2c2c]">
          {categoryName} Collection
        </h1>
        <div className="w-16 h-[1px] bg-[#d4c3b3] mx-auto mt-4"></div>
      </div>

      {/* Filtered Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="group bg-white shadow-sm border border-[#eee6de] overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="p-5 text-center">
                <p className="text-xs tracking-widest uppercase text-gray-500">{item.title}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-20">
            No images found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;