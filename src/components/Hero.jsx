import React from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, MessageCircle, ArrowRight, Flame, Utensils, Bike } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const { shopConfig } = useCart();

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-24 w-full max-w-full">
      {/* Ambient Lighting Gradients matching warm restaurant background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] max-w-full h-[350px] bg-gradient-to-b from-amber-500/20 via-amber-600/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-72 h-72 bg-amber-700/15 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Container */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 relative z-10 w-full max-w-full">

        <div className="flex flex-col items-center justify-center text-center mb-6">

          {/* Slogan Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-[#e6b343] text-xs font-semibold uppercase tracking-wider mb-3 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Delicious Taste with Quality, Always with You</span>
          </motion.div>

          {/* Mosque Dome Silhouette Vector Motif */}
          <div className="w-48 h-8 opacity-75 mb-2 flex items-center justify-center text-amber-400/70">
            <svg viewBox="0 0 200 40" fill="currentColor" className="w-full h-full">
              <path d="M100 0 C95 10 90 20 70 25 L70 40 L130 40 L130 25 C110 20 105 10 100 0 Z" opacity="0.6" />
              <path d="M40 10 L45 15 L45 40 L35 40 L35 15 Z" opacity="0.4" />
              <path d="M160 10 L165 15 L165 40 L155 40 L155 15 Z" opacity="0.4" />
              <circle cx="100" cy="5" r="2" fill="#ffd875" />
            </svg>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif text-white tracking-tight leading-tight max-w-4xl"
          >
            MADINA <span className="gold-text-gradient">PAKWAN CENTER</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-2xl text-[#fbe29d] font-serif font-bold mt-2 mb-4 tracking-wide"
          >
            Delicious Food • Premium Taste • Your Choice
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed"
          >
            The authentic taste of Karachi dum biryani! Fresh aromatic chicken biryani, tender beef yakhni pulao, rich <strong className="text-amber-300">Nali Biryani</strong>, refreshing sides, and chilled drinks delivered directly to your doorstep.
          </motion.p>
        </div>

        {/* Hero Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 mb-10 w-full max-w-2xl mx-auto"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={scrollToMenu}
            className="w-full sm:w-auto py-3 sm:py-3.5 px-5 sm:px-6 rounded-xl font-extrabold text-black bg-gradient-to-r from-amber-400 via-[#ffd875] to-amber-500 hover:brightness-110 shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 text-xs sm:text-base min-w-0"
          >
            <Utensils className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="truncate">Explore Menu & Order Online</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ml-0.5" />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href={`https://wa.me/${shopConfig.whatsappNumber}?text=${encodeURIComponent("Hello! I would like to place an order from Madina Pakwan Center.")}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto py-3 sm:py-3.5 px-5 sm:px-6 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-2 text-xs sm:text-base shadow-lg shadow-emerald-600/25 min-w-0"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current flex-shrink-0" />
            <span className="truncate">WhatsApp: {shopConfig.phone}</span>
          </motion.a>
        </motion.div>

        {/* 4 Feature Pill Cards (2-column on mobile, zero overflow) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 max-w-5xl mx-auto w-full">

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#121622]/85 backdrop-blur-md border border-amber-500/20 hover:border-amber-400/50 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center transition-all group shadow-xl min-w-0 overflow-hidden"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center justify-center mx-auto mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform flex-shrink-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h4 className="font-bold text-white text-xs sm:text-sm truncate">Chicken Biryani</h4>
            <p className="text-[11px] sm:text-xs text-amber-400 font-extrabold mt-0.5">Starts Rs. 170</p>
            <p className="text-[9px] sm:text-[11px] text-gray-300 mt-0.5 truncate">Pao to 1 KG Family Pack</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#121622]/85 backdrop-blur-md border border-amber-500/20 hover:border-amber-400/50 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center transition-all group shadow-xl min-w-0 overflow-hidden"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center justify-center mx-auto mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform flex-shrink-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h4 className="font-bold text-white text-xs sm:text-sm truncate">Beef Yakhni Pulao</h4>
            <p className="text-[11px] sm:text-xs text-amber-400 font-extrabold mt-0.5">Starts Rs. 200</p>
            <p className="text-[9px] sm:text-[11px] text-gray-300 mt-0.5 truncate">Rich Stock & Tender Beef</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#121622]/85 backdrop-blur-md border border-amber-500/20 hover:border-amber-400/50 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center transition-all group shadow-xl min-w-0 overflow-hidden"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center justify-center mx-auto mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform flex-shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h4 className="font-bold text-white text-xs sm:text-sm truncate">Nali Biryani</h4>
            <p className="text-[11px] sm:text-xs text-amber-400 font-extrabold mt-0.5">Starts Rs. 200</p>
            <p className="text-[9px] sm:text-[11px] text-gray-300 mt-0.5 truncate">Royal Marrow & Rich Masala</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#121622]/85 backdrop-blur-md border border-amber-500/20 hover:border-amber-400/50 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center transition-all group shadow-xl min-w-0 overflow-hidden"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center mx-auto mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform flex-shrink-0">
              <Bike className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h4 className="font-bold text-white text-xs sm:text-sm truncate">Free Delivery</h4>
            <p className="text-[11px] sm:text-xs text-emerald-400 font-extrabold mt-0.5">On Orders Rs. 3000+</p>
            <p className="text-[9px] sm:text-[11px] text-gray-300 mt-0.5 truncate">Delivery from Rs. 70 (Nearby)</p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
