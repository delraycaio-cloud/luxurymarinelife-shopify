import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { Navigation } from "@/components/custom/Navigation";
import { HeroSection } from "@/sections/HeroSection";
import { StatementSection } from "@/sections/StatementSection";
import { ShopSection } from "@/sections/ShopSection";
import { FeaturedProductSection } from "@/sections/FeaturedProductSection";
import { ConnectSection } from "@/sections/ConnectSection";
import { Footer } from "@/sections/Footer";
import { FoundersSection } from "@/sections/FoundersSection";
import { TrustBar } from "@/components/custom/TrustBar";
import { ServicesSection } from "@/sections/ServicesSection";
import { ShopChatbot } from "@/components/custom/ShopChatbot";
import { UltraShearPage } from "@/features/ultra-shear/UltraShearPage";
import { ApparelBrandsPage } from "@/features/apparel-brands/ApparelBrandsPage";
import { LuxuryMarineLifeBrandPage } from "@/features/apparel-brands/luxury-marine-life/LuxuryMarineLifeBrandPage";
import HottieYachtieBrandPage from "@/features/apparel-brands/hottie-yachtie/HottieYachtieBrandPage";
import AcYachtClubBrandPage from "@/features/apparel-brands/ac-yacht-club/AcYachtClubBrandPage";
import ShopifyDemoPage from "@/features/shopify-demo/ShopifyDemoPage";
import { SustainableTechPage } from "@/features/sustainable-tech/SustainableTechPage";
import { SustainableTechBrandPage } from "@/features/sustainable-tech/SustainableTechBrandPage";
import { PartnersPage } from "@/features/partners/PartnersPage";


gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const navigate = useNavigate();

  const scrollToShop = () => {
    const shopSection = document.querySelector("#shop");
    if (shopSection) shopSection.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "biohacking") navigate("/ultra-shear");
    if (categoryId === "apparel") navigate("/apparel-brands");
  };

  return (
    <>
      <HeroSection />
      <TrustBar />

      <StatementSection
        id="impact"
        headline="HEALTHY WATER"
        body={
          <>
            <p>We fund reef restoration and reduce marine impact — so the waters you love stay pristine for generations.</p>
            <p className="mt-4">
              <a
                href="https://www.seakeepers.org/donate/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-teal hover:text-teal-light transition-colors font-semibold underline underline-offset-4"
              >
                🌊 Donate to Seakeepers →
              </a>
            </p>
          </>
        }
        backgroundImage="/statement_water_bg.webp"
        zIndex={20}
      />

      <StatementSection
        id="animals"
        headline="HEALTHY ANIMALS"
        body={
          <>
            <p>Every purchase supports wildlife rehabilitation and cleaner coastlines — because thriving ecosystems begin with healthy animals.</p>
            <p className="mt-4">
              <a
                href="https://www.pelicanharbor.org/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-teal hover:text-teal-light transition-colors font-semibold underline underline-offset-4"
              >
                🐦 Donate to Pelican Harbor Seabird Station →
              </a>
            </p>
          </>
        }
        backgroundImage="/statement_animals_bg.webp"
        zIndex={30}
      />

      <StatementSection
        id="experience"
        headline="THE ERA OF THE SPA YACHT IS OVER. ENTER THE ERA OF THE BIOLOGICAL AMPLIFIER."
        body="A floating system for recovery, focus, and performance — designed for high performers who refuse to compromise."
        backgroundImage="/experience_yacht_bg.webp"
        zIndex={40}
        cta={{ text: "Explore UltraShear™", onClick: () => navigate('/ultra-shear') }}
        secondaryCta={{ text: "Browse Apparel", onClick: () => navigate('/apparel-brands') }}
      />

      <StatementSection
        id="philanthropy"
        headline="10% TO THE OCEAN"
        body={
          <>
            <p>Every sale, 10% goes directly to impact.</p>
            <p className="mt-3 text-white/90 font-semibold">🌊 GARMN Immersive Learning</p>
            <p className="mt-1 text-white/60 text-sm">Hands-on ocean conservation education for the next generation.</p>
            <p className="mt-3 text-white/90 font-semibold">🎓 MagicSchoolBox Program</p>
            <p className="mt-1 text-white/60 text-sm">Immersive STEM learning kits that bring marine science into classrooms worldwide.</p>
          </>
        }
        backgroundImage="/impact_reef_bg.webp"
        zIndex={50}
        cta={{ text: "Shop with Purpose", onClick: scrollToShop }}
        secondaryCta={{ text: "Learn about GARMN →", onClick: () => window.open('https://garmnconnect.web.app', '_blank') }}
      />

      <ShopSection onCategoryClick={handleCategoryClick} />
      <ServicesSection />
      <FeaturedProductSection />
      <FoundersSection />
      <ConnectSection />
      <Footer />
    </>
  );
}

