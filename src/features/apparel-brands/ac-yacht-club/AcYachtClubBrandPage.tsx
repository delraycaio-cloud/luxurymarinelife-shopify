import { useState, useCallback } from 'react';
import './App.css';
import './index.css';

import { CartProvider } from '@/features/apparel-brands/ac-yacht-club/context/CartContext';
import { Navigation } from '@/features/apparel-brands/ac-yacht-club/components/navigation/Navigation';
import { CartDrawer } from '@/features/apparel-brands/ac-yacht-club/components/cart/CartDrawer';
import { ProductModal } from '@/features/apparel-brands/ac-yacht-club/components/ProductModal';
import { StickyPurchaseBar } from '@/features/apparel-brands/ac-yacht-club/components/StickyPurchaseBar';
import { Footer } from '@/features/apparel-brands/ac-yacht-club/components/Footer';

import { HeroSection } from '@/features/apparel-brands/ac-yacht-club/sections/HeroSection';
import { NewArrivalsSection } from '@/features/apparel-brands/ac-yacht-club/sections/NewArrivalsSection';
import { ShopSection } from '@/features/apparel-brands/ac-yacht-club/sections/ShopSection';
import { AboutSection } from '@/features/apparel-brands/ac-yacht-club/sections/AboutSection';
import { NewsletterSection } from '@/features/apparel-brands/ac-yacht-club/sections/NewsletterSection';

import type { Product } from '@/features/apparel-brands/ac-yacht-club/types';

function AcYachtClubBrandPage() {
  return (
    <div className="ac-yc-page">
      <AppContent />
    </div>
  );
}

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  }, []);

  const handleCloseProductModal = useCallback(() => {
    setIsProductModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  }, []);

  const scrollToShop = useCallback(() => {
    const shopSection = document.querySelector('#shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <CartProvider>
      <div className="relative bg-harbor min-h-screen">
        {/* Navigation */}
        <Navigation onCartClick={() => setIsCartOpen(true)} />

        {/* Main Content */}
        <main className="relative">
          {/* Hero - Product Focused */}
          <HeroSection onProductClick={handleProductClick} />
          
          {/* New Arrivals */}
          <NewArrivalsSection onProductClick={handleProductClick} />
          
          {/* Shop All with Filters */}
          <ShopSection onProductClick={handleProductClick} />
          
          {/* About / Brand Story */}
          <AboutSection />
          
          {/* Newsletter */}
          <NewsletterSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Sticky Purchase Bar */}
        <StickyPurchaseBar onShopClick={scrollToShop} />

        {/* Cart Drawer */}
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* Product Modal */}
        <ProductModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={handleCloseProductModal}
        />
      </div>
    </CartProvider>
  );
}

export default AcYachtClubBrandPage;
