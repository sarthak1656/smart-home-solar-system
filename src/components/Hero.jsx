import React from "react";
import { ArrowRight, Zap, ShieldCheck, CheckCircle } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 pb-40 md:pb-24 overflow-hidden"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-48 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 mb-8 md:mb-0">
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
                solar solutions designed for aesthetics, efficiency, and maximum
                ROI.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={600}>
              <div className="flex flex-col sm:flex-row gap-4 z-20 relative mb-12 md:mb-0">
                <button
                  onClick={scrollToContact}
                  className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 group w-full sm:w-auto"
                >
                  Calculate Savings{" "}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={scrollToAbout}
                  className="group px-8 py-4 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
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
        <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-slate-900/50 backdrop-blur-md mt-8">
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
  );
};

export default Hero;