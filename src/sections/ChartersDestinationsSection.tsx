import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Compass, Anchor, Sparkles, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    id: 'miami',
    name: 'Miami & South Florida',
    tagline: 'Where it all begins',
    description: 'Glass-bottom reefs, skyline sunsets, and Biscayne Bay living.',
    price: '$2,500',
    icon: Anchor,
    gradient: 'from-cyan-500/20 to-teal/10',
    href: 'https://luxurymarinelife.com/charter',
  },
  {
    id: 'bahamas',
    name: 'The Bahamas',
    tagline: 'Crystal water escapes',
    description: 'Private island experiences in the clearest waters on Earth.',
    price: '$4,200',
    icon: Compass,
    gradient: 'from-blue-500/20 to-cyan-500/10',
    href: 'https://luxurymarinelife.com/charter',
  },
  {
    id: 'caribbean',
    name: 'Caribbean Islands',
    tagline: 'St. Barths · BVI · USVI',
    description: 'Luxury island-hopping with SmartYacht-certified vessels.',
    price: '$5,800',
    icon: MapPin,
    gradient: 'from-emerald-500/15 to-teal/10',
    href: 'https://luxurymarinelife.com/charter',
  },
  {
    id: 'learning',
    name: 'GARMN Learning Adventures',
    tagline: 'Tax-Deductible · 501(c)(3)',
    description: 'Immersive STEM education, ocean cleanup, and veteran wellness on the water. Buy One Give One.',
    price: 'From $50',
    icon: GraduationCap,
    gradient: 'from-teal/25 to-emerald-500/15',
    href: 'https://garmnconnect.web.app',
  },
  {
    id: 'custom',
    name: 'Custom Itinerary',
    tagline: 'Your ocean, your rules',
    description: 'Build a bespoke voyage with our concierge team.',
    price: 'Custom',
    icon: Sparkles,
    gradient: 'from-amber-500/15 to-yellow-500/10',
    href: 'https://luxurymarinelife.com/charter',
  },
];

export function ChartersDestinationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || !title || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(title,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: title, start: 'top 82%' } }
      );
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, delay: i * 0.1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%' } }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="charters"
      className="bg-marine-900 py-20 lg:py-28 border-t border-white/[0.03] section-contained"
      aria-label="Charters and destinations"
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <span className="label-elite text-teal">Charters & Destinations</span>
          <h2 className="heading-display text-white text-[clamp(28px,4vw,56px)] mt-3 leading-tight">
            YOUR NEXT ADVENTURE
            <br />
            <span className="text-gradient">STARTS HERE</span>
          </h2>
          <p className="mt-5 text-white/50 text-base lg:text-lg leading-relaxed max-w-xl mx-auto">
            SmartYacht-certified charters across the most beautiful waters in the world.
            Healthy adventures designed for high performers.
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6">
          {destinations.map((dest, index) => (
            <a
              key={dest.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              href={dest.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-br ${dest.gradient} backdrop-blur-sm p-6 lg:p-7 transition-all duration-400 hover:border-white/[0.12] hover:shadow-lg hover:shadow-teal/5 hover:-translate-y-1.5 min-h-[240px] flex flex-col justify-between`}
              aria-label={`Charter ${dest.name}`}
            >
              {/* Icon */}
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-teal/10 group-hover:border-teal/20">
                  <dest.icon className="w-5.5 h-5.5 text-white/70 group-hover:text-teal transition-colors duration-300" strokeWidth={1.6} />
                </div>

                <h3 className="text-white font-display font-bold text-lg leading-tight">{dest.name}</h3>
                <p className="text-teal/80 text-xs font-semibold tracking-wider uppercase mt-1">{dest.tagline}</p>
                <p className="mt-3 text-white/45 text-sm leading-relaxed">{dest.description}</p>
              </div>

              {/* Price + CTA */}
              <div className="mt-5">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-white/30 text-xs font-medium tracking-wider uppercase">From</span>
                  <span className="text-white font-display font-bold text-xl">{dest.price}</span>
                  {dest.id !== 'custom' && dest.id !== 'learning' && <span className="text-white/30 text-xs">/day</span>}
                </div>
                <div className="inline-flex items-center gap-2 text-teal font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                  {dest.id === 'learning' ? 'Donate Now' : 'Book Now'} <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                {dest.id !== 'learning' && dest.id !== 'custom' && (
                  <p className="mt-2 text-teal/50 text-[10px] font-semibold tracking-wider uppercase">🤝 Buy One Give One</p>
                )}
              </div>

              {/* Glow on hover */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-teal/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-12 lg:mt-16 flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {[
            { value: 'Now Booking', label: 'Charters Available' },
            { value: '12', label: 'Destinations' },
            { value: '24/7', label: 'Concierge' },
            { value: '100%', label: 'SmartYacht Certified' },
            { value: '501(c)(3)', label: 'GARMN Tax-Deductible' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="stat-number text-[clamp(1.5rem,3vw,2.5rem)]">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
