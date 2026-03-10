import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, Filter, Search, Star, ChevronDown } from 'lucide-react';
import { products, productCategories } from '../data/products';
import type { Product } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface AllProductsSectionProps {
  zIndex: number;
  onProductClick: (product: Product) => void;
  onAddToCart: () => void;
}

export default function AllProductsSection({ zIndex, onProductClick, onAddToCart }: AllProductsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    }
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      const cards = gridRef.current?.querySelectorAll('.product-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [sortedProducts]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0B0B0D] min-h-screen py-20"
      style={{ zIndex }}
    >
      <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <div className="hyyc-micro-label text-[#FF1F3D] mb-2">Shop Everything</div>
          <h2 className="hyyc-font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F6F6F8] mb-6">
            All Products
          </h2>
          
          {/* Search & Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F6F6F8]/50" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#F6F6F8]/10 text-[#F6F6F8] placeholder:text-[#F6F6F8]/40 focus:border-[#FF1F3D] transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Category Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border border-[#F6F6F8]/10 text-[#F6F6F8] hover:border-[#FF1F3D] transition-colors"
                >
                  <Filter size={18} />
                  <span className="text-sm">{selectedCategory}</span>
                  <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                {showFilters && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-[#1a1a1a] border border-[#F6F6F8]/10 z-20">
                    {productCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setShowFilters(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          selectedCategory === cat
                            ? 'bg-[#FF1F3D] text-[#F6F6F8]'
                            : 'text-[#F6F6F8]/70 hover:bg-[#F6F6F8]/10'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-[#1a1a1a] border border-[#F6F6F8]/10 text-[#F6F6F8] text-sm focus:border-[#FF1F3D] transition-colors cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {productCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#FF1F3D] text-[#F6F6F8]'
                    : 'bg-[#1a1a1a] text-[#F6F6F8]/70 hover:bg-[#F6F6F8]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mt-4 text-[#F6F6F8]/50 text-sm">
            Showing {sortedProducts.length} products
          </div>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
              onAddToCart={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
            />
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-[#F6F6F8]/50 text-lg mb-2">No products found</div>
            <div className="text-[#F6F6F8]/30 text-sm">Try adjusting your filters</div>
          </div>
        )}
      </div>
    </section>
  );
}

// Product Card Component
interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="product-card group cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] bg-[#1a1a1a] overflow-hidden mb-4 rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-[#FF1F3D] text-[#F6F6F8] px-2 py-1 text-xs hyyc-font-display uppercase tracking-wider">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#F6F6F8] text-[#0B0B0D] px-2 py-1 text-xs hyyc-font-display uppercase tracking-wider">
              Bestseller
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-[#8B0000] text-[#F6F6F8] px-2 py-1 text-xs hyyc-font-display uppercase tracking-wider">
              Sale
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={onAddToCart}
          className={`absolute bottom-3 right-3 w-10 h-10 bg-[#0B0B0D] text-[#F6F6F8] flex items-center justify-center transition-all duration-300 hover:bg-[#FF1F3D] rounded-full ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <ShoppingBag size={18} />
        </button>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-[#0B0B0D]/70 flex items-center justify-center">
            <span className="text-[#F6F6F8] hyyc-font-display uppercase tracking-wider">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <div className="hyyc-micro-label text-[#F6F6F8]/50 mb-1">{product.category}</div>
        <h3 className="text-[#F6F6F8] font-medium mb-2 group-hover:text-[#FF1F3D] transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-[#F6F6F8] font-bold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-[#F6F6F8]/50 line-through text-sm">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star size={12} className="fill-[#FF1F3D] text-[#FF1F3D]" />
          <span className="text-[#F6F6F8]/50 text-xs">4.9</span>
        </div>
      </div>
    </div>
  );
}
