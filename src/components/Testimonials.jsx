import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const Testimonials = () => {
  const reviewImages = [
    "/images/rev1.jpg",
    "/images/rev2.jpg",
    "/images/rev3.jpg",
    "/images/rev4.jpg",
    "/images/rev5.jpg",
    "/images/rev6.jpg",
  ];
  
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  
  // Calculate pairs (e.g. 6 images = 3 pairs)
  const totalPairs = Math.ceil(reviewImages.length / 2);

  useEffect(() => {
    const id = setInterval(() => {
      setTestimonialSlide((i) => (i + 1) % totalPairs);
    }, 5000); 
    return () => clearInterval(id);
  }, [totalPairs]);

  return (
    <section
      id="testimonials"
      className="py-32 bg-slate-950 relative overflow-hidden"
    >
      {/* Customer Review Photos Background Gallery */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 p-6 md:p-12">
          {[
            { num: 1, delay: 0 },
            { num: 2, delay: 100 },
            { num: 3, delay: 200 },
            { num: 4, delay: 300 },
            { num: 5, delay: 400 },
            { num: 6, delay: 500 },
          ].map(({ num, delay }) => (
            <div
              key={num}
              className="relative aspect-square rounded-xl overflow-hidden opacity-15 hover:opacity-30 transition-opacity duration-500"
              style={{
                animation: `float ${6 + num}s ease-in-out infinite`,
                animationDelay: `${delay}ms`,
              }}
            >
              <img
                src={`/images/rev${num}.jpg`}
                alt={`Customer review ${num}`}
                className="w-full h-full object-cover blur-md hover:blur-sm transition-all duration-700 scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950 z-[2]"></div>

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

        {/* Dual Image Slider Container */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/40 h-[380px] sm:h-[420px] md:h-[520px]">
          {[...Array(totalPairs)].map((_, pairIndex) => {
            const img1 = reviewImages[pairIndex * 2];
            const img2 = reviewImages[pairIndex * 2 + 1];

            return (
              <div
                key={pairIndex}
                className="absolute inset-0 w-full h-full transition-opacity duration-[1200ms] ease-in-out flex flex-col md:flex-row"
                style={{
                  opacity: testimonialSlide === pairIndex ? 1 : 0,
                  zIndex: testimonialSlide === pairIndex ? 10 : 0,
                }}
              >
                {/* Left Image Section */}
                <div className="relative w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-white/10 overflow-hidden group">
                  <img
                    src={img1}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-40"
                  />
                  <img
                    src={img1}
                    alt="Review left"
                    className="absolute inset-0 w-full h-full object-contain z-10 p-4 md:p-8 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Right Image Section */}
                {img2 && (
                  <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden group">
                    <img
                      src={img2}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-40"
                    />
                    <img
                      src={img2}
                      alt="Review right"
                      className="absolute inset-0 w-full h-full object-contain z-10 p-4 md:p-8 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
              </div>
            );
          })}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent z-20 pointer-events-none"></div>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {[...Array(totalPairs)].map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  testimonialSlide === i
                    ? "w-8 bg-emerald-500"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;