import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const categories: Category[] = [
  { id: 'learning', name: 'Immersive Learning', description: 'Skills and protocols that keep your edge razor-sharp.', image: '/category_learning.jpg', link: '#courses' },
  { id: 'biohacking', name: 'Supplements & Performance', description: 'Nano-emulsified recovery, focus, and longevity essentials.', image: '/category_biohacking.jpg', link: '/ultra-shear' },
  { id: 'tech', name: 'Sustainable Tech', description: 'Protect the water you love — clean innovations that last.', image: '/category_tech.jpg', link: '#tech' },
  { id: 'apparel', name: 'Apparel', description: 'Climate-ready layers engineered for high-performance living.', image: '/category_apparel.jpg', link: '#apparel' },
];

type ShopSectionProps = { onCategoryClick?: (categoryId: string) => void; };

export function ShopSection({ onCategoryClick }: ShopSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || !title || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(title,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: title, start: 'top 82%', end: 'top 55%', scrub: 1 } }
      );
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 36, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, delay: i * 0.06, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%', end: 'top 62%', scrub: 1 } }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (cat: Category) => {
    if (cat.id === 'biohacking') { window.location.href = '/ultra-shear'; }
    else { onCategoryClick?.(cat.id); }
  };

  return (
    <section ref={sectionRef} id="shop" className="bg-marine-800 py-20 lg:py-28" aria-label="Shop our pillars">
      <div className="px-6 lg:px-[7vw]">
        <div ref={titleRef} className="max-w-[54vw] mb-12 lg:mb-16">
          <span className="label-elite text-teal">Our Pillars</span>
          <h2 className="heading-display text-white text-[clamp(32px,4vw,60px)] mt-3">Explore the Collection</h2>
          <p className="mt-4 text-white/55 text-base lg:text-lg leading-relaxed">Courses, nano-supplements, sustainable tech, and marine apparel — curated for life on the water.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative h-[48vh] min-h-[280px] rounded-xl overflow-hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-teal"
              onClick={() => handleCardClick(category)}
              role="button" tabIndex={0} aria-label={`Shop ${category.name}`}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(category)}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-marine-900/90 via-marine-900/30 to-transparent" />

              {category.id === 'biohacking' && (
                <div className="absolute top-3 right-3">
                  <span className="label-elite bg-teal text-marine-900 px-2.5 py-1 rounded-full">Featured</span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 transition-transform duration-300 group-hover:-translate-y-1">
                <h3 className="text-white font-display font-bold text-xl lg:text-2xl leading-tight">{category.name}</h3>
                <p className="mt-2 text-white/65 text-sm leading-relaxed max-h-0 overflow-hidden transition-all duration-400 group-hover:max-h-12 group-hover:mt-2">{category.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-teal font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                  Shop Now <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
