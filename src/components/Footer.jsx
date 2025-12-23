import React from "react";
import { Sun, MapPin } from "lucide-react";

const Footer = () => {
  return (
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
              Engineering the future of distributed energy. We are committed to
              a world powered by clean, renewable intelligence.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              {["About", "Careers", "Impact", "Press"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              {["Privacy", "Terms", "Warranty", "Sitemap"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white font-bold mb-6">Visit HQ</h4>
            <div className="rounded-xl overflow-hidden h-40 border border-slate-800 bg-slate-900 relative group">
              <iframe
                src="https://www.google.com/maps?q=20.297700,85.870771&hl=en&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                title="Smart Home Solar System Location"
              ></iframe>
            </div>
            <p className="mt-4 text-xs text-slate-500 flex items-start gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-emerald-500" />
              Plot No.: 3761/5453/947, Satyabhama Niwas, GGP Enclave, Pandara,
              Bhubaneswar - 751 025
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm">
            © 2025 Smart Home Solar Systems. All rights reserved.
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
  );
};

export default Footer;
