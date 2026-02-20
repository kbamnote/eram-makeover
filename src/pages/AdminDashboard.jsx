import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [notification, setNotification] = useState({ show: false, msg: '', type: '' });
  
  // Custom Modal State (Replacing browser alerts)
  const [actionConfig, setActionConfig] = useState({ isOpen: false, booking: null, actionType: '' });
  
  const navigate = useNavigate();

  const API_URL = "https://erammakeover-backend-production.up.railway.app/api/users";
  const SERVICE_ID = "service_fqk8uc4";
  const TEMPLATE_ID = "template_n60w94j";
  const PUBLIC_KEY = "ARxT7sdroJbJh2VtV";

  const showPopup = (msg, type = 'success') => {
    setNotification({ show: true, msg, type });
    setTimeout(() => setNotification({ show: false, msg: '', type: '' }), 4000);
  };

  const loadData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBookings(Array.isArray(data) && data.length > 0 ? data : []);
    } catch (error) { console.error("Fetch Error:", error); }
  };

  useEffect(() => { loadData(); }, []);

  const sendEmailNotification = (booking, status) => {
    const templateParams = {
      to_name: booking.name || booking.fullname,
      to_email: booking.email,
      service: booking.service || "Booking Request",
      date: booking.date || "TBD",
      status: status, 
    };
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  };

  // Open the Luxury Modal
  const triggerAction = (booking, type) => {
    setActionConfig({ isOpen: true, booking, actionType: type });
  };

  // Final Action after Luxury Modal Confirmation
  const handleFinalConfirm = async () => {
    const { booking, actionType } = actionConfig;
    const id = booking.id || booking._id;
    setActionConfig({ isOpen: false, booking: null, actionType: '' });

    try {
      if (actionType === 'Approve') {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'Confirmed' })
        });
        if (response.ok) {
          setBookings(bookings.map(b => (b.id === id || b._id === id) ? { ...b, status: 'Confirmed' } : b));
          sendEmailNotification(booking, 'Confirmed');
          showPopup(`Booking Confirmed for ${booking.name || booking.fullname}`);
        }
      } else {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) {
          sendEmailNotification(booking, 'Declined');
          setBookings(bookings.filter(b => (b.id !== id && b._id !== id)));
          showPopup("Booking removed successfully.", "error");
        }
      }
    } catch (error) { showPopup("Network Error", "error"); }
  };

  return (
    <div className="flex min-h-screen bg-[#fdfbf9] font-montserrat relative overflow-x-hidden">
      
      {/* --- LUXURY CUSTOM MODAL --- */}
      {actionConfig.isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
          <div className="relative bg-white w-full max-w-md border-t-[10px] border-black shadow-2xl p-10 text-center animate-in fade-in zoom-in duration-300">
            <h2 className="font-playfair italic text-3xl text-black mb-2">Artistry Decision</h2>
            <div className="w-12 h-[1px] bg-[#a89078] mx-auto mb-6"></div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-8">
              Confirm <span className="text-black font-black">{actionConfig.actionType}</span> for <br/>
              <span className="text-black font-black text-sm block mt-2">{actionConfig.booking?.name || actionConfig.booking?.fullname}</span>
            </p>
            <div className="flex flex-col gap-3">
              <button onClick={handleFinalConfirm} className="py-4 bg-black text-white text-[10px] uppercase font-black tracking-widest hover:bg-[#a89078] transition-all">
                Confirm {actionConfig.actionType}
              </button>
              <button onClick={() => setActionConfig({ isOpen: false, booking: null, actionType: '' })} className="py-4 border border-gray-200 text-gray-400 text-[10px] uppercase font-black hover:text-black transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- FLOATING NOTIFICATION --- */}
      {notification.show && (
        <div className="fixed top-10 right-5 md:right-10 z-[10001] bg-black text-white p-5 border-l-4 border-[#a89078] shadow-2xl animate-in slide-in-from-right-full">
          <p className="text-sm font-playfair italic">{notification.msg}</p>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-8 hidden lg:flex flex-col border-r border-gray-800">
        <h2 className="font-playfair italic text-2xl mb-12 border-b border-gray-800 pb-4">Eram Admin</h2>
        <button onClick={() => navigate('/admin-login')} className="text-left text-[11px] uppercase text-red-500 font-black">Sign Out</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-playfair italic text-black">Control Panel</h1>
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-700 mt-2 font-black">Manage Artist Schedule</p>
        </header>

        {/* --- RESTORED TABLE WITH ALL ORIGINAL FIELDS --- */}
        <div className="bg-white border-2 border-[#eee6de] shadow-md overflow-hidden">
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
              {bookings.map((row, index) => (
                <tr key={row._id || row.id || index} className="border-b border-[#eee6de] hover:bg-[#fcfaf8] transition font-medium">
                  <td className="p-5 font-bold">{row.name || row.fullname}</td>
                  <td className="p-5 text-gray-900 font-semibold">{row.service || "Booking Request"}</td>
                  <td className="p-5 text-gray-800 font-semibold">{row.date || "TBD"} | {row.time || "TBD"}</td>
                  <td className="p-5">
                    <span className={`px-4 py-1.5 text-[10px] uppercase font-black rounded-full border ${
                      row.status === 'Confirmed' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-orange-100 text-orange-800 border-orange-200'
                    }`}>
                      {row.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-5 text-center flex justify-center gap-6 font-black uppercase text-[12px] tracking-tighter">
                    {row.status !== 'Confirmed' && (
                      <button onClick={() => triggerAction(row, 'Approve')} className="text-green-700 hover:text-green-900 underline underline-offset-4">Approve</button>
                    )}
                    <button onClick={() => triggerAction(row, 'Decline')} className="text-red-700 hover:text-red-900 underline underline-offset-4">Decline</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;