import { useEffect, useRef, useState } from "react";
import { Heart, Globe, Leaf, Droplet } from "lucide-react";

export default function SustainabilityStory() {
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

  const initiatives = [
    {
      icon: Droplet,
      title: "Ocean Cleanup",
      description:
        "We partner with global organizations to remove plastic from our oceans.",
      stat: "2.5M",
      statLabel: "lbs removed",
    },
    {
      icon: Leaf,
      title: "Sustainable Materials",
      description:
        "100% of our products use recycled or sustainably sourced materials.",
      stat: "100%",
      statLabel: "sustainable",
    },
    {
      icon: Globe,
      title: "Carbon Neutral",
      description:
        "We offset 100% of our carbon emissions through verified projects.",
      stat: "Zero",
      statLabel: "net emissions",
    },
    {
      icon: Heart,
      title: "Marine Conservation",
      description:
        "10% of every purchase directly funds ocean conservation efforts.",
      stat: "10%",
      statLabel: "to ocean",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(/ocean-underwater.jpg)" }}
      />
      <div className="absolute inset-0 bg-[#0a1628]/80" />

      <div className="relative z-10 container-luxury">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <span
              className={`text-[#c9a962] text-xs uppercase tracking-[0.3em] font-medium mb-6 block transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Our Commitment
            </span>
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight mb-8 transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              10% to the{" "}
              <span className="italic text-[#1e6b7a]">Ocean</span>
            </h2>
            <div
              className={`space-y-6 text-white/70 leading-relaxed transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <p>
                At Luxury Marine Life, we believe that true luxury means
                responsibility. Every garment we create is a commitment to
                preserving the oceans that inspire us.
              </p>
              <p>
                We donate 10% of every purchase to ocean conservation
                initiatives worldwide. From coral reef restoration to marine
                wildlife protection, your purchase makes a tangible difference.
              </p>
              <p>
                Our manufacturing process is carbon-neutral, our materials are
                sustainably sourced, and our packaging is 100% plastic-free.
                Because the ocean deserves nothing less.
              </p>
            </div>

            <div
              className={`mt-10 transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <button className="group flex items-center gap-4 text-white hover:text-[#c9a962] transition-colors duration-300">
                <span className="text-sm uppercase tracking-widest">
                  Learn More About Our Impact
                </span>
                <span className="w-10 h-px bg-current group-hover:w-16 transition-all duration-300" />
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {initiatives.map((initiative, index) => (
              <div
                key={initiative.title}
                className={`group p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#c9a962]/30 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="mb-4">
                  <initiative.icon className="w-6 h-6 text-[#c9a962]" />
                </div>
                <div className="mb-4">
                  <div className="text-3xl lg:text-4xl text-white font-light mb-1">
                    {initiative.stat}
                  </div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">
                    {initiative.statLabel}
                  </div>
                </div>
                <h3 className="text-white font-medium mb-2">
                  {initiative.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {initiative.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mt-20 md:mt-28 text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl md:text-2xl text-white/80 font-light italic max-w-4xl mx-auto">
            "We do not inherit the earth from our ancestors; we borrow it from
            our children."
          </p>
        </div>
      </div>
    </section>
  );
}

