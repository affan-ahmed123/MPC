/**
 * Format order details into a clean, professional English WhatsApp message
 */
export function formatWhatsAppMessage({
  cartItems,
  customerName,
  customerPhone,
  deliveryType,
  deliveryAreaLabel,
  address,
  instructions,
  subtotal,
  deliveryFee,
  discount,
  totalAmount,
  couponCode,
  paymentMethod,
  orderId
}) {
  const divider = "━━━━━━━━━━━━━━━━━━━━━━";

  let msg = `🌟 *MADINA PAKWAN CENTER (MPC)* 🌟\n`;
  msg += `📋 *NEW CUSTOMER ORDER RECEIPT (#${orderId})*\n`;
  msg += `${divider}\n\n`;

  msg += `🛒 *ORDERED ITEMS:*\n`;
  cartItems.forEach((item, index) => {
    msg += `${index + 1}. *${item.name}*\n`;
    if (item.portionName) {
      msg += `   ▫️ Portion / Size: ${item.portionName}\n`;
    }
    msg += `   ▫️ Quantity: ${item.quantity} x Rs. ${item.price} = *Rs. ${item.quantity * item.price}*\n\n`;
  });

  msg += `${divider}\n`;
  msg += `💵 *Subtotal:* Rs. ${subtotal}\n`;
  msg += `🚚 *Delivery Charges:* ${deliveryFee === 0 ? 'FREE DELIVERY (Order Rs. 3000+)' : `Rs. ${deliveryFee}`}\n`;
  msg += `💰 *TOTAL PAYABLE AMOUNT:* *Rs. ${totalAmount}*\n`;
  msg += `${divider}\n\n`;

  msg += `👤 *CUSTOMER & DELIVERY DETAILS:*\n`;
  msg += `• Name: *${customerName || 'N/A'}*\n`;
  msg += `• Phone: *${customerPhone || 'N/A'}*\n`;
  msg += `• Order Type: *${deliveryType === 'delivery' ? 'Home Delivery' : deliveryType === 'takeaway' ? 'Takeaway / Self-Pickup' : 'Dine-In'}*\n`;

  if (deliveryType === 'delivery') {
    if (deliveryAreaLabel) {
      msg += `• Delivery Area / Distance: *${deliveryAreaLabel}*\n`;
    }
    msg += `• Delivery Address: *${address || 'N/A'}*\n`;
  }

  const paymentFormatted = paymentMethod === 'Online Payment'
    ? 'Online Payment (JazzCash / EasyPaisa / Bank Transfer)'
    : 'Cash on Delivery (COD)';
  msg += `• Payment Method: *${paymentFormatted}*\n`;

  if (instructions && instructions.trim()) {
    msg += `\n📝 *Special Instructions:* "${instructions.trim()}"\n`;
  }

  msg += `\n${divider}\n`;
  msg += `🕒 Order Placed: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | ${new Date().toLocaleDateString()}\n`;
  msg += `✨ *Delicious Taste with Quality, Always with You!*\n`;
  msg += `Please reply with order confirmation. Thank you!`;

  return msg;
}

/**
 * Generate full WhatsApp send URL
 */
export function getWhatsAppUrl(phoneNumber, message) {
  // Clean phone number: remove spaces, plus, dashes
  const cleanPhone = (phoneNumber || "").replace(/[^0-9]/g, "");
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}

/**
 * Generate unique order ID
 */
export function generateOrderId() {
  const chars = '0123456789';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `MPC-${rand}`;
}
