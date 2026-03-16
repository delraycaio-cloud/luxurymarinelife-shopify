import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ShoppingBag,
  Star,
  Loader2,
} from "lucide-react";
import { useStore } from "../context/StoreContext";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

export default function FeaturedProduct() {
  const { setSelectedProduct, setCurrentView, addToCart, setIsCartOpen } =
    useStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(1, 'vendor:"Luxury Marine Life Brand"');
        if (data.length > 0) {
          setProduct(data[0]);
        }
      } catch (error) {
        console.error("Failed to load featured product:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, []);

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
    if (!product) return;
    addToCart(product, 1, selectedSize, "Default");
    setIsCartOpen(true);
  };

  const handleViewProduct = () => {
    if (!product) return;
    setSelectedProduct(product);
    setCurrentView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="w-full py-24 flex items-center justify-center bg-[#f8f6f3]">
        <Loader2 className="w-8 h-8 text-[#c9a962] animate-spin" />
      </div>
    );
  }

  if (!product) return null;

  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const image = node.images.edges[0]?.node?.url;
  const variants = node.variants.edges;
  const tags = node.tags || [];

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
                src={image}
                alt={node.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-[#c9a962] text-[#0a1628] text-xs uppercase tracking-widest font-medium">
                  {node.vendor || "Limited Edition"}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              {node.images.edges.slice(0, 3).map((edge, index) => (
                <div
                  key={index}
                  className="w-20 h-20 bg-[#e8e6e3] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img src={edge.node.url} alt="" className="w-full h-full object-cover" />
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
              <span className="text-sm text-[#0a1628]/50">(Shopify Verified)</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#0a1628] font-light mb-4">
              {node.title}
            </h2>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-2xl md:text-3xl text-[#0a1628] font-medium">
                ${price.toFixed(0)}
              </span>
            </div>

            <p className="text-[#0a1628]/70 leading-relaxed mb-8">
              {node.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {tags.slice(0, 4).map((tag) => (
                <div key={tag} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1e6b7a]" />
                  <span className="text-sm text-[#0a1628]/60">{tag}</span>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <label className="text-sm text-[#0a1628]/60 uppercase tracking-wider mb-3 block">
                Option: <span className="text-[#0a1628]">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {variants.map((edge) => (
                  <button
                    key={edge.node.id}
                    onClick={() => setSelectedSize(edge.node.title)}
                    className={`px-4 h-12 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      selectedSize === edge.node.title
                        ? "bg-[#0a1628] text-white"
                        : "bg-white border border-[#0a1628]/20 text-[#0a1628] hover:border-[#0a1628]"
                    }`}
                  >
                    {edge.node.title}
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


