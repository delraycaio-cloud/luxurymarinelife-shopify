import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { products } from '@/features/apparel-brands/ac-yacht-club/data';
import type { Product } from '@/features/apparel-brands/ac-yacht-club/types';

interface HeroSectionProps {
  onProductClick: (product: Product) => void;
}

export function HeroSection({ onProductClick }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  const featuredProducts = products.filter(p => p.featured).slice(0, 3);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const featured = featuredRef.current;

    if (!hero || !content || !featured) return;

    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(content.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
      );

      gsap.fromTo(featured.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.6 }
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
          src="/images/hero-harbor.jpg"
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text */}
              <div ref={contentRef}>
                <span className="label-mono text-gold">The Founder Collection</span>
                <h1 className="mt-4 font-serif text-ivory" style={{ fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 0.95 }}>
                  Elevated<br />
                  <span className="text-gradient-gold">Yacht Club</span><br />
                  Style
                </h1>
                <p className="mt-6 text-slate/80 text-lg max-w-md leading-relaxed">
                  Premium apparel and accessories crafted for the discerning gentleman. 
                  From the deck to the dinner party, dress with distinction.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button onClick={scrollToShop} className="btn-primary flex items-center gap-2">
                    Shop Collection
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <button onClick={scrollToShop} className="btn-outline">
                    View Lookbook
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-12 flex items-center gap-8">
                  <div>
                    <p className="font-serif text-2xl text-gold">Free</p>
                    <p className="text-xs text-slate/60">Global Shipping</p>
                  </div>
                  <div className="w-px h-10 bg-gold/20" />
                  <div>
                    <p className="font-serif text-2xl text-gold">30 Day</p>
                    <p className="text-xs text-slate/60">Easy Returns</p>
                  </div>
                  <div className="w-px h-10 bg-gold/20" />
                  <div>
                    <p className="font-serif text-2xl text-gold">Italian</p>
                    <p className="text-xs text-slate/60">Craftsmanship</p>
                  </div>
                </div>
              </div>

              {/* Right - Featured Product Preview */}
              <div className="hidden lg:block relative">
                <div className="aspect-[3/4] max-w-md mx-auto relative">
                  <img
                    src="/images/product-blazer.jpg"
                    alt="Featured Collection"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 bg-harbor/90 backdrop-blur-sm p-4">
                    <p className="text-xs text-gold font-mono uppercase tracking-wider">Featured</p>
                    <p className="font-serif text-lg text-ivory mt-1">Commodore Blazer</p>
                    <p className="font-mono text-gold mt-1">€1,250</p>
                  </div>
                </div>
                {/* Decorative */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-gold/30 -z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Strip */}
        <div className="px-6 lg:px-12 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="label-mono text-slate/60">Featured Pieces</span>
              <button onClick={scrollToShop} className="text-xs text-gold hover:text-gold-light transition-colors">
                View All →
              </button>
            </div>
            <div ref={featuredRef} className="grid grid-cols-3 gap-4 lg:gap-6">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onProductClick(product)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square bg-harbor-light overflow-hidden mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="font-serif text-sm text-ivory group-hover:text-gold transition-colors truncate">
                    {product.name}
                  </p>
                  <p className="font-mono text-xs text-gold mt-0.5">
                    €{product.price.toLocaleString()}
                  </p>
                </div>
              ))}
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
