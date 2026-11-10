import React, { createContext, useContext, useState, useEffect } from 'react';
import { SHOP_CONFIG } from '../data/menuData';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Load saved cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mpc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Shop Config with WhatsApp phone number
  const [shopConfig, setShopConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('mpc_shop_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...SHOP_CONFIG, ...parsed, freeDeliveryThreshold: 2000 };
      }
      return SHOP_CONFIG;
    } catch {
      return SHOP_CONFIG;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'portion', 'checkout', 'success', 'settings', 'originalMenu'
  const [modalData, setModalData] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);
  const [orderInstructions, setOrderInstructions] = useState('');
  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery', 'takeaway', 'dinein'
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('mpc_cart', JSON.stringify(cartItems));
    } catch (err) {
      console.error(err);
    }
  }, [cartItems]);

  // Persist shop config
  useEffect(() => {
    try {
      localStorage.setItem('mpc_shop_config', JSON.stringify(shopConfig));
    } catch (err) {
      console.error(err);
    }
  }, [shopConfig]);

  // Add Item to Cart
  const addToCart = (item, selectedPortion = null, selectedFlavor = null, quantity = 1) => {
    const portion = selectedPortion || (item.portions ? item.portions[0] : null);
    const price = portion ? portion.price : (item.price || item.startingPrice);
    const cartItemId = `${item.id}-${portion ? portion.id : 'default'}-${selectedFlavor ? selectedFlavor.id : 'none'}`;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(ci => ci.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            itemId: item.id,
            name: selectedFlavor ? `${selectedFlavor.name} Ice Cream` : item.name,
            image: (selectedFlavor && selectedFlavor.image) ? selectedFlavor.image : item.image,
            price: price,
            portionId: portion ? portion.id : null,
            portionName: portion ? portion.name : null,
            flavor: selectedFlavor ? selectedFlavor.name : null,
            quantity: quantity,
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  // Update Item Quantity
  const updateQuantity = (cartItemId, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Remove Item
  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
    setDiscountAmount(0);
    setCouponCode('');
  };

  // Apply Coupon
  const applyCoupon = (code) => {
    const clean = (code || '').trim().toUpperCase();
    if (clean === 'MADINA10' || clean === 'WELCOME10') {
      const sub = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
      const disc = Math.round(sub * 0.1);
      setDiscountAmount(disc);
      setCouponCode(clean);
      return { success: true, message: '10% discount voucher applied!' };
    } else if (clean === 'FIRST50') {
      setDiscountAmount(50);
      setCouponCode(clean);
      return { success: true, message: 'Rs. 50 voucher discount applied!' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try MADINA10' };
    }
  };

  // Totals
  const totalItemCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const subtotal = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

  const deliveryFee = deliveryType === 'takeaway' || deliveryType === 'dinein' || subtotal >= shopConfig.freeDeliveryThreshold || subtotal === 0
    ? 0
    : shopConfig.deliveryFee;

  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Update shop settings
  const updateShopConfig = (newSettings) => {
    setShopConfig(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        activeModal,
        setActiveModal,
        modalData,
        setModalData,
        lastOrder,
        setLastOrder,
        orderInstructions,
        setOrderInstructions,
        deliveryType,
        setDeliveryType,
        couponCode,
        discountAmount,
        applyCoupon,
        totalItemCount,
        subtotal,
        deliveryFee,
        totalAmount,
        shopConfig,
        updateShopConfig,
        activeCategory,
        setActiveCategory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
