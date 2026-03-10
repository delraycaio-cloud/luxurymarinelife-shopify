import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface YachtClubSectionProps {
  bgImage: string;
  circleImages: string[];
  zIndex: number;
  onExploreClick: () => void;
}

export default function YachtClubSection({ bgImage, circleImages, zIndex, onExploreClick }: YachtClubSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 0.6 } });
      scrollTl.fromTo(ribbonRef.current, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(headlineRef.current, { x: '18vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(bodyRef.current, { y: '8vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
      scrollTl.fromTo(ctaRef.current, { y: '8vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1);
      scrollTl.fromTo(circlesRef.current, { x: '-40vw', scale: 0.85, opacity: 0 }, { x: 0, scale: 1, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(bgRef.current, { scale: 1.08, opacity: 0.8 }, { scale: 1, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(headlineRef.current, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.70);
      scrollTl.fromTo(bodyRef.current, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.72);
      scrollTl.fromTo(ctaRef.current, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.74);
      scrollTl.fromTo(circlesRef.current, { x: 0, opacity: 1 }, { x: '-22vw', opacity: 0, ease: 'power2.in' }, 0.70);
      scrollTl.fromTo(ribbonRef.current, { x: 0, opacity: 1 }, { x: '22vw', opacity: 0, ease: 'power2.in' }, 0.75);
      scrollTl.fromTo(bgRef.current, { scale: 1, opacity: 1 }, { scale: 1.06, opacity: 0.7, ease: 'power2.in' }, 0.70);
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hyyc-section-pinned" style={{ zIndex }}>
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-[#0B0B0D]/45" />
      </div>
      <div ref={ribbonRef} className="absolute right-0 top-0 w-[62vw] h-full bg-[#FF1F3D]/92 hyyc-ribbon-right" style={{ zIndex: 2 }} />
      <div ref={headlineRef} className="absolute right-[6vw] top-[18vh] text-right z-[3]">
        <div className="hyyc-headline-display text-[#F6F6F8]">
          <div className="text-[clamp(52px,8vw,132px)]">Yacht</div>
          <div className="text-[clamp(52px,8vw,132px)]">Club</div>
        </div>
      </div>
      <p ref={bodyRef} className="absolute right-[6vw] top-[58vh] w-[34vw] text-right text-[#F6F6F8]/82 text-[clamp(14px,1.2vw,18px)] leading-relaxed z-[3]">
        Limited drops for sunset decks, midnight swims, and after-hours ports.
      </p>
      <button ref={ctaRef} onClick={onExploreClick} className="absolute right-[6vw] top-[74vh] hyyc-btn-primary flex items-center gap-3 z-[3]">
        Explore Collection <ArrowRight size={18} />
      </button>
      <div ref={circlesRef} className="absolute left-[6vw] top-1/2 -translate-y-1/2 z-[5]">
        <div className="relative w-[280px] h-[200px] md:w-[350px] md:h-[250px]">
          {circleImages.map((img, i) => (
            <div key={i} className="absolute w-[clamp(110px,14vw,210px)] h-[clamp(110px,14vw,210px)] rounded-full hyyc-circle-border overflow-hidden"
              style={{ left: `${i * 90}px`, top: i === 0 ? '22px' : i === 1 ? '-10px' : '8px', zIndex: 3 - i }}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
