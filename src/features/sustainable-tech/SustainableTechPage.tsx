import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export type SustainableTechBrand = {
  id: string;
  name: string;
  description: string;
  image: string;
};

// Dummy data — replace with real brands when ready. id is used as URL slug.
const brands: SustainableTechBrand[] = [
  {
    id: "bluetti",
    name: "BLUETTI",
    description:
      "BLUETTI is a global leader in eco-friendly energy storage, providing high-performance portable power stations and solar generators. Utilizing advanced LiFePO₄ technology, they offer reliable, scalable power solutions for everything from outdoor adventures to total home backup.",
    image: "/images/bluetti-logo.png",
  },
  {
    id: "saltwater-solar",
    name: "Saltwater Solar",
    description:
      "Marine-grade solar and battery systems for vessels and coastal installations. Built to withstand salt, humidity, and constant motion.",
    image: "/category_tech.webp",
  },
  {
    id: "reef-sense",
    name: "Reef Sense",
    description:
      "Sensors and monitoring platforms for water quality and reef health. Real-time data to protect the waters you sail and dive.",
    image: "/category_tech.webp",
  },
  {
    id: "blue-cycle",
    name: "Blue Cycle",
    description:
      "Waste-to-resource tech for boats and marinas. Compact processing units that turn onboard waste into usable outputs without dumping.",
    image: "/category_tech.webp",
  },
];

export function SustainableTechPage() {
  const navigate = useNavigate();
  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-[100dvh] bg-marine-900">
      <header className="relative pt-28 lg:pt-32 pb-10 lg:pb-14 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_20%_10%,rgba(45,212,191,0.18),transparent_60%),radial-gradient(900px_520px_at_85%_35%,rgba(45,212,191,0.12),transparent_55%),radial-gradient(700px_460px_at_60%_92%,rgba(255,255,255,0.06),transparent_52%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-marine-900/40 via-marine-900/85 to-marine-900" />
        </div>

        <div className="relative px-6 lg:px-[7vw]">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm tracking-wide"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </button>

          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-3">
              <span className="label-elite text-teal">Sustainable Tech</span>
              <span className="h-[1px] w-10 bg-white/10" />
              <span className="text-xs text-white/40 tracking-[0.18em] uppercase">
                Clean innovations · {now.getFullYear()}
              </span>
            </div>

            <h1 className="heading-display text-white text-[clamp(40px,4.6vw,78px)] mt-4">
              Sustainable Tech
            </h1>
            <p className="mt-5 text-white/60 text-base lg:text-lg leading-relaxed max-w-[62ch]">
              Protect the water you love. Brands and products built for lasting impact—filtration, energy, monitoring, and waste solutions for life on the water.
            </p>
          </div>
        </div>
      </header>

      <section className="relative pb-16 lg:pb-24">
        <div className="px-6 lg:px-[7vw]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {brands.map((brand) => (
              <article
                key={brand.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/sustainable-tech/${brand.id}`)}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/sustainable-tech/${brand.id}`)}
                className="group relative rounded-2xl overflow-hidden bg-marine-800/60 border border-white/10 min-h-[320px] flex flex-col cursor-pointer focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-marine-800 hover:border-white/20 transition-colors"
                aria-label={`View ${brand.name} products`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-marine-900/40">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-marine-900/80 via-marine-900/20 to-transparent" />
                </div>
                <div className="p-5 lg:p-6 flex flex-col flex-1">
                  <h2 className="text-white font-display font-bold text-lg lg:text-xl leading-tight">
                    {brand.name}
                  </h2>
                  <p className="mt-3 text-white/55 text-sm leading-relaxed flex-1">
                    {brand.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
