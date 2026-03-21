import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { collections, products } from '@/features/apparel-brands/ac-yacht-club/data';

gsap.registerPlugin(ScrollTrigger);

export function CollectionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(header,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      const items = grid.querySelectorAll('.collection-card');
      gsap.fromTo(items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const getCollectionImage = (collectionId: string) => {
    const collectionProducts = products.filter(p => 
      collectionId === 'founder' ? p.collection === 'The Founder Collection' :
      collectionId === 'commodore' ? p.collection === 'The Commodore Line' :
      p.collection === 'Summer Edit'
    );
    return collectionProducts[0]?.image || '/images/product-blazer.webp';
  };

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="relative bg-harbor-light/20 ac-yc-grain-overlay py-20 lg:py-28"
    >
      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-12">
            <span className="label-mono text-gold">Curated Selections</span>
            <h2 className="mt-2 font-serif text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
              Our Collections
            </h2>
            <p className="mt-3 text-slate/70 max-w-lg mx-auto">
              Each collection tells a story of craftsmanship, heritage, and timeless style.
            </p>
          </div>

          {/* Collections Grid */}
          <div ref={gridRef} className="grid md:grid-cols-3 gap-6">
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className="collection-card group cursor-pointer"
                onClick={() => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-4">
                  <img
                    src={getCollectionImage(collection.id)}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-harbor/80 via-harbor/20 to-transparent" />
                  
                  {/* Collection Number */}
                  <div className="absolute top-4 left-4">
                    <span className="font-serif text-6xl text-gold/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-2xl text-ivory group-hover:text-gold transition-colors">
                      {collection.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate/70">
                      {collection.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
