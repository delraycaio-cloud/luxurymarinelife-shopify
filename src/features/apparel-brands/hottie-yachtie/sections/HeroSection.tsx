import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  bgImage: string;
  circleImages: string[];
  zIndex: number;
  onShopClick: () => void;
}

export default function HeroSection({ bgImage, circleImages, zIndex, onShopClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 });
      tl.fromTo(ribbonRef.current, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, 0.1);
      const words = headlineRef.current?.querySelectorAll('.hyyc-word');
      if (words) tl.fromTo(words, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, 0.3);
      tl.fromTo(subheadlineRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.5);
      tl.fromTo(ctaRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.6);
      const circles = circlesRef.current?.querySelectorAll('.hyyc-circle');
      if (circles) tl.fromTo(circles, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, stagger: 0.08, ease: 'back.out(1.6)' }, 0.5);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Removed layout effect pinning

  return (
    <section ref={sectionRef} className="hyyc-section-pinned" style={{ zIndex }}>
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src={bgImage}
          alt="Hottie Yachtie Yacht Club — bold party wear for yacht deck nightlife"
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[#0B0B0D]/55" />
      </div>
      <div ref={ribbonRef} className="absolute left-0 top-0 w-[62vw] h-full bg-[#FF1F3D]/92 hyyc-ribbon-left" style={{ zIndex: 2 }} />
      <div className="absolute left-[6vw] top-[18vh] z-[3]">
        <div ref={headlineRef} className="hyyc-headline-display text-[#F6F6F8]">
          <div className="hyyc-word text-[clamp(64px,10vw,160px)]">Hottie</div>
          <div className="hyyc-word text-[clamp(64px,10vw,160px)]">Yachtie</div>
        </div>
      </div>
      <p ref={subheadlineRef} className="absolute left-[6vw] top-[62vh] w-[34vw] text-[#F6F6F8]/82 text-[clamp(16px,1.5vw,22px)] font-medium leading-relaxed z-[3]">
        Partywear for the open sea.
      </p>
      <button ref={ctaRef} onClick={onShopClick} className="absolute left-[6vw] top-[74vh] hyyc-btn-primary flex items-center gap-3 z-[3]">
        Shop the Drop <ArrowRight size={18} />
      </button>
      <div className="absolute right-[6vw] top-[18vh] hyyc-micro-label text-[#F6F6F8]/70 z-[3]">New Arrivals</div>
      <div ref={circlesRef} className="absolute right-[6vw] top-1/2 -translate-y-1/2 z-[5]">
        <div className="relative w-[280px] h-[200px] md:w-[350px] md:h-[250px]">
          {circleImages.map((img, i) => (
            <div key={i} className="hyyc-circle absolute w-[clamp(110px,14vw,210px)] h-[clamp(110px,14vw,210px)] rounded-full hyyc-circle-border overflow-hidden"
              style={{ right: `${i * 90}px`, top: i === 0 ? '22px' : i === 1 ? '-10px' : '8px', zIndex: 3 - i }}>
              <img src={img} alt={`Hottie Yachtie collection showcase ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
