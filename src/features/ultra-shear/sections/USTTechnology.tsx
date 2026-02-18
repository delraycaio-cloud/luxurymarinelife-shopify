import { useInView } from "@/hooks/useInView";

const stats = [
  { value: "40K+", label: "psi", sublabel: "2.5× Marianas Trench pressure" },
  { value: "20-80", label: "nm", sublabel: "Nano-droplet size" },
  { value: "3-5", label: "min", sublabel: "Absorption onset" },
  { value: "4-10X", label: "", sublabel: "Bioavailability vs pills" },
];

export function USTTechnology() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-[#FAFAFA]">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-20"
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/images/supplemental-facts.webp"
                alt="UST Technology"
                className="w-full h-full object-cover scale-100"
              />
            </div>
          </div>

          {/* Right Content */}
          <div>
            <h2
              className={`font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              THE ULTRASHEAR TECHNOLOGY™ (UST) SOLUTION
            </h2>
            <p
              className={`text-[#8B1A1A] font-medium text-lg mb-8 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              We use Physics to Make the World’s first, Super Antioxidant Oil
              Complex Oral NanoSpray.
            </p>

            <div
              className={`space-y-6 text-gray-600 leading-relaxed mb-10 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <p>
                The Physics Engine: UST subjects oil to intense pressure — over
                40,000 PSI, that's 2.5× the pressure at the bottom of the
                Marianas Trench — at controlled temperatures, forcing it through
                a revolutionary, patented NanoGap Valve™.
              </p>
              <p>
                This mechanical transformation uses physics, not synthetic
                chemicals, to shear oil drops into a stable, potent, and highly
                bioavailable nanoemulsion. Oil is sheared into trillions of tiny
                nano-droplets measuring just 20-80 nm.
              </p>
              <p>
                These nano-droplets become effectively water-soluble bio-fuel
                for immediate cellular uptake. UST nanoemulsions offer 4-10X
                greater bioavailability. The Oral NanoSpray delivery
                bypasses the gut and liver entirely, entering the bloodstream
                via oral mucosa for rapid systemic absorption.
              </p>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.sublabel}
                  className="text-center"
                  style={{ animationDelay: `${1200 + index * 100}ms` }}
                >
                  <div className="font-serif text-2xl md:text-3xl text-[#8B1A1A] mb-1 whitespace-nowrap leading-none">
                    {stat.value}
                    {stat.label ? (
                      <span className="text-sm md:text-base ml-1">
                        {stat.label}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs text-gray-500">{stat.sublabel}</p>
                </div>
              ))}
            </div>

            {/* Callout */}
            <div
              className={`bg-white p-6 border-l-4 border-[#8B1A1A] transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "900ms" }}
            >
              <p className="text-sm text-gray-600">
                <span className="font-medium text-[#1A1A1A]">CLEAN-LABEL:</span>{" "}
                UST nanoemulsions are processed under GMP and sterile-filled
                into special spray bottles that uniquely keep the nanoemulsion
                microbial-free during its entire shelf-life without the need
                for synthetic additives and preservatives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


