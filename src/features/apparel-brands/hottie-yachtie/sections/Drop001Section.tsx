import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Drop001SectionProps {
  bgImage: string;
  circleImages: string[];
  zIndex: number;
}

export default function Drop001Section({ bgImage, circleImages, zIndex }: Drop001SectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 0.6 } });
      scrollTl.fromTo(ribbonRef.current, { y: '100vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(headlineRef.current, { x: '-18vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(bodyRef.current, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
      scrollTl.fromTo(ctaRef.current, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1);
      scrollTl.fromTo(countdownRef.current, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.08);
      scrollTl.fromTo(circlesRef.current, { x: '40vw', scale: 0.85, opacity: 0 }, { x: 0, scale: 1, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(bgRef.current, { scale: 1.08, opacity: 0.8 }, { scale: 1, opacity: 1, ease: 'none' }, 0);
      scrollTl.fromTo(headlineRef.current, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.70);
      scrollTl.fromTo(bodyRef.current, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.72);
      scrollTl.fromTo(countdownRef.current, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.73);
      scrollTl.fromTo(ctaRef.current, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.74);
      scrollTl.fromTo(circlesRef.current, { x: 0, opacity: 1 }, { x: '22vw', opacity: 0, ease: 'power2.in' }, 0.70);
      scrollTl.fromTo(ribbonRef.current, { y: 0, opacity: 1 }, { y: '-40vh', opacity: 0, ease: 'power2.in' }, 0.75);
      scrollTl.fromTo(bgRef.current, { scale: 1, opacity: 1 }, { scale: 1.06, opacity: 0.7, ease: 'power2.in' }, 0.70);
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hyyc-section-pinned" style={{ zIndex }}>
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-[#0B0B0D]/55" />
      </div>
      <div ref={ribbonRef} className="absolute left-1/2 -translate-x-1/2 top-0 w-[86vw] h-full bg-[#FF1F3D]/92 hyyc-ribbon-center" style={{ zIndex: 2 }} />
      <div ref={headlineRef} className="absolute left-[8vw] top-[18vh] z-[3]">
        <div className="hyyc-headline-display text-[#F6F6F8]">
          <div className="text-[clamp(52px,8vw,132px)]">Drop</div>
          <div className="text-[clamp(52px,8vw,132px)]">001</div>
        </div>
      </div>
      <p ref={bodyRef} className="absolute left-[8vw] top-[52vh] w-[34vw] text-[#F6F6F8]/82 text-[clamp(14px,1.2vw,18px)] leading-relaxed z-[3]">
        Sign up for first access, secret pre-sales, and party invites.
      </p>
      <div ref={countdownRef} className="absolute left-[8vw] top-[62vh] z-[3]">
        <div className="flex items-center gap-2 mb-3 text-[#F6F6F8]/70">
          <Clock size={16} /><span className="hyyc-micro-label">Drops In</span>
        </div>
        <div className="flex gap-4">
          {[{ value: timeLeft.days, label: 'DAYS' }, { value: timeLeft.hours, label: 'HRS' }, { value: timeLeft.minutes, label: 'MIN' }, { value: timeLeft.seconds, label: 'SEC' }].map((item, i) => (
            <div key={i} className="text-center">
              <div className="hyyc-font-display text-3xl md:text-4xl font-bold text-[#F6F6F8]">{String(item.value).padStart(2, '0')}</div>
              <div className="hyyc-micro-label text-[#F6F6F8]/60 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
      <button ref={ctaRef} className="absolute left-[8vw] top-[78vh] hyyc-btn-primary flex items-center gap-3 z-[3]">
        Get Early Access <ArrowRight size={18} />
      </button>
      <div ref={circlesRef} className="absolute right-[6vw] top-1/2 -translate-y-1/2 z-[5]">
        <div className="relative w-[280px] h-[200px] md:w-[350px] md:h-[250px]">
          {circleImages.map((img, i) => (
            <div key={i} className="absolute w-[clamp(110px,14vw,210px)] h-[clamp(110px,14vw,210px)] rounded-full hyyc-circle-border overflow-hidden"
              style={{ right: `${i * 90}px`, top: i === 0 ? '22px' : i === 1 ? '-10px' : '8px', zIndex: 3 - i }}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
