import { useMemo, useState } from "react";
import {
  ChevronDown,
  Eye,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useStore } from "../context/StoreContext";
import { products } from "../data/products";

export default function AllProducts() {
  const { setSelectedProduct, setCurrentView, addToCart, setIsCartOpen } =
    useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSort, setSelectedSort] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    switch (selectedSort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort(
          (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0),
        );
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedSort, priceRange]);

  const handleProductClick = (product: (typeof products)[0]) => {
    setSelectedProduct(product);
    setCurrentView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuickAdd = (
    e: React.MouseEvent,
    product: (typeof products)[0],
  ) => {
    e.stopPropagation();
    addToCart(product, 1, product.sizes[1], product.colors[0].name);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] pt-24 pb-20">
      <div className="container-luxury">
        <div className="mb-12">
          <span className="text-[#c9a962] text-xs uppercase tracking-[0.3em] font-medium mb-4 block">
            The Collection
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#0a1628] font-light mb-6">
            All <span className="italic text-[#1e6b7a]">Products</span>
          </h1>
          <p className="text-lg text-[#0a1628]/60 max-w-2xl">
            Discover our complete collection of luxury marine apparel, engineered
            for life on the water.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0a1628]/40" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#0a1628]/10 focus:border-[#0a1628] outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-[#0a1628]/40" />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none px-6 py-3 pr-12 bg-white border border-[#0a1628]/10 focus:border-[#0a1628] outline-none transition-colors cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a1628]/40 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="appearance-none px-6 py-3 pr-12 bg-white border border-[#0a1628]/10 focus:border-[#0a1628] outline-none transition-colors cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0a1628]/40 pointer-events-none" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-3 border transition-colors ${
              showFilters
                ? "bg-[#0a1628] text-white border-[#0a1628]"
                : "bg-white text-[#0a1628] border-[#0a1628]/10"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="bg-white p-6 mb-8 border border-[#0a1628]/10">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <label className="text-sm text-[#0a1628]/60 uppercase tracking-wider mb-4 block">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
              </div>

              <div className="flex-1">
                <label className="text-sm text-[#0a1628]/60 uppercase tracking-wider mb-4 block">
                  Filter By
                </label>
                <div className="flex flex-wrap gap-2">
                  {["New", "Limited Edition", "Bestseller", "Sustainable"].map(
                    (tag) => (
                      <button
                        key={tag}
                        className="px-4 py-2 border border-[#0a1628]/20 text-sm text-[#0a1628]/60 hover:border-[#0a1628] hover:text-[#0a1628] transition-colors"
                      >
                        {tag}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <span className="text-sm text-[#0a1628]/60">
            Showing {filteredProducts.length} of {products.length} products
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#e8e6e3] mb-5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="px-3 py-1 bg-[#0a1628] text-white text-xs uppercase tracking-wider">
                        New
                      </span>
                    )}
                    {product.isLimited && (
                      <span className="px-3 py-1 bg-[#c9a962] text-[#0a1628] text-xs uppercase tracking-wider">
                        Limited
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-[#0a1628]/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                      className="w-12 h-12 bg-white flex items-center justify-center hover:bg-[#c9a962] transition-colors duration-300"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="w-12 h-12 bg-white flex items-center justify-center hover:bg-[#c9a962] transition-colors duration-300"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[#0a1628] font-medium group-hover:text-[#1e6b7a] transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-[#0a1628] font-medium whitespace-nowrap">
                      ${product.price}
                    </span>
                  </div>
                  <p className="text-sm text-[#0a1628]/50 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {product.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-[#0a1628]/40 px-2 py-1 bg-[#0a1628]/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-[#0a1628]/60 mb-4">No products found</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setPriceRange([0, 500]);
              }}
              className="px-8 py-3 bg-[#0a1628] text-white text-sm uppercase tracking-widest hover:bg-[#1a2a44] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

