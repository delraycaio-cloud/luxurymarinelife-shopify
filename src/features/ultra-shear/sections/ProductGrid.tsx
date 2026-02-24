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

const trustSignals = [
  "Free Shipping on Stacks",
  "30-Day Guarantee",
  "Pharmaceutical-Grade Manufacturing",
  "Processed by UltraShear Technology™ (UST)",
];

interface ProductGridProps {
  onNavigate: (page: string) => void;
}

export function ProductGrid({ onNavigate }: ProductGridProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const singleBottleCheckoutUrl =
    "https://shearsciences.com/discount/MARINE20?redirect=%2Fcart%2F46818496282869%3A1%3Fref%3DANGELINA_VIP";

  const handleAddToCart = (product: Product) => {
    window.location.href = `https://shearsciences.com/cart/${product.variantId}:1?ref=ANGELINA_VIP`;
  };

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-14">
          <div
            className={`transition-all duration-1000 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-20"
            }`}
          >
            <div className="bg-[#FAFAFA] border border-gray-200 p-8">
              <span className="inline-block label-text text-[#8B1A1A] bg-white border border-[#8B1A1A]/20 px-3 py-1.5 mb-5">
                FOUNDERS PRICE - LIMITED TIME
              </span>
              <div className="aspect-square bg-white border border-gray-200 mb-5 overflow-hidden">
                <img
                  src="/images/oil_4.jpg"
                  alt="Super Antioxidant Oil Complex Oral NanoSpray"
                  className="w-full h-full object-cover scale-95"
                />
              </div>
              <p className="label-text text-gray-500 mb-2">Shear Sciences</p>
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-6">
                Super Antioxidant Oil Complex Oral NanoSpray
              </h3>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-gray-400 line-through text-xl">
                  $79.99
                </span>
                <span className="font-serif text-3xl text-[#8B1A1A]">
                  $64.00
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">30-Day Supply</p>
              <a
                href={singleBottleCheckoutUrl}
                className="btn-primary w-full inline-block text-center"
              >
                BUY NOW
              </a>
            </div>
          </div>

          <div>
            <h2
              className={`font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-6 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              COMPLETE TRANSPARENCY
            </h2>

            <div
              className={`space-y-6 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#FAFAFA] p-6">
                  <p className="label-text text-gray-500 mb-2">SERVING SIZE</p>
                  <p className="font-serif text-2xl text-[#1A1A1A]">
                    6 sprays (1 mL)
                  </p>
                </div>
                <div className="bg-[#FAFAFA] p-6">
                  <p className="label-text text-gray-500 mb-2">SERVINGS</p>
                  <p className="font-serif text-2xl text-[#1A1A1A]">
                    30 per bottle
                  </p>
                </div>
              </div>

              <div className="bg-[#FAFAFA] p-6">
                <p className="label-text text-gray-500 mb-3">
                  CLEAN-LABEL INGREDIENTS INCLUDE
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>- Coenzyme Q10 (CoQ10)</li>
                  <li>- Astaxanthin</li>
                  <li>- Curcumin</li>
                  <li>- Tocopherols (Vitamin E)</li>
                  <li>- Acai Berry Extract</li>
                  <li>- Sea Buckthorn Oil</li>
                  <li>- Multiple others</li>
                </ul>
              </div>

              <div className="border-l-4 border-[#8B1A1A] pl-6 py-2">
                <p className="text-sm text-gray-500 italic">
                  <span className="font-medium text-[#1A1A1A]">
                    FDA Disclaimer:
                  </span>{" "}
                  These statements have not been evaluated by the FDA. This
                  product is not intended to diagnose, treat, cure, or prevent
                  any disease.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Intro Copy */}
        <div
          id="founders-opportunity"
          className={`text-center max-w-3xl mx-auto mb-10 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">
            LIMITED-TIME FOUNDERS OPPORTUNITY
          </h2>
          <p className="text-[#8B1A1A] font-medium text-lg mb-4">
            Lock in UltraShear Technology™ at Historic Pricing
          </p>
          <p className="text-gray-600">
            Due to unprecedented demand and a commitment to our earliest
            supporters, we are extending this exclusive, limited-number Founders
            pricing. Once this batch is sold, prices will return to standard
            retail.
          </p>
        </div>

        {/* Header */}
        <div
          className={`flex items-center justify-between mb-12 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
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
              className={`group h-full flex flex-col transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
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
              <div className="text-center flex flex-col flex-1">
                <p className="label-text text-gray-500 mb-2">
                  {product.vendor}
                </p>
                <h3 className="font-serif text-lg text-[#1A1A1A] mb-1 line-clamp-2">
                  {product.name}
                </h3>
                {product.subtitle && (
                  <p className="text-sm text-gray-500 mb-3">
                    {product.subtitle}
                  </p>
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
                  className="btn-outline w-full mt-auto"
                >
                  BUY NOW
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`flex flex-wrap justify-center gap-6 md:gap-10 mt-10 mb-6 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {trustSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#8B1A1A] rounded-full" />
              <span className="text-sm text-gray-600">{signal}</span>
            </div>
          ))}
        </div>

        <p
          className={`text-center text-sm text-gray-500 italic transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Stock is limited to 100 annual memberships. Pricing will expire when
          current inventory hits 50 units.
        </p>
      </div>
    </section>
  );
}
