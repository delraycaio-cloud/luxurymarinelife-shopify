import { useInView } from '@/hooks/useInView';
import { FlaskConical, Leaf, Truck } from 'lucide-react';

const features = [
  {
    icon: FlaskConical,
    title: 'THE SCIENCE',
    description: 'Patented UltraShear Technology™',
  },
  {
    icon: Leaf,
    title: 'CLEAN LABEL',
    description: 'Zero Preservatives, Zero Synthetics',
  },
  {
    icon: Truck,
    title: 'FREE SHIPPING',
    description: 'On All Stacks & Multi-Packs',
  },
];

export function Features() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section ref={ref} className="py-16 bg-white border-y border-gray-100">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`text-center px-8 transition-all duration-700 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              } ${
                index < features.length - 1
                  ? 'md:border-r border-gray-200'
                  : ''
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <feature.icon className="w-10 h-10 text-[#8B1A1A] mx-auto mb-4" />
              <h3 className="label-text text-[#1A1A1A] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

