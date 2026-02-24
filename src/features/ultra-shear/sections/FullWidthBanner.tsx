import { useInView } from "@/hooks/useInView";

interface FullWidthBannerProps {
  onNavigate: (page: string) => void;
}

export function FullWidthBanner({ onNavigate }: FullWidthBannerProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section ref={ref} className="relative h-[600px] overflow-hidden">
      {/* Background Image */}
      <div
        className={`absolute inset-0 transition-transform duration-[2000ms] ${
          isInView ? "scale-100" : "scale-110"
        }`}
      >
        <img
          src="/images/wide_banner.jpeg"
          alt="UST Processed Nanoemulsions"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl">
          <h2
            className={`font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-6 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            UST PROCESSED NANOEMULSIONS
          </h2>
          <p
            className={`text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            4-10X Greater Bioavailability. Bypasses Gut and Liver. Direct
            Bloodstream Entry via Oral Mucosa.
          </p>
          <button
            onClick={() => onNavigate("products")}
            className={`btn-primary transition-all duration-700 ${
              isInView ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{
              transitionDelay: "700ms",
              transitionTimingFunction:
                "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
          >
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  );
}
