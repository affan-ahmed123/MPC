import React from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import WhyChooseUs from './components/WhyChooseUs';
import ReviewsSection from './components/ReviewsSection';
import LocationHours from './components/LocationHours';
import Footer from './components/Footer';

// Modals
import PortionModal from './components/PortionModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import ShopSettingsModal from './components/ShopSettingsModal';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-transparent text-gray-100 flex flex-col font-sans selection:bg-[#e6b343] selection:text-black">
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Banner with Official MPC Logo and warm ambiance */}
        <Hero />

        {/* Full Menu Section (Biryani, Pulao, Nali Biryani, Sides & Chilled Drinks) */}
        <MenuSection />

        {/* Why Choose Madina Biryani */}
        <WhyChooseUs />

        {/* Customer Reviews & Feedback */}
        <ReviewsSection />

        {/* Location & Timings */}
        <LocationHours />

        {/* Footer */}
        <Footer />

        {/* Interactive Modals */}
        <PortionModal />
        <CartDrawer />
        <CheckoutModal />
        <OrderSuccessModal />
        <ShopSettingsModal />
      </div>
    </CartProvider>
  );
}
