import React from "react";
import { Grid3x3, Power, Activity, Camera, Droplet } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

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

const Services = () => {
  return (
    <section id="services" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-emerald-600 font-bold tracking-widest text-sm uppercase mb-3">
              Our Services
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Complete Solar Solutions
            </h3>
            <p className="text-lg text-slate-600">
              From residential to commercial, we provide comprehensive solar
              energy solutions tailored to your needs.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            delay={0}
            icon={<Grid3x3 />}
            title="On Grid Solar System"
            desc="Connected to the utility grid, allowing you to sell excess energy back and reduce electricity bills significantly."
          />
          <ServiceCard
            delay={100}
            icon={<Power />}
            title="Off Grid Solar System"
            desc="Complete energy independence with battery storage. Perfect for remote locations without grid access."
          />
          <ServiceCard
            delay={200}
            icon={<Activity />}
            title="Hybrid Solar System"
            desc="Best of both worlds - grid connection with battery backup for uninterrupted power supply and maximum savings."
          />
          <ServiceCard
            delay={300}
            icon={<Camera />}
            title="Solar CCTV Street Light System"
            desc="Solar-powered street lighting with integrated CCTV cameras for enhanced security and surveillance."
          />
          <ServiceCard
            delay={400}
            icon={<Droplet />}
            title="Solar Water Pump System"
            desc="Efficient solar-powered water pumping solutions for irrigation, domestic use, and agricultural applications."
          />
        </div>
      </div>
    </section>
  );
};

export default Services;