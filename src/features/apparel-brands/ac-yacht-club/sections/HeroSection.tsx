import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content) return;

    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(content.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
      );

    }, hero);

    return () => ctx.revert();
  }, []);

  const scrollToShop = () => {
    const shopSection = document.querySelector('#shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-harbor ac-yc-grain-overlay overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-harbor.webp"
          alt="Luxury harbor"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-harbor/60 via-harbor/40 to-harbor" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main Hero Content */}
        <div className="flex-1 flex items-center px-6 lg:px-12 pt-24 pb-12">
          <div className="w-full max-w-7xl mx-auto">
              {/* Hero Content - Centered */}
              <div ref={contentRef} className="max-w-3xl mx-auto text-center">
                <span className="label-mono text-gold">The Founder Collection</span>
                <h1 className="mt-4 font-serif text-ivory" style={{ fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 0.95 }}>
                  Elevated<br />
                  <span className="text-gradient-gold">Yacht Club</span><br />
                  Style
                </h1>
                <p className="mt-6 text-slate/80 text-lg max-w-2xl mx-auto leading-relaxed">
                  Premium apparel and accessories crafted for the discerning gentleman. 
                  From the deck to the dinner party, dress with distinction.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <button onClick={scrollToShop} className="px-8 py-3 bg-gold text-harbor font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:bg-gold-light shadow-glow flex items-center gap-2 mx-auto">
                    Shop Collection
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-16 flex flex-wrap items-center justify-center gap-6 lg:gap-12">
                  <div>
                    <p className="font-serif text-2xl text-gold">Free</p>
                    <p className="text-xs text-slate/60">Global Shipping</p>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-gold/20" />
                  <div>
                    <p className="font-serif text-2xl text-gold">30 Day</p>
                    <p className="text-xs text-slate/60">Easy Returns</p>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-gold/20" />
                  <div>
                    <p className="font-serif text-2xl text-gold">Italian</p>
                    <p className="text-xs text-slate/60">Craftsmanship</p>
                  </div>
                </div>
              </div>
          </div>
        </div>


        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate/40 mb-1">Scroll</span>
          <ChevronDown className="w-4 h-4 text-slate/40 animate-bounce" strokeWidth={1} />
        </div>
      </div>
    </section>
  );
}
