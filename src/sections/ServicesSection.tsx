import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Anchor, Crown, Handshake, Cpu, ExternalLink, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'charter',
    icon: Anchor,
    title: 'Private Yacht Charters',
    subtitle: 'SmartYacht-certified experiences in South Florida and the Caribbean.',
    price: 'From $2,500/day',
    cta: 'Explore Charters',
    href: 'https://luxurymarinelife.com/charter',
    gradient: 'from-teal/20 to-cyan-500/10',
  },
  {
    id: 'membership',
    icon: Crown,
    title: 'Yacht Club Membership',
    subtitle: 'AC Yacht Club & Hottie Yachtie — exclusive access, events, and rewards.',
    price: 'From $99/mo',
    cta: 'Join the Club',
    href: 'https://luxurymarinelife.com/acyachtclub',
    gradient: 'from-amber-500/15 to-yellow-500/10',
  },
  {
    id: 'affiliate',
    icon: Handshake,
    title: 'Partner & Earn',
    subtitle: 'Concierge affiliate program with recurring commissions up to 25%.',
    price: 'Up to 25%',
    cta: 'Become a Partner',
    href: 'https://luxurymarinelife.com/affiliate',
    gradient: 'from-emerald-500/15 to-green-500/10',
  },
  {
    id: 'smartyacht',
    icon: Cpu,
    title: 'AI-Powered Vessels',
    subtitle: 'SmartYacht technology — AI navigation, marine monitoring, fleet intel.',
    price: 'Enterprise',
    cta: 'Discover SmartYacht',
    href: 'https://luxurymarinelife.com/smartyacht',
    gradient: 'from-blue-500/15 to-indigo-500/10',
  },
  {
    id: 'garmn',
    icon: GraduationCap,
    title: 'GARMN Adventures',
    subtitle: 'Tax-deductible educational charters for students & veterans. 501(c)(3).',
    price: '100% Donated',
    cta: 'Give an Adventure',
    href: 'https://luxurymarinelife.com/garmn',
    gradient: 'from-teal/25 to-emerald-500/15',
  },
];

export function ServicesSection() {
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
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: title, start: 'top 85%' } }
      );
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 28, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%' } }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-marine-900 py-20 lg:py-28 border-t border-white/[0.03]" aria-label="Services and experiences">
      <div className="px-6 lg:px-[7vw]">
        <div ref={titleRef} className="max-w-xl mb-12 lg:mb-16">
          <span className="label-elite text-gold">Services & Experiences</span>
          <h2 className="heading-display text-white text-[clamp(28px,3.5vw,52px)] mt-3">Beyond the Shop</h2>
          <p className="mt-4 text-white/50 text-base lg:text-lg leading-relaxed">
            Charter a SmartYacht, join the yacht club, or partner with the ecosystem —
            every touchpoint is designed for excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6">
          {services.map((svc, index) => (
            <a
              key={svc.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              href={svc.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-br ${svc.gradient} backdrop-blur-sm p-6 lg:p-7 transition-all duration-400 hover:border-white/[0.12] hover:shadow-lg hover:shadow-teal/5 hover:-translate-y-1`}
              aria-label={svc.title}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-teal/10 group-hover:border-teal/20">
                <svc.icon className="w-5.5 h-5.5 text-white/70 group-hover:text-teal transition-colors duration-300" strokeWidth={1.6} />
              </div>

              {/* Content */}
              <h3 className="text-white font-display font-bold text-lg leading-tight">{svc.title}</h3>
              <p className="mt-2.5 text-white/45 text-sm leading-relaxed">{svc.subtitle}</p>
              <p className="mt-1.5 text-teal/70 text-xs font-semibold tracking-wider">{svc.price}</p>

              {/* CTA */}
              <div className="mt-5 inline-flex items-center gap-2 text-teal font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                {svc.cta}
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Glow on hover */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-teal/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-10 lg:mt-14 flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {[
            { value: 'Now Booking', label: 'South Florida & Caribbean' },
            { value: '12', label: 'Destinations' },
            { value: '24/7', label: 'Concierge' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="stat-number text-[clamp(1.5rem,2.5vw,2rem)]">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
