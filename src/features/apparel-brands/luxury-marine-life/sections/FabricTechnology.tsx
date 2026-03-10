import { useEffect, useRef, useState } from "react";
import { Sun, Droplets, Wind, Recycle, Shield, Thermometer } from "lucide-react";

export default function FabricTechnology() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const technologies = [
    {
      icon: Sun,
      title: "UPF 50+",
      subtitle: "Sun Protection",
      description:
        "Maximum UV protection blocks 98% of harmful rays for all-day safety on the water.",
    },
    {
      icon: Droplets,
      title: "Saltwater Resistant",
      subtitle: "Marine Grade",
      description:
        "Advanced fabric treatment resists saltwater corrosion and maintains performance.",
    },
    {
      icon: Wind,
      title: "Quick-Dry",
      subtitle: "Rapid Evaporation",
      description:
        "Proprietary moisture-wicking technology dries 3x faster than standard fabrics.",
    },
    {
      icon: Recycle,
      title: "Ocean Plastic",
      subtitle: "Recycled Materials",
      description:
        "Each garment contains recycled plastics recovered from ocean cleanup initiatives.",
    },
    {
      icon: Shield,
      title: "Antimicrobial",
      subtitle: "Odor Control",
      description:
        "Built-in antimicrobial treatment keeps garments fresh during extended wear.",
    },
    {
      icon: Thermometer,
      title: "Thermoregulating",
      subtitle: "Climate Control",
      description:
        "Adaptive fabric technology maintains optimal body temperature in any condition.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-[#0a1628] overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#1e6b7a]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#c9a962]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-luxury">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span
            className={`text-[#c9a962] text-xs uppercase tracking-[0.3em] font-medium mb-6 block transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Innovation
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl text-white font-light mb-6 transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Fabric <span className="italic text-[#c9a962]">Technology</span>
          </h2>
          <p
            className={`text-lg text-white/60 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Every garment is engineered with cutting-edge performance
            technology, designed specifically for the demands of marine
            environments.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {technologies.map((tech, index) => (
            <div
              key={tech.title}
              className={`group p-8 lg:p-12 bg-[#0a1628] hover:bg-[#1a2a44] transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 flex items-center justify-center border border-[#c9a962]/30 group-hover:border-[#c9a962] group-hover:bg-[#c9a962]/10 transition-all duration-500">
                  <tech.icon className="w-7 h-7 text-[#c9a962]" />
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-2xl lg:text-3xl text-white font-light mb-1">
                  {tech.title}
                </h3>
                <span className="text-xs text-[#c9a962] uppercase tracking-widest">
                  {tech.subtitle}
                </span>
              </div>

              <p className="text-white/50 leading-relaxed text-sm">
                {tech.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className={`mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { value: "50+", label: "UPF Rating" },
            { value: "3x", label: "Faster Drying" },
            { value: "100%", label: "Recycled Materials" },
            { value: "24h", label: "Odor Protection" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl text-[#c9a962] font-light mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-white/40 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

