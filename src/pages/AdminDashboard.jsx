import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // --- AAPKI API URL ---
  const API_URL = "https://erammakeover-backend-production.up.railway.app/api/users";

  const dummyData = [
    { id: 101, name: "Zoya Khan", service: "Bridal Makeup", date: "Wed Feb 19 2026", time: "10:30 AM", status: "Pending" },
    { id: 102, name: "Riya Sharma", service: "Party Glam", date: "Thu Feb 20 2026", time: "01:00 PM", status: "Confirmed" },
    { id: 103, name: "Mehak Kapoor", service: "Editorial Shoot", date: "Fri Feb 21 2026", time: "03:30 PM", status: "Pending" },
    { id: 104, name: "Isha Malhotra", service: "Bridal Makeup", date: "Sun Feb 23 2026", time: "08:00 AM", status: "Confirmed" },
    { id: 105, name: "Sana Sayyad", service: "Engagement Look", date: "Mon Feb 24 2026", time: "06:00 PM", status: "Pending" },
  ];

  // 1. FETCH DATA (GET)
  const loadData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("API Connection Failed");
      const data = await response.json();
      setBookings(Array.isArray(data) && data.length > 0 ? data : dummyData);
    } catch (error) {
      console.error("Fetch Error:", error);
      setBookings(dummyData);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate('/admin-login');
  };

  const handleApprove = async (id) => {
    const originalBookings = [...bookings];
    const updatedLocal = bookings.map(b => 
      (b.id === id || b._id === id) ? { ...b, status: 'Confirmed' } : b
    );
    setBookings(updatedLocal);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Confirmed' })
      });

      if (!response.ok) {
        setBookings(originalBookings);
        alert("Server error: Could not approve booking.");
      }
    } catch (error) {
      setBookings(originalBookings);
      alert("Network error: Please check your connection.");
    }
  };

  // 3. DECLINE ACTION (DELETE)
  const handleDecline = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setBookings(bookings.filter(b => (b.id !== id && b._id !== id)));
        } else {
          alert("Could not delete from server.");
        }
      } catch (error) {
        alert("Network error while deleting.");
      }
    }
  };

  const pendingCount = bookings.filter(b => b.status !== 'Confirmed').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;

  return (
    <div className="flex min-h-screen bg-[#fdfbf9] font-montserrat">
      
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-8 hidden lg:flex flex-col border-r border-gray-800">
        <h2 className="font-playfair italic text-2xl mb-12 border-b border-gray-800 pb-4 text-white">Eram Admin</h2>
        
        <nav className="text-sm text-[#a89078] tracking-widest uppercase font-bold mb-8">
          Main Dashboard
        </nav>

        <button 
          onClick={handleLogout} 
          className="text-left text-[11px] uppercase text-red-500 tracking-[0.2em] font-black hover:text-red-400 transition-colors"
        >
           Sign Out 
        </button>

        <div className="flex-1"></div> 
      </div>

      <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="mb-12 text-black">
          <h1 className="text-4xl font-playfair italic font-medium">Control Panel</h1>
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-700 mt-2 font-black">Manage your artistry schedule</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-8 border-2 border-[#eee6de] shadow-sm">
            <p className="text-[11px] uppercase tracking-widest text-gray-800 font-black mb-3">Pending Requests</p>
            <h3 className="text-4xl font-light text-[#a89078] font-bold">{pendingCount}</h3>
          </div>
          <div className="bg-white p-8 border-2 border-[#eee6de] shadow-sm">
            <p className="text-[11px] uppercase tracking-widest text-gray-800 font-black mb-3">Total Confirmed</p>
            <h3 className="text-4xl font-light text-black font-bold">{confirmedCount}</h3>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white border-2 border-[#eee6de] shadow-md rounded-sm overflow-hidden">
          <div className="p-6 bg-white border-b-2 border-[#eee6de]">
            <h3 className="text-sm uppercase font-black tracking-widest text-black">Customer Bookings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f5f1ed] text-[10px] uppercase text-black border-b-2 border-[#eee6de]">
                <tr>
                  <th className="p-5 font-black">Client</th>
                  <th className="p-5 font-black">Service</th>
                  <th className="p-5 font-black">Date & Time</th>
                  <th className="p-5 font-black">Status</th>
                  <th className="p-5 font-black text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-black">
                {bookings.map((row) => (
                  <tr key={row.id || row._id} className="border-b border-[#eee6de] hover:bg-[#fcfaf8] transition font-medium">
                    <td className="p-5 font-bold text-black">{row.name || row.fullname}</td>
                    <td className="p-5 text-gray-900 font-semibold">{row.service || "Booking Request"}</td>
                    <td className="p-5 text-gray-800 font-semibold">{row.date || "TBD"} | {row.time || "TBD"}</td>
                    <td className="p-5">
                      <span className={`px-4 py-1.5 text-[10px] uppercase font-black rounded-full border ${
                        row.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : 'bg-orange-100 text-orange-800 border-orange-200'
                      }`}>
                        {row.status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-5 text-center flex justify-center gap-6 font-black uppercase text-[12px] tracking-tighter">
                      {row.status !== 'Confirmed' && (
                        <button 
                          onClick={() => handleApprove(row.id || row._id)} 
                          className="text-green-700 hover:text-green-900 underline underline-offset-4"
                        >
                          Approve
                        </button>
                      )}
                      <button 
                        onClick={() => handleDecline(row.id || row._id)} 
                        className="text-red-700 hover:text-red-900 underline underline-offset-4"
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;