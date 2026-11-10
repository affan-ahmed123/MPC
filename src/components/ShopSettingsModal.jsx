import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Settings, Phone, MessageCircle, MapPin, Save, RefreshCw, Check } from 'lucide-react';
import { SHOP_CONFIG } from '../data/menuData';

export default function ShopSettingsModal() {
  const { activeModal, setActiveModal, shopConfig, updateShopConfig } = useCart();

  const [whatsapp, setWhatsapp] = useState(shopConfig.whatsappNumber || '923141281986');
  const [phone, setPhone] = useState(shopConfig.phone || '+92 314 1281986');
  const [address, setAddress] = useState(shopConfig.address || 'Near 10 Number Market, Orangi Town');
  const [timings, setTimings] = useState(shopConfig.timings || 'Daily: 11:30 AM - 1:30 AM');
  const [deliveryFee, setDeliveryFee] = useState(shopConfig.deliveryFee || 70);
  const [freeThreshold, setFreeThreshold] = useState(shopConfig.freeDeliveryThreshold || 3000);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (activeModal !== 'settings') return null;

  const handleSave = (e) => {
    e.preventDefault();
    const cleanWa = whatsapp.replace(/[^0-9]/g, '');
    updateShopConfig({
      whatsappNumber: cleanWa,
      phone,
      address,
      timings,
      deliveryFee: Number(deliveryFee),
      freeDeliveryThreshold: Number(freeThreshold)
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveModal(null);
    }, 1200);
  };

  const handleReset = () => {
    updateShopConfig(SHOP_CONFIG);
    setWhatsapp(SHOP_CONFIG.whatsappNumber);
    setPhone(SHOP_CONFIG.phone);
    setAddress(SHOP_CONFIG.address);
    setTimings(SHOP_CONFIG.timings);
    setDeliveryFee(SHOP_CONFIG.deliveryFee);
    setFreeThreshold(SHOP_CONFIG.freeDeliveryThreshold);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-[#121622] border border-[#e6b343]/30 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#0a0d14] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#e6b343]/20 text-[#e6b343] flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Shop & WhatsApp Settings</h3>
              <p className="text-[11px] text-gray-400">Configure order receiving phone & details</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-lg bg-gray-800 text-gray-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-5 space-y-3.5 text-xs text-gray-200">
          <div>
            <label className="text-xs font-semibold text-amber-400 block mb-1 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Order Receiving Number *</span>
            </label>
            <input 
              type="text"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="e.g. 923141281986"
              className="w-full bg-[#0a0d13] border border-gray-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:border-[#e6b343] focus:outline-none"
            />
            <p className="text-[10px] text-gray-400 mt-1">
              Include country code without plus sign (e.g. 923141281986)
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Calling Phone Number</span>
            </label>
            <input 
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+92 314 1281986"
              className="w-full bg-[#0a0d13] border border-gray-800 rounded-xl px-3 py-2 text-white font-mono focus:border-[#e6b343] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Shop Address & City</span>
            </label>
            <input 
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Near 10 Number Market, Orangi Town..."
              className="w-full bg-[#0a0d13] border border-gray-800 rounded-xl px-3 py-2 text-white focus:border-[#e6b343] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Standard Delivery Fee (Rs)
              </label>
              <input 
                type="number"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
                className="w-full bg-[#0a0d13] border border-gray-800 rounded-xl px-3 py-2 text-white font-mono focus:border-[#e6b343] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Free Delivery Above (Rs)
              </label>
              <input 
                type="number"
                value={freeThreshold}
                onChange={(e) => setFreeThreshold(e.target.value)}
                className="w-full bg-[#0a0d13] border border-gray-800 rounded-xl px-3 py-2 text-white font-mono focus:border-[#e6b343] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-2 border-t border-gray-800">
            <button
              type="button"
              onClick={handleReset}
              className="text-gray-400 hover:text-white flex items-center gap-1 text-[11px]"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset to Default</span>
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-[#e6b343] text-black font-bold rounded-xl hover:bg-amber-400 flex items-center gap-1.5 shadow"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
