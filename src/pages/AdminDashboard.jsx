import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [notification, setNotification] = useState({ show: false, msg: '' });
  const [actionConfig, setActionConfig] = useState({ isOpen: false, booking: null, actionType: '' });
  const navigate = useNavigate();

  const API_URL = "https://erammakeover-backend-production.up.railway.app/api/users";
  const SERVICE_ID = "service_fqk8uc4";
  const TEMPLATE_ID = "template_n60w94j";
  const PUBLIC_KEY = "ARxT7sdroJbJh2VtV";

  const loadData = async () => {
    try {
      const response = await fetch(`${API_URL}?t=${Date.now()}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        const savedApprovals = JSON.parse(localStorage.getItem('eram_approvals') || '[]');
        const mergedData = data.map(booking => {
          const id = booking._id || booking.id;
          if (savedApprovals.includes(id)) {
            return { ...booking, status: 'Confirmed' };
          }
          return booking;
        });
        setBookings(mergedData);
      }
    } catch (error) { console.error("Fetch Error:", error); }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('focus', loadData);
    return () => window.removeEventListener('focus', loadData);
  }, []);

  const sendEmail = (booking, status) => {
    const templateParams = {
      to_name: booking.fullname || booking.name,
      to_email: booking.email,
      service: booking.service || "Booking",
      date: booking.date || "TBD",
      time: booking.time || "TBD",
      status: status, 
    };
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .catch((err) => console.error("Email Error:", err));
  };

  const handleFinalConfirm = async () => {
    const { booking, actionType } = actionConfig;
    const id = booking._id || booking.id;
    setActionConfig({ isOpen: false, booking: null, actionType: '' });

    if (actionType === 'Approve') {
      const savedApprovals = JSON.parse(localStorage.getItem('eram_approvals') || '[]');
      if (!savedApprovals.includes(id)) {
        savedApprovals.push(id);
        localStorage.setItem('eram_approvals', JSON.stringify(savedApprovals));
      }
      setBookings(prev => prev.map(b => (b._id === id || b.id === id) ? { ...b, status: 'Confirmed' } : b));
      sendEmail(booking, 'Confirmed');
      setNotification({ show: true, msg: "Artistry Confirmed & Email Sent!" });
    } else {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
          sendEmail(booking, 'Declined');
          setBookings(prev => prev.filter(b => b._id !== id && b.id !== id));
          setNotification({ show: true, msg: "Booking Removed Successfully" });
        }
      } catch (error) { console.error("Delete failed"); }
    }
  };

  const pendingCount = bookings.filter(b => b.status !== 'Confirmed').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;

  return (
    <div className="flex min-h-screen bg-[#fdfbf9] font-montserrat text-black">
      
      {notification.show && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setNotification({show: false})}></div>
          <div className="relative bg-white p-10 max-w-sm w-full text-center shadow-2xl border-t-8 border-[#a89078] animate-in zoom-in duration-300">
            <h2 className="text-2xl font-playfair italic mb-4">Eram Update</h2>
            <p className="text-gray-600 text-sm mb-8">{notification.msg}</p>
            <button onClick={() => setNotification({show: false})} className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-[10px]">Close</button>
          </div>
        </div>
      )}

      {actionConfig.isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
          <div className="relative bg-white w-full max-w-md border-t-[10px] border-black p-10 text-center shadow-2xl">
            <h2 className="font-playfair italic text-3xl mb-4">Confirm Action</h2>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-8">Proceed with {actionConfig.actionType}?</p>
            <div className="flex flex-col gap-3">
              <button onClick={handleFinalConfirm} className="py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest">Confirm</button>
              <button onClick={() => setActionConfig({isOpen: false})} className="py-4 border border-gray-200 text-gray-400 text-[10px] font-black uppercase tracking-widest">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-8 hidden lg:flex flex-col border-r border-gray-800">
        <h2 className="font-playfair italic text-2xl mb-12 border-b border-gray-700 pb-4">Eram Admin</h2>
        <div className="flex flex-col gap-6">
            <button onClick={() => navigate('/admin-dashboard')} className="text-left text-[11px] uppercase text-[#a89078] tracking-widest font-black">Main Dashboard</button>
            <button onClick={() => { localStorage.removeItem("isAdmin"); navigate('/admin-login'); }} className="text-left text-[11px] uppercase text-red-500 tracking-widest font-black">Sign Out</button>
        </div>
      </div>

      <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-playfair italic">Studio Manager</h1>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-8 border border-[#eee6de] shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Pending Inquiries</p>
            <h3 className="text-4xl font-bold text-[#a89078]">{pendingCount}</h3>
          </div>
          <div className="bg-white p-8 border border-[#eee6de] shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Confirmed Sessions</p>
            <h3 className="text-4xl font-bold text-black">{confirmedCount}</h3>
          </div>
        </div>

        <div className="bg-white border border-[#eee6de] overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-[#fcfaf8] text-[10px] uppercase text-black border-b border-[#eee6de]">
              <tr>
                <th className="p-6">Client</th>
                <th className="p-6">Service</th>
                <th className="p-6">Date</th>
                <th className="p-6">Time</th>
                <th className="p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {bookings.map((row) => (
                <tr key={row._id || row.id} className="border-b border-black-50 hover:bg-[#fdfbf9]">
                  <td className="p-6 font-bold uppercase">{row.fullname || row.name}</td>
                  <td className="p-6 text-black-600">{row.service || "General"}</td>
                  <td className="p-6 text-black-600">{row.date}</td>
                  <td className="p-6 text-black-600">{row.time}</td>
                  <td className="p-6 text-center space-x-6">
                    {row.status === 'Confirmed' ? (
                      <span className="text-green-600 font-black uppercase text-[10px] tracking-widest">Confirmed</span>
                    ) : (
                      <button onClick={() => setActionConfig({isOpen: true, booking: row, actionType: 'Approve'})} className="text-black underline uppercase text-[10px] font-black hover:text-[#a89078]">Approve</button>
                    )}
                    <button onClick={() => setActionConfig({isOpen: true, booking: row, actionType: 'Decline'})} className="text-red-800 underline uppercase text-[10px] font-black">Decline</button>
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