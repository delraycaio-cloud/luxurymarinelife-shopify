import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingBag, ArrowRight, Check, Star, Shield, Zap, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const product = {
  id: "nano-oil-complex",
  variantId: "42522752254023",
  name: "Nano-Emulsified Super Oil Complex",
  tagline: "Standard Equipment for High Performers",
  description: "Patented UST™ technology forces oil through 40,000 PSI to create particles 20–80 nm — small enough to bypass the gut and flood your bloodstream in minutes, not hours.",
  originalPrice: 79.99,
  price: 64.0,
  image: "/oil.png",
  category: "Supplements",
  badge: "Founder's Pricing",
  features: [
    "4–10× greater bioavailability than traditional pills",
    "Nano-emulsified at 40,000 PSI via patented UST™",
    "Absorbed in 3–5 min — not 45–90 min",
    "Omega-3 + CBD + MCT — zero synthetics",
    "Third-party purity & potency tested",
    "Travel-ready, TSA-compliant 30ml oral spray",
  ],
  trustBadges: [
    { icon: Shield, label: "3rd Party Tested" },
    { icon: Zap, label: "3–5 Min Absorption" },
    { icon: Package, label: "30-Day Guarantee" },
  ],
};

export function FeaturedProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!section || !image || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(image,
        { opacity: 0, x: "-5vw", scale: 0.97 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 78%", end: "top 45%", scrub: 1 } }
      );
      gsap.fromTo(content.querySelectorAll('[data-anim]'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 72%", end: "top 40%", scrub: 1 } }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="learn" className="bg-marine-900 py-20 lg:py-28 overflow-hidden" aria-label="Featured Product">
      <div className="px-6 lg:px-[7vw]">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div ref={imageRef} className="w-full lg:w-[48vw] relative">
            <div className="absolute inset-0 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(45,212,191,0.12) 0%, transparent 70%)', filter: 'blur(24px)' }} aria-hidden="true" />
            <div className="relative lg:h-[72vh] rounded-2xl overflow-hidden bg-marine-800/40 flex items-center justify-center">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain p-6 lg:p-10 animate-float" loading="lazy" />
            </div>
            <div className="absolute bottom-4 right-4 glass-card rounded-xl p-4 max-w-[220px] hidden lg:block">
              <div className="stars mb-1.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <p className="text-white/80 text-xs leading-relaxed italic">"Two sprays before my morning ocean swim. I feel the difference within 4 minutes."</p>
              <p className="text-white/40 text-[10px] mt-2 font-medium tracking-wide">Capt. J. Reynolds, Boca Raton FL</p>
            </div>
          </div>

          <div ref={contentRef} className="w-full lg:w-[34vw]">
            <div data-anim><span className="label-elite text-teal">{product.badge}</span></div>
            <h2 className="mt-4 heading-display text-white text-[clamp(28px,3vw,52px)] leading-[0.95]" data-anim>{product.name}</h2>
            <p className="mt-2 heading-serif text-white/40 text-lg italic" data-anim>{product.tagline}</p>
            <p className="mt-5 text-white/65 text-sm lg:text-base leading-loose" data-anim>{product.description}</p>

            <ul className="mt-7 space-y-2.5" data-anim>
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-white/75 text-sm">
                  <Check className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" aria-hidden="true" />{f}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-4 flex-wrap" data-anim>
              {product.trustBadges.map((b) => (
                <div key={b.label} className="flex items-center gap-1.5 text-white/40 text-xs">
                  <b.icon className="w-3.5 h-3.5 text-teal" aria-hidden="true" />
                  <span className="font-medium">{b.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-baseline gap-3" data-anim>
              <span className="text-white/35 font-display font-semibold text-xl line-through">${product.originalPrice.toFixed(2)}</span>
              <span className="text-white font-display font-bold text-4xl">${product.price.toFixed(2)}</span>
              <span className="label-elite text-teal border border-teal/30 rounded-full px-2 py-1">Save 20%</span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3" data-anim>
              <a target="_blank" rel="noopener noreferrer" href="https://shearsciences.com/discount/MARINE20?redirect=%2Fcart%2F46818496282869%3A1%3Fref%3DANGELINA_VIP">
                <Button onClick={() => addToCart(product)} className="btn-primary-luxury w-full sm:w-auto !rounded-full gap-2" id="featured-product-buy-cta">
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" />Buy Now — $64
                </Button>
              </a>
              <a href="/ultra-shear" className="btn-ghost-luxury">View Full Details <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" /></a>
            </div>

            <p className="mt-5 text-white/30 text-xs tracking-wide" data-anim>Free US shipping · 30-day satisfaction guarantee · 10% to ocean restoration</p>
          </div>
        </div>
      </div>
    </section>
  );
}
