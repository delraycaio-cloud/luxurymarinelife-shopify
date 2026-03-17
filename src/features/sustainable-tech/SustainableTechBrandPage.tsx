import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const BLUETTI_APEX_300_AFFILIATE_URL =
  "https://www.awin1.com/cread.php?awinmid=59271&awinaffid=2804364&campaign=RMNQ1&clickref=lml-shop&ued=https%3A%2F%2Fwww.bluettipower.com%2Fproducts%2Fapex-300-home-battery-backup%3Fid%3D68804e7e63e18b529ef2604a%26variant%3D47351562174683";
const BLUETTI_PV350_AFFILIATE_URL =
  "https://www.awin1.com/cread.php?awinmid=59271&awinaffid=2804364&campaign=RMNQ1&clickref=lml-shop&ued=https%3A%2F%2Fwww.bluettipower.com%2Fproducts%2Fbluetti-pv350d-solar-panel%3Fvariant%3D46070024995035";

type Product = {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
  shopUrl: string;
};

const bluettiProducts: Product[] = [
  {
    id: "apex-300",
    name: "BLUETTI Apex 300 Versatile Power Station | 3,840W, 2,764.8Wh",
    shortDescription:
      "Power that adapts — from home to RV to off-grid. Smart 120V/240V portable power with 2.76kWh LiFePO₄, scalable expansion, and 0ms UPS switchover for essentials.",
    image: "/images/apex-300.png",
    shopUrl: BLUETTI_APEX_300_AFFILIATE_URL,
  },
  {
    id: "pv350",
    name: "BLUETTI 350W Solar Panel | 350W",
    shortDescription:
      "Foldable 350W monocrystalline panel with up to 23.4% conversion efficiency, kickstand for easy setup, and durable ETFE surface (IP65 splash-proof). MC4 compatible with BLUETTI power stations and most solar generators.",
    image: "/images/bluetti-pv350.png",
    shopUrl: BLUETTI_PV350_AFFILIATE_URL,
  },
];

const brandMeta: Record<string, { name: string }> = {
  bluetti: { name: "BLUETTI" },
};

export function SustainableTechBrandPage() {
  const { brandSlug } = useParams<{ brandSlug: string }>();
  const navigate = useNavigate();
  const now = useMemo(() => new Date(), []);

  const brand = brandSlug ? brandMeta[brandSlug] : null;
  const products = brandSlug === "bluetti" ? bluettiProducts : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [brandSlug]);

  if (!brandSlug) {
    navigate("/sustainable-tech", { replace: true });
    return null;
  }

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
            onClick={() => navigate("/sustainable-tech")}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm tracking-wide"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Sustainable Tech
          </button>

          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-3">
              <span className="label-elite text-teal">Sustainable Tech</span>
              <span className="h-[1px] w-10 bg-white/10" />
              <span className="text-xs text-white/40 tracking-[0.18em] uppercase">
                {now.getFullYear()}
              </span>
            </div>

            <h1 className="heading-display text-white text-[clamp(40px,4.6vw,78px)] mt-4">
              {brand?.name ?? brandSlug}
            </h1>
            <p className="mt-5 text-white/60 text-base lg:text-lg leading-relaxed max-w-[62ch]">
              {brandSlug === "bluetti"
                ? "Eco-friendly energy storage: portable power stations and solar generators with LiFePO₄ technology for home backup, RV, and off-grid."
                : "Explore products from this brand."}
            </p>
          </div>
        </div>
      </header>

      <section className="relative pb-16 lg:pb-24">
        <div className="px-6 lg:px-[7vw]">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="group relative rounded-2xl overflow-hidden bg-marine-800/60 border border-white/10 flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden bg-marine-900/40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-marine-900/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-5 lg:p-6 flex flex-col flex-1">
                    <h2 className="text-white font-display font-bold text-lg lg:text-xl leading-tight">
                      {product.name}
                    </h2>
                    <p className="mt-3 text-white/55 text-sm leading-relaxed flex-1">
                      {product.shortDescription}
                    </p>
                    <a
                      href={product.shopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-teal text-marine-900 font-semibold text-sm hover:bg-teal/90 transition-colors focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-marine-900"
                    >
                      Shop Now
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-marine-800/40 px-8 py-16 text-center">
              <p className="text-white/60 text-lg">Products for this brand coming soon.</p>
              <button
                type="button"
                onClick={() => navigate("/sustainable-tech")}
                className="mt-6 text-teal font-semibold hover:underline"
              >
                Back to Sustainable Tech
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
