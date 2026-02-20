import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@eram.com" && password === "eram123") {
      localStorage.setItem("isAdmin", "true");
      navigate('/admin-dashboard');
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf9] flex items-center justify-center px-6 font-montserrat">
      <div className="max-w-md w-full bg-white p-10 border border-[#eee6de] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#a89078]"></div>

        <div className="text-center mb-10">
          <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#a89078] mb-2 font-bold">Secure Access</h2>
          <h1 className="text-3xl font-playfair italic text-[#1a1a1a]">Admin Portal</h1>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest uppercase font-bold text-gray-400 block ml-1">Email</label>
            <input 
              type="email" 
              required
              placeholder="admin@erammakeover.com"
              className="w-full border-b border-[#eee6de] py-3 text-sm focus:border-black outline-none bg-transparent transition-all placeholder-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] tracking-widest uppercase font-bold text-gray-400 block ml-1">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full border-b border-[#eee6de] py-3 text-sm focus:border-black outline-none bg-transparent transition-all placeholder-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-black text-white py-5 text-[11px] uppercase tracking-[0.3em] hover:bg-[#a89078] transition-all duration-500 shadow-lg active:scale-95">
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;