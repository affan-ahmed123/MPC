import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { totalItemCount, totalAmount, setIsCartOpen, setActiveCategory } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id, targetCategory = 'all') => {
    // 1. Close mobile drawer immediately
    setMobileMenuOpen(false);

    // 2. Ensure target category is active so element is rendered in the DOM
    if (setActiveCategory) {
      setActiveCategory(targetCategory);
    }

    // 3. Reliable scroll handler with fixed navbar offset
    const performScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const navOffset = window.innerWidth >= 640 ? 96 : 72;
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const targetTop = Math.max(0, rect.top + scrollTop - navOffset);

        try {
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
        } catch {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Execute immediately and after mobile drawer collapse animation
    requestAnimationFrame(performScroll);
    setTimeout(performScroll, 220);
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    if (setActiveCategory) setActiveCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 w-full backdrop-blur-xl bg-[#0a0d14]/95 border-b border-amber-500/25 shadow-2xl shadow-black/80"
      >
        {/* Top golden shimmer accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#e6b343] to-transparent opacity-80" />
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-[68px] sm:h-24 gap-2 min-w-0">

            {/* Logo & Brand Identity */}
            <div
              className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group select-none py-1 min-w-0 flex-1 overflow-hidden"
              onClick={handleLogoClick}
            >
              {/* Real MPC Logo Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-600 shadow-lg flex-shrink-0"
              >
                <img
                  src="/images/mpc-logo.png"
                  alt="Madina Pakwan Center"
                  className="w-full h-full object-contain rounded-[10px] sm:rounded-[14px] bg-[#0c0f16]"
                />
              </motion.div>

              <div className="flex flex-col justify-center min-w-0 flex-1 overflow-hidden pr-1 py-0.5">
                <span className="font-serif font-black text-xs sm:text-lg md:text-2xl text-white tracking-wide leading-snug truncate block">
                  MADINA <span className="gold-text-gradient">PAKWAN CENTER</span>
                </span>
                <span className="text-[9px] sm:text-xs text-amber-300/80 font-medium tracking-wide truncate block">
                  Delicious Taste with Quality, Always with You
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium flex-shrink-0">
              <button
                type="button"
                onClick={() => scrollTo('menu', 'all')}
                className="text-gray-300 hover:text-amber-400 transition-colors py-1 flex items-center gap-1.5"
              >
                <span>Full Menu</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('biryani-section', 'biryani')}
                className="text-gray-300 hover:text-amber-400 transition-colors py-1"
              >
                <span>Biryani & Pulao</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('salad-raita-section', 'salad-raita')}
                className="text-gray-300 hover:text-amber-400 transition-colors py-1"
              >
                <span>Salad & Raita</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('drinks-section', 'drinks')}
                className="text-gray-300 hover:text-amber-400 transition-colors py-1"
              >
                <span>Drinks</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('reviews')}
                className="text-gray-300 hover:text-amber-400 transition-colors py-1 flex items-center gap-1"
              >
                <span>Reviews</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('location-hours')}
                className="text-gray-300 hover:text-amber-400 transition-colors py-1"
              >
                <span>Contact</span>
              </button>
            </nav>

            {/* Cart / Checkout Bag Button & Mobile Menu */}
            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">

              {/* Bag-Type Checkout Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-1.5 py-1.5 px-2.5 sm:py-2.5 sm:px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-black font-extrabold shadow-md transition-all flex-shrink-0"
              >
                {/* Bag Icon with Live Count Badge */}
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 fill-black stroke-black" />
                  {totalItemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] sm:text-[10px] font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border border-black shadow">
                      {totalItemCount}
                    </span>
                  )}
                </div>

                {/* Text: Bag Checkout & Total Price */}
                <div className="flex flex-col text-left leading-none">
                  <span className="hidden sm:inline text-[10px] font-black uppercase tracking-wider text-black">
                    Checkout
                  </span>
                  <span className="text-[11px] sm:text-xs font-black text-black font-mono">
                    Rs. {totalAmount}
                  </span>
                </div>
              </motion.button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-[#141824] border border-gray-800 text-gray-200 hover:text-white flex-shrink-0"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0d1017]/98 border-b border-amber-500/30 px-3.5 py-3.5 space-y-2.5 overflow-hidden backdrop-blur-2xl shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => scrollTo('menu', 'all')}
                  className="p-2.5 rounded-xl bg-[#141824] hover:bg-amber-500/15 active:bg-amber-500/30 border border-gray-800 text-left text-white font-medium transition-all flex items-center gap-2"
                >
                  <span className="text-base">📋</span>
                  <span>Full Menu</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('biryani-section', 'biryani')}
                  className="p-2.5 rounded-xl bg-[#141824] hover:bg-amber-500/15 active:bg-amber-500/30 border border-gray-800 text-left text-white font-medium transition-all flex items-center gap-2"
                >
                  <span className="text-base">🍲</span>
                  <span>Biryani & Pulao</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('salad-raita-section', 'salad-raita')}
                  className="p-2.5 rounded-xl bg-[#141824] hover:bg-amber-500/15 active:bg-amber-500/30 border border-gray-800 text-left text-white font-medium transition-all flex items-center gap-2"
                >
                  <span className="text-base">🥗</span>
                  <span>Salad & Raita</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('drinks-section', 'drinks')}
                  className="p-2.5 rounded-xl bg-[#141824] hover:bg-amber-500/15 active:bg-amber-500/30 border border-gray-800 text-left text-white font-medium transition-all flex items-center gap-2"
                >
                  <span className="text-base">🥤</span>
                  <span>Cold Drinks</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('reviews')}
                  className="p-2.5 rounded-xl bg-[#141824] hover:bg-amber-500/15 active:bg-amber-500/30 border border-gray-800 text-left text-white font-medium transition-all flex items-center gap-2"
                >
                  <span className="text-base">⭐</span>
                  <span>Reviews & Form</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('location-hours')}
                  className="p-2.5 rounded-xl bg-[#141824] hover:bg-amber-500/15 active:bg-amber-500/30 border border-gray-800 text-left text-white font-medium transition-all flex items-center gap-2"
                >
                  <span className="text-base">📍</span>
                  <span>Contact & Hours</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('why-choose-us')}
                  className="p-2.5 rounded-xl bg-[#141824] hover:bg-amber-500/15 active:bg-amber-500/30 border border-gray-800 text-left text-white font-medium transition-all flex items-center gap-2"
                >
                  <span className="text-base">✨</span>
                  <span>Why Us</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to keep layout seamless behind fixed top navbar */}
      <div className="h-[68px] sm:h-24 w-full pointer-events-none" aria-hidden="true" />
    </>
  );
}
