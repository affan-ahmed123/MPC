import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatWhatsAppMessage, getWhatsAppUrl, generateOrderId } from '../utils/whatsapp';
import confetti from 'canvas-confetti';
import { X, MessageCircle, MapPin, Phone, User, Clock, ShieldCheck, FileText, Banknote, CreditCard, CheckCircle2, Bike } from 'lucide-react';

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
    deliveryArea,
    setDeliveryArea,
    activeTier,
    deliveryTiers,
    isFreeDelivery,
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
  const deliveryAreaLabel = activeTier ? activeTier.name : 'Nearby Area';

  // Generate preview message
  const formattedMsg = formatWhatsAppMessage({
    cartItems,
    customerName: customerName || 'Customer',
    customerPhone: customerPhone || 'Not provided',
    deliveryType,
    deliveryAreaLabel,
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
    if (!address.trim() || address.trim().length < 5) {
      setFormError('Please enter your complete delivery address and nearest landmark');
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
      deliveryArea: deliveryAreaLabel,
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
              <p className="text-xs text-gray-400">Madina Pakwan Center (MPC)</p>
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

          {/* Order Delivery Mode Badge */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#141824] border border-amber-500/25 text-xs">
            <span className="flex items-center gap-2 font-bold text-amber-300">
              <Bike className="w-4 h-4 text-amber-400" />
              Home Delivery Order
            </span>
            <span className="text-[11px] text-gray-400 font-medium">Direct to your doorstep</span>
          </div>

          {/* Delivery Area Selection */}
          <div>
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Select Delivery Area / Distance:
              </span>
              {isFreeDelivery && (
                <span className="text-[10px] text-emerald-400 font-extrabold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  🎉 Free Delivery (Order Rs. 3000+)
                </span>
              )}
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {deliveryTiers.map((tier) => {
                const isSelected = deliveryArea === tier.id;
                const label = tier.id === 'nearby' ? 'Nearby Area' : tier.id === 'medium' ? 'Medium Distance' : 'Long Distance';
                const subLabel = tier.id === 'nearby' ? 'Local Area' : tier.id === 'medium' ? 'Medium Dist.' : 'Extended Area';
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setDeliveryArea(tier.id)}
                    className={`py-2 px-1.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${isSelected
                        ? 'border-amber-400 bg-amber-500/20 text-white ring-1 ring-amber-400'
                        : 'border-gray-800 bg-[#161b24] text-gray-400 hover:border-gray-700'
                      }`}
                  >
                    <span className="font-bold text-xs text-white">
                      {label}
                    </span>
                    <span className="text-[10px] text-gray-400 mt-0.5">
                      {subLabel}
                    </span>
                    <span className={`text-[11px] font-mono font-extrabold mt-1 ${isFreeDelivery ? 'text-emerald-400' : 'text-[#e6b343]'}`}>
                      {isFreeDelivery ? 'FREE' : `Rs. ${tier.fee}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5 mb-1">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Customer Name *</span>
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

          {/* Complete Delivery Address */}
          <div>
            <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Complete Delivery Address & Nearest Landmark *</span>
            </label>
            <textarea
              required
              rows={2}
              placeholder="e.g. House # 12, Street 4, Near Jamia Masjid, Orangi Town..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#0a0d13] border border-gray-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e6b343]"
            />
          </div>

          {/* Payment Method Select: Cash on Delivery or Online Payment */}
          <div>
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1.5">
              Select Payment Method:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {/* Cash on Delivery */}
              <button
                type="button"
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${paymentMethod === 'Cash on Delivery'
                  ? 'border-[#e6b343] bg-[#e6b343]/15 text-white ring-1 ring-[#e6b343]'
                  : 'border-gray-800 bg-[#161b24] text-gray-400 hover:border-gray-700'
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${paymentMethod === 'Cash on Delivery' ? 'bg-amber-400/20 text-[#e6b343]' : 'bg-gray-800 text-gray-400'
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
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${paymentMethod === 'Online Payment'
                  ? 'border-[#e6b343] bg-[#e6b343]/15 text-white ring-1 ring-[#e6b343]'
                  : 'border-gray-800 bg-[#161b24] text-gray-400 hover:border-gray-700'
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${paymentMethod === 'Online Payment' ? 'bg-emerald-400/20 text-emerald-400' : 'bg-gray-800 text-gray-400'
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
                  After clicking the order button below, you will receive our verified JazzCash / EasyPaisa / Bank account details on WhatsApp to transfer payment.
                </span>
              </div>
            )}
          </div>

          {/* Pricing Breakdown Card */}
          <div className="bg-[#0b0e14] p-3.5 rounded-xl border border-gray-800 space-y-1.5 text-xs text-gray-300">
            <div className="flex justify-between">
              <span>Items Subtotal:</span>
              <span className="font-semibold text-white">Rs. {subtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Voucher Discount:</span>
                <span>-Rs. {discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Charges:</span>
              <span className={deliveryFee === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                {deliveryFee === 0 ? 'FREE DELIVERY (Orders Rs. 3000+)' : `Rs. ${deliveryFee} (${activeTier?.name || 'Standard'})`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-gray-800">
              <span className="text-[#e6b343]">Net Total Payable:</span>
              <span className="text-[#e6b343] text-base font-mono">Rs. {totalAmount}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-black bg-gradient-to-r from-[#25D366] via-emerald-400 to-[#128C7E] hover:brightness-110 shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Confirm & Send Order via WhatsApp</span>
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct WhatsApp message generated • Instant response from shop</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
