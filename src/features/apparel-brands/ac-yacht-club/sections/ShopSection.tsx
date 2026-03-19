import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchProducts } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';
import { useCart } from '@/features/apparel-brands/ac-yacht-club/context/CartContext';

gsap.registerPlugin(ScrollTrigger);

interface ShopSectionProps {
  onProductClick: (product: any) => void;
}

export function ShopSection({ onProductClick }: ShopSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const fetched = await fetchProducts(50, 'vendor:ac');
        setProducts(fetched);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach(p => {
      const cat = p.node.productType?.toLowerCase() || 'other';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    
    return Object.entries(counts).map(([id, count]) => ({
      id,
      label: id === 'all' ? 'All' : id.charAt(0).toUpperCase() + id.slice(1),
      count
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter(p => p.node.productType?.toLowerCase() === activeCategory);
  }, [products, activeCategory]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid || isLoading) return;

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
  }, [filteredProducts, isLoading]);

  const handleQuickAdd = (e: React.MouseEvent, product: ShopifyProduct) => {
    e.stopPropagation();
    const firstVariant = product.node.variants.edges[0]?.node;
    if (!firstVariant) return;

    const sizeOpt = firstVariant.selectedOptions.find((o: any) => o.name === 'Size')?.value || '';
    const colorOpt = firstVariant.selectedOptions.find((o: any) => o.name === 'Color')?.value || '';
    
    addToCart(product, 1, sizeOpt, colorOpt);
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
              {!isLoading && products.length > 0 && (
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
              )}
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.node.id}
                  className="product-card group cursor-pointer"
                  onMouseEnter={() => setHoveredId(product.node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onProductClick(product)}
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] bg-harbor-light overflow-hidden mb-3">
                    <img
                      src={product.node.images.edges[0]?.node.url}
                      alt={product.node.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay Actions */}
                    <div className={`absolute inset-0 bg-harbor/70 flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${
                      hoveredId === product.node.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="px-6 py-2.5 bg-gold text-harbor text-sm font-medium hover:bg-gold-light transition-colors"
                      >
                        Quick Add
                      </button>
                      <span className="text-xs text-slate">Click for details</span>
                    </div>

                    {/* Tags as Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.node.tags?.includes('New') && (
                        <span className="px-2 py-1 bg-gold text-harbor text-[10px] font-mono uppercase tracking-wider">
                          New
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate/50 mb-1">
                      {product.node.vendor}
                    </p>
                    <h3 className="font-serif text-base text-ivory group-hover:text-gold transition-colors leading-tight">
                      {product.node.title}
                    </h3>
                    <p className="mt-1 font-mono text-sm text-gold">
                      ${parseFloat(product.node.priceRange.minVariantPrice.amount).toLocaleString()}

                    </p>
                    
                    {/* Color Swatches from Variants */}
                    <div className="mt-2 flex items-center gap-1.5">
                      {/* Note: In a real app we'd extract unique colors from variants */}
                      {product.node.options.find(o => o.name === 'Color')?.values.slice(0, 4).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-3 h-3 rounded-full border border-gold/30"
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate/60">No products found for this collection.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
