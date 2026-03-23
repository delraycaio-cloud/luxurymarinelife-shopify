import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

type ApparelBrand = {
  id: string;
  name: string;
  blurb: string;
  image: { src: string; alt: string };
  accent: "teal" | "gold" | "crimson";
  route: string;
};

const brands: ApparelBrand[] = [
  {
    id: "luxury-marine-life",
    name: "Luxury Marine Life",
    blurb:
      "Core essentials for life on the water—UPF 50+ sun protection, sustainable fabrics, and 10% to ocean restoration with every purchase.",
    image: {
      src: "/hero-main.webp",
      alt: "Luxury Marine Life sustainable yacht apparel — premium ocean-inspired lifestyle clothing",
    },
    accent: "teal",
    route: "/luxury-marine-life-brand",
  },
  {
    id: "ac-yacht-club",
    name: "AC Yacht Club",
    blurb:
      "The Founder Collection—Italian craftsmanship, clean lines, quiet flex. From the deck to the dinner party.",
    image: {
      src: "/images/hero-harbor.webp",
      alt: "AC Yacht Club elevated gentleman's apparel — Italian craftsmanship yacht wear at harbor",
    },
    accent: "gold",
    route: "/ac-yacht-club-apparel",
  },
  {
    id: "hottie-yachtie-yacht-club",
    name: "Hottie Yachtie Yacht Club",
    blurb:
      "After-dark deck energy. Statement pieces built to read premium from twenty feet away.",
    image: {
      src: "/hero_deck_party.webp",
      alt: "Hottie Yachtie Yacht Club bold party wear — premium yacht deck nightlife apparel",
    },
    accent: "crimson",
    route: "/hottie-yachtie-brand",
  },
];

function accentConfig(accent: ApparelBrand["accent"]) {
  switch (accent) {
    case "gold":
      return {
        stripe: "bg-gradient-to-r from-[#C9A96E] to-[#E0C080]",
        chip: "border-[rgba(201,169,110,0.4)] text-[#E0C080] bg-[rgba(201,169,110,0.12)]",
        cta: "text-[#E0C080] hover:text-[#C9A96E]",
        ring: "focus-visible:ring-[rgba(201,169,110,0.6)]",
        gradient: "from-[#0a1628]/0 via-[#0a1628]/60 to-[#0a1628]/95",
      };
    case "crimson":
      return {
        stripe: "bg-gradient-to-r from-[#FF1F3D] to-[#8B1A1A]",
        chip: "border-[rgba(255,31,61,0.35)] text-[#ff8a9e] bg-[rgba(255,31,61,0.12)]",
        cta: "text-[#ff8a9e] hover:text-[#FF1F3D]",
        ring: "focus-visible:ring-[rgba(255,31,61,0.55)]",
        gradient: "from-[#0B0B0D]/0 via-[#0B0B0D]/60 to-[#0B0B0D]/95",
      };
    case "teal":
    default:
      return {
        stripe: "bg-gradient-to-r from-[#2DD4BF] to-[#5EEAD4]",
        chip: "border-white/15 text-[#2DD4BF] bg-[rgba(45,212,191,0.10)]",
        cta: "text-[#2DD4BF] hover:text-[#5EEAD4]",
        ring: "focus-visible:ring-teal",
        gradient: "from-[#050C18]/0 via-[#050C18]/60 to-[#050C18]/95",
      };
  }
}

export function ApparelBrandsPage() {
  const navigate = useNavigate();
  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-[100dvh] bg-marine-900">
      {/* ── Header ── */}
      <header className="relative pt-28 lg:pt-32 pb-10 lg:pb-14 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_20%_10%,rgba(45,212,191,0.18),transparent_60%),radial-gradient(900px_520px_at_85%_35%,rgba(201,169,110,0.14),transparent_55%),radial-gradient(700px_460px_at_60%_92%,rgba(255,255,255,0.06),transparent_52%)]" />
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
              <span className="label-elite text-teal">Apparel</span>
              <span className="h-[1px] w-10 bg-white/10" />
              <span className="text-xs text-white/60 tracking-[0.18em] uppercase">
                Curated Brands · {now.getFullYear()}
              </span>
            </div>

            <h1 className="heading-display text-white text-[clamp(40px,4.6vw,78px)] mt-4">
              Apparel Brands
            </h1>
            <p className="mt-5 text-white/60 text-base lg:text-lg leading-relaxed max-w-[62ch]">
              Choose your uniform. Three capsules—each with a different
              mood—built for sun, salt, and high-performance living on the
              water.
            </p>
          </div>
        </div>
      </header>

      {/* ── Brand Cards ── */}
      <section className="relative pb-16 lg:pb-24">
        <div className="px-6 lg:px-[7vw]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {brands.map((brand, idx) => {
              const a = accentConfig(brand.accent);
              return (
                <article
                  key={brand.id}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-offset-0"
                  onClick={() => navigate(brand.route)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigate(brand.route);
                    }
                  }}
                  aria-label={`View ${brand.name} collection`}
                >
                  {/* Accent stripe */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[3px] z-20 ${a.stripe}`}
                  />

                  {/* Full-bleed lifestyle image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={brand.image.src}
                      alt={brand.image.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-b ${a.gradient}`}
                    />

                    {/* Inner ring */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-2xl" />
                  </div>

                  {/* Content overlay — positioned at bottom */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6 lg:p-7">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span
                        className={`label-elite inline-flex items-center px-3 py-1 rounded-full border ${a.chip}`}
                      >
                        Brand {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white/50 text-xs tracking-[0.2em] uppercase">
                        Capsule
                      </span>
                    </div>

                    <h2 className="text-white font-display font-extrabold uppercase tracking-[0.02em] leading-tight text-[clamp(22px,2.2vw,30px)]">
                      {brand.name}
                    </h2>
                    <p className="mt-2 text-white/65 leading-relaxed text-sm line-clamp-3">
                      {brand.blurb}
                    </p>

                    <div className="mt-5">
                      <span
                        className={`inline-flex items-center gap-2 text-sm tracking-wide font-semibold transition-colors duration-300 ${a.cta}`}
                      >
                        View Collection
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
