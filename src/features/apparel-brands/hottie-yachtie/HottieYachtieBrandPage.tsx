import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { ShopifyProduct } from '@/lib/shopify';

// STYLES
import './styles/App.css';

// COMPONENTS
import HeroSection from './sections/HeroSection';
import AllProductsSection from './sections/AllProductsSection';
import FooterSection from './sections/FooterSection';
import ProductDetail from './components/ProductDetail';
import { HYYCCartDrawer } from './components/HYYCCartDrawer';

gsap.registerPlugin(ScrollTrigger);

export default function HottieYachtieBrandPage() {
  const navigate = useNavigate();
  useCartStore();

  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hyyc-page bg-[#0B0B0D] text-[#F6F6F8] min-h-screen relative font-sans">
      <div className="hyyc-grain-overlay" />

      {/* Navigation */}
      <nav ref={navRef} className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-6 mix-blend-difference">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 group cursor-pointer text-[#F6F6F8] hover:text-[#FF1F3D] transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-xs uppercase tracking-widest font-bold font-sans">Back</span>
        </button>
        
        <div 
          className="hyyc-font-display text-2xl md:text-3xl font-bold tracking-tighter text-[#F6F6F8] cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          HYYC
        </div>

        <div className="flex items-center gap-6">
          <button 
            className="text-[#F6F6F8] hover:text-[#FF1F3D] transition-colors text-xs uppercase tracking-widest font-bold font-sans"
            onClick={() => scrollToSection('all-products')}
          >
            Shop
          </button>
          <HYYCCartDrawer />
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <HeroSection
          bgImage="/hero_deck_party.jpg"
          circleImages={['/circle_1_1.jpg', '/circle_1_2.jpg', '/circle_1_3.jpg']}
          zIndex={10}
          onShopClick={() => scrollToSection('all-products')}
        />
        
        <div id="all-products">
          <AllProductsSection 
            zIndex={10}
            onProductClick={setSelectedProduct}
          />
        </div>

        <FooterSection zIndex={4} />
      </main>

      {/* Product Detail View (Original HYYC Design) */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
