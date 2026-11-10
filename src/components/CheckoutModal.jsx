import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatWhatsAppMessage, getWhatsAppUrl, generateOrderId } from '../utils/whatsapp';
import confetti from 'canvas-confetti';
import { X, MessageCircle, MapPin, Phone, User, Clock, ShieldCheck, FileText, Banknote, CreditCard, CheckCircle2 } from 'lucide-react';

export default function CheckoutModal() {
  const {
    activeModal,
    setActiveModal,
    cartItems,
    subtotal,
    deliveryFee,
    totalAmount,
    discountAmount,
    couponCode,
    deliveryType,
    setDeliveryType,
    orderInstructions,
    setOrderInstructions,
    shopConfig,
    setLastOrder,
    clearCart
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [showPreview, setShowPreview] = useState(false);
  const [formError, setFormError] = useState('');

  if (activeModal !== 'checkout') return null;

  const currentOrderId = generateOrderId();

  // Generate preview message
  const formattedMsg = formatWhatsAppMessage({
    cartItems,
    customerName: customerName || 'Customer',
    customerPhone: customerPhone || 'Not provided',
    deliveryType,
    address,
    instructions: orderInstructions,
    subtotal,
    deliveryFee,
    discount: discountAmount,
    totalAmount,
    couponCode,
    paymentMethod,
    orderId: currentOrderId
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      setFormError('Please enter a valid phone or WhatsApp number');
      return;
    }
    if (deliveryType === 'delivery' && (!address.trim() || address.trim().length < 5)) {
      setFormError('Please enter your complete delivery address');
      return;
    }

    setFormError('');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    const orderRecord = {
      orderId: currentOrderId,
      customerName,
      customerPhone,
      deliveryType,
      address,
      items: [...cartItems],
      subtotal,
      deliveryFee,
      discountAmount,
      totalAmount,
      paymentMethod,
      orderInstructions,
      createdAt: new Date().toISOString()
    };

    setLastOrder(orderRecord);

    // Generate WhatsApp URL
    const waUrl = getWhatsAppUrl(shopConfig.whatsappNumber, formattedMsg);

    // Open WhatsApp
    window.open(waUrl, '_blank');

    // Clear cart & switch to success modal
    clearCart();
    setActiveModal('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-[#131722] border border-[#e6b343]/30 rounded-2xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0b0e14] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>WhatsApp Checkout</span>
                <span className="text-xs bg-[#e6b343]/20 text-[#e6b343] px-2 py-0.5 rounded-full border border-[#e6b343]/30 font-mono">
                  #{currentOrderId}
                </span>
              </h3>
              <p className="text-xs text-gray-400">Send order directly to shop WhatsApp</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-xl bg-gray-800/80 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handlePlaceOrder} className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto text-gray-200">

          {/* Order Summary Strip */}
          <div className="bg-[#19202c] border border-gray-800 rounded-xl p-3 flex items-center justify-between text-xs">
            <div>
              <span className="text-gray-400">Total Items: </span>
              <strong className="text-white font-bold">{cartItems.reduce((acc, it) => acc + it.quantity, 0)} Items</strong>
            </div>
            <div>
              <span className="text-gray-400">Payable Amount: </span>
              <strong className="text-lg font-extrabold text-[#e6b343]">Rs. {totalAmount}</strong>
            </div>
          </div>

          {formError && (
            <div className="bg-red-950/60 border border-red-800/60 text-red-200 text-xs p-3 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Delivery Type Option */}
          <div>
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1.5">
              Select Order Type:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'delivery', label: 'Home Delivery', sub: 'To Your Door' },
                { id: 'takeaway', label: 'Takeaway', sub: 'Self-Pickup' },
                { id: 'dinein', label: 'Dine-In', sub: 'At Restaurant' },
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDeliveryType(opt.id)}
                  className={`py-2 px-2 rounded-xl border text-center transition-all ${deliveryType === opt.id
                      ? 'border-[#e6b343] bg-[#e6b343]/15 text-white ring-1 ring-[#e6b343]'
                      : 'border-gray-800 bg-[#161b24] text-gray-400 hover:border-gray-700'
                    }`}
                >
                  <div className="font-bold text-xs">{opt.label}</div>
                  <div className="text-[10px] text-gray-400">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5 mb-1">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Your Full Name *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ali Khan"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-[#0a0d13] border border-gray-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e6b343]"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5 mb-1">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>WhatsApp / Contact Number *</span>
            </label>
            <input
              type="tel"
              required
              placeholder="0300-1234567"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full bg-[#0a0d13] border border-gray-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e6b343] font-mono"
            />
          </div>

          {/* Address if Delivery */}
          {deliveryType === 'delivery' && (
            <div>
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Complete Delivery Address & Landmark *</span>
              </label>
              <textarea
                required
                rows={2}
                placeholder="e.g. Flat 4B, Al-Noor Heights, Street 5, Near Commercial Market..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#0a0d13] border border-gray-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e6b343]"
              />
            </div>
          )}

          {/* Payment Method Select */}
          <div>
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1.5">
              Select Payment Method:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {/* Cash on Delivery */}
              <button
                type="button"
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-[#e6b343] bg-[#e6b343]/15 text-white ring-1 ring-[#e6b343]'
                    : 'border-gray-800 bg-[#161b24] text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    paymentMethod === 'Cash on Delivery' ? 'bg-amber-400/20 text-[#e6b343]' : 'bg-gray-800 text-gray-400'
                  }`}>
                    <Banknote className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">Cash on Delivery</div>
                    <div className="text-[10px] text-gray-400">Pay cash upon delivery (COD)</div>
                  </div>
                </div>
                {paymentMethod === 'Cash on Delivery' && (
                  <CheckCircle2 className="w-4 h-4 text-[#e6b343] flex-shrink-0" />
                )}
              </button>

              {/* Online Payment */}
              <button
                type="button"
                onClick={() => setPaymentMethod('Online Payment')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  paymentMethod === 'Online Payment'
                    ? 'border-[#e6b343] bg-[#e6b343]/15 text-white ring-1 ring-[#e6b343]'
                    : 'border-gray-800 bg-[#161b24] text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    paymentMethod === 'Online Payment' ? 'bg-emerald-400/20 text-emerald-400' : 'bg-gray-800 text-gray-400'
                  }`}>
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">Online Payment</div>
                    <div className="text-[10px] text-gray-400">JazzCash / EasyPaisa / Bank</div>
                  </div>
                </div>
                {paymentMethod === 'Online Payment' && (
                  <CheckCircle2 className="w-4 h-4 text-[#e6b343] flex-shrink-0" />
                )}
              </button>
            </div>

            {paymentMethod === 'Online Payment' && (
              <div className="mt-2 p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-[11px] text-emerald-200 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 flex-shrink-0" />
                <span>
                  Official account transfer details (<strong>JazzCash, EasyPaisa & Bank Transfer</strong>) will be sent instantly on WhatsApp with your invoice.
                </span>
              </div>
            )}
          </div>

          {/* Special Instructions */}
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Special Kitchen Notes / Instructions:
            </label>
            <input
              type="text"
              placeholder="e.g. Keep extra spicy, spoons and tissues requested..."
              value={orderInstructions}
              onChange={(e) => setOrderInstructions(e.target.value)}
              className="w-full bg-[#0a0d13] border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#e6b343]"
            />
          </div>

          {/* Message Preview Toggle */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="text-xs text-[#e6b343] hover:underline flex items-center gap-1 font-medium"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showPreview ? 'Hide Message Preview' : 'Preview WhatsApp Order Message'}</span>
            </button>

            {showPreview && (
              <div className="mt-2 p-3 bg-[#080a0f] border border-gray-800 rounded-xl max-h-48 overflow-y-auto">
                <pre className="text-[11px] font-mono text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {formattedMsg}
                </pre>
              </div>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="pt-2 flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-800/80">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Halal & Fresh Dum Food
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              30-45 Mins Fresh Delivery
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 px-4 rounded-xl font-extrabold text-black bg-gradient-to-r from-[#25D366] via-[#20ba5a] to-[#128C7E] hover:brightness-110 shadow-xl shadow-[#25D366]/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-base"
            >
              <MessageCircle className="w-6 h-6 fill-current" />
              <span>Send Order to WhatsApp Now</span>
            </button>
            <p className="text-center text-[11px] text-gray-400 mt-2">
              Clicking will automatically launch WhatsApp with your ready-to-send order receipt
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
