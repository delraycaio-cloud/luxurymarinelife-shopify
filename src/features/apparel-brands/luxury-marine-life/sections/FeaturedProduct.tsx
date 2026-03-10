import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ShoppingBag,
  Star,
} from "lucide-react";
import { useStore } from "../context/StoreContext";
import { products } from "../data/products";

export default function FeaturedProduct() {
  const { setSelectedProduct, setCurrentView, addToCart, setIsCartOpen } =
    useStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(products[1].colors[0]);

  const product = products[1];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize, selectedColor.name);
    setIsCartOpen(true);
  };

  const handleViewProduct = () => {
    setSelectedProduct(product);
    setCurrentView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-[#f8f6f3]"
    >
      <div className="container-luxury">
        <div className="text-center mb-16">
          <span
            className={`text-[#c9a962] text-xs uppercase tracking-[0.3em] font-medium mb-4 block transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Flagship Piece
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            className={`relative transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e6e3]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-[#c9a962] text-[#0a1628] text-xs uppercase tracking-widest font-medium">
                  Limited Edition
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              {product.images.slice(0, 3).map((img, index) => (
                <div
                  key={index}
                  className="w-20 h-20 bg-[#e8e6e3] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#c9a962] text-[#c9a962]"
                  />
                ))}
              </div>
              <span className="text-sm text-[#0a1628]/50">(127 reviews)</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#0a1628] font-light mb-4">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-2xl md:text-3xl text-[#0a1628] font-medium">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-[#0a1628]/40 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-[#0a1628]/70 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {product.features.slice(0, 4).map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1e6b7a]" />
                  <span className="text-sm text-[#0a1628]/60">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label className="text-sm text-[#0a1628]/60 uppercase tracking-wider mb-3 block">
                Color:{" "}
                <span className="text-[#0a1628]">{selectedColor.name}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      selectedColor.name === color.name
                        ? "border-[#0a1628] scale-110"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="text-sm text-[#0a1628]/60 uppercase tracking-wider mb-3 block">
                Size: <span className="text-[#0a1628]">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-[#0a1628] text-white"
                        : "bg-white border border-[#0a1628]/20 text-[#0a1628] hover:border-[#0a1628]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 px-8 py-4 bg-[#0a1628] text-white text-sm uppercase tracking-widest font-medium hover:bg-[#1a2a44] transition-colors duration-300 flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleViewProduct}
                className="px-8 py-4 border-2 border-[#0a1628] text-[#0a1628] text-sm uppercase tracking-widest font-medium hover:bg-[#0a1628] hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
              >
                View Details
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-[#0a1628]/10 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm text-[#0a1628]/50">
                <Check className="w-4 h-4 text-[#1e6b7a]" />
                Free Shipping
              </div>
              <div className="flex items-center gap-2 text-sm text-[#0a1628]/50">
                <Check className="w-4 h-4 text-[#1e6b7a]" />
                30-Day Returns
              </div>
              <div className="flex items-center gap-2 text-sm text-[#0a1628]/50">
                <Check className="w-4 h-4 text-[#1e6b7a]" />
                2-Year Warranty
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

