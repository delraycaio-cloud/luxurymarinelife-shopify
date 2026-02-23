import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const card = cardRef.current;
    const headline = headlineRef.current;
    const badge = badgeRef.current;

    if (!section || !bg || !content || !card || !headline) return;

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      loadTl
        .fromTo(bg, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.1 })
        .fromTo(badge, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.7')
        .fromTo(headline, { opacity: 0, y: 32, skewY: 1.5 }, { opacity: 1, y: 0, skewY: 0, duration: 0.8 }, '-=0.55')
        .fromTo(content, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.7 }, '-=0.4')
        .fromTo(card, { opacity: 0, x: '8vw', scale: 0.97 }, { opacity: 1, x: 0, scale: 1, duration: 0.85 }, '-=0.55');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([headline, content], { opacity: 1, x: 0, y: 0, skewY: 0 });
            gsap.set(card, { opacity: 1, x: 0, scale: 1 });
            gsap.set(bg, { scale: 1, opacity: 1 });
          }
        }
      });
      scrollTl
        .fromTo(content, { opacity: 1, x: 0 }, { opacity: 0, x: '-6vw', ease: 'power2.in' }, 0.7)
        .fromTo(card, { opacity: 1, x: 0, scale: 1 }, { opacity: 0, x: '6vw', scale: 0.98, ease: 'power2.in' }, 0.7)
        .fromTo(bg, { scale: 1, opacity: 1 }, { scale: 1.06, opacity: 0.8, ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToShop = () => {
    const shopSection = document.querySelector('#shop');
    if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="section-pinned bg-marine-900 z-10" aria-label="Hero — Health on the Water">
      <div ref={bgRef} className="absolute inset-0 z-[1]" style={{ opacity: 0 }}>
        <img src="/hero_wellness_bg.jpg" alt="Luxury wellness on superyacht" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-r from-marine-900/80 via-marine-900/40 to-marine-900/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-marine-900/60 via-transparent to-transparent" />
      </div>

      <div ref={badgeRef} className="absolute top-6 left-1/2 -translate-x-1/2 z-[5] flex items-center gap-2" style={{ opacity: 0 }}>
        <div className="w-6 h-px bg-teal opacity-60" />
        <span className="label-elite text-white/50">HEALTH ON THE WATER</span>
        <div className="w-6 h-px bg-teal opacity-60" />
      </div>

      <div className="relative z-[4] h-full flex items-center">
        <div className="w-full px-6 lg:px-[7vw]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-0">
            <div ref={contentRef} className="w-full lg:w-[46vw] text-center lg:text-left">
              <div ref={headlineRef} style={{ opacity: 0 }}>
                <h1 className="heading-display text-white leading-[0.92] text-[clamp(52px,11vw,110px)] lg:text-[clamp(52px,7vw,110px)]">
                  HEALTHY<br /><span className="text-gradient">PEOPLE</span>
                </h1>
              </div>

              <p className="mt-5 lg:mt-8 text-white/70 text-sm sm:text-base lg:text-lg max-w-full lg:max-w-[34vw] leading-relaxed mx-auto lg:mx-0">
                Wellness journeys engineered for life on the water — movement, recovery, and performance rituals for those who refuse to compromise.
              </p>

              <div className="mt-5 lg:mt-6 flex items-center gap-3 justify-center lg:justify-start">
                <div className="stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.977-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white/50 text-xs font-medium tracking-wide">5.0 · <span className="text-white/40">47 verified reviews</span></span>
              </div>

              <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-3 justify-center lg:justify-start">
                <button onClick={scrollToShop} className="btn-primary-luxury" id="hero-shop-cta" aria-label="Explore our collection">
                  Explore the Collection <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <a href="/ultra-shear" className="btn-ghost-luxury" id="hero-ultrashear-cta" aria-label="View UltraShear NanoSpray">
                  View UltraShear™ <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              <p className="mt-3 lg:mt-4 text-white/35 text-xs tracking-wide">Free shipping on orders over $120 · 30-day guarantee</p>
            </div>

            <div ref={cardRef} className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-none lg:w-[32vw] h-[300px] sm:h-[380px] lg:h-[66vh] rounded-xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)] mx-auto lg:mx-0 relative group" style={{ opacity: 0 }}>
              <img src="/hero_wellness_card.jpg" alt="Luxury supplement ritual on superyacht" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute bottom-4 left-4 right-4 glass-card rounded-lg p-3 flex justify-between items-center">
                <div>
                  <p className="label-elite text-white/50">Featured Supplement</p>
                  <p className="font-display font-bold text-white text-base mt-0.5">NanoSpray Oil Complex</p>
                </div>
                <a href="/ultra-shear" className="btn-primary-luxury !py-2 !px-4 !text-[10px]" aria-label="Buy NanoSpray — $64">$64</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-2" aria-hidden="true">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/20 animate-float" />
        <span className="label-elite text-white/25">SCROLL</span>
      </div>
    </section>
  );
}
