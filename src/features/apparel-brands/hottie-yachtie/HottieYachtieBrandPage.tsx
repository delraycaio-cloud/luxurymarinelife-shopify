import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

// STYLES
import './styles/App.css';

// COMPONENTS
import HeroSection from './sections/HeroSection';
import AllProductsSection from './sections/AllProductsSection';
import FooterSection from './sections/FooterSection';
import ProductDetail from './components/ProductDetail';

import type { Product } from './types';

gsap.registerPlugin(ScrollTrigger);

export default function HottieYachtieBrandPage() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  const scrollToProducts = () => {
    const productsEl = document.getElementById('all-products');
    productsEl?.scrollIntoView({ behavior: 'smooth' });
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
          <span className="text-xs uppercase tracking-widest font-bold">Back</span>
        </button>
        
        <div 
          className="hyyc-font-display text-2xl md:text-3xl font-bold tracking-tighter text-[#F6F6F8] cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          HYYC
        </div>

        <div className="flex items-center gap-6">
          <button 
            className="text-[#F6F6F8] hover:text-[#FF1F3D] transition-colors text-xs uppercase tracking-widest font-bold"
            onClick={scrollToProducts}
          >
            Shop
          </button>
          <button className="relative text-[#F6F6F8] hover:text-[#FF1F3D] transition-colors">
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF1F3D] text-[#F6F6F8] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <HeroSection
          bgImage="/hero_deck_party.jpg"
          circleImages={['/circle_1_1.jpg', '/circle_1_2.jpg', '/circle_1_3.jpg']}
          zIndex={10}
          onShopClick={() => {
            const productsEl = document.getElementById('all-products');
            productsEl?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        
        <div id="all-products">
          <AllProductsSection 
            zIndex={10}
            onProductClick={setSelectedProduct}
            onAddToCart={() => setCartCount(prev => prev + 1)}
          />
        </div>

        <FooterSection zIndex={5} />
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => setCartCount(prev => prev + 1)}
        />
      )}
    </div>
  );
}
