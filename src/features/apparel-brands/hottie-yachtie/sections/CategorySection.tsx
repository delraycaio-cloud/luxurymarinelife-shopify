import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShoppingBag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CategorySectionProps {
  id: string;
  title: string;
  body: string;
  cta: string;
  bgImage: string;
  ribbonPosition: 'left' | 'right';
  circleImages: string[];
  zIndex: number;
  onAddToCart: () => void;
  onShopClick: () => void;
}

export default function CategorySection({
  title,
  body,
  cta,
  bgImage,
  ribbonPosition,
  circleImages,
  zIndex,
  onAddToCart,
  onShopClick,
}: CategorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const isLeft = ribbonPosition === 'left';

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      const ribbonStartX = isLeft ? '-60vw' : '60vw';
      const headlineStartY = '18vh';
      const headlineStartX = isLeft ? '-18vw' : '18vw';
      const circlesStartX = isLeft ? '40vw' : '-40vw';
      const exitX = isLeft ? '-18vw' : '18vw';
      const circlesExitX = isLeft ? '22vw' : '-22vw';
      const ribbonExitX = isLeft ? '-18vw' : '22vw';

      scrollTl.fromTo(ribbonRef.current,
        { x: ribbonStartX, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(headlineRef.current,
        isLeft ? { y: headlineStartY, opacity: 0 } : { x: headlineStartX, opacity: 0 },
        { y: 0, x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(bodyRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(ctaRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(circlesRef.current,
        { x: circlesStartX, scale: 0.85, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(bgRef.current,
        { scale: 1.08, opacity: 0.8 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(headlineRef.current,
        { x: 0, opacity: 1 },
        { x: exitX, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(bodyRef.current,
        { x: 0, opacity: 1 },
        { x: exitX, opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(ctaRef.current,
        { x: 0, opacity: 1 },
        { x: exitX, opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(circlesRef.current,
        { x: 0, opacity: 1 },
        { x: circlesExitX, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(ribbonRef.current,
        { x: 0, opacity: 1 },
        { x: ribbonExitX, opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0.7, ease: 'power2.in' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, [isLeft]);

  return (
    <section
      ref={sectionRef}
      className="hyyc-section-pinned"
      style={{ zIndex }}
    >
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#0B0B0D]/50" />
      </div>

      {/* Red ribbon */}
      <div
        ref={ribbonRef}
        className={`absolute top-0 w-[62vw] h-full bg-[#FF1F3D]/92 ${
          isLeft ? 'left-0 hyyc-ribbon-left' : 'right-0 hyyc-ribbon-right'
        }`}
        style={{ zIndex: 2 }}
      />

      {/* Content on ribbon */}
      <div 
        ref={headlineRef}
        className={`absolute top-[20vh] z-[3] ${
          isLeft ? 'left-[6vw] text-left' : 'right-[6vw] text-right'
        }`}
      >
        <div className="hyyc-headline-display text-[#F6F6F8]">
          <div className="text-[clamp(52px,8vw,132px)]">{title}</div>
        </div>
      </div>

      <p
        ref={bodyRef}
        className={`absolute top-[56vh] w-[34vw] text-[#F6F6F8]/82 text-[clamp(14px,1.2vw,18px)] leading-relaxed z-[3] ${
          isLeft ? 'left-[6vw] text-left' : 'right-[6vw] text-right'
        }`}
      >
        {body}
      </p>

      <div
        ref={ctaRef}
        className={`absolute top-[70vh] z-[3] flex gap-3 ${
          isLeft ? 'left-[6vw]' : 'right-[6vw] flex-row-reverse'
        }`}
      >
        <button onClick={onShopClick} className="hyyc-btn-primary flex items-center gap-3">
          {cta}
          <ArrowRight size={18} />
        </button>
        <button 
          onClick={onAddToCart}
          className="bg-[#0B0B0D] text-[#F6F6F8] p-4 hover:bg-[#FF1F3D] transition-colors"
          aria-label="Add to cart"
        >
          <ShoppingBag size={20} />
        </button>
      </div>

      {/* Circle cluster */}
      <div
        ref={circlesRef}
        className={`absolute top-1/2 -translate-y-1/2 z-[5] ${
          isLeft ? 'right-[6vw]' : 'left-[6vw]'
        }`}
      >
        <div className={`relative w-[280px] h-[200px] md:w-[350px] md:h-[250px] ${
          isLeft ? '' : 'scale-x-[-1]'
        }`}>
          {circleImages.map((img, i) => (
            <div
              key={i}
              className="absolute w-[clamp(110px,14vw,210px)] h-[clamp(110px,14vw,210px)] rounded-full hyyc-circle-border overflow-hidden"
              style={{
                right: `${i * 90}px`,
                top: i === 0 ? '22px' : i === 1 ? '-10px' : '8px',
                zIndex: 3 - i,
              }}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
