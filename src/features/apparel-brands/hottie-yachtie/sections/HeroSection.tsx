import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, Flame, Sparkles, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  bgImage: string;
  zIndex: number;
  onShopClick: () => void;
}

const trustBadges = [
  { icon: Flame, label: 'Limited Drops' },
  { icon: Sparkles, label: 'Bold Design' },
  { icon: Star, label: 'Statement Pieces' },
];

export default function HeroSection({ bgImage, zIndex, onShopClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 });

      const label = contentRef.current?.querySelector('.hyyc-hero-label');
      if (label) tl.fromTo(label, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.2);

      const words = contentRef.current?.querySelectorAll('.hyyc-word');
      if (words) tl.fromTo(words, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, 0.3);

      const desc = contentRef.current?.querySelector('.hyyc-hero-desc');
      if (desc) tl.fromTo(desc, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.6);

      const cta = contentRef.current?.querySelector('.hyyc-hero-cta');
      if (cta) tl.fromTo(cta, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.7);

      const badges = contentRef.current?.querySelectorAll('.hyyc-trust-badge');
      if (badges) tl.fromTo(badges, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 }, 0.85);

      const arrow = sectionRef.current?.querySelector('.hyyc-scroll-arrow');
      if (arrow) tl.fromTo(arrow, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.1);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hyyc-section-pinned" style={{ zIndex }}>
      {/* Background Image + Gradient Overlay */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src={bgImage}
          alt="Hottie Yachtie Yacht Club — bold party wear for yacht deck nightlife"
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/70 via-[#0B0B0D]/40 to-[#0B0B0D]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF1F3D]/10 via-transparent to-[#FF1F3D]/5" />
      </div>

      {/* Centered Content Block — matches ACYC/LML pattern */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center w-full px-6 py-24 md:py-32"
      >
        {/* Micro label */}
        <div className="hyyc-hero-label hyyc-micro-label text-[#FF1F3D] mb-6 md:mb-8">
          <span className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#FF1F3D]/60" />
            Yacht Deck Partywear
            <span className="h-[1px] w-8 bg-[#FF1F3D]/60" />
          </span>
        </div>

        {/* Main Heading — Serif + Gradient Accent */}
        <h1 className="hyyc-headline-display text-[#F6F6F8]">
          <span className="hyyc-word block text-[clamp(48px,8vw,120px)]">Hottie</span>
          <span className="hyyc-word block text-gradient-crimson text-[clamp(48px,8vw,120px)]">
            Yachtie
          </span>
          <span className="hyyc-word block text-[clamp(36px,5vw,72px)] font-medium italic tracking-normal text-[#F6F6F8]/80 mt-1">
            Style
          </span>
        </h1>

        {/* Description */}
        <p className="hyyc-hero-desc mt-6 md:mt-8 text-[#F6F6F8]/70 text-base md:text-lg leading-relaxed max-w-[48ch] font-medium">
          After-dark deck energy. Statement pieces built to read premium from
          twenty feet away — designed for the bold, the fearless, the seen.
        </p>

        {/* CTA Button */}
        <button
          onClick={onShopClick}
          className="hyyc-hero-cta hyyc-btn-primary flex items-center gap-3 mt-8 md:mt-10"
        >
          Shop the Drop <ArrowRight size={18} />
        </button>

        {/* Trust Badges */}
        <div className="flex items-center gap-6 md:gap-8 mt-10 md:mt-12">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="hyyc-trust-badge flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full border border-[#FF1F3D]/30 bg-[#FF1F3D]/10 flex items-center justify-center">
                <badge.icon size={18} className="text-[#FF1F3D]" />
              </div>
              <span className="text-[#F6F6F8]/60 text-[11px] tracking-[0.15em] uppercase font-medium">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hyyc-scroll-arrow absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0">
        <span className="text-[#F6F6F8]/40 text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown size={20} className="text-[#F6F6F8]/40 animate-bounce" />
      </div>
    </section>
  );
}
