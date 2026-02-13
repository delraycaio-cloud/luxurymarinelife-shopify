import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatementSectionProps {
  id: string;
  headline: string;
  body: string;
  backgroundImage: string;
  zIndex: number;
  cta?: {
    text: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    onClick?: () => void;
  };
}

export function StatementSection({
  id,
  headline,
  body,
  backgroundImage,
  zIndex,
  cta,
  secondaryCta,
}: StatementSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headlineEl = headlineRef.current;
    const bodyEl = bodyRef.current;
    const ctaEl = ctaRef.current;

    if (!section || !bg || !headlineEl || !bodyEl) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(bg,
          { scale: 1.10, opacity: 0.6 },
          { scale: 1.00, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(headlineEl,
          { opacity: 0, y: '40vh' },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0
        )
        .fromTo(bodyEl,
          { opacity: 0, y: '18vh' },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.05
        );

      if (ctaEl) {
        scrollTl.fromTo(ctaEl,
          { opacity: 0, y: '10vh' },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.10
        );
      }

      // SETTLE (30-70%): Hold position - no animation needed

      // EXIT (70-100%)
      scrollTl
        .to(headlineEl,
          { opacity: 0, y: '-18vh', ease: 'power2.in' },
          0.7
        )
        .to(bodyEl,
          { opacity: 0, y: '-10vh', ease: 'power2.in' },
          0.7
        );

      if (ctaEl) {
        scrollTl.to(ctaEl,
          { opacity: 0, y: '-6vh', ease: 'power2.in' },
          0.7
        );
      }

      scrollTl.to(bg,
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="section-pinned"
      style={{ zIndex }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
      >
        <img
          src={backgroundImage}
          alt={headline}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-marine-900/50" />
      </div>

      {/* Content */}
      <div className="relative z-[4] h-full flex items-center justify-center">
        <div className="text-center px-6 max-w-[90vw]">
          <h2
            ref={headlineRef}
            className="heading-display text-white text-[clamp(38px,5vw,72px)]"
          >
            {headline}
          </h2>
          
          <p
            ref={bodyRef}
            className="mt-6 lg:mt-8 text-white/80 text-base lg:text-lg max-w-[56vw] mx-auto leading-relaxed"
          >
            {body}
          </p>

          {(cta || secondaryCta) && (
            <div ref={ctaRef} className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {cta && (
                <button
                  onClick={cta.onClick}
                  className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-marine-900 font-semibold px-6 py-3.5 rounded-full transition-all duration-300 hover:translate-y-[-2px]"
                >
                  {cta.text}
                </button>
              )}
              {secondaryCta && (
                <button
                  onClick={secondaryCta.onClick}
                  className="text-white/80 hover:text-teal font-medium transition-colors underline underline-offset-4"
                >
                  {secondaryCta.text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}