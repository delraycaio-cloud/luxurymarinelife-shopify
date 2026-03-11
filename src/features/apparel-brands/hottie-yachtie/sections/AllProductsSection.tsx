import { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, Search, Star, Loader2 } from 'lucide-react';
import { fetchProducts } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

interface AllProductsSectionProps {
  zIndex: number;
  onProductClick: (product: ShopifyProduct) => void;
}

export default function AllProductsSection({ zIndex, onProductClick }: AllProductsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(50);
        // Filter by HYYC vendor
        const filtered = data.filter(p => 
          p.node.vendor?.toLowerCase().includes('yachtie') || 
          p.node.vendor?.toLowerCase().includes('hottie yachtie yacht club')
        );
        setProducts(filtered);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const productCategories = useMemo(() => 
    ['All', ...new Set(products.map(p => p.node.productType || 'Uncategorized'))].filter(Boolean)
  , [products]);

  // Filter products
  const filteredProducts = useMemo(() => 
    products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || (product.node.productType || 'Uncategorized') === selectedCategory;
      const matchesSearch = product.node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (product.node.productType || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
  , [products, selectedCategory, searchQuery]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const priceA = parseFloat(a.node.priceRange.minVariantPrice.amount);
      const priceB = parseFloat(b.node.priceRange.minVariantPrice.amount);
      switch (sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        default:
          return 0; // Natural Shopify order
      }
    });
  }, [filteredProducts, sortBy]);

  useEffect(() => {
    if (loading) return;
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
        gsap.set(cards, { y: 40, opacity: 0 });
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        });
      }
    }, section);

    return () => ctx.revert();
  }, [loading, products.length, selectedCategory, sortBy]); // Removed searchQuery and the sortedProducts reference to prevent redraws on typing/cart updates

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
            <div className="relative flex-1 max-w-md group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F6F6F8]/50 transition-colors group-focus-within:text-[#FF1F3D]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border-b border-[#F6F6F8]/10 text-[#F6F6F8] placeholder:text-[#F6F6F8]/40 focus:border-[#FF1F3D] transition-colors outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-[#1a1a1a] border border-[#F6F6F8]/10 text-[#F6F6F8] text-sm focus:border-[#FF1F3D] transition-colors cursor-pointer outline-none rounded-lg"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {productCategories.map((cat) => ( cat && (
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
            )))}
          </div>

          {/* Results Count */}
          <div className="mt-4 text-[#F6F6F8]/50 text-sm">
            {loading ? 'Fetching gear...' : `Showing ${sortedProducts.length} products`}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#FF1F3D] animate-spin mb-4" />
            <span className="text-white/30 text-sm italic">Loading Collection...</span>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.node.id}
                product={product}
                onClick={() => onProductClick(product)}
                onAddToCart={(e) => {
                  e.stopPropagation();
                  const firstVariant = product.node.variants.edges[0]?.node;
                  if (firstVariant) {
                    addItem({
                      product,
                      variantId: firstVariant.id,
                      variantTitle: firstVariant.title,
                      price: firstVariant.price,
                      quantity: 1,
                      selectedOptions: firstVariant.selectedOptions || []
                    });
                    toast.success("Added to cart");
                  }
                }}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-[#F6F6F8]/50 text-lg mb-2">No products found</div>
            <div className="text-[#F6F6F8]/30 text-sm">Try adjusting your filters</div>
          </div>
        )}
      </div>
    </section>
  );
}

// Product Card Component (Restored to original design)
interface ProductCardProps {
  product: ShopifyProduct;
  onClick: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { node } = product;
  const price = node.priceRange.minVariantPrice.amount;
  const image = node.images.edges[0]?.node?.url;

  return (
    <div
      className="product-card group cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] bg-[#1a1a1a] overflow-hidden mb-4 rounded-lg">
        {image ? (
          <img
            src={image}
            alt={node.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5">
            <ShoppingBag className="text-white/10 w-10 h-10" />
          </div>
        )}
        
        {/* Quick Add Button */}
        <button
          onClick={onAddToCart}
          className={`absolute bottom-3 right-3 w-10 h-10 bg-[#0B0B0D] text-[#F6F6F8] flex items-center justify-center transition-all duration-300 hover:bg-[#FF1F3D] rounded-full ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <ShoppingBag size={18} />
        </button>
      </div>

      {/* Info */}
      <div>
        <div className="hyyc-micro-label text-[#F6F6F8]/50 mb-1">{node.productType || 'Capsule'}</div>
        <h3 className="text-[#F6F6F8] font-medium mb-2 group-hover:text-[#FF1F3D] transition-colors line-clamp-1">
          {node.title}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-[#F6F6F8] font-bold">${parseFloat(price).toFixed(0)}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star size={12} className="fill-[#FF1F3D] text-[#FF1F3D]" />
          <span className="text-[#F6F6F8]/50 text-xs">Premium Quality</span>
        </div>
      </div>
    </div>
  );
}
