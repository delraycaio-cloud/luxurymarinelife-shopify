import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FoundersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.querySelectorAll('[data-anim]'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 1,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-marine-900 py-20 lg:py-28 overflow-hidden border-t border-white/5"
      aria-label="Our Founders"
    >
      <div ref={contentRef} className="px-6 lg:px-[7vw] max-w-5xl mx-auto text-center">
        {/* Heading */}
        <p
          className="label-elite text-teal tracking-[0.3em] uppercase text-xs"
          data-anim
        >
          The Founders
        </p>
        <h2
          className="mt-4 heading-display text-white text-[clamp(24px,3vw,42px)] leading-tight"
          data-anim
        >
          Thank You for Supporting Our Vision
        </h2>

        {/* Founder Cards */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16" data-anim>
          {/* Delray */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 border-teal/30 shadow-lg shadow-teal/10">
              <img
                src="/delray.webp"
                alt="Delray Peter Wannemacher"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="mt-4 text-white font-display font-bold text-lg">Delray P. Wannemacher</h3>
            <p className="text-teal text-xs font-semibold tracking-wide uppercase mt-1">Co-Founder &amp; CEO</p>
          </div>

          {/* Angelina */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 border-teal/30 shadow-lg shadow-teal/10">
              <img
                src="/angelina.webp"
                alt="Angelina Cotta"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="mt-4 text-white font-display font-bold text-lg">Angelina Cotta</h3>
            <p className="text-teal text-xs font-semibold tracking-wide uppercase mt-1">Co-Founder &amp; Licensed Yacht Broker</p>
          </div>
        </div>

        {/* Thank-you Message */}
        <div className="mt-12 max-w-2xl mx-auto" data-anim>
          <p className="text-white/70 text-base lg:text-lg leading-relaxed italic">
            "Thank you for supporting our Health on the Water vision. Every purchase fuels cleaner oceans, healthier marine life, and a future where luxury and sustainability are inseparable."
          </p>
          <p className="mt-4 text-white/40 text-sm">
            — Delray &amp; Angelina, Luxury Marine Life
          </p>
        </div>

        {/* Impact Reminder */}
        <div className="mt-10 inline-flex items-center gap-3 bg-teal/5 border border-teal/15 rounded-full px-5 py-2.5" data-anim>
          <span className="text-teal text-lg">🌊</span>
          <span className="text-white/60 text-xs font-medium tracking-wide">
            10% of every sale supports GARMN ocean restoration &amp; MagicSchoolBox immersive learning
          </span>
        </div>
      </div>
    </section>
  );
}
