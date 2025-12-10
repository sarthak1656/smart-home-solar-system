import React, { useState, useEffect } from "react";
import { Sun, Menu, X, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg py-4 border-b border-white/20"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection("hero")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400 rounded-full blur group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-full text-white shadow-xl">
                <Sun className="h-6 w-6" />
              </div>
            </div>
            <span
              className={`text-xl font-bold tracking-tight ${
                scrolled ? "text-slate-900" : "text-white"
              }`}
            >
              Smart Home <span className="text-emerald-500">Solar</span> System
            </span>
          </div>

          {/* Desktop Navigation */}
          <div
            className={`hidden md:flex items-center space-x-10 font-medium ${
              scrolled ? "text-slate-600" : "text-slate-800 lg:text-white/90"
            }`}
          >
            {["Home", "About", "Services", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  scrollToSection(
                    item.toLowerCase() === "home" ? "hero" : item.toLowerCase()
                  )
                }
                className="hover:text-emerald-400 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group"
            >
              Get a Quote{" "}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-slate-800 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 ease-in-out origin-top border-t border-slate-100 ${
          isMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        <div className="p-6 space-y-4">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() =>
                scrollToSection(
                  item.toLowerCase() === "home" ? "hero" : item.toLowerCase()
                )
              }
              className="block w-full text-left text-lg font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-xl transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;