import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Scissors, Award, Truck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const brandValues = [
  {
    icon: Globe,
    title: 'Italian Materials',
    description: 'Sourced from the finest mills in Como, Biella, and Naples'
  },
  {
    icon: Scissors,
    title: 'Artisan Craftsmanship',
    description: 'Each piece hand-finished by master craftspeople'
  },
  {
    icon: Award,
    title: 'Lifetime Quality',
    description: 'Built to last generations, not seasons'
  },
  {
    icon: Truck,
    title: 'Global Delivery',
    description: 'Complimentary worldwide shipping on all orders'
  }
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const values = valuesRef.current;

    if (!section || !content || !values) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      const items = values.querySelectorAll('.value-item');
      gsap.fromTo(items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: values,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-harbor ac-yc-grain-overlay py-20 lg:py-28"
    >
      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Image */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/images/dining-room.webp"
                  alt="AC Yacht Club"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Stats Overlay */}
              <div className="absolute -bottom-6 -right-6 bg-harbor-light p-6 border border-gold/20">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-serif text-3xl text-gold">25+</p>
                    <p className="text-xs text-slate/60">Years of Heritage</p>
                  </div>
                  <div>
                    <p className="font-serif text-3xl text-gold">12</p>
                    <p className="text-xs text-slate/60">Global Locations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div ref={contentRef}>
              <span className="label-mono text-gold">Our Story</span>
              <h2 className="mt-4 font-serif text-ivory" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
                Where Maritime Heritage Meets Modern Elegance
              </h2>
              <div className="mt-6 space-y-4 text-slate/80 leading-relaxed">
                <p>
                  Founded in 1998, AC Yacht Club began as a private members' club on the 
                  Mediterranean coast. What started as a gathering place for yacht enthusiasts 
                  has evolved into a global lifestyle brand synonymous with understated luxury.
                </p>
                <p>
                  Our apparel collection reflects the same values that define our club: 
                  craftsmanship, discretion, and timeless style. Each piece is designed 
                  to transition seamlessly from deck to dinner, from harbor to high street.
                </p>
                <p>
                  We partner with the finest artisans in Italy, Scotland, and England to 
                  create garments that honor maritime heritage while embracing contemporary elegance.
                </p>
              </div>

              {/* Values */}
              <div ref={valuesRef} className="mt-10 grid grid-cols-2 gap-4">
                {brandValues.map((value) => (
                  <div key={value.title} className="value-item flex items-start gap-3">
                    <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm text-ivory">{value.title}</h4>
                      <p className="text-xs text-slate/60 mt-0.5">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
