import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

type ApparelBrand = {
  id: string;
  name: string;
  blurb: string;
  image: { src: string; alt: string };
  accent: "teal" | "gold" | "crimson";
};

const brands: ApparelBrand[] = [
  {
    id: "luxury-marine-life",
    name: "Luxury Marine Life",
    blurb:
      "Core essentials for life on the water—engineered, refined, and philanthropic.",
    image: {
      src: "/images/lml-brand-image.png",
      alt: "Luxury Marine Life brand image",
    },
    accent: "teal",
  },
  {
    id: "ac-yacht-club",
    name: "Ac Yacht Club",
    blurb:
      "Clean lines, quiet flex. Minimal palettes with technical performance.",
    image: {
      src: "/images/ac-brand-image.png",
      alt: "Ac Yacht Club brand image",
    },
    accent: "gold",
  },
  {
    id: "hottie-yachtie-yacht-club",
    name: "Hottie Yachtie Yacht Club",
    blurb:
      "After-dark deck energy. Pieces built to read premium from twenty feet away.",
    image: {
      src: "/images/hyyc-brand.png",
      alt: "Hottie Yachtie Yacht Club brand image",
    },
    accent: "crimson",
  },
];

function accentStyles(accent: ApparelBrand["accent"]) {
  switch (accent) {
    case "gold":
      return {
        chip: "border-[rgba(201,169,110,0.35)] text-[var(--gold-light)] bg-[rgba(201,169,110,0.10)]",
        ring: "focus-visible:ring-[rgba(201,169,110,0.6)]",
        glow: "before:from-[rgba(201,169,110,0.18)] before:via-[rgba(201,169,110,0.06)] before:to-transparent",
        cta: "text-[var(--gold-light)]",
      };
    case "crimson":
      return {
        chip: "border-[rgba(139,26,26,0.35)] text-[#ffb7b7] bg-[rgba(139,26,26,0.12)]",
        ring: "focus-visible:ring-[rgba(139,26,26,0.55)]",
        glow: "before:from-[rgba(139,26,26,0.22)] before:via-[rgba(139,26,26,0.06)] before:to-transparent",
        cta: "text-[#ffb7b7]",
      };
    case "teal":
    default:
      return {
        chip: "border-white/10 text-teal bg-teal/10",
        ring: "focus-visible:ring-teal",
        glow: "before:from-teal/20 before:via-teal/10 before:to-transparent",
        cta: "text-teal",
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
              <span className="text-xs text-white/40 tracking-[0.18em] uppercase">
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

      <section className="relative pb-16 lg:pb-24">
        <div className="px-6 lg:px-[7vw]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {brands.map((brand, idx) => {
              const a = accentStyles(brand.accent);
              return (
                <article
                  key={brand.id}
                  className={[
                    "group relative rounded-2xl overflow-hidden glass-card glass-card-hover",
                    "min-h-[300px] lg:min-h-[360px]",
                    "focus-within:ring-2 focus-within:ring-offset-0",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                      'before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-br',
                      a.glow,
                    ].join(" ")}
                  />

                  <div className="relative flex flex-col h-full">
                    <div className="relative overflow-hidden bg-marine-900/40">
                      <div className="absolute inset-0 bg-[radial-gradient(650px_220px_at_30%_20%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(520px_200px_at_75%_65%,rgba(45,212,191,0.10),transparent_60%)]" />
                      <img
                        src={brand.image.src}
                        alt={brand.image.alt}
                        className="relative block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-marine-900/75 via-marine-900/20 to-transparent" />
                      <div className="absolute inset-0 ring-1 ring-white/10 pointer-events-none" />
                    </div>

                    <div className="p-6 lg:p-7 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className={[
                            "label-elite inline-flex items-center px-3 py-1 rounded-full border",
                            a.chip,
                          ].join(" ")}
                        >
                          Brand {String(idx + 1).padStart(2, "0")}
                        </span>

                        <span className="text-white/35 text-xs tracking-[0.2em] uppercase">
                          Capsule
                        </span>
                      </div>

                      <h2 className="mt-5 text-white font-display font-extrabold uppercase tracking-[0.02em] leading-tight text-[clamp(22px,2.2vw,30px)]">
                        {brand.name}
                      </h2>
                      <p className="mt-3 text-white/55 leading-relaxed text-sm">
                        {brand.blurb}
                      </p>

                      <div className="mt-auto pt-6">
                        <button
                          type="button"
                          className={[
                            "w-full inline-flex items-center justify-between gap-3 rounded-xl",
                            "px-4 py-3 border border-white/10 bg-white/[0.02]",
                            "text-sm tracking-wide text-white/80 hover:text-white hover:border-white/20",
                            "transition-all duration-300",
                            "focus-visible:ring-2",
                            a.ring,
                          ].join(" ")}
                          onClick={() => {
                            if (brand.id === "luxury-marine-life") {
                              navigate("/luxury-marine-life-brand");
                              return;
                            }
                            if (brand.id === "hottie-yachtie-yacht-club") {
                              navigate("/hottie-yachtie-brand");
                              return;
                            }
                            if (brand.id === "ac-yacht-club") {
                              navigate("/ac-yacht-club-apparel");
                              return;
                            }

                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          aria-label={`View ${brand.name}`}
                        >
                          <span className="inline-flex items-center gap-2">
                            <span
                              className={["font-semibold", a.cta].join(" ")}
                            >
                              View
                            </span>
                            <span className="text-white/45">Products</span>
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" />
                        </button>
                      </div>
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
