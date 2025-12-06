import React, { useState, useEffect, useRef } from "react";
import {
  Sun,
  Battery,
  Zap,
  Wrench,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight,
  Star,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Leaf,
} from "lucide-react";

// --- Utility Components for Animations ---

const RevealOnScroll = ({ children, delay = 0, width = "100%" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ width, transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
};

// --- Main App Component ---

const App = () => {
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

      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg py-4 border-b border-white/20"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
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
                  scrolled ? "text-slate-900" : "text-slate-900 lg:text-white"
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
              {["Home", "About", "Services", "Testimonials"].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(
                      item.toLowerCase() === "home"
                        ? "hero"
                        : item.toLowerCase()
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
            {["Home", "About", "Services", "Testimonials", "Contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(
                      item.toLowerCase() === "home"
                        ? "hero"
                        : item.toLowerCase()
                    )
                  }
                  className="block w-full text-left text-lg font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-xl transition-colors"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury Solar Home"
            className="w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent"></div>
          {/* Animated Gradient Orb */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <RevealOnScroll>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-semibold tracking-wide uppercase">
                    Future of Energy
                  </span>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                  Energy Independence <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    Starts Here.
                  </span>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll delay={400}>
                <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                  Transform your home into a self-sustaining powerhouse. Premium
                  solar solutions designed for aesthetics, efficiency, and
                  maximum ROI.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={600}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 group"
                  >
                    Calculate Savings{" "}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="group px-8 py-4 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                    </div>
                    How It Works
                  </button>
                </div>
              </RevealOnScroll>
            </div>

            {/* Floating Stats Card */}
            <div className="hidden lg:block relative h-[500px]">
              {/* Abstract floating elements */}
              <div className="absolute top-0 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl w-72 animate-float z-20 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-emerald-500 rounded-2xl">
                    <Zap className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Daily Production</p>
                    <p className="text-white font-bold text-xl">45.2 kWh</p>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[85%]"></div>
                </div>
              </div>

              <div
                className="absolute bottom-20 left-0 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl w-72 animate-float z-10 shadow-2xl"
                style={{ animationDelay: "2s" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-500 rounded-2xl">
                    <ShieldCheck className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">System Health</p>
                    <p className="text-white font-bold text-xl">100% Optimal</p>
                  </div>
                </div>
                <p className="text-emerald-300 text-sm flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> All panels active
                </p>
              </div>
            </div>
          </div>

          {/* Glass Stats Strip */}
          <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-slate-900/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
                {[
                  { label: "Installations", val: "5,000+" },
                  { label: "Client Savings", val: "$20M+" },
                  { label: "CO2 Avoided", val: "15k Tons" },
                  { label: "Warranty", val: "25 Years" },
                ].map((stat, i) => (
                  <div key={i} className="text-center px-4">
                    <p className="text-3xl font-bold text-white mb-1">
                      {stat.val}
                    </p>
                    <p className="text-slate-400 text-sm uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section
        id="about"
        className="py-32 bg-slate-50 relative overflow-hidden"
      >
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <RevealOnScroll>
              <div className="relative group">
                <div className="absolute inset-0 bg-emerald-500 rounded-3xl rotate-6 opacity-20 group-hover:rotate-4 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-slate-900 rounded-3xl -rotate-2 opacity-10 group-hover:-rotate-1 transition-transform duration-500"></div>
                <img
                  src="https://images.unsplash.com/photo-1624397640148-949b1732bb0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Technician"
                  className="relative rounded-3xl shadow-2xl object-cover h-[500px] w-full"
                />

                {/* Floating badge */}
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-[200px]">
                  <div className="flex text-yellow-400 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="font-bold text-slate-900">
                    #1 Rated Solar Provider 2024
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div>
                <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full font-semibold text-sm mb-6">
                  Our Story
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                  Not Just Solar. <br />
                  <span className="text-emerald-600">Smart Energy.</span>
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  We don't just bolt panels to your roof. We engineer
                  comprehensive energy ecosystems. At Smart Home Solar, we
                  combine Tier-1 photovoltaic technology with AI-driven
                  monitoring to ensure every ray of sunshine counts.
                </p>
                <div className="space-y-6 mt-10">
                  {[
                    {
                      title: "Precision Engineering",
                      desc: "Laser-measured roof mapping for optimal placement.",
                    },
                    {
                      title: "Aesthetics First",
                      desc: "Sleek, all-black panels that blend with your architecture.",
                    },
                    {
                      title: "25-Year Guarantee",
                      desc: "Comprehensive bumper-to-bumper production warranty.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4 group">
                      <div className="mt-1 w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">
                          {item.title}
                        </h4>
                        <p className="text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-emerald-600 font-bold tracking-widest text-sm uppercase mb-3">
                Our Expertise
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Complete Energy Ecosystems
              </h3>
              <p className="text-lg text-slate-600">
                Seamlessly integrated hardware and software solutions for the
                modern smart home.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              delay={0}
              icon={<Sun />}
              title="Premium Solar"
              desc="High-efficiency monocrystalline panels designed to perform in low light and high heat conditions."
            />
            <ServiceCard
              delay={100}
              icon={<Battery />}
              title="Energy Storage"
              desc="Tesla Powerwall & Enphase certified installers. Keep your lights on when the grid goes down."
            />
            <ServiceCard
              delay={200}
              icon={<Zap />}
              title="EV Integration"
              desc="Level 2 fast charging stations integrated directly with your solar inverter for 'Sunshine Driving'."
            />
            <ServiceCard
              delay={300}
              icon={<ShieldCheck />}
              title="24/7 Monitoring"
              desc="Advanced pearl-level monitoring detects micro-inefficiencies before they impact your bill."
            />
            <ServiceCard
              delay={400}
              icon={<Leaf />}
              title="Eco Smart Home"
              desc="Integration with Nest, Ecobee, and smart loads to automatically optimize usage curves."
            />
            <ServiceCard
              delay={500}
              icon={<Wrench />}
              title="White Glove Service"
              desc="Our concierge team handles all permits, HOAs, and inspections. You just flip the switch."
            />
          </div>
        </div>
      </section>

      {/* Immersive Testimonials */}
      <section
        id="testimonials"
        className="py-32 bg-slate-950 relative overflow-hidden"
      >
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <RevealOnScroll>
              <h2 className="text-emerald-400 font-bold tracking-widest text-sm uppercase mb-3">
                Testimonials
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white">
                Join the Revolution
              </h3>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <div className="flex gap-4 mt-8 md:mt-0">
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">4.9/5</div>
                  <div className="text-slate-400 text-sm">
                    Based on 2,000+ reviews
                  </div>
                </div>
                <div className="flex items-center text-yellow-400 gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-6 w-6 fill-current" />
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              delay={0}
              name="Sarah Jenkins"
              role="Tech Executive"
              text="I was skeptical about the aesthetics, but the all-black panels look incredible on my modern roof. The app is addictive—I check my savings daily."
            />
            <TestimonialCard
              delay={200}
              name="Michael Ross"
              role="Architect"
              text="As an architect, details matter. Smart Home Solar's conduit runs were invisible, and the finish quality was exceptional. Highly recommended."
            />
            <TestimonialCard
              delay={400}
              name="Elena Rodriguez"
              role="Homeowner"
              text="The battery backup kicked in seamlessly during last month's storm. While the whole neighborhood was dark, we were watching movies. Worth every penny."
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-20 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">
                    Let's power your future.
                  </h3>
                  <p className="text-slate-300 mb-12 text-lg">
                    Get a custom solar design proposal including savings
                    estimates and 3D roof rendering.
                  </p>

                  <div className="space-y-8">
                    <ContactItem
                      icon={<Phone />}
                      title="Call Us"
                      detail="(555) 123-4567"
                    />
                    <ContactItem
                      icon={<Mail />}
                      title="Email"
                      detail="hello@smarthomesolar.com"
                    />
                    <ContactItem
                      icon={<MapPin />}
                      title="Visit"
                      detail="123 Sun Valley Dr, Solar City"
                    />
                  </div>
                </div>
              </div>

              <div className="p-12 lg:p-20 bg-white">
                <form
                  className="space-y-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputGroup label="First Name" placeholder="John" />
                    <InputGroup label="Last Name" placeholder="Doe" />
                  </div>
                  <InputGroup
                    label="Email Address"
                    placeholder="john@example.com"
                    type="email"
                  />

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Monthly Bill Average
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["$100-150", "$150-250", "$250-400", "$400+"].map(
                        (opt) => (
                          <button
                            key={opt}
                            className="py-3 px-4 rounded-xl border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all text-sm font-medium"
                          >
                            {opt}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-1 transition-all duration-300">
                    Get My Free Proposal
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    No spam. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-slate-950 text-slate-400 py-20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6 text-white">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg">
                  <Sun className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold">Smart Home Solar</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-sm">
                Engineering the future of distributed energy. We are committed
                to a world powered by clean, renewable intelligence.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Impact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Warranty
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h4 className="text-white font-bold mb-6">Visit HQ</h4>
              <div className="rounded-xl overflow-hidden h-40 border border-slate-800 bg-slate-900 relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.063689685934!2d-122.4194154846819!3d37.77492927975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter+HQ!5e0!3m2!1sen!2sus!4v1530663777777"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="filter grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
              <p className="mt-4 text-xs text-slate-500 flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-500" />
                123 Sun Valley Dr, Solar City, CA 90210
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm">
              © 2024 Smart Home Solar Systems. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-slate-500 hover:text-white transition-colors text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Sub Components ---

const ServiceCard = ({ icon, title, desc, delay }) => (
  <RevealOnScroll delay={delay}>
    <div className="group p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-emerald-100 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.1)] h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 relative z-10">
        {React.cloneElement(icon, { size: 28, strokeWidth: 1.5 })}
      </div>

      <h4 className="text-xl font-bold text-slate-900 mb-3 relative z-10">
        {title}
      </h4>
      <p className="text-slate-500 leading-relaxed relative z-10">{desc}</p>
    </div>
  </RevealOnScroll>
);

const TestimonialCard = ({ name, role, text, delay }) => (
  <RevealOnScroll delay={delay}>
    <div className="glass-panel-dark p-8 rounded-3xl relative h-full flex flex-col justify-between group hover:bg-slate-900/80 transition-all duration-500">
      <div className="mb-6">
        <div className="flex text-emerald-400 mb-4 opacity-80">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <p className="text-slate-300 text-lg leading-relaxed italic opacity-90">
          "{text}"
        </p>
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-white/10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg">
          {name[0]}
        </div>
        <div>
          <h5 className="font-bold text-white text-sm">{name}</h5>
          <p className="text-slate-500 text-xs uppercase tracking-wider">
            {role}
          </p>
        </div>
      </div>
    </div>
  </RevealOnScroll>
);

const ContactItem = ({ icon, title, detail }) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
      <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">
        {title}
      </p>
      <p className="text-white font-medium text-lg">{detail}</p>
    </div>
  </div>
);

const InputGroup = ({ label, placeholder, type = "text" }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
    />
  </div>
);

export default App;
