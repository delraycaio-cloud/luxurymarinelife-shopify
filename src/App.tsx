import { useEffect, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { Navigation } from "@/components/custom/Navigation";
import { HeroSection } from "@/sections/HeroSection";
import { StatementSection } from "@/sections/StatementSection";
import { ShopSection } from "@/sections/ShopSection";
import { FeaturedProductSection } from "@/sections/FeaturedProductSection";
import { Footer } from "@/sections/Footer";
import { ConnectSection } from "@/sections/ConnectSection";
import { FoundersSection } from "@/sections/FoundersSection";
import { TrustBar } from "@/components/custom/TrustBar";
import { ServicesSection } from "@/sections/ServicesSection";
import { ChartersDestinationsSection } from "@/sections/ChartersDestinationsSection";
import { ShopChatbot } from "@/components/custom/ShopChatbot";
import { InfoPopup } from "@/components/custom/InfoPopup";

// --- Code-split route pages (lazy loaded) ---
const UltraShearPage = lazy(() => import("@/features/ultra-shear/UltraShearPage").then(m => ({ default: m.UltraShearPage })));
const ApparelBrandsPage = lazy(() => import("@/features/apparel-brands/ApparelBrandsPage").then(m => ({ default: m.ApparelBrandsPage })));
const LuxuryMarineLifeBrandPage = lazy(() => import("@/features/apparel-brands/luxury-marine-life/LuxuryMarineLifeBrandPage").then(m => ({ default: m.LuxuryMarineLifeBrandPage })));
const HottieYachtieBrandPage = lazy(() => import("@/features/apparel-brands/hottie-yachtie/HottieYachtieBrandPage"));
const AcYachtClubBrandPage = lazy(() => import("@/features/apparel-brands/ac-yacht-club/AcYachtClubBrandPage"));
const ShopifyDemoPage = lazy(() => import("@/features/shopify-demo/ShopifyDemoPage"));
const SustainableTechPage = lazy(() => import("@/features/sustainable-tech/SustainableTechPage").then(m => ({ default: m.SustainableTechPage })));
const SustainableTechBrandPage = lazy(() => import("@/features/sustainable-tech/SustainableTechBrandPage").then(m => ({ default: m.SustainableTechBrandPage })));
const PartnersPage = lazy(() => import("@/features/partners/PartnersPage").then(m => ({ default: m.PartnersPage })));
const BiohackingBundlesPage = lazy(() => import("@/sections/BiohackingBundlesPage").then(m => ({ default: m.BiohackingBundlesPage })));
const PrivacyPage = lazy(() => import("@/features/legal/PrivacyPage").then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("@/features/legal/TermsPage").then(m => ({ default: m.TermsPage })));
const GiftCardsPage = lazy(() => import("@/features/gift-cards/GiftCardsPage").then(m => ({ default: m.GiftCardsPage })));

// Minimal loading fallback for lazy routes
function LazyFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-marine-900">
      <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin" />
    </div>
  );
}



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
        id="people"
        headline="HEALTHY PEOPLE"
        body={
          <>
            <p>98% bioavailability. Absorbed in minutes, not hours.</p>
            <InfoPopup label="How it works">
              <p className="text-teal font-display font-bold text-lg">UltraShear NanoSpray™</p>
              <p>Clinical-grade nutrients processed at 40,000 PSI — creating 20–80nm nanoemulsions that bypass the gut and flood your bloodstream in 3–5 minutes.</p>
              <p>💪 3 clinical protocols · Trusted by elite athletes & executives</p>
            </InfoPopup>
          </>
        }
        backgroundImage="/hero_wellness_bg.webp"
        zIndex={20}
        cta={{ text: "Explore UltraShear™", onClick: () => navigate('/ultra-shear') }}
        secondaryCta={{ text: "Shop Bundles →", onClick: () => navigate('/biohacking-bundles') }}
      />

      <StatementSection
        id="impact"
        headline="HEALTHY WATER"
        body={
          <>
            <p>37 cleanups · 1,468 volunteers · 5,400 lbs removed in 2024</p>
            <InfoPopup label="Our partners">
              <p className="text-teal font-display font-bold text-lg">International SeaKeepers Society</p>
              <p>We fund reef restoration, marine debris removal, and ocean science across South Florida and the Caribbean.</p>
              <p>🌊 Every purchase cleans the ocean you love.</p>
            </InfoPopup>
          </>
        }
        backgroundImage="/statement_water_bg.webp"
        zIndex={30}
        cta={{ text: "Donate to SeaKeepers", onClick: () => window.open('https://www.seakeepers.org/donate/', '_blank') }}
        secondaryCta={{ text: "Our Impact →", onClick: () => window.open('https://luxurymarinelife.com/garmn', '_blank') }}
      />

      <StatementSection
        id="animals"
        headline="HEALTHY ANIMALS"
        body={
          <>
            <p>2,476 animals treated · 148 species · Miami's only wild bird rescue</p>
            <InfoPopup label="About Pelican Harbor">
              <p className="text-teal font-display font-bold text-lg">Pelican Harbor Seabird Station</p>
              <p>Rehabilitating injured and orphaned wildlife across South Florida since 1980. 14 new species treated in 2024 alone.</p>
              <p>🐦 Your purchase supports wildlife rescue and habitat restoration.</p>
            </InfoPopup>
          </>
        }
        backgroundImage="/statement_animals_bg.webp"
        zIndex={40}
        cta={{ text: "Donate to Pelican Harbor", onClick: () => window.open('https://www.pelicanharbor.org/donate', '_blank') }}
      />

      <StatementSection
        id="philanthropy"
        headline="10% TO THE OCEAN"
        body={
          <>
            <p>Every sale funds conservation, education, and wildlife rescue.</p>
            <p className="mt-3 text-teal font-display font-bold text-lg">🤝 BUY ONE · GIVE ONE</p>
            <InfoPopup label="See all GARMN programs">
              <p className="text-teal font-display font-bold text-lg">Health on the Water — by GARMN</p>
              <p>GARMN (Global Aquatic Resource Management Network) is our 501(c)(3) non-profit powering immersive learning across Miami-Dade County.</p>
              <div className="mt-3 space-y-2">
                <p>🎓 <strong>Healthy Students</strong> — Ocean-based STEM education for Miami-Dade youth</p>
                <p>🪄 <strong>Magic Adventures</strong> — Field trips and Magic School Box STEM kits</p>
                <p>🧹 <strong>Ocean Cleanup</strong> — Beach and reef debris removal</p>
                <p>🎣 <strong>Fishing & Learning</strong> — Guided fishing trips + marine science</p>
                <p>🌊 <strong>Learning on the Water</strong> — Kayak, snorkel, and dive programs</p>
                <p>🎖️ <strong>Veteran Adventures</strong> — Ocean recovery and wellness trips</p>
              </div>
              <p className="mt-3 text-white/50 text-xs">Book a charter or buy a gift card — we fund a student's learning adventure on the water.</p>
            </InfoPopup>
          </>
        }
        backgroundImage="/impact_reef_bg.webp"
        zIndex={50}
        cta={{ text: "Donate to GARMN", onClick: () => window.open('https://luxurymarinelife.com/garmn', '_blank') }}
        secondaryCta={{ text: "Shop with Purpose", onClick: scrollToShop }}
      />

      <ShopSection onCategoryClick={handleCategoryClick} />
      <ServicesSection />
      <ChartersDestinationsSection />
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
  const isLmlRoute = location.pathname === "/luxury-marine-life-brand";
  const isHyycRoute = location.pathname === "/hottie-yachtie-brand";
  const isAcYcRoute = location.pathname === "/ac-yacht-club-apparel";

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
    const SITE = "https://luxurymarinelife.shop";
    const path = location.pathname;

    // --- Canonical ---
    const canonicalLink =
      document.querySelector('link[rel="canonical"]') ||
      document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    canonicalLink.setAttribute("href", `${SITE}${path}`);
    if (!document.querySelector('link[rel="canonical"]')) {
      document.head.appendChild(canonicalLink);
    }

    // --- Helper: set or create a meta tag ---
    const setMeta = (attr: string, key: string, value: string) => {
      const sel = `meta[${attr}="${key}"]`;
      const el = document.querySelector(sel) || document.createElement("meta");
      el.setAttribute(attr, key);
      el.setAttribute("content", value);
      if (!document.querySelector(sel)) document.head.appendChild(el);
    };

    // --- Route-specific SEO config ---
    type SEO = { title: string; desc: string; image: string };
    const seoMap: Record<string, SEO> = {
      "/ultra-shear": {
        title: "UltraShear™ Nano-Emulsified Supplements | Luxury Marine Life",
        desc: "UltraShear Technology™ transforms oil-based supplements into highly bioavailable nanoemulsions. Omega-3, Vitamin D3, CoQ10 & CBD in one precision spray.",
        image: `${SITE}/images/oil_hero1.webp`,
      },
      "/apparel-brands": {
        title: "Premium Yacht Apparel Brands | Luxury Marine Life Shop",
        desc: "Shop three luxury yacht apparel capsules — Luxury Marine Life, Hottie Yachtie Yacht Club, and AC Yacht Club. Sustainable fabrics, UPF 50+, built for sun, salt & high-performance living.",
        image: `${SITE}/images/lml-brand-image.webp`,
      },
      "/luxury-marine-life-brand": {
        title: "Luxury Marine Life Apparel | Sustainable Yacht Wear & Ocean-Inspired Designs",
        desc: "Shop the official Luxury Marine Life apparel collection — premium tees, performance polos, and ocean-inspired designs. UPF 50+ protection, sustainable fabrics. 10% to ocean restoration.",
        image: `${SITE}/hero-main.webp`,
      },
      "/hottie-yachtie-brand": {
        title: "Hottie Yachtie Yacht Club | Bold Party Wear for the Open Sea",
        desc: "Shop Hottie Yachtie Yacht Club — after-dark deck energy meets premium craftsmanship. Statement pieces built to read premium from twenty feet away.",
        image: `${SITE}/hero_deck_party.webp`,
      },
      "/ac-yacht-club-apparel": {
        title: "AC Yacht Club | Elevated Yacht Club Style & Gentleman's Apparel",
        desc: "Shop the AC Yacht Club Founder Collection — Italian craftsmanship, clean lines, quiet flex. Premium apparel for the discerning gentleman, from deck to dinner party.",
        image: `${SITE}/images/hero-harbor.webp`,
      },
      "/sustainable-tech": {
        title: "Sustainable Marine Technology | Luxury Marine Life",
        desc: "Clean innovations for the water you love — filtration, solar energy, water monitoring, and waste management solutions for marine environments.",
        image: `${SITE}/hero_wellness_bg.webp`,
      },
      "/partners": {
        title: "Become a Partner | Luxury Marine Life Affiliate Program",
        desc: "Earn commissions as an affiliate or list your products on Luxury Marine Life. Join our premium marine lifestyle marketplace and grow your brand.",
        image: `${SITE}/hero_wellness_bg.webp`,
      },
      "/biohacking-bundles": {
        title: "Biohacking Bundles | Clinical-Grade NanoSpray Protocols",
        desc: "Biohacker's Stack, Yacht Club Essentials, and Health CEO Annual Supply — clinical-grade NanoSpray bundles with exclusive savings up to 30%.",
        image: `${SITE}/images/oil_hero1.webp`,
      },
      "/privacy": {
        title: "Privacy Policy | Luxury Marine Life",
        desc: "Learn how Luxury Marine Life collects, uses, and protects your personal data. Your privacy matters to us.",
        image: `${SITE}/hero_wellness_bg.webp`,
      },
      "/terms": {
        title: "Terms of Service | Luxury Marine Life",
        desc: "Read the Terms of Service for Luxury Marine Life — pricing, shipping, returns, intellectual property, and governing law.",
        image: `${SITE}/hero_wellness_bg.webp`,
      },
      "/gift-cards": {
        title: "Donation Gift Cards | Tax-Deductible Ocean Education | Luxury Marine Life",
        desc: "Purchase tax-deductible donation gift cards. 100% funds GARMN immersive learning adventures — STEM education, ocean cleanup, and veteran wellness programs.",
        image: `${SITE}/hero_wellness_bg.webp`,
      },
    };

    const defaultSeo: SEO = {
      title: "Luxury Marine Life | Premium Wellness & Lifestyle for the Water",
      desc: "Premium wellness, performance apparel, and sustainable technology for life on the water. 10% of every purchase supports ocean restoration.",
      image: `${SITE}/hero_wellness_bg.webp`,
    };

    const seo = seoMap[path] ?? (path.startsWith("/sustainable-tech/")
      ? { title: "Sustainable Tech Brand | Luxury Marine Life", desc: "Explore innovative sustainable technology for marine environments — filtration, energy, and monitoring solutions.", image: `${SITE}/hero_wellness_bg.webp` }
      : defaultSeo);

    // --- Apply title + description ---
    document.title = seo.title;
    setMeta("name", "description", seo.desc);

    // --- Dynamic Open Graph ---
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.desc);
    setMeta("property", "og:image", seo.image);
    setMeta("property", "og:url", `${SITE}${path}`);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Luxury Marine Life");

    // --- Dynamic Twitter Cards ---
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.desc);
    setMeta("name", "twitter:image", seo.image);
  }, [location.pathname]);

  if (isLmlRoute) {
    return <Suspense fallback={<LazyFallback />}><LuxuryMarineLifeBrandPage /></Suspense>;
  }

  if (isHyycRoute) {
    return <Suspense fallback={<LazyFallback />}><HottieYachtieBrandPage /></Suspense>;
  }

  if (isAcYcRoute) {
    return <Suspense fallback={<LazyFallback />}><AcYachtClubBrandPage /></Suspense>;
  }

  return (
    <CartProvider>
      <div
        className={`relative min-h-screen ${isUltraShearRoute ? "bg-white" : "bg-marine-900"}`}
      >
        {!isUltraShearRoute && <div className="grain-overlay" />}
        {!isUltraShearRoute && <Navigation />}

        <main className="relative">
          <Suspense fallback={<LazyFallback />}>
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
              <Route path="/biohacking-bundles" element={<BiohackingBundlesPage onBack={() => window.history.back()} />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/gift-cards" element={<GiftCardsPage />} />
            </Routes>
          </Suspense>
        </main>

        {/* Global AI Chatbot — available on all pages */}
        <ShopChatbot />
      </div>
    </CartProvider>
  );
}

export default RoutedApp;
