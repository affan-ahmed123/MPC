import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, MessageCircle, Phone, ArrowLeft, Clock } from 'lucide-react';

export default function OrderSuccessModal() {
  const { activeModal, setActiveModal, lastOrder, shopConfig } = useCart();

  if (activeModal !== 'success' || !lastOrder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-[#121622] border border-[#e6b343]/40 rounded-2xl shadow-2xl p-6 text-center text-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow circle */}
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <h3 className="text-2xl font-bold font-serif text-white mb-1">
          Your Order Has Been Sent to WhatsApp!
        </h3>
        <p className="text-sm text-gray-300 mb-2">
          Thank you for choosing Madina Biryani & Pakwan Center. Our kitchen is preparing your feast!
        </p>

        <div className="inline-block px-3 py-1 rounded-full bg-[#e6b343]/20 border border-[#e6b343]/40 text-[#e6b343] font-mono text-sm font-bold mb-4">
          Order Reference ID: #{lastOrder.orderId}
        </div>

        {/* Order Details Card */}
        <div className="bg-[#181e2b] rounded-xl p-4 text-left border border-gray-800 space-y-2 mb-5 text-xs">
          <div className="flex justify-between border-b border-gray-700/60 pb-2">
            <span className="text-gray-400">Customer Name:</span>
            <span className="font-semibold text-white">{lastOrder.customerName}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700/60 pb-2">
            <span className="text-gray-400">Contact Number:</span>
            <span className="font-mono text-white">{lastOrder.customerPhone}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700/60 pb-2">
            <span className="text-gray-400">Total Payable Amount:</span>
            <span className="font-extrabold text-[#e6b343] text-sm">Rs. {lastOrder.totalAmount}</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300/90 pt-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Estimated Delivery Time: Within 15 to 30 minutes</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <a
            href={`https://wa.me/${shopConfig.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 px-4 rounded-xl font-bold text-black bg-[#25D366] hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-600/20"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Open WhatsApp Chat Again</span>
          </a>

          <a
            href={`tel:${shopConfig.phone}`}
            className="w-full py-2.5 px-4 rounded-xl font-medium text-white bg-gray-800 hover:bg-gray-700 transition-all flex items-center justify-center gap-2 text-xs"
          >
            <Phone className="w-4 h-4 text-[#e6b343]" />
            <span>Call Restaurant Directly: {shopConfig.phone}</span>
          </a>

          <button
            onClick={() => setActiveModal(null)}
            className="w-full py-2.5 px-4 rounded-xl text-gray-400 hover:text-white transition-colors text-xs flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Browsing Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
