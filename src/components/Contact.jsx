import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

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

const Contact = () => {
  return (
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
                <p className="text-slate-300 mb-8 text-lg">
                  Get a custom solar design proposal including savings estimates
                  and 3D roof rendering.
                </p>

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
                    detail="smarthomesolarsystem@gamil.com"
                  />
                  <ContactItem
                    icon={<MapPin />}
                    title="Visit"
                    detail="Plot No.: 3761/5453/947, Satyabhama Niwas, GGP Enclave, Pandara, Bhubaneswar - 751 025"
                  />
                </div>
              </div>
            </div>

            <div className="p-12 lg:p-20 bg-white">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
  );
};

export default Contact;