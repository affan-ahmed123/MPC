import React, { createContext, useContext, useState, useEffect } from 'react';
import { SHOP_CONFIG, DELIVERY_TIERS } from '../data/menuData';

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

  // Shop Config with authoritative SHOP_CONFIG
  const [shopConfig, setShopConfig] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('mpc_shop_config');
        if (saved) {
          const parsed = JSON.parse(saved);
          // Reset cache if address or timings changed in code
          if (parsed.address !== SHOP_CONFIG.address || parsed.timings !== SHOP_CONFIG.timings) {
            localStorage.removeItem('mpc_shop_config');
            return SHOP_CONFIG;
          }
          return {
            ...parsed,
            ...SHOP_CONFIG,
          };
        }
      }
      return SHOP_CONFIG;
    } catch {
      return SHOP_CONFIG;
    }
  });

  // Delivery Area: 'nearby' (Rs. 70), 'medium' (Rs. 150), 'outside' (Rs. 250)
  const [deliveryArea, setDeliveryArea] = useState(() => {
    try {
      return localStorage.getItem('mpc_delivery_area') || 'nearby';
    } catch {
      return 'nearby';
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

  // Persist delivery area
  useEffect(() => {
    try {
      localStorage.setItem('mpc_delivery_area', deliveryArea);
    } catch (err) {
      console.error(err);
    }
  }, [deliveryArea]);

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

  // Totals & Tiered Delivery Calculation
  const totalItemCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const subtotal = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

  const activeTier = DELIVERY_TIERS.find(t => t.id === deliveryArea) || DELIVERY_TIERS[0];
  const standardTierFee = activeTier ? activeTier.fee : 70;
  const freeThreshold = shopConfig.freeDeliveryThreshold || 3000;
  const isFreeDelivery = subtotal >= freeThreshold;

  const deliveryFee = deliveryType === 'takeaway' || deliveryType === 'dinein' || isFreeDelivery || subtotal === 0
    ? 0
    : standardTierFee;

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
        deliveryArea,
        setDeliveryArea,
        activeTier,
        deliveryTiers: DELIVERY_TIERS,
        freeDeliveryThreshold: freeThreshold,
        isFreeDelivery,
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
