import { useInView } from "@/hooks/useInView";

interface FullWidthBannerProps {
  onNavigate: (page: string) => void;
}

export function FullWidthBanner({ onNavigate }: FullWidthBannerProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const handleShopNowClick = () => {
    const packagesSection = document.getElementById("founders-opportunity");
    if (packagesSection) {
      const headerOffset = 130;
      const targetY =
        packagesSection.getBoundingClientRect().top +
        window.pageYOffset -
        headerOffset;
      window.scrollTo({ top: targetY, behavior: "smooth" });
      return;
    }

    onNavigate("products");
  };

  return (
    <section ref={ref} className="relative h-[600px] overflow-hidden">
      {/* Background Image */}
      <div
        className={`absolute inset-0 transition-transform duration-[2000ms] ${
          isInView ? "scale-100" : "scale-110"
        }`}
      >
        <img
          src="/images/wide_banner.webp"
          alt="UST Processed Nanoemulsions"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6 md:px-8 w-[340px] h-[300px] md:w-[560px] md:h-[420px] mx-auto flex flex-col items-center justify-center [border-radius:44%_56%_52%_48%/56%_44%_60%_40%] [background:radial-gradient(ellipse_at_center,rgba(11,34,54,0.72)_0%,rgba(11,34,54,0.42)_30%,rgba(11,34,54,0.18)_52%,rgba(11,34,54,0.06)_68%,rgba(11,34,54,0)_86%)]">
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
            onClick={handleShopNowClick}
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
