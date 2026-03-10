import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, X } from 'lucide-react';

// STYLES
import './styles/App.css';

// COMPONENTS
import HeroSection from './sections/HeroSection';
import YachtClubSection from './sections/YachtClubSection';
import CategorySection from './sections/CategorySection';
import Drop001Section from './sections/Drop001Section';
import JoinClubSection from './sections/JoinClubSection';
import FooterSection from './sections/FooterSection';
import AllProductsSection from './sections/AllProductsSection';
import ProductDetail from './components/ProductDetail';

import type { Product } from './types';

gsap.registerPlugin(ScrollTrigger);

export default function HottieYachtieBrandPage() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'products'>('home');
  const navRef = useRef<HTMLDivElement>(null);

  // Simple scroll behavior back to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
    // Important: we need to delay ScrollTrigger refresh until after new DOM is rendered
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [currentView]);

  return (
    <div className="hyyc-page bg-[#0B0B0D] text-[#F6F6F8] min-h-screen relative font-sans">
      <div className="hyyc-grain-overlay" />

      {/* Navigation */}
      <nav ref={navRef} className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-6 mix-blend-difference">
        <button 
          onClick={() => {
            if (currentView === 'home') {
              navigate(-1); // Go back to the main site apparel brands
            } else {
              setCurrentView('home');
            }
          }}
          className="flex flex-col gap-[6px] group cursor-pointer"
        >
          <ArrowLeft size={24} className="text-[#F6F6F8]" />
        </button>
        
        <div 
          className="hyyc-font-display text-2xl md:text-3xl font-bold tracking-tighter text-[#F6F6F8] cursor-pointer"
          onClick={() => setCurrentView('home')}
        >
          HYYC
        </div>

        <div className="flex items-center gap-6">
          <button 
            className="text-[#F6F6F8] hover:text-[#FF1F3D] transition-colors"
            onClick={() => setCurrentView('products')}
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

      {/* Full Screen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0B0B0D] flex flex-col justify-center px-[10vw]">
          <button 
            onClick={() => setMenuOpen(false)}
            className="absolute top-8 right-8 text-[#F6F6F8] hover:text-[#FF1F3D] transition-colors"
          >
            <X size={32} />
          </button>
          
          <nav className="flex flex-col gap-6 text-[clamp(40px,6vw,80px)] hyyc-font-display font-bold">
            <a href="#" className="text-[#F6F6F8] hover:text-[#FF1F3D] transition-colors" onClick={(e) => { e.preventDefault(); setCurrentView('products'); setMenuOpen(false); }}>Shop All</a>
            <a href="#" className="text-[#F6F6F8] hover:text-[#FF1F3D] transition-colors">New Drops</a>
            <a href="#" className="text-[#F6F6F8] hover:text-[#FF1F3D] transition-colors">Yacht Club</a>
            <a href="#" className="text-[#F6F6F8] hover:text-[#FF1F3D] transition-colors">Archive</a>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main>
        {currentView === 'home' ? (
          <>
            <HeroSection
              bgImage="/hero_deck_party.jpg"
              circleImages={['/circle_1_1.jpg', '/circle_1_2.jpg', '/circle_1_3.jpg']}
              zIndex={10}
              onShopClick={() => setCurrentView('products')}
            />
            
            <CategorySection
              id="swim"
              title="Swim."
              body="High-cut legs. Bold colors. Hardware that catches the light. Built for jumping off decks."
              cta="Shop Swimwear"
              bgImage="/swimwear_poolside.jpg"
              ribbonPosition="right"
              circleImages={['/circle_2_1.jpg', '/circle_2_2.jpg', '/circle_2_3.jpg']}
              zIndex={9}
              onAddToCart={() => setCartCount(prev => prev + 1)}
              onShopClick={() => setCurrentView('products')}
            />

            <YachtClubSection
              bgImage="/yacht_club_lifestyle.jpg"
              circleImages={['/circle_3_1.jpg', '/circle_3_2.jpg', '/circle_3_3.jpg']}
              zIndex={8}
              onExploreClick={() => setCurrentView('products')}
            />

            <CategorySection
              id="party"
              title="Party."
              body="When the sun goes down, the real club opens. Dresses and sets that shine under disco balls."
              cta="Shop Partywear"
              bgImage="/dresses_evening.jpg"
              ribbonPosition="left"
              circleImages={['/circle_1_3.jpg', '/circle_2_1.jpg', '/circle_3_2.jpg']}
              zIndex={7}
              onAddToCart={() => setCartCount(prev => prev + 1)}
              onShopClick={() => setCurrentView('products')}
            />

            <Drop001Section
              bgImage="/drop001_nightlife.jpg"
              circleImages={['/circle_2_2.jpg', '/circle_3_1.jpg', '/circle_1_1.jpg']}
              zIndex={6}
            />

            <JoinClubSection
              bgImage="/join_party.jpg"
              circleImages={['/circle_3_3.jpg', '/circle_1_2.jpg', '/circle_2_3.jpg']}
              zIndex={5}
            />

            <FooterSection zIndex={4} />
          </>
        ) : (
          <AllProductsSection 
            zIndex={10}
            onProductClick={setSelectedProduct}
            onAddToCart={() => setCartCount(prev => prev + 1)}
          />
        )}
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
