import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BackButton from './components/BackButton';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Packages from './pages/Packages';
import Contact from './pages/Contact';
import BookingInfo from './pages/BookingInfo.jsx';
import CategoryPage from './pages/CategoryPage';
import InquiryPage from './pages/InquiryPage';
import Booking from './pages/Booking';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop /> 
      <BackButton />
    
      <div className="flex flex-col w-full"> 
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking-info" element={<BookingInfo />} />
            <Route path="/portfolio/:categoryName" element={<CategoryPage />} />
            <Route path="/inquiry" element={<InquiryPage />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;