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
import { ChartersDestinationsSection } from "@/sections/ChartersDestinationsSection";
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
            <p>We partner with the International SeaKeepers Society to fund reef restoration, marine debris removal, and ocean science.</p>
            <p className="mt-3 text-white/90 font-semibold">🌊 37 cleanups · 1,468 volunteers · 5,400 lbs of debris removed in 2024</p>
          </>
        }
        backgroundImage="/statement_water_bg.webp"
        zIndex={20}
        cta={{ text: "Donate to SeaKeepers", onClick: () => window.open('https://www.seakeepers.org/donate/', '_blank') }}
        secondaryCta={{ text: "See Our Impact →", onClick: () => window.open('https://garmnconnect.web.app', '_blank') }}
      />

      <StatementSection
        id="animals"
        headline="HEALTHY ANIMALS"
        body={
          <>
            <p>We support Pelican Harbor Seabird Station — Miami's only wild bird rescue — rehabilitating injured and orphaned wildlife across South Florida.</p>
            <p className="mt-3 text-white/90 font-semibold">🐦 2,476 animals treated · 148 species · 14 new species in 2024</p>
          </>
        }
        backgroundImage="/statement_animals_bg.webp"
        zIndex={30}
        cta={{ text: "Donate to Pelican Harbor", onClick: () => window.open('https://www.pelicanharbor.org/donate', '_blank') }}
      />

      <StatementSection
        id="experience"
        headline="YOUR YACHT. YOUR FLOATING WELLNESS SYSTEM."
        body="SmartYacht-certified vessels combine luxury with performance — cold plunge, recovery protocols, and nano-nutrient delivery on the open water. This isn't a spa day. It's a biological edge."
        backgroundImage="/experience_yacht_bg.webp"
        zIndex={40}
        cta={{ text: "Explore UltraShear™", onClick: () => navigate('/ultra-shear') }}
        secondaryCta={{ text: "🎁 Gift a Charter Adventure →", onClick: () => window.open('https://luxurymarinelife.com/charter', '_blank') }}
      />

      <StatementSection
        id="philanthropy"
        headline="10% TO THE OCEAN"
        body={
          <>
            <p>10% of every sale funds conservation and education — healthy water, healthy animals, healthy people.</p>
            <p className="mt-5 text-teal font-display font-bold text-xl lg:text-2xl">Health on the Water — by GARMN</p>
            <p className="mt-2 text-white/65 text-sm">GARMN (Global Aquatic Resource Management Network) is our 501(c)(3) non-profit partner powering immersive learning, ocean cleanup, and wellness on the water across Miami-Dade County.</p>

            {/* Buy One Give One Banner */}
            <div className="mt-5 rounded-xl border border-teal/30 bg-teal/10 px-5 py-3 text-center">
              <p className="text-teal font-display font-bold text-lg">🤝 BUY ONE · GIVE ONE</p>
              <p className="mt-1 text-white/70 text-xs">Book a charter or buy a gift card — we fund a student&apos;s learning adventure on the water.</p>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-left max-w-2xl mx-auto">
              <p className="text-white/90 font-semibold text-sm">🎓 Healthy Students — Immersive ocean-based STEM education for Miami-Dade youth</p>
              <p className="text-white/90 font-semibold text-sm">🪄 Magic Adventures — Hands-on field trips and Magic School Box STEM kits</p>
              <p className="text-white/90 font-semibold text-sm">🧹 Ocean Cleanup — Beach and reef debris removal with student volunteers</p>
              <p className="text-white/90 font-semibold text-sm">🎣 Fishing &amp; Learning — Guided fishing trips combined with marine science</p>
              <p className="text-white/90 font-semibold text-sm">🌊 Learning on the Water — Kayak, snorkel, and dive programs for all ages</p>
              <p className="text-white/90 font-semibold text-sm">🎖️ Veteran Adventures — Ocean recovery and wellness trips for veterans</p>
            </div>

            {/* Tax-Deductible Gift Card Tiers */}
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-teal font-display font-bold text-base">🎁 Tax-Deductible Donation Gift Cards</p>
              <p className="mt-1 text-white/50 text-xs">501(c)(3) tax-deductible · 100% funds immersive learning adventures</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {['$50', '$100', '$250', '$500', '$1,000'].map((tier) => (
                  <a
                    key={tier}
                    href="https://garmnconnect.web.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-teal/40 bg-teal/10 px-4 py-1.5 text-xs font-bold text-teal transition hover:bg-teal/20 hover:border-teal/60"
                  >
                    {tier}
                  </a>
                ))}
              </div>
            </div>

            {/* Cross-link to main site GARMN pages */}
            <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
              <a href="https://luxurymarinelife.com/garmn.yacht" target="_blank" rel="noopener noreferrer" className="text-teal/70 underline underline-offset-2 hover:text-teal transition">GARMN.Yacht Tax Strategy →</a>
              <a href="https://luxurymarinelife.com/garmn.boat" target="_blank" rel="noopener noreferrer" className="text-teal/70 underline underline-offset-2 hover:text-teal transition">GARMN.Boat Private Access →</a>
              <a href="https://luxurymarinelife.com/garmn/depreciation" target="_blank" rel="noopener noreferrer" className="text-teal/70 underline underline-offset-2 hover:text-teal transition">Tax Advantages →</a>
            </div>
          </>
        }
        backgroundImage="/impact_reef_bg.webp"
        zIndex={50}
        cta={{ text: "Donate to GARMN", onClick: () => window.open('https://garmnconnect.web.app', '_blank') }}
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
