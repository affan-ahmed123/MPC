import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Check, Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';

export default function PortionModal() {
  const { activeModal, setActiveModal, modalData, addToCart } = useCart();

  if (activeModal !== 'portion' || !modalData) return null;

  const item = modalData;

  const [selectedPortion, setSelectedPortion] = useState(
    item.portions ? item.portions[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  const currentPrice = selectedPortion ? selectedPortion.price : (item.price || item.startingPrice);
  const totalPrice = currentPrice * quantity;

  const handleAdd = () => {
    addToCart(item, selectedPortion, null, quantity);
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-[#141822] border border-[#e6b343]/30 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Image & Close Button */}
        <div className={`relative h-44 sm:h-52 w-full overflow-hidden ${item.category === 'drinks' ? 'bg-white flex items-center justify-center p-4' : 'bg-black'}`}>
          <img
            src={item.image}
            alt={item.name}
            className={item.category === 'drinks' ? "h-full w-auto object-contain drop-shadow-lg" : "w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141822] via-[#141822]/40 to-transparent pointer-events-none" />

          <button
            onClick={() => setActiveModal(null)}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white hover:bg-black transition-all border border-white/10 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {item.badge && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-700 text-black font-bold text-xs uppercase px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 z-10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{item.badge}</span>
            </div>
          )}

          <div className="absolute bottom-3 left-4 right-4 z-10">
            <h3 className="text-2xl font-bold font-serif text-white drop-shadow-md">
              {item.name}
            </h3>
            <p className="text-[#e6b343] text-sm font-semibold mt-0.5 drop-shadow">
              {item.category === 'drinks' ? '🥤 Ice Chilled & Sealed Bottle' : 'Authentic Taste & Quality'}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-gray-200">
          <p className="text-sm text-gray-400 leading-relaxed">
            {item.description}
          </p>

          {/* Portion Selection (For Biryani, Pulao, Drinks, etc.) */}
          {item.portions && item.portions.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {item.portions.length === 1 ? 'Package Details:' : 'Select Size / Serving:'}
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.portions.map((portion) => {
                  const isSelected = selectedPortion?.id === portion.id;
                  return (
                    <button
                      key={portion.id}
                      type="button"
                      onClick={() => setSelectedPortion(portion)}
                      className={`relative flex items-center justify-between p-3 rounded-xl border text-left transition-all ${isSelected
                        ? 'border-[#e6b343] bg-[#e6b343]/15 text-white ring-1 ring-[#e6b343]'
                        : 'border-gray-800 bg-[#1a202c]/60 text-gray-300 hover:border-gray-700 hover:bg-[#1f2633]'
                        }`}
                    >
                      <div>
                        <div className="font-semibold text-sm">{portion.name}</div>
                        {portion.piece && (
                          <div className="text-[11px] text-gray-400 mt-0.5">{portion.piece}</div>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-base font-bold text-amber-400">Rs. {portion.price}</span>
                        {isSelected && (
                          <div className="w-5 h-5 ml-auto mt-1 rounded-full bg-[#e6b343] text-black flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-800">
            <span className="text-sm font-medium text-gray-300">Quantity:</span>
            <div className="flex items-center bg-[#10131a] rounded-xl border border-gray-700/80 p-1">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-gray-800/80 hover:bg-gray-700 flex items-center justify-center text-gray-200 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-base text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-8 h-8 rounded-lg bg-[#e6b343] hover:bg-amber-400 flex items-center justify-center text-black font-bold transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer with Add to Cart button */}
        <div className="p-4 bg-[#0d1017] border-t border-gray-800 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-gray-400">Total Price:</div>
            <div className="text-xl font-extrabold text-[#e6b343]">Rs. {totalPrice}</div>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 max-w-xs flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
