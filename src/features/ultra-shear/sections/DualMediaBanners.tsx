import { useInView } from "@/hooks/useInView";

interface DualMediaBannersProps {
  onNavigate: (page: string) => void;
}

export function DualMediaBanners({ onNavigate }: DualMediaBannersProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const scrollToFounders = () => {
    const foundersSection = document.querySelector("#founders-opportunity");
    if (foundersSection) {
      const headerOffset = 110;
      const targetY =
        foundersSection.getBoundingClientRect().top +
        window.pageYOffset -
        headerOffset;
      window.scrollTo({ top: targetY, behavior: "smooth" });
      return;
    }

    onNavigate("products");
  };

  const panels = [
    {
      image: "/images/oil_3.jpeg",
      title: "THE SCIENCE",
      subtitle: "PRECISION AT THE MOLECULAR LEVEL.",
      cta: "EXPLORE",
    },
    {
      image: "/images/oil_2.jpeg",
      title: "THE FORMULA",
      subtitle: "FIVE SUPEROILS. MULTIPLE BIOACTIVES.",
      cta: "DISCOVER",
    },
  ];

  return (
    <section ref={ref} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {panels.map((panel, index) => (
          <div
            key={index}
            className={`relative aspect-[10/11] overflow-hidden group cursor-pointer transition-all duration-1000 ${
              isInView
                ? "opacity-100"
                : index === 0
                  ? "opacity-0 -translate-x-20"
                  : "opacity-0 translate-x-20"
            }`}
            style={{
              transitionDelay: `${index * 200}ms`,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onClick={scrollToFounders}
          >
            {/* Background Image */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
              <img
                src={panel.image}
                alt={panel.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/70" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <div
                className={`transition-all duration-700 ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
              >
                <h3 className="font-serif text-3xl md:text-4xl text-white text-center mb-3">
                  {panel.title}
                </h3>
                <p className="label-text text-white/80 text-center mb-6">
                  {panel.subtitle}
                </p>
                <div className="flex justify-center">
                  <button className="btn-outline-white">{panel.cta}</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
