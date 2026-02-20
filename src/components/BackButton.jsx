import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <button 
      onClick={() => navigate(-1)} 
      className="fixed top-4 left-4 z-[50] flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-all group bg-white/50 backdrop-blur-sm p-2 rounded-full md:bg-transparent"
    >
      <div className="w-8 h-8 rounded-full border border-[#eee6de] flex items-center justify-center group-hover:border-black transition-colors">
        <svg 
          className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <span className="block">Back</span>
    </button>
  );
};

export default BackButton;