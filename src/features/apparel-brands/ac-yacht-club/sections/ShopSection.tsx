import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products, categories } from '@/features/apparel-brands/ac-yacht-club/data';
import { useCart } from '@/features/apparel-brands/ac-yacht-club/context/CartContext';
import type { Product } from '@/features/apparel-brands/ac-yacht-club/types';

gsap.registerPlugin(ScrollTrigger);

interface ShopSectionProps {
  onProductClick: (product: Product) => void;
}

export function ShopSection({ onProductClick }: ShopSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const { addToCart } = useCart();

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

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
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      const items = grid.querySelectorAll('.product-card');
      gsap.fromTo(items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
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
  }, [filteredProducts]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0]?.name || '';
    addToCart(product, 1, defaultSize, defaultColor);
  };

  return (
    <section
      ref={sectionRef}
      id="shop"
      className="relative bg-harbor ac-yc-grain-overlay py-20 lg:py-28"
    >
      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <span className="label-mono text-gold">The Collection</span>
                <h2 className="mt-2 font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                  Shop All
                </h2>
                <p className="mt-3 text-slate/70 max-w-lg">
                  Premium apparel and accessories crafted with Italian materials 
                  and timeless attention to detail.
                </p>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 text-sm transition-all ${
                      activeCategory === cat.id
                        ? 'bg-gold text-harbor'
                        : 'bg-harbor-light text-slate hover:text-ivory border border-gold/20'
                    }`}
                  >
                    {cat.label}
                    <span className="ml-1.5 text-xs opacity-60">({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card group cursor-pointer"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onProductClick(product)}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-harbor-light overflow-hidden mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay Actions */}
                  <div className={`absolute inset-0 bg-harbor/70 flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${
                    hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="px-6 py-2.5 bg-gold text-harbor text-sm font-medium hover:bg-gold-light transition-colors"
                    >
                      Quick Add
                    </button>
                    <span className="text-xs text-slate">Click for details</span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                      <span className="px-2 py-1 bg-gold text-harbor text-[10px] font-mono uppercase tracking-wider">
                        New
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="px-2 py-1 bg-ivory text-harbor text-[10px] font-mono uppercase tracking-wider">
                        Bestseller
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate/50 mb-1">
                    {product.collection}
                  </p>
                  <h3 className="font-serif text-base text-ivory group-hover:text-gold transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-gold">
                    €{product.price.toLocaleString()}
                  </p>
                  
                  {/* Color Swatches */}
                  {product.colors.length > 1 && (
                    <div className="mt-2 flex items-center gap-1.5">
                      {product.colors.slice(0, 4).map((color) => (
                        <div
                          key={color.name}
                          className="w-3 h-3 rounded-full border border-gold/30"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                      {product.colors.length > 4 && (
                        <span className="text-[10px] text-slate/50">+{product.colors.length - 4}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate/60">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
