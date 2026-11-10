import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { Search, Sparkles, Plus, ShoppingBag, Flame, FileText, IceCream, Award, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MenuSection() {
  const { cartItems, addToCart, setActiveModal, setModalData, activeCategory, setActiveCategory } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScoopMode, setSelectedScoopMode] = useState('1-scoop'); // '1-scoop' or '2-scoop'

  // Count how many scoops of this flavor are currently in the cart
  const getFlavorInCart = (flavorName) => {
    return (cartItems || [])
      .filter(item => item.flavor === flavorName)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  // Filter items
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      item.name.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      (item.flavors && item.flavors.some(f => f.name.toLowerCase().includes(query) || (f.desc && f.desc.toLowerCase().includes(query))));

    return matchesCategory && matchesSearch;
  });

  const handleOpenPortion = (item) => {
    setModalData(item);
    setActiveModal('portion');
  };

  const handleQuickAddIceCream = (item, flavor, scoopType) => {
    const scoopPortion = item.portions.find(p => p.id === scoopType) || item.portions[0];
    addToCart(item, scoopPortion, flavor, 1);
  };

  const handleOpenFlyer = (card) => {
    setModalData({ card });
    setActiveModal('originalMenu');
  };

  const iceCreamItem = MENU_ITEMS.find(i => i.isIceCream);

  return (
    <section id="menu" className="py-8 sm:py-20 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-12 border-b border-amber-500/20 pb-5 sm:pb-6 w-full max-w-full"
      >
        <div>
          <div className="flex items-center gap-1.5 text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Madina Biryani & Pakwan Center Official Menu</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
            Authentic Biryani, Sides & <span className="gold-text-gradient">Ice Cream Menu</span>
          </h2>
          <p className="text-[11px] sm:text-sm text-gray-300 mt-1">
            All prices, portion sizes, and flavors strictly match the official printed flyers.
          </p>
        </div>

        {/* View Original Cards shortcut buttons */}
        <div className="grid grid-cols-2 gap-2 w-full md:w-auto flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleOpenFlyer('biryani')}
            className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-[#e6b343] hover:bg-[#e6b343] hover:text-black font-semibold text-[11px] sm:text-xs transition-all shadow min-w-0"
          >
            <FileText className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Biryani Flyer</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleOpenFlyer('icecream')}
            className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-[#e6b343] hover:text-black font-semibold text-[11px] sm:text-xs transition-all shadow min-w-0"
          >
            <FileText className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Ice Cream Flyer</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Search Bar & Category Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center mb-8 w-full max-w-full min-w-0 overflow-hidden">

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full max-w-full pb-2 sm:pb-0 scrollbar-none min-w-0 flex-1">
          {MENU_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 ${isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-500/25 ring-1 ring-amber-300'
                    : 'bg-[#121622]/85 text-gray-300 hover:text-white hover:bg-[#1a202c] border border-amber-500/20'
                  }`}
              >
                <span>{cat.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72 flex-shrink-0">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-amber-400/70" />
          <input
            type="text"
            placeholder="Search Biryani, Sides, Ice Cream..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121622]/90 border border-amber-500/25 rounded-xl pl-9 pr-4 py-1.5 sm:py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#e6b343] transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1.5 text-xs text-gray-400 hover:text-white"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Menu Cards Container with Seamless Order */}
      <div className="space-y-16">

        {/* ========================================================
            1. BIRYANI & PULAO SECTION
           ======================================================== */}
        {(activeCategory === 'all' || activeCategory === 'biryani') && (
          <div id="biryani-section">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-6 bg-[#e6b343] rounded-full shadow-sm shadow-amber-400" />
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
                Biryani & Pulao Menu
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-6">
              {filteredItems.filter(item => item.category === 'biryani').map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-[#121622]/85 backdrop-blur-md border border-amber-500/20 hover:border-amber-400/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group min-w-0 w-full"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="h-28 sm:h-52 relative overflow-hidden bg-black">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/30 to-transparent" />

                      {item.badge && (
                        <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-amber-500 text-black text-[8px] sm:text-[11px] font-bold px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-1">
                          <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                          <span className="truncate max-w-[65px] sm:max-w-none">{item.badge}</span>
                        </div>
                      )}

                      <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-black/75 backdrop-blur-sm border border-white/10 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-xs text-amber-300 font-mono">
                        {item.spiceLevel}
                      </div>

                      <div className="absolute bottom-1.5 left-2 right-2 sm:bottom-3 sm:left-4 sm:right-4 flex items-end justify-between gap-1">
                        <div className="min-w-0 pr-1">
                          <h4 className="text-xs sm:text-xl font-bold font-serif text-white leading-tight truncate sm:whitespace-normal">
                            {item.name}
                          </h4>
                          <span className="text-[10px] sm:text-xs text-gray-300 hidden sm:block">{item.serves}</span>
                        </div>
                        <div className="text-right bg-black/85 backdrop-blur-md px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-amber-500/30 flex-shrink-0">
                          <span className="text-[7px] sm:text-[10px] text-gray-400 block leading-tight">From</span>
                          <span className="text-[11px] sm:text-base font-extrabold text-[#e6b343]">Rs. {item.startingPrice}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="p-2 sm:p-5">
                      <p className="text-[10px] sm:text-xs text-gray-300 leading-tight mb-2 sm:mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Mobile Portions Summary Pill (Keeps 2-column mobile cards clean, beautiful and never clipped) */}
                      <div className="md:hidden bg-[#0b0e14]/90 rounded-xl p-1.5 border border-amber-500/20 mb-2 text-center">
                        <span className="text-[9px] text-amber-300 font-semibold block">{item.portions.length} Serving Sizes</span>
                        <span className="text-[11px] font-black text-[#e6b343] font-mono">Rs. {item.startingPrice} – {item.portions[item.portions.length - 1].price}</span>
                      </div>

                      {/* Desktop Full Portions Breakdown Table (Mirroring the Printed Menu Table) */}
                      <div className="hidden md:block bg-[#0b0e14]/90 rounded-xl p-3 border border-amber-500/15 space-y-2 mb-4">
                        <div className="text-[11px] font-bold text-amber-400/90 uppercase tracking-wider flex items-center justify-between pb-1 border-b border-gray-800">
                          <span>Portion</span>
                          <span>Price</span>
                        </div>

                        <div className="space-y-1.5 text-xs">
                          {item.portions.map((portion) => (
                            <div
                              key={portion.id}
                              className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <div className="min-w-0 pr-1">
                                <span className="font-semibold text-white truncate block">{portion.name}</span>
                                {portion.piece && (
                                  <span className="text-[11px] text-amber-300/80">{portion.piece}</span>
                                )}
                              </div>
                              <span className="font-extrabold text-[#e6b343] font-mono text-sm flex-shrink-0">Rs. {portion.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Button */}
                  <div className="p-2 sm:p-5 pt-0">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleOpenPortion(item)}
                      className="w-full py-2 sm:py-3 px-1.5 sm:px-4 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 shadow-md shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-1 sm:gap-2 text-[11px] sm:text-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">Select Size</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            2. RAITA, FRESH SALAD & COLD DRINKS SECTION 
            (Moved ABOVE Ice Cream section as explicitly requested!)
           ======================================================== */}
        {(activeCategory === 'all' || activeCategory === 'extras') && (
          <div id="extras-section" className="pt-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-6 bg-[#e6b343] rounded-full shadow-sm shadow-amber-400" />
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
                Raita, Fresh Salad & Cold Drinks
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-5 w-full max-w-full">
              {filteredItems.filter(item => item.category === 'extras').map((item, idx, arr) => {
                const isSingleSpan = arr.length % 2 !== 0 && idx === arr.length - 1;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.1 }}
                    whileHover={{ y: -4 }}
                    className={`bg-[#121622]/85 backdrop-blur-md border border-amber-500/20 hover:border-amber-400/50 rounded-xl sm:rounded-2xl p-2 sm:p-4 flex flex-col justify-between transition-all shadow-xl min-w-0 w-full overflow-hidden ${
                      isSingleSpan ? 'col-span-2 md:col-span-1' : ''
                    }`}
                  >
                    <div className={`flex ${isSingleSpan ? 'flex-row items-center' : 'flex-col sm:flex-row'} gap-2 sm:gap-3 mb-2 sm:mb-3`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`${isSingleSpan ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-full sm:w-20 h-22 sm:h-20'} rounded-lg sm:rounded-xl object-cover border border-amber-500/20 flex-shrink-0`}
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs sm:text-sm text-white leading-tight truncate sm:whitespace-normal">{item.name}</h4>
                        <p className="text-[10px] sm:text-[11px] text-gray-300 mt-1 line-clamp-2">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-gray-800">
                      <div>
                        <span className="text-xs sm:text-base font-extrabold text-[#e6b343]">
                          Rs. {item.price || item.startingPrice}
                        </span>
                        {item.portionLabel && (
                          <span className="text-[9px] sm:text-[10px] text-gray-400 block truncate">{item.portionLabel}</span>
                        )}
                      </div>

                      {item.hasPortions ? (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleOpenPortion(item)}
                          className="py-1.5 px-2.5 sm:px-3 rounded-lg bg-gray-800 hover:bg-[#e6b343] hover:text-black text-[11px] sm:text-xs font-bold transition-all text-gray-200 text-center flex-shrink-0"
                        >
                          Select Size
                        </motion.button>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(item, null, null, 1)}
                          className="py-1.5 px-2.5 sm:px-3.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-black text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 shadow shadow-amber-500/20 flex-shrink-0"
                        >
                          <Plus className="w-3 h-3 stroke-[3]" />
                          <span>Add</span>
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            3. ENHANCED ARTISANAL ICE CREAM MENU SECTION 
            (Dessert positioned at the end of the meal!)
           ======================================================== */}
        {(activeCategory === 'all' || activeCategory === 'icecream') && iceCreamItem && (
          <div id="icecream-section" className="pt-2">

            {/* Ice Cream Container with Transparent Royal Pakwan Styling */}
            <div className="bg-[#10141e]/80 backdrop-blur-md border border-amber-500/30 rounded-2xl sm:rounded-3xl p-2.5 sm:p-8 relative overflow-hidden shadow-2xl">

              {/* Subtle Ambient Gold Glow matching background */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header Box */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-amber-500/20 relative z-10">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#e6b343] text-xs font-bold uppercase tracking-wider">
                    <IceCream className="w-3.5 h-3.5" />
                    <span>Madina Pakwan Center</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
                    Artisanal <span className="gold-text-gradient">Ice Cream Menu</span>
                  </h3>
                  <div className="text-xs sm:text-base text-amber-300 font-serif font-bold">
                    Rich Flavors • Creamy Delight • Pure Happiness
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                    The ultimate royal dessert after Biryani! 100% pure thick dairy cream, authentic ingredients, and 11 signature handcrafted flavors as per the official menu card.
                  </p>
                </div>

                {/* Scoop Size Selector & Price Badges */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full lg:w-auto">

                  {/* Single Scoop Toggle */}
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedScoopMode('1-scoop')}
                    className={`p-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl border text-center transition-all ${selectedScoopMode === '1-scoop'
                        ? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400'
                        : 'border-gray-800 bg-[#121622]/90 text-gray-400 hover:border-gray-700'
                      }`}
                  >
                    <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-300">Single Scoop</div>
                    <div className="text-base sm:text-xl font-extrabold text-[#e6b343] mt-0.5">Rs. 120</div>
                    <div className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">1 Fresh Scoop</div>
                  </motion.button>

                  {/* Double Scoop Toggle */}
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedScoopMode('2-scoop')}
                    className={`p-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl border text-center transition-all ${selectedScoopMode === '2-scoop'
                        ? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400'
                        : 'border-gray-800 bg-[#121622]/90 text-gray-400 hover:border-gray-700'
                      }`}
                  >
                    <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-300">Double Scoop</div>
                    <div className="text-base sm:text-xl font-extrabold text-[#e6b343] mt-0.5">Rs. 220</div>
                    <div className="text-[9px] sm:text-[10px] text-amber-300 font-bold mt-0.5">Save Rs. 20 🔥</div>
                  </motion.button>

                </div>
              </div>

              {/* Active Scoop Quick Selector Hint */}
              <div className="py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-300 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>
                    Currently selected: <strong className="text-[#e6b343] font-bold">{selectedScoopMode === '1-scoop' ? '1 Scoop (Rs. 120)' : 'Double Scoop (Rs. 220)'}</strong>
                  </span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-gray-400 hidden sm:block">
                  Click 1 Scoop or Double Scoop below to instantly add to your cart
                </div>
              </div>

              {/* 11 Enhanced Flavors Grid with Cup Format & Direct Scoop Buttons (2 Cards Per Row on Mobile) */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 pt-2 relative z-10">
                {iceCreamItem.flavors.map((flavor, idx) => {
                  const inCartCount = getFlavorInCart(flavor.name);

                  return (
                    <motion.div
                      key={flavor.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="bg-[#121622]/95 border border-amber-500/20 hover:border-amber-400/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-xl min-w-0 w-full"
                    >
                      <div>
                        {/* Flavor Image in Cup Format with Overlays */}
                        <div className="h-28 sm:h-44 relative overflow-hidden bg-black">
                          <img
                            src={flavor.image}
                            alt={`${flavor.name} Ice Cream Cup`}
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/35 to-transparent" />

                          {/* Top Left: Tag Badge */}
                          {flavor.tag && (
                            <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 bg-black/80 backdrop-blur-md border border-white/15 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow">
                              {flavor.tag}
                            </div>
                          )}

                          {/* Top Right: Cup Format Badge */}
                          <div className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 bg-black/85 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[8px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                            <span>🍨 Cup</span>
                          </div>

                          {/* Bottom Title over image */}
                          <div className="absolute bottom-1.5 left-2 right-2 sm:bottom-2.5 sm:left-3 sm:right-3 flex items-center justify-between gap-1">
                            <h4 className="text-xs sm:text-base font-bold text-white leading-tight drop-shadow-md truncate">
                              {flavor.name}
                            </h4>
                            <span
                              className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full shadow-md border-2 border-white/60 flex-shrink-0"
                              style={{ backgroundColor: flavor.color }}
                              title={flavor.name}
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div className="p-2 sm:p-3.5 pb-1 sm:pb-2">
                          <p className="text-[10px] sm:text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
                            {flavor.desc}
                          </p>
                        </div>
                      </div>

                      {/* Direct Single Scoop & Double Scoop Buttons with Rates */}
                      <div className="p-1.5 sm:p-3.5 pt-1 sm:pt-2 border-t border-gray-800/80 space-y-1 sm:space-y-2">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                          {/* 1 Scoop Button */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickAddIceCream(iceCreamItem, flavor, '1-scoop')}
                            className="py-1.5 sm:py-2.5 px-1.5 sm:px-2 rounded-lg sm:rounded-xl bg-[#181d2a] hover:bg-amber-500/20 text-white hover:text-amber-300 border border-amber-500/30 hover:border-amber-400 font-bold transition-all flex items-center justify-between sm:flex-col sm:justify-center text-center shadow-sm group/btn min-w-0"
                            title="Add 1 Scoop Cup for Rs. 120"
                          >
                            <span className="text-[9px] sm:text-[11px] font-bold text-gray-200 group-hover/btn:text-amber-300 flex items-center gap-0.5 truncate">
                              <Plus className="w-2.5 h-2.5 stroke-[3] text-amber-400 flex-shrink-0" />
                              1 Scoop
                            </span>
                            <span className="text-[10px] sm:text-sm font-black text-[#e6b343] font-mono flex-shrink-0">
                              Rs. 120
                            </span>
                          </motion.button>

                          {/* Double Scoop Button */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickAddIceCream(iceCreamItem, flavor, '2-scoop')}
                            className="py-1.5 sm:py-2.5 px-1.5 sm:px-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-black font-extrabold transition-all flex items-center justify-between sm:flex-col sm:justify-center text-center shadow-md shadow-amber-500/20 border border-amber-300 min-w-0"
                            title="Add Double Scoop Cup for Rs. 220 (Save Rs. 20)"
                          >
                            <span className="text-[9px] sm:text-[11px] font-black flex items-center gap-0.5 text-black truncate">
                              <Plus className="w-2.5 h-2.5 stroke-[3] flex-shrink-0" />
                              Double
                            </span>
                            <div className="flex items-center gap-0.5 flex-shrink-0">
                              <span className="text-[10px] sm:text-sm font-black font-mono text-black">
                                Rs. 220
                              </span>
                              <span className="text-[7px] bg-black text-amber-300 font-extrabold px-0.5 rounded">
                                -20
                              </span>
                            </div>
                          </motion.button>
                        </div>

                        {/* In-Cart Live Feedback */}
                        {inCartCount > 0 && (
                          <div className="text-[10px] text-emerald-400 font-bold text-center py-0.5 flex items-center justify-center gap-1 bg-emerald-500/10 rounded-lg border border-emerald-500/25">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{inCartCount} in bag</span>
                          </div>
                        )}

                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Assurance Strip inside Ice Cream Section */}
              <div className="mt-8 pt-5 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-300 relative z-10">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>100% Pure Fresh Dairy Milk & Natural Ingredients</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Served in Insulated Dessert Cups with Spoons</span>
                </div>
                <button
                  onClick={() => handleOpenFlyer('icecream')}
                  className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Original Ice Cream Flyer</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
