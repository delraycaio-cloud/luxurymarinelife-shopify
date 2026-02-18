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
    <section ref={ref} className="section-padding bg-[#FAFAFA]">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4 transition-all duration-700 ${
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
              className={`w-full max-w-md mx-auto text-center transition-all duration-700 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-16'
              }`}
              style={{
                transitionDelay: `${200 + index * 150}ms`,
                transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              }}
            >
              {/* Number */}
              <div className="relative inline-block mb-6">
                <span className="font-serif text-6xl md:text-7xl text-[#8B1A1A]/10">
                  {step.number}
                </span>
                <step.icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#8B1A1A]" />
              </div>

              <h3 className="font-serif text-xl md:text-2xl text-[#1A1A1A] mb-3 md:whitespace-nowrap">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Note */}
        <p
          className={`text-center text-gray-500 mt-16 transition-all duration-700 ${
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

