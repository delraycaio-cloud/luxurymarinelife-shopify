import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Truck, Star, RotateCcw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const badges = [
  { icon: Shield, label: '10% to the Ocean', sub: 'Every Purchase' },
  { icon: Truck, label: 'Free US Shipping', sub: 'Orders $75+' },
  { icon: Star, label: 'Made for the Water', sub: 'Est. 2024' },
  { icon: RotateCcw, label: '30-Day Guarantee', sub: 'No Questions Asked' },
];

export function TrustBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(bar,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: bar, start: 'top 92%' } }
      );
    }, bar);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={barRef} className="bg-marine-900/70 backdrop-blur-md border-y border-white/[0.04] py-5 lg:py-6">
      <div className="px-6 lg:px-[7vw]">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6 lg:gap-4">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-teal/20">
                <b.icon className="w-4.5 h-4.5 text-teal" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-white/90 font-semibold text-sm leading-tight">{b.label}</p>
                <p className="text-white/40 text-xs mt-0.5">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
