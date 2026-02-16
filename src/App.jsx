import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
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
import ScrollToTop from './components/ScrollToTop'; // Scroll logic import

function App() {
  return (
    <Router>
      {/* 1. ScrollToTop ko Router ke andar aur div ke upar rakha hai */}
      <ScrollToTop /> 

      <div className="flex flex-col min-h-screen">
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
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;