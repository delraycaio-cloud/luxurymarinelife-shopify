import { useInView } from "@/hooks/useInView";

export function SupplementFacts() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  const handleBuyNow = () => {
    window.location.href =
      "https://shearsciences.com/cart/46818496282869:1?ref=ANGELINA_VIP";
  };

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Product Card */}
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
                  $63.00
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">30-Day Supply</p>
              <p className="text-xs text-[#8B1A1A] uppercase tracking-wide mb-8">
                Limited-time founders pricing
              </p>

              <button onClick={handleBuyNow} className="btn-primary w-full">
                BUY NOW
              </button>
            </div>
          </div>

          {/* Right Content */}
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
                  CLEAN LABEL INGREDIENTS INCLUDE
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Coenzyme Q10 (CoQ10)</li>
                  <li>• Astaxanthin</li>
                  <li>• Curcumin</li>
                  <li>• Tocopherols (Vitamin E)</li>
                  <li>• Açaí Berry Extract</li>
                  <li>• Sea Buckthorn Oil</li>
                  <li>• Multiple others</li>
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
      </div>
    </section>
  );
}
