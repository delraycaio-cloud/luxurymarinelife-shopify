import { useInView } from "@/hooks/useInView";

const ingredientGroups = [
  {
    title: "The Bioactive Powerhouse",
    items: [
      { name: "CoQ10", benefit: "Mitochondrial Energy and Heart Health" },
      {
        name: "Astaxanthin",
        benefit: "Oxidative Defense - 6,000x stronger than Vitamin C",
      },
      { name: "Curcumin", benefit: "Systemic Inflammation and Joint Balance" },
      { name: "Lycopene", benefit: "Cardiovascular and Cellular Protection" },
      {
        name: "Vitamin D3 + K2",
        benefit: "Immune Modulation and Targeted Bone Support",
      },
    ],
  },
  {
    title: "The Five-SuperOil Complex",
    items: [
      {
        name: "Sea Buckthorn",
        benefit: "Omega-7 for Skin + Membrane Nourishment",
      },
      {
        name: "Acai Berry",
        benefit: "Deep Polyphenol and Anthocyanin Support",
      },
      {
        name: "Buah Merah",
        benefit: "Rare Alpha-Tocopherols for Immune Resilience",
      },
      {
        name: "Pequi Fruit",
        benefit: "Heart-Healthy Monounsaturated Fatty Acids",
      },
      {
        name: "MCT Oil",
        benefit: "Rapid-Onset Bio-Fuel and Nano-Carrier Stability",
      },
    ],
  },
];

const stats = [
  { value: "0%", label: "Preservatives" },
  { value: "100%", label: "Clean-Label" },
  { value: "3-5 Min", label: "Absorption Onset" },
  { value: "Long-Term", label: "Shelf Stability" },
];

export function InsideFormula() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-luxury">
        <div className="grid grid-cols-1 xl:grid-cols-3  items-start">
          {/* Left Content */}
          <div className="xl:col-span-2 xl:w-[90%]">
            <h2
              className={`font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-5 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              FIVE SUPEROILS PLUS MULTIPLE BIOACTIVES. ONE SIMPLE BUT POWERFUL
              CLEAN-LABEL DELIVERY.
            </h2>
            <p
              className={`text-gray-600 leading-relaxed mb-8 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              UST processing preserves the integrity of every compound while
              dramatically enhancing absorption. This synergistic stack of
              SuperOils and Bioactives is engineered to offer comprehensive
              antioxidant, anti-inflammatory, and systemic wellness benefits.
            </p>

            {/* Ingredient Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-0">
              {ingredientGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] mb-0.5 leading-tight">
                    {group.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                    {group.items.map((ingredient) => (
                      <div
                        key={ingredient.name}
                        className={`p-2 bg-[#FAFAFA] ${
                          isInView
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                        }`}
                      >
                        <h4 className="font-serif text-base text-[#1A1A1A] mb-0.5 leading-tight">
                          {ingredient.name}
                        </h4>
                        <p className="text-xs text-gray-500 leading-tight">
                          {ingredient.benefit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`bg-[#FAFAFA] p-6 mb-10 mt-10 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <p className="label-text text-[#8B1A1A] mb-2">
                THE SHEAR SCIENCES DIFFERENCE
              </p>
              <p className="text-gray-600">
                All Natural. 100% Plant-Based. No Artificial Chemicals. Our
                patented UltraShear Technology (UST) uses high-pressure physics
                to create 20-80 nm droplets that bypass the gut for 4-10x
                standard bioavailability.
              </p>
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

          {/* Right Images */}
          <div
            className={`xl:col-span-1 transition-all duration-1000 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-20"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="sticky top-32 space-y-8 mt-12">
              <div className="aspect-[4/5] overflow-hidden w-[600px] mx-auto">
                <img
                  src="/images/oil_5.jpg"
                  alt="Supplement Facts"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
