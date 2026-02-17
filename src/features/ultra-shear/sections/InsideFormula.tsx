import { useInView } from "@/hooks/useInView";

const ingredients = [
  { name: "CoQ10", benefit: "Mitochondrial Energy" },
  {
    name: "Astaxanthin",
    benefit: "Oxidative Defense — 6,000× stronger than vitamin C",
  },
  { name: "Curcumin", benefit: "Systemic Balance" },
  { name: "Tocopherols", benefit: "Cellular Protection" },
  { name: "Açaí", benefit: "Polyphenol Support" },
  { name: "Sea Buckthorn", benefit: "Skin + Membrane Nourishment" },
];

const stats = [
  { value: "0%", label: "Preservatives" },
  { value: "100%", label: "Clean Label" },
  { value: "4-10X", label: "Bioavailability" },
  { value: "3-5 Min", label: "Absorption" },
];

export function InsideFormula() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Content */}
          <div>
            <h2
              className={`font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-6 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              FIVE SUPEROILS PLUS MULTIPLE BIOACTIVES. ONE SIMPLE CLEAN LABEL
              DELIVERY.
            </h2>
            <p
              className={`text-gray-600 leading-relaxed mb-8 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Each ingredient is carefully selected for its synergistic effect.
              UST processing preserves the integrity of every compound while
              dramatically enhancing absorption. These six are examples - there
              are dozens upon dozens of additional potent bioactives shown to
              support antioxidant, anti-inflammatory, and broader health and
              wellness benefits.
            </p>

            <div
              className={`bg-[#FAFAFA] p-6 mb-10 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <p className="label-text text-[#8B1A1A] mb-2">
                THE SHEAR SCIENCE DIFFERENCE
              </p>
              <p className="text-gray-600">
                All natural. 100% plant based. No artificial chemicals.
                Preservative-free. 4-10X standard bioavailability. Longterm
                stable.
              </p>
            </div>

            {/* Ingredient Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ingredients.map((ingredient, index) => (
                <div
                  key={ingredient.name}
                  className={`p-6 bg-[#FAFAFA] hover:bg-white hover:shadow-lg transition-all duration-500 group cursor-default ${
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${400 + index * 80}ms`,
                    transitionTimingFunction:
                      "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                >
                  <h4 className="font-serif text-xl text-[#1A1A1A] mb-2 group-hover:text-[#8B1A1A] transition-colors">
                    {ingredient.name}
                  </h4>
                  <p className="text-sm text-gray-500">{ingredient.benefit}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-4 gap-4 mt-10 pt-10 border-t border-gray-200 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "900ms" }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-serif text-2xl md:text-3xl text-[#8B1A1A] mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div
            className={`transition-all duration-1000 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-20"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="aspect-[4/5] overflow-hidden sticky top-32">
              <img
                src="/images/oil_5.jpg"
                alt="Supplement Facts"
                className="w-full h-full object-cover scale-125"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
