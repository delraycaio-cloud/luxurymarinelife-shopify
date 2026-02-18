import { useInView } from "@/hooks/useInView";
import { ArrowRight } from "lucide-react";

interface Product {
  id: string;
  image: string;
  vendor: string;
  name: string;
  subtitle?: string;
  originalPrice: number;
  foundersPrice: number;
  badge: string;
  variantId: string;
}

const products: Product[] = [
  {
    id: "biohacker",
    image: "/images/oil_table3.jpeg",
    vendor: "Shear Sciences",
    name: "The Biohacker's Stack - 90-Day Supply",
    subtitle: "3x NanoSpray Bottles",
    originalPrice: 237.0,
    foundersPrice: 189.0,
    badge: "SAVE $48",
    variantId: "47621010030837",
  },
  {
    id: "executive",
    image: "/images/12b.png",
    vendor: "Shear Sciences",
    name: "Executive Longevity Stack - 6-Month Supply",
    subtitle: "6x NanoSpray Bottles",
    originalPrice: 474.0,
    foundersPrice: 367.0,
    badge: "SAVE $107",
    variantId: "47621066424565",
  },
  {
    id: "ceo",
    image: "/images/oil_12.png",
    vendor: "Shear Sciences",
    name: "Health CEO Annual Supply - 12-Month",
    subtitle: "12x NanoSpray Bottles",
    originalPrice: 948.0,
    foundersPrice: 719.0,
    badge: "BEST VALUE - SAVE $229",
    variantId: "47621098799349",
  },
];

interface ProductGridProps {
  onNavigate: (page: string) => void;
}

export function ProductGrid({ onNavigate }: ProductGridProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  const handleAddToCart = (product: Product) => {
    window.location.href = `https://shearsciences.com/cart/${product.variantId}:1?ref=ANGELINA_VIP`;
  };

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-luxury">
        {/* Header */}
        <div
          className={`flex items-center justify-between mb-12 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">
            THE ESSENTIALS
          </h2>
          <button
            onClick={() => onNavigate("products")}
            className="label-text text-[#1A1A1A] hover:text-[#8B1A1A] transition-colors flex items-center gap-2 group"
          >
            VIEW ALL
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{
                transitionDelay: `${200 + index * 100}ms`,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-[#FAFAFA] mb-6 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-108 scale-125"
                />
                {/* Badge */}
                <span className="absolute top-4 left-4 label-text text-[#8B1A1A] bg-white/90 px-3 py-1.5">
                  {product.badge}
                </span>
              </div>

              {/* Product Info */}
              <div className="text-center">
                <p className="label-text text-gray-500 mb-2">{product.vendor}</p>
                <h3 className="font-serif text-lg text-[#1A1A1A] mb-1 line-clamp-2">
                  {product.name}
                </h3>
                {product.subtitle && (
                  <p className="text-sm text-gray-500 mb-3">{product.subtitle}</p>
                )}

                {/* Pricing */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-[#8B1A1A] font-medium">
                    ${product.foundersPrice.toFixed(2)} USD
                  </span>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn-outline w-full"
                >
                  BUY NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
