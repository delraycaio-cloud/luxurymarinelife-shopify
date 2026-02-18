import { useInView } from "@/hooks/useInView";
import { Droplets, Flame, Clock } from "lucide-react";

const iconCards = [
  {
    icon: Droplets,
    title: "Low Absorption",
    description: "Usually less than 10% reaches your bloodstream",
  },
  {
    icon: Flame,
    title: "Wasted Potency",
    description: "In some cases, as much as 95% can be wasted",
  },
  {
    icon: Clock,
    title: "Sluggish Uptake",
    description: "Can take as long as 45-90 minutes for full absorption",
  },
];

export function BioavailabilityGap() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <h2
              className={`font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              THE BIOAVAILABILITY GAP
            </h2>
            <p
              className={`text-[#8B1A1A] font-medium text-lg mb-8 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              YOUR BODY IS 70% WATER. OIL DOESN'T MIX.
            </p>
            <p
              className={`text-gray-600 leading-relaxed mb-8 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              Traditional oil-based pills have absorption rates as low as 5-10%.
              In some cases, as much as 95% of potency is wasted. Your body is
              approximately 70% water - it poorly absorbs hydrophobic,
              water-repelling, oil-based vitamins and supplements.
            </p>

            <div
              className={`mb-8 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <h3 className="label-text text-[#1A1A1A] mb-3">
                FIRST-PASS METABOLISM
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The gut and liver break down and flush out oil before valuable
                nutrients can be absorbed, wasting as much as 95% of active
                ingredients. Uptake speed is sluggish - 45 to 90 minutes.
                Particle sizes are massive: over 10,000 nm for traditional
                macroemulsions.
              </p>
            </div>

            {/* Icon Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {iconCards.map((card, index) => (
                <div
                  key={card.title}
                  className={`text-center p-6 bg-[#FAFAFA] transition-all duration-700 hover:shadow-lg hover:-translate-y-1 ${
                    isInView ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                  style={{
                    transitionDelay: `${500 + index * 100}ms`,
                    transitionTimingFunction:
                      "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                >
                  <card.icon className="w-8 h-8 text-[#8B1A1A] mx-auto mb-4" />
                  <h4 className="font-serif text-lg text-[#1A1A1A] mb-2">
                    {card.title}
                  </h4>
                  <p className="text-sm text-gray-500">{card.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Comparison */}
          <div
            className={`transition-all duration-1000 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-20"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="bg-[#FAFAFA] p-8 md:p-12">
              <h3 className="font-serif text-2xl text-[#1A1A1A] text-center mb-8">
                Oil-Soluble Bioactives
              </h3>

              <div className="space-y-8">
                {/* Traditional Pills */}
                <div>
                  <h4 className="label-text text-gray-500 mb-4">
                    TRADITIONAL PILLS
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Absorption</span>
                      <span className="font-medium text-[#1A1A1A]">
                        As low as 5-10%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-1">
                      <div className="bg-gray-400 h-1 w-[10%]" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Uptake Time</span>
                      <span className="font-medium text-[#1A1A1A]">
                        45-90 min
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Particle Size</span>
                      <span className="font-medium text-[#1A1A1A]">
                        &gt;10,000 nm
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Additives</span>
                      <span className="font-medium text-[#1A1A1A]">
                        Binders/fillers required
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                {/* UST Nano-Spray */}
                <div>
                  <h4 className="label-text text-[#8B1A1A] mb-4">
                    UST NANO-SPRAY
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bioavailability</span>
                      <span className="font-medium text-[#8B1A1A]">
                        4-10X greater
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-1">
                      <div className="bg-[#8B1A1A] h-1 w-[90%]" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Absorption</span>
                      <span className="font-medium text-[#8B1A1A]">
                        3-5 min
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Particle Size</span>
                      <span className="font-medium text-[#8B1A1A]">
                        20-80 nm
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Formula</span>
                      <span className="font-medium text-[#8B1A1A]">
                        Clean label, zero synthetics
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
