import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X } from 'lucide-react';
import { lookbookItems, products } from '@/features/apparel-brands/ac-yacht-club/data';
import type { Product } from '@/features/apparel-brands/ac-yacht-club/types';

gsap.registerPlugin(ScrollTrigger);

interface LookbookSectionProps {
  onProductClick: (product: Product) => void;
}

export function LookbookSection({ onProductClick }: LookbookSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeLookbook, setActiveLookbook] = useState<string | null>(null);

  const activeItem = lookbookItems.find(item => item.id === activeLookbook);
  const activeProducts = activeItem 
    ? products.filter(p => activeItem.products.includes(p.id))
    : [];

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(header,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      const items = grid.querySelectorAll('.lookbook-item');
      gsap.fromTo(items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lookbook"
      className="relative bg-harbor ac-yc-grain-overlay py-20 lg:py-28"
    >
      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-12">
            <span className="label-mono text-gold">Style Guide</span>
            <h2 className="mt-2 font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
              The Lookbook
            </h2>
            <p className="mt-3 text-slate/70 max-w-lg">
              Styled looks for every occasion. From casual deck days to formal harbor evenings.
            </p>
          </div>

          {/* Lookbook Grid */}
          <div ref={gridRef} className="grid md:grid-cols-2 gap-4 lg:gap-6">
            {lookbookItems.map((item, index) => (
              <div
                key={item.id}
                className={`lookbook-item group relative overflow-hidden cursor-pointer ${
                  index === 0 ? 'md:row-span-2' : ''
                }`}
                onClick={() => setActiveLookbook(item.id)}
              >
                <div className={`relative ${index === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'} overflow-hidden`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-harbor/80 via-transparent to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gold">
                      Look {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 font-serif text-2xl lg:text-3xl text-ivory">
                      {item.title}
                    </h3>
                    <div className="mt-4 flex items-center gap-2 text-sm text-ivory/80 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Shop the look</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lookbook Modal */}
      {activeLookbook && activeItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-harbor/95 backdrop-blur-md"
            onClick={() => setActiveLookbook(null)}
          />
          
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-harbor-light overflow-auto">
            {/* Close */}
            <button
              onClick={() => setActiveLookbook(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-harbor/80 flex items-center justify-center text-ivory hover:text-gold transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="aspect-square md:aspect-auto">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Products */}
              <div className="p-8 lg:p-12">
                <span className="label-mono text-gold">Shop the Look</span>
                <h3 className="mt-2 font-serif text-3xl text-ivory">{activeItem.title}</h3>
                <p className="mt-3 text-slate/70">
                  Complete your ensemble with these curated pieces.
                </p>

                <div className="mt-8 space-y-4">
                  {activeProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setActiveLookbook(null);
                        onProductClick(product);
                      }}
                      className="flex items-center gap-4 p-3 bg-harbor/50 cursor-pointer hover:bg-harbor transition-colors"
                    >
                      <div className="w-20 h-20 bg-harbor flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-serif text-ivory">{product.name}</p>
                        <p className="text-xs text-slate/60">{product.category}</p>
                      </div>
                      <p className="font-mono text-gold">€{product.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveLookbook(null)}
                  className="mt-8 w-full btn-outline"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
