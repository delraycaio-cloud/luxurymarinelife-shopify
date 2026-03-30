import { useInView } from '@/hooks/useInView';
import { Droplets, Timer } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Droplets,
    title: 'Spray Under Tongue / Inner Cheeks',
    description: 'Target oral mucosa for direct absorption',
  },
  {
    number: '02',
    icon: Timer,
    title: 'Hold 20-30 Seconds',
    description: 'Then swallow for maximum uptake efficiency',
  },
];

export function Protocol() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section ref={ref} className="section-padding bg-[#0A0F16] relative overflow-hidden">
      {/* Background Image / Gradient */}
      <div className="absolute inset-0 z-0 opacity-30">
        <img src="/images/water.webp" className="w-full h-full object-cover" alt="" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F16] via-[#0A0F16]/40 to-[#0A0F16] z-10" />

      <div className="container-luxury relative z-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-serif text-4xl md:text-5xl text-white mb-4 transition-all duration-700 ${
              isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            A 30 SECOND RITUAL
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`protocol-card w-full max-w-md mx-auto text-center ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-16'
              }`}
              style={{
                transitionDelay: `${200 + index * 150}ms`,
              }}
            >
              {/* Number */}
              <div className="relative inline-block mb-6">
                <span className="font-serif text-6xl md:text-7xl text-white/5">
                  {step.number}
                </span>
                <step.icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#D4A84B]" />
              </div>

              <h3 className="font-serif text-xl md:text-2xl text-white mb-3 md:whitespace-nowrap">
                {step.title}
              </h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Note */}
        <p
          className={`text-center text-gray-400 mt-16 transition-all duration-700 ${
            isInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          6 sprays daily (1 mL). Best taken in the morning for all-day cellular
          support.
        </p>
      </div>
    </section>
  );
}

