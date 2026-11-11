import React from 'react';
import { useCart } from '../context/CartContext';
import { MessageCircle, Phone, MapPin, FileText, Settings } from 'lucide-react';

export default function Footer() {
  const { shopConfig, setActiveModal, setModalData } = useCart();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openCard = (type) => {
    setModalData({ card: type });
    setActiveModal('originalMenu');
  };

  return (
    <footer className="bg-[#07090d]/95 backdrop-blur-md text-gray-400 border-t border-[#e6b343]/20 pt-10 pb-20 sm:pb-12 text-xs relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 w-full max-w-full">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-gray-800 w-full max-w-full">

          {/* Brand Col with the Official MPC Logo */}
          <div className="md:col-span-2 space-y-3 min-w-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-amber-400 to-amber-700 shadow-md flex-shrink-0">
                <img
                  src="/images/mpc-logo.png"
                  alt="MPC Logo"
                  className="w-full h-full object-contain rounded-[10px] bg-black/80 p-0.5"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-bold text-white font-serif tracking-wider truncate">
                  MADINA PAKWAN CENTER
                </h4>
                <p className="text-[10px] sm:text-xs text-[#e6b343] font-semibold uppercase tracking-wider truncate">
                  Authentic Karachi Taste & Flavors
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-300 max-w-md leading-relaxed">
              {shopConfig.slogan} — Traditional aroma, slow-steamed chicken dum biryani, beef yakhni pulao, and pure dairy Artisanal Ice Cream.
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <button
                onClick={() => openCard('biryani')}
                className="px-2.5 py-1.5 rounded-lg bg-gray-800 hover:bg-[#e6b343] hover:text-black text-gray-300 font-semibold transition-colors flex items-center gap-1 text-[11px]"
              >
                <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Biryani Flyer</span>
              </button>
              <button
                onClick={() => openCard('icecream')}
                className="px-2.5 py-1.5 rounded-lg bg-gray-800 hover:bg-[#e6b343] hover:text-black text-gray-300 font-semibold transition-colors flex items-center gap-1 text-[11px]"
              >
                <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Ice Cream Flyer</span>
              </button>
              <button
                onClick={() => setActiveModal('settings')}
                className="p-1.5 rounded-lg bg-gray-800 hover:bg-white/10 text-gray-400 hover:text-amber-300 transition-colors flex-shrink-0"
                title="Configure Shop Phone"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Menu Categories
            </h5>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => scrollTo('biryani-section')} className="hover:text-amber-400 transition-colors">
                  🍗 Special Chicken Biryani
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('biryani-section')} className="hover:text-amber-400 transition-colors">
                  🥩 Special Beef Yakhni Pulao
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('biryani-section')} className="hover:text-amber-400 transition-colors">
                  🥔 Sada Biryani
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('biryani-section')} className="hover:text-amber-400 transition-colors">
                  🍚 Sada Pulao
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('icecream-section')} className="hover:text-amber-400 transition-colors">
                  🍨 Ice Cream (11 Flavors)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Direct Contact
            </h5>
            <div className="space-y-2 text-xs">
              <a
                href={`https://wa.me/${shopConfig.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#25D366] hover:underline"
              >
                <MessageCircle className="w-4 h-4 fill-current flex-shrink-0" />
                <span className="font-mono">+{shopConfig.whatsappNumber}</span>
              </a>
              <a
                href={`tel:${shopConfig.phone}`}
                className="flex items-center gap-2 text-gray-300 hover:text-white"
              >
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-mono">{shopConfig.phone}</span>
              </a>
              <div className="flex items-start gap-2 text-gray-400 pt-1">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{shopConfig.address}, {shopConfig.city}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Slogan & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-gray-500">
          <p className="text-amber-300/80">
            {shopConfig.subSlogan}
          </p>
          <p>
            © {new Date().getFullYear()} Madina Pakwan Center. All rights reserved.
          </p>
        </div>

      </div>

      {/* Floating Sticky Mobile WhatsApp / Cart Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0c0f16]/95 backdrop-blur-md border-t border-[#e6b343]/30 p-2 flex items-center justify-between gap-2 shadow-2xl w-full max-w-full overflow-hidden">
        <a
          href={`https://wa.me/${shopConfig.whatsappNumber}?text=${encodeURIComponent("Hello! I want to order from Madina Pakwan Center.")}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2 px-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow min-w-0"
        >
          <MessageCircle className="w-4 h-4 fill-current flex-shrink-0" />
          <span className="truncate">Order on WhatsApp</span>
        </a>

        <button
          onClick={() => {
            const el = document.getElementById('menu');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="py-2 px-3 bg-gray-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 flex-shrink-0"
        >
          <span>View Menu</span>
        </button>
      </div>

      {/* Floating Desktop WhatsApp Button */}
      <a
        href={`https://wa.me/${shopConfig.whatsappNumber}?text=${encodeURIComponent("Hello! I would like to order from Madina Pakwan Center.")}`}
        target="_blank"
        rel="noreferrer"
        className="hidden sm:flex fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-[#25D366] text-black items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-200 group"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="absolute right-16 bg-[#121622] text-white border border-[#e6b343]/30 text-xs px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat on WhatsApp Now
        </span>
      </a>
    </footer>
  );
}
