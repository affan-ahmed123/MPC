import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Bike, MessageCircle, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    totalAmount,
    deliveryType,
    setDeliveryType,
    deliveryArea,
    setDeliveryArea,
    activeTier,
    deliveryTiers,
    freeDeliveryThreshold,
    isFreeDelivery,
    shopConfig,
    setActiveModal
  } = useCart();

  if (!isCartOpen) return null;

  const threshold = freeDeliveryThreshold || 3000;
  const remainingForFree = Math.max(0, threshold - subtotal);
  const freeProgress = Math.min(100, Math.round((subtotal / threshold) * 100));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop Fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />

        <div className="fixed inset-y-0 right-0 w-full sm:max-w-md flex z-50">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full h-full bg-[#0f131c]/95 backdrop-blur-xl border-l border-amber-500/30 text-gray-200 flex flex-col shadow-2xl overflow-hidden"
          >

            {/* Drawer Header */}
            <div className="p-3.5 sm:p-5 bg-[#0a0d14] border-b border-amber-500/20 flex items-center justify-between gap-2 min-w-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/15 border border-amber-500/35 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span className="truncate">Your Order Bag</span>
                    <span className="text-[10px] sm:text-xs bg-[#e6b343] text-black font-extrabold px-1.5 py-0.5 rounded-full flex-shrink-0">
                      {cartItems.reduce((acc, it) => acc + it.quantity, 0)}
                    </span>
                  </h2>
                  <p className="text-[10px] sm:text-xs text-gray-400 truncate">Madina Biryani & Pakwan Center</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-[11px] sm:text-xs text-gray-400 hover:text-red-400 px-1 py-1 transition-colors"
                    title="Clear all items"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 sm:p-2 rounded-xl bg-[#181d2a] text-gray-300 hover:text-white hover:bg-gray-700 transition-colors border border-gray-700/50"
                  aria-label="Close Bag"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Free Delivery Bar: Rs. 3000 Threshold */}
            <div className="bg-[#151a26] px-3.5 sm:px-4 py-2 border-b border-amber-500/15 min-w-0">
              <div className="flex items-center justify-between text-[11px] sm:text-xs mb-1 gap-2 min-w-0">
                <span className="text-gray-300 flex items-center gap-1 truncate min-w-0">
                  <Bike className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  {remainingForFree === 0 ? (
                    <span className="text-emerald-400 font-bold truncate">🎉 FREE Delivery Unlocked (Order Rs. 3000+)!</span>
                  ) : (
                    <span className="truncate">Add <strong className="text-amber-400 font-mono">Rs. {remainingForFree}</strong> for FREE Delivery</span>
                  )}
                </span>
                <span className="text-gray-400 font-mono text-[10px] sm:text-[11px] flex-shrink-0">{freeProgress}%</span>
              </div>
              <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${freeProgress}%` }}
                />
              </div>
            </div>

            {/* Delivery Area Selection (Nearby Rs. 70, Medium Distance Rs. 150, Long Distance Rs. 250) */}
            <div className="p-2 sm:p-2.5 bg-[#0e121b] border-b border-amber-500/20">
              <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1.5">
                <span className="flex items-center gap-1 font-semibold text-amber-300">
                  <MapPin className="w-3 h-3" />
                  Delivery Distance / Area:
                </span>
                {isFreeDelivery && (
                  <span className="text-emerald-400 font-bold">FREE DELIVERY UNLOCKED</span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-1">
                {deliveryTiers.map((tier) => {
                  const isSelected = deliveryArea === tier.id;
                  const label = tier.id === 'nearby' ? 'Nearby' : tier.id === 'medium' ? 'Medium Distance' : 'Long Distance';
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setDeliveryArea(tier.id)}
                      className={`py-1.5 px-1 rounded-lg border text-center transition-all flex flex-col items-center justify-center min-w-0 ${isSelected
                        ? 'border-amber-400 bg-amber-500/20 text-white ring-1 ring-amber-400'
                        : 'border-gray-800 bg-[#141824] text-gray-400 hover:border-gray-700'
                        }`}
                    >
                      <span className="text-[10px] sm:text-[11px] font-bold truncate block w-full">
                        {label}
                      </span>
                      <span className={`text-[9px] font-mono font-extrabold ${isFreeDelivery ? 'text-emerald-400' : 'text-[#e6b343]'}`}>
                        {isFreeDelivery ? 'FREE' : `Rs. ${tier.fee}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gray-800/80 border border-gray-700 flex items-center justify-center text-gray-500">
                    <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">Your Bag is Empty</h4>
                    <p className="text-xs text-gray-400 max-w-xs">
                      Please select your favorite Biryani, Nali Biryani, Pulao, Sides, or Chilled Drinks from our menu.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs hover:brightness-110 transition-colors shadow-lg shadow-amber-500/20"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="bg-[#151a26] border border-amber-500/15 rounded-xl p-3 flex gap-3 hover:border-amber-500/40 transition-all relative group shadow-md"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`w-16 h-16 rounded-lg flex-shrink-0 border border-gray-800 ${item.image?.includes('/images/') && !item.image?.includes('mpc') && !item.image?.includes('menu') && !item.image?.includes('restaurant')
                        ? 'object-contain bg-white p-1'
                        : 'object-cover'
                        }`}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-gray-500 hover:text-red-400 p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.portionName && (
                        <div className="text-[11px] text-amber-300 bg-amber-500/15 inline-block px-1.5 py-0.5 rounded mt-0.5">
                          {item.portionName}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-800">
                        <span className="text-sm font-extrabold text-amber-400">
                          Rs. {item.price * item.quantity}
                          <span className="text-[11px] font-normal text-gray-400 ml-1">
                            (@ Rs. {item.price})
                          </span>
                        </span>

                        <div className="flex items-center bg-[#0d1017] rounded-lg border border-gray-700 p-0.5">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, -1)}
                            className="w-6 h-6 rounded bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, 1)}
                            className="w-6 h-6 rounded bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 flex items-center justify-center text-black font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 bg-[#0a0d14] border-t border-amber-500/20 space-y-3">
                <div className="space-y-1.5 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-white">Rs. {subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges:</span>
                    <span className={deliveryFee === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                      {deliveryFee === 0 ? 'FREE DELIVERY (Orders Rs. 3000+)' : `Rs. ${deliveryFee} (${activeTier?.name || 'Standard'})`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-gray-800">
                    <span className="font-serif">Total Payable:</span>
                    <span className="text-[#e6b343] font-sans">Rs. {totalAmount}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveModal('checkout');
                  }}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-black bg-gradient-to-r from-[#25D366] via-emerald-400 to-[#128C7E] hover:brightness-110 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Proceed to WhatsApp Checkout</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
