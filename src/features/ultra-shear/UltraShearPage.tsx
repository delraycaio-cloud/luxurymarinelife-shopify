import { useState } from "react";
import { AnnouncementBar } from "./sections/AnnouncementBar";
import { Header } from "./sections/Header";
import { HeroSlideshow } from "./sections/HeroSlideshow";
import { DualMediaBanners } from "./sections/DualMediaBanners";
import { ProductGrid } from "./sections/ProductGrid";
import { BioavailabilityGap } from "./sections/BioavailabilityGap";
import { USTTechnology } from "./sections/USTTechnology";
import { InsideFormula } from "./sections/InsideFormula";
import { FullWidthBanner } from "./sections/FullWidthBanner";
import { Protocol } from "./sections/Protocol";
import { SupplementFacts } from "./sections/SupplementFacts";
import { Testimonials } from "./sections/Testimonials";
import { About } from "./sections/About";
import { Features } from "./sections/Features";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import "./ultra-shear.css";

type Page = "home" | "products" | "discover" | "science" | "contact";

function HomePage() {
  return (
    <>
      <HeroSlideshow onNavigate={() => {}} />
      <DualMediaBanners onNavigate={() => {}} />
      <section className="hidden lg:block pt-6 bg-white">
        <div className="container-luxury flex justify-center">
          <div className="w-full flex flex-col items-center gap-4">
            <p className="label-text text-[#1A1A1A]">Check out our podcast</p>
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/episode/49iWFMBdWLQHqF6lcp0qlc?utm_source=generator"
              width="70%"
              height="246"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
      <BioavailabilityGap />
      <ProductGrid onNavigate={() => {}} />
      <USTTechnology />
      <InsideFormula />
      <FullWidthBanner onNavigate={() => {}} />
      <Protocol />
      <SupplementFacts />
      <Testimonials />
      <About onNavigate={() => {}} />
      <Features />
      <Contact />
    </>
  );
}

function ProductsPage() {
  return (
    <>
      <ProductGrid onNavigate={() => {}} />
    </>
  );
}

function DiscoverPage() {
  return (
    <>
      <div className="pt-32 pb-20 bg-white">
        <div className="container-luxury">
          <h1 className="font-serif text-5xl text-[#1A1A1A] mb-8">
            Discover Shear Sciences
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                At Shear Sciences, we're revolutionizing the way your body
                absorbs essential nutrients. Our revolutionary, patented
                UltraShear Technology™ (UST) transforms oil-based supplements
                into highly bioavailable nanoemulsions.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Traditional supplements suffer from poor absorption rates as low
                as 5-10% for oil-based pills. UST nanoemulsions offer 4-10X
                greater bioavailability, delivering nutrients directly to your
                bloodstream in just 3-5 minutes.
              </p>
            </div>
            <div className="h-[500px] bg-[#FAFAFA]">
              <img
                src="/images/oil_14.jpg"
                alt="Shear Sciences"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <About onNavigate={() => {}} />
      <Features />
      <Testimonials />
    </>
  );
}

function SciencePage() {
  return (
    <>
      <div className="pt-32 pb-20 bg-white">
        <div className="container-luxury">
          <h1 className="font-serif text-5xl text-[#1A1A1A] mb-8">
            The Science Behind UST
          </h1>
        </div>
      </div>
      <BioavailabilityGap />
      <USTTechnology />
      <InsideFormula />
      <Protocol />
      <SupplementFacts />
    </>
  );
}

export function UltraShearPage() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="ultra-shear-root min-h-screen bg-white">
      <AnnouncementBar />
      <Header onNavigate={handleNavigate} currentPage={currentPage} />

      <main>
        {currentPage === "home" && <HomePage />}
        {currentPage === "products" && <ProductsPage />}
        {currentPage === "discover" && <DiscoverPage />}
        {currentPage === "science" && <SciencePage />}
        {currentPage === "contact" && (
          <>
            <div className="pt-32 pb-10 bg-white">
              <div className="container-luxury">
                <h1 className="font-serif text-5xl text-[#1A1A1A] mb-8">
                  Contact Us
                </h1>
              </div>
            </div>
            <Contact />
          </>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
