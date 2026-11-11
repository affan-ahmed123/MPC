import React from 'react';
import { useCart } from '../context/CartContext';
import { Clock, MapPin, Phone, MessageCircle, Bike } from 'lucide-react';

export default function LocationHours() {
  const { shopConfig } = useCart();

  return (
    <section id="location-hours" className="py-10 sm:py-20 bg-transparent border-t border-gray-800 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full max-w-full">

        <div className="bg-[#121622]/90 backdrop-blur-md border border-[#e6b343]/30 rounded-2xl sm:rounded-3xl p-3.5 sm:p-10 shadow-2xl overflow-hidden relative w-full max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center w-full max-w-full">

            {/* Info Column */}
            <div className="space-y-4 sm:space-y-6 w-full max-w-full">
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-[#e6b343] uppercase tracking-wider">
                  Contact, Timings & Location
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight mt-1">
                  Visit Us or Order <span className="gold-text-gradient">Right to Your Door</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2">
                  Delicious Food • Premium Taste • Your Choice
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm w-full max-w-full">

                <div className="flex items-start gap-3 p-3 bg-[#0a0d14] rounded-xl border border-gray-800 min-w-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <strong className="text-white block font-bold text-xs sm:text-sm">Operating Hours:</strong>
                    <span className="text-gray-300 font-mono text-[11px] sm:text-xs">{shopConfig.timings}</span>
                    <span className="text-[10px] sm:text-[11px] text-emerald-400 block mt-0.5">Open 7 Days a Week</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#0a0d14] rounded-xl border border-gray-800 min-w-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <strong className="text-white block font-bold text-xs sm:text-sm">Store Address:</strong>
                    <span className="text-gray-300 text-xs sm:text-sm">{shopConfig.address}, {shopConfig.city}</span>
                    <span className="text-[10px] sm:text-[11px] text-gray-400 block mt-0.5">Fast home delivery directly to your door</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#0a0d14] rounded-xl border border-gray-800 min-w-0">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <strong className="text-white block font-bold text-xs sm:text-sm">WhatsApp Hotline:</strong>
                    <span className="text-white font-mono text-xs sm:text-sm font-bold">+{shopConfig.whatsappNumber}</span>
                    <span className="text-[10px] sm:text-[11px] text-gray-400 block mt-0.5">One-click online ordering and receipt</span>
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1 w-full">
                <a
                  href={`https://wa.me/${shopConfig.whatsappNumber}?text=${encodeURIComponent("Hello! I would like to inquire about placing an order.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl font-bold text-black bg-[#25D366] hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg shadow-emerald-600/20 min-w-0"
                >
                  <MessageCircle className="w-4 h-4 fill-current flex-shrink-0" />
                  <span className="truncate">Chat on WhatsApp</span>
                </a>

                <a
                  href={`tel:${shopConfig.phone}`}
                  className="w-full sm:w-auto py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl font-bold text-white bg-gray-800 hover:bg-gray-700 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm border border-gray-700 min-w-0"
                >
                  <Phone className="w-4 h-4 text-[#e6b343] flex-shrink-0" />
                  <span className="truncate">Call: {shopConfig.phone}</span>
                </a>
              </div>
            </div>

            {/* Visual Card / Highlights */}
            <div className="bg-[#0b0e14] rounded-xl sm:rounded-2xl border border-gray-800 p-4 sm:p-6 flex flex-col justify-center text-center space-y-3 sm:space-y-4 w-full max-w-full overflow-hidden">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[#e6b343] flex items-center justify-center mx-auto flex-shrink-0">
                <Bike className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.8]" />
              </div>

              <h4 className="text-base sm:text-xl font-bold font-serif text-white">
                Piping Hot & Fresh to Your Doorstep
              </h4>

              <p className="text-[11px] sm:text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                Delivered in specialized thermal insulated food containers to preserve authentic dum heat, aroma, and freshness.
              </p>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1 w-full max-w-full">
                <div className="p-2 sm:p-3 bg-[#131722] rounded-lg sm:rounded-xl border border-gray-800 min-w-0 overflow-hidden">
                  <span className="text-[10px] sm:text-[11px] text-gray-400 block truncate">Average Delivery</span>
                  <span className="text-xs sm:text-sm font-bold text-amber-400 block truncate">15 - 30 Mins</span>
                </div>
                <div className="p-2 sm:p-3 bg-[#131722] rounded-lg sm:rounded-xl border border-gray-800 min-w-0 overflow-hidden">
                  <span className="text-[10px] sm:text-[11px] text-gray-400 block truncate">Free Delivery</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-400 block truncate">Orders Rs. 3000+</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
