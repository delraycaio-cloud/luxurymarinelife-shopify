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

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const card = cardRef.current;
    const headline = headlineRef.current;

    if (!section || !bg || !content || !card || !headline) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline();
      
      loadTl
        .fromTo(bg, 
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }
        )
        .fromTo(headline,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo(card,
          { opacity: 0, x: '10vw', scale: 0.98 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible state when scrolling back to top
            gsap.set([headline, content], { opacity: 1, x: 0 });
            gsap.set(card, { opacity: 1, x: 0, scale: 1 });
            gsap.set(bg, { scale: 1, opacity: 1 });
          }
        }
      });

      // ENTRANCE (0-30%): Hold settle state (no animation to match load end state)
      // SETTLE (30-70%): Static
      // EXIT (70-100%): Elements exit
      scrollTl
        .fromTo(content,
          { opacity: 1, x: 0 },
          { opacity: 0, x: '-6vw', ease: 'power2.in' },
          0.7
        )
        .fromTo(card,
          { opacity: 1, x: 0, scale: 1 },
          { opacity: 0, x: '6vw', scale: 0.98, ease: 'power2.in' },
          0.7
        )
        .fromTo(bg,
          { scale: 1, opacity: 1 },
          { scale: 1.06, opacity: 0.85, ease: 'power2.in' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToShop = () => {
    const shopSection = document.querySelector('#shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-marine-900 z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_wellness_bg.jpg"
          alt="Wellness on yacht"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-marine-900/55" />
      </div>

      {/* Content */}
      <div className="relative z-[4] h-full flex items-center">
        <div className="w-full px-6 lg:px-[7vw]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-0">
            {/* Left Content */}
            <div ref={contentRef} className="w-full lg:w-[42vw] text-center lg:text-left">
              <div ref={headlineRef} style={{ opacity: 0 }}>
                <h1 className="heading-display text-white text-[clamp(36px,10vw,84px)] lg:text-[clamp(44px,6vw,84px)]">
                  HEALTHY
                  <br />
                  PEOPLE
                </h1>
              </div>
              
              <p className="mt-4 lg:mt-8 text-white/80 text-sm sm:text-base lg:text-lg max-w-full lg:max-w-[34vw] leading-relaxed mx-auto lg:mx-0">
                Wellness journeys designed for life on the water—movement, recovery, and mindful routines.
              </p>
              
              <button
                onClick={scrollToShop}
                className="mt-6 lg:mt-10 inline-flex items-center gap-3 bg-teal hover:bg-teal-light text-marine-900 font-semibold px-5 py-3 lg:px-6 lg:py-3.5 rounded-full transition-all duration-300 hover:translate-y-[-2px] text-sm lg:text-base"
              >
                Explore the Collection
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
              
              <p className="mt-3 lg:mt-4 text-white/40 text-xs lg:text-sm">
                Free shipping on orders over $120
              </p>
            </div>

            {/* Right Image Card */}
            <div
              ref={cardRef}
              className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-none lg:w-[34vw] h-[280px] sm:h-[350px] lg:h-[64vh] rounded-lg overflow-hidden shadow-2xl mx-auto lg:mx-0"
              style={{ opacity: 0 }}
            >
              <img
                src="/hero_wellness_card.jpg"
                alt="Meditation on yacht"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
