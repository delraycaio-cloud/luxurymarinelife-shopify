import { useEffect, useRef, useState } from "react";
import { Anchor, Waves, Compass } from "lucide-react";

export default function LifestyleAuthority() {
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

  const pillars = [
    {
      icon: Anchor,
      title: "Ocean Heritage",
      description:
        "Rooted in maritime tradition, our designs honor the timeless elegance of nautical culture while embracing modern innovation.",
    },
    {
      icon: Waves,
      title: "Performance First",
      description:
        "Every garment is engineered to perform in the most demanding marine environments, from calm harbors to open oceans.",
    },
    {
      icon: Compass,
      title: "Sustainable Future",
      description:
        "We believe luxury and responsibility go hand in hand. Our commitment to the ocean drives every decision we make.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-[#f8f6f3] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0a1628] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1e6b7a] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-luxury">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20 md:mb-28">
          <div>
            <span
              className={`text-[#c9a962] text-xs uppercase tracking-[0.3em] font-medium mb-6 block transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Our Philosophy
            </span>
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl text-[#0a1628] font-light leading-tight transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Where Luxury Meets{" "}
              <span className="italic text-[#1e6b7a]">Purpose</span>
            </h2>
          </div>
          <div>
            <p
              className={`text-lg text-[#0a1628]/70 leading-relaxed transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Luxury Marine Life was born from a simple belief: that those who
              love the ocean deserve apparel worthy of their passion. We create
              clothing that performs as beautifully as it looks, using
              sustainable materials and ethical practices that honor the waters
              we cherish.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`group p-8 lg:p-10 bg-white border border-[#0a1628]/5 hover:border-[#0a1628]/20 transition-all duration-500 hover:shadow-xl ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="mb-6">
                <div className="w-14 h-14 flex items-center justify-center border border-[#0a1628]/10 group-hover:border-[#c9a962] group-hover:bg-[#c9a962]/5 transition-all duration-500">
                  <pillar.icon className="w-6 h-6 text-[#0a1628]/60 group-hover:text-[#c9a962] transition-colors duration-500" />
                </div>
              </div>
              <h3 className="text-xl text-[#0a1628] font-medium mb-4">
                {pillar.title}
              </h3>
              <p className="text-[#0a1628]/60 leading-relaxed text-sm">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className={`mt-20 md:mt-28 text-center max-w-4xl mx-auto transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <blockquote className="text-2xl md:text-3xl lg:text-4xl text-[#0a1628] font-light italic leading-relaxed">
            "The ocean stirs the heart, inspires the imagination, and brings
            eternal joy to the soul."
          </blockquote>
          <cite className="mt-6 block text-sm text-[#0a1628]/50 uppercase tracking-widest not-italic">
            — Wyland
          </cite>
        </div>
      </div>
    </section>
  );
}

