import { useEffect, useRef, useState } from "react";
import { ShoppingBag, Eye, Star } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { products } from "../data/products";

export default function CollectionGrid() {
  const { setSelectedProduct, setCurrentView, addToCart, setIsCartOpen } =
    useStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleQuickAdd = (
    e: React.MouseEvent,
    product: (typeof products)[0],
  ) => {
    e.stopPropagation();
    addToCart(product, 1, product.sizes[1], product.colors[0].name);
    setIsCartOpen(true);
  };

  const handleProductClick = (product: (typeof products)[0]) => {
    setSelectedProduct(product);
    setCurrentView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const featuredProducts = products.slice(0, 4);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-[#f8f6f3]"
    >
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span
              className={`text-[#c9a962] text-xs uppercase tracking-[0.3em] font-medium mb-4 block transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              The Collection
            </span>
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl text-[#0a1628] font-light transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Featured <span className="italic text-[#1e6b7a]">Pieces</span>
            </h2>
          </div>
          <button
            onClick={() => setCurrentView("products")}
            className={`text-sm uppercase tracking-widest text-[#0a1628] underline-animation transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            View All Products
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
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

                <div
                  className={`absolute inset-0 bg-[#0a1628]/40 flex items-center justify-center gap-4 transition-opacity duration-500 ${
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product);
                    }}
                    className="w-12 h-12 bg-white flex items-center justify-center hover:bg-[#c9a962] transition-colors duration-300"
                    title="Quick View"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="w-12 h-12 bg-white flex items-center justify-center hover:bg-[#c9a962] transition-colors duration-300"
                    title="Quick Add"
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
                <div className="flex items-center gap-1 pt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-[#c9a962] text-[#c9a962]"
                    />
                  ))}
                  <span className="text-xs text-[#0a1628]/40 ml-2">(48)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-16 text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={() => setCurrentView("products")}
            className="px-12 py-4 bg-[#0a1628] text-white text-sm uppercase tracking-widest hover:bg-[#1a2a44] transition-colors duration-500"
          >
            Explore Full Collection
          </button>
        </div>
      </div>
    </section>
  );
}

