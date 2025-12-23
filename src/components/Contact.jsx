import React from "react";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";

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

const InputGroup = ({ label, placeholder, type = "text", className = "" }) => (
  <div className={className}>
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

const SelectGroup = ({ label, options }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none text-slate-600">
        <option value="" disabled selected>Select a service...</option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none h-5 w-5" />
    </div>
  </div>
);

const TextAreaGroup = ({ label, placeholder }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      {label}
    </label>
    <textarea
      rows="4"
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 resize-none"
    ></textarea>
  </div>
);

const Contact = () => {
  const serviceOptions = [
    "On Grid Solar System",
    "Off Grid Solar System",
    "Hybrid Solar System",
    "Solar CCTV Street Light System",
    "Solar Water Pump System",
  ];

  return (
    <section id="contact" className="py-32 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200">
          <div className="grid lg:grid-cols-2">
            
            {/* Left Side - Contact Info */}
            <div className="p-12 lg:p-20 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6">
                  Let's power your future.
                </h3>

                <div className="mb-8 pb-8 border-b border-white/10">
                  <p className="text-white font-semibold text-lg mb-1">
                    Sangram K. Singh
                  </p>
                  <p className="text-slate-300 text-sm">Managing Partner</p>
                </div>

                <div className="space-y-8">
                  <ContactItem
                    icon={<Phone />}
                    title="Call Us"
                    detail="+91 75408 36582"
                  />
                  <ContactItem
                    icon={<Mail />}
                    title="Email"
                    detail="smarthomesolarsystem@gmail.com"
                  />
                  <ContactItem
                    icon={<MapPin />}
                    title="Visit"
                    detail="Plot No.: 3761/5453/947, Satyabhama Niwas, GGP Enclave, Pandara, Bhubaneswar - 751 025"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-12 lg:p-20 bg-white">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <InputGroup label="First Name" placeholder="John" />
                  <InputGroup label="Last Name" placeholder="Doe" />
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <InputGroup
                    label="Email Address"
                    placeholder="john@example.com"
                    type="email"
                  />
                  <InputGroup
                    label="Phone Number"
                    placeholder="+91 98765 43210"
                    type="tel"
                  />
                </div>

                {/* Address */}
                <InputGroup 
                  label="Address" 
                  placeholder="Street address, City, State, Zip" 
                />

                {/* Service Selection */}
                <SelectGroup 
                  label="Interested Service" 
                  options={serviceOptions} 
                />

                {/* Message Area */}
                <TextAreaGroup 
                  label="Message" 
                  placeholder="Tell us about your requirements..." 
                />

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
  );
};

export default Contact;