function RoutedApp() {
  const location = useLocation();
  const isUltraShearRoute = location.pathname === "/ultra-shear";
  const isApparelBrandsRoute = location.pathname === "/apparel-brands";
  const isLmlRoute = location.pathname === "/luxury-marine-life-brand";
  const isHyycRoute = location.pathname === "/hottie-yachtie-brand";
  const isAcYcRoute = location.pathname === "/ac-yacht-club-apparel";
  const isSustainableTechRoute = location.pathname === "/sustainable-tech";
  const isPartnersRoute = location.pathname === "/partners";
  const isSustainableTechBrandRoute = location.pathname.startsWith("/sustainable-tech/");

  useEffect(() => {
    if (location.pathname !== "/") return;

    let globalSnap: globalThis.ScrollTrigger | null = null;

    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center:
          (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      globalSnap = ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02,
            );
            if (!inPinned) return value;

            return pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0,
            );
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power1.out",
        },
      });
    };

    const timer = setTimeout(setupGlobalSnap, 500);
    return () => {
      clearTimeout(timer);
      if (globalSnap) globalSnap.kill();
    };
  }, [location.pathname]);

  useEffect(() => {
    // Phase 2: Technical SEO & Agentic Search Dynamic Updates
    const canonicalLink =
      document.querySelector('link[rel="canonical"]') ||
      document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    canonicalLink.setAttribute(
      "href",
      `https://luxurymarinelife-shopify.web.app${location.pathname}`,
    );
    if (!document.querySelector('link[rel="canonical"]')) {
      document.head.appendChild(canonicalLink);
    }

    const metaDescription =
      document.querySelector('meta[name="description"]') ||
      document.createElement("meta");
    metaDescription.setAttribute("name", "description");

    if (isUltraShearRoute) {
      document.title = "UltraShear | Luxury Marine Life Bio-Hacking";
      metaDescription.setAttribute(
        "content",
        "UltraShear Technology™ transforms oil-based supplements into highly bioavailable nanoemulsions for marine life high performers.",
      );
    } else if (isApparelBrandsRoute) {
      document.title = "Apparel Brands | Luxury Marine Life";
      metaDescription.setAttribute(
        "content",
        "Explore our apparel capsules: Hottie Yachtie Yacht Club, Ac Yacht Club, and Luxury Marine Life.",
      );
    } else if (isLmlRoute) {
      document.title = "Luxury Marine Life Apparel | Shop the Collection";
      metaDescription.setAttribute(
        "content",
        "Shop the official Luxury Marine Life apparel collection—premium tees, sustainable fabrics, and ocean-inspired designs.",
      );
    } else if (isHyycRoute) {
      document.title = "Hottie Yachtie | Party Wear for the open sea";
      metaDescription.setAttribute(
        "content",
        "Shop the official Hottie Yachtie apparel collection—party wear for the open sea.",
      );
    } else if (isAcYcRoute) {
      document.title = "AC Yacht Club | High-Performance Apparel";
      metaDescription.setAttribute(
        "content",
        "Shop the official AC Yacht Club apparel collection—clean lines, quiet flex.",
      );
    } else if (isSustainableTechRoute) {
      document.title = "Sustainable Tech | Luxury Marine Life";
      metaDescription.setAttribute(
        "content",
        "Clean innovations for the water you love—filtration, energy, monitoring, and waste solutions for marine life.",
      );
    } else if (isPartnersRoute) {
      document.title = "Become a Partner | Luxury Marine Life";
      metaDescription.setAttribute(
        "content",
        "Earn commissions as an affiliate or list your products on Luxury Marine Life. Join our premium marine lifestyle marketplace.",
      );
    } else if (isSustainableTechBrandRoute) {
      document.title = "Sustainable Tech Brand | Luxury Marine Life";
      metaDescription.setAttribute(
        "content",
        "Explore innovative sustainable technology for marine environments—filtration, energy, and monitoring solutions.",
      );
    } else {
      document.title = "Luxury Marine Life | Premium Wellness & Lifestyle for the Water";
      metaDescription.setAttribute(
        "content",
        "Premium wellness, performance apparel, and sustainable technology for life on the water. 10% of every purchase supports ocean restoration.",
      );
    }

    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }
  }, [location.pathname, isUltraShearRoute, isApparelBrandsRoute, isLmlRoute, isHyycRoute, isAcYcRoute, isSustainableTechRoute, isPartnersRoute, isSustainableTechBrandRoute]);

  if (isLmlRoute) {
    return <LuxuryMarineLifeBrandPage />;
  }

  if (isHyycRoute) {
    return <HottieYachtieBrandPage />;
  }

  if (isAcYcRoute) {
    return <AcYachtClubBrandPage />;
  }

  return (
    <CartProvider>
      <div
        className={`relative min-h-screen ${isUltraShearRoute ? "bg-white" : "bg-marine-900"}`}
      >
        {!isUltraShearRoute && <div className="grain-overlay" />}
        {!isUltraShearRoute && <Navigation />}

        <main className="relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ultra-shear" element={<UltraShearPage />} />
            <Route path="/apparel-brands" element={<ApparelBrandsPage />} />
            <Route path="/luxury-marine-life-brand" element={<LuxuryMarineLifeBrandPage />} />
            <Route path="/hottie-yachtie-brand" element={<HottieYachtieBrandPage />} />
            <Route path="/ac-yacht-club-apparel" element={<AcYachtClubBrandPage />} />
            <Route path="/shopify-demo" element={<ShopifyDemoPage />} />
            <Route path="/sustainable-tech" element={<SustainableTechPage />} />
            <Route path="/sustainable-tech/:brandSlug" element={<SustainableTechBrandPage />} />
            <Route path="/partners" element={<PartnersPage />} />
          </Routes>
        </main>

        {/* Global AI Chatbot — available on all pages */}
        <ShopChatbot />
      </div>
    </CartProvider>
  );
}

export default RoutedApp;
