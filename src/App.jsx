import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const LandingPage = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <Services />
    <Testimonials />
    <Contact />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-500 selection:text-white overflow-x-hidden">
        {/* Global Styles for Animations */}
        <style>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .glass-panel {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.5);
          }
          .glass-panel-dark {
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        `}</style>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
