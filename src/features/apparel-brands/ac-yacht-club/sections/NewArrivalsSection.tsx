import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { products } from '@/features/apparel-brands/ac-yacht-club/data';
import { useCart } from '@/features/apparel-brands/ac-yacht-club/context/CartContext';
import type { Product } from '@/features/apparel-brands/ac-yacht-club/types';

gsap.registerPlugin(ScrollTrigger);

interface NewArrivalsSectionProps {
  onProductClick: (product: Product) => void;
}

export function NewArrivalsSection({ onProductClick }: NewArrivalsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const newProducts = products.filter(p => p.isNew);
  const { addToCart } = useCart();

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const slider = sliderRef.current;

    if (!section || !header || !slider) return;

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

      const items = slider.querySelectorAll('.new-item');
      gsap.fromTo(items,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: slider,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0]?.name || '';
    addToCart(product, 1, defaultSize, defaultColor);
  };

  return (
    <section
      ref={sectionRef}
      id="new"
      className="relative bg-harbor-light/30 ac-yc-grain-overlay py-20 lg:py-28"
    >
      <div className="relative z-10">
        {/* Header */}
        <div ref={headerRef} className="px-6 lg:px-12 mb-10">
          <div className="max-w-7xl mx-auto flex items-end justify-between">
            <div>
              <span className="label-mono text-gold">Just Dropped</span>
              <h2 className="mt-2 font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                New Arrivals
              </h2>
            </div>
            <button 
              onClick={() => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden lg:flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Horizontal Slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 lg:gap-6 overflow-x-auto px-6 lg:px-12 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newProducts.map((product) => (
            <div
              key={product.id}
              className="new-item flex-shrink-0 w-[280px] lg:w-[320px] cursor-pointer group"
              onClick={() => onProductClick(product)}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] bg-harbor overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* New Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-gold text-harbor text-[10px] font-mono uppercase tracking-wider">
                  New
                </div>

                {/* Quick Add */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-harbor to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="w-full py-2 bg-gold text-harbor text-sm font-medium hover:bg-gold-light transition-colors"
                  >
                    Quick Add
                  </button>
                </div>
              </div>

              {/* Info */}
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate/50 mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif text-lg text-ivory group-hover:text-gold transition-colors">
                  {product.name}
                </h3>
                <p className="mt-1 font-mono text-gold">
                  ${product.price.toLocaleString()}

                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
