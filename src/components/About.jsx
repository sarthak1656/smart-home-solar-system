import React from "react";
import { Star, CheckCircle } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const About = () => {
  return (
    <section id="about" className="py-32 bg-slate-50 relative overflow-hidden">
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
                  #1 Rated Solar Provider 2025
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
                comprehensive energy ecosystems. At Smart Home Solar, we combine
                Tier-1 photovoltaic technology with AI-driven monitoring to
                ensure every ray of sunshine counts.
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
  );
};

export default About;
