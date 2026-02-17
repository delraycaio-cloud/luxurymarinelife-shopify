import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { Navigation } from '@/components/custom/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { StatementSection } from '@/sections/StatementSection';
import { ShopSection } from '@/sections/ShopSection';
import { FeaturedProductSection } from '@/sections/FeaturedProductSection';
import { ConnectSection } from '@/sections/ConnectSection';
import { Footer } from '@/sections/Footer';
import { UltraShearPage } from '@/features/ultra-shear/UltraShearPage';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const navigate = useNavigate();

  const scrollToShop = () => {
    const shopSection = document.querySelector('#shop');
    if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'biohacking') navigate('/ultra-shear');
  };

  return (
    <>
      <HeroSection />

      <StatementSection
        id="impact"
        headline="HEALTHY WATER"
        body="We fund reef restoration and reduce marine impact-so the places you love stay pristine."
        backgroundImage="/statement_water_bg.jpg"
        zIndex={20}
      />

      <StatementSection
        id="animals"
        headline="HEALTHY ANIMALS"
        body="Every purchase supports coral restoration and cleaner coastlines-because thriving ecosystems matter."
        backgroundImage="/statement_animals_bg.jpg"
        zIndex={30}
      />

      <StatementSection
        id="experience"
        headline="THE ERA OF THE SPA YACHT IS OVER. ENTER THE ERA OF THE BIOLOGICAL AMPLIFIER."
        body="A floating system for recovery, focus, and performance-designed for high performers who refuse to compromise."
        backgroundImage="/experience_yacht_bg.jpg"
        zIndex={40}
        cta={{ text: 'Book a Consultation', onClick: scrollToShop }}
        secondaryCta={{ text: 'View the Experience', onClick: scrollToShop }}
      />

      <StatementSection
        id="philanthropy"
        headline="10% TO THE OCEAN"
        body="We donate 10% of every purchase to marine restoration-reefs, coastlines, and the wildlife that depends on them."
        backgroundImage="/impact_reef_bg.jpg"
        zIndex={50}
        cta={{ text: 'Shop with Purpose', onClick: scrollToShop }}
      />

      <ShopSection onCategoryClick={handleCategoryClick} />
      <FeaturedProductSection />
      <ConnectSection />
      <Footer />
    </>
  );
}

function RoutedApp() {
  const location = useLocation();
  const isUltraShearRoute = location.pathname === '/ultra-shear';

  useEffect(() => {
    if (location.pathname !== '/') return;

    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            return pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power1.out',
        },
      });
    };

    const timer = setTimeout(setupGlobalSnap, 500);
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [location.pathname]);

  return (
    <CartProvider>
      <div className={`relative min-h-screen ${isUltraShearRoute ? 'bg-white' : 'bg-marine-900'}`}>
        {!isUltraShearRoute && <div className="grain-overlay" />}
        {!isUltraShearRoute && <Navigation />}

        <main className="relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ultra-shear" element={<UltraShearPage />} />
          </Routes>
        </main>
      </div>
    </CartProvider>
  );
}

export default RoutedApp;
