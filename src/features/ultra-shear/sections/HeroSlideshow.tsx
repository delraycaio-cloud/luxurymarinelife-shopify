import { useState, useEffect, useCallback } from "react";
import { useInView } from "@/hooks/useInView";

interface Slide {
  image: string;
  category: string;
  tagline: string;
  cta: string;
}

const slides: Slide[] = [
  {
    image: "/images/hero_image_on_wood.webp",
    category: "NANOSCIENCE",
    tagline: "THE FUTURE OF BIOAVAILABLE WELLNESS",
    cta: "SHOP NOW",
  },
  {
    image: "/images/hero_image_on_table.webp",
    category: "NATURAL POTENCY",
    tagline:
      "FIVE SUPEROILS. PLUS, ADD'L POWERFUL ANTIOXIDANTS AND OTHER BIOACTIVES",
    cta: "EXPLORE",
  },
  {
    image: "/images/hero_image_in_water.webp",
    category: "DAILY RITUAL",
    tagline: "SIX QUICK AND EASY ORAL SPRAYS. NEARLY IMMEDIATE PROTECTION.",
    cta: "BUY NOW",
  },
];

interface HeroSlideshowProps {
  onNavigate: (page: string) => void;
}

export function HeroSlideshow({ onNavigate }: HeroSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning]);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

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

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image with Ken Burns effect */}
          <div
            className={`absolute inset-0 transition-transform duration-[8000ms] ease-linear ${
              index === currentSlide ? "scale-100" : "scale-110"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.category}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding={index === 0 ? "sync" : "async"}
            />
          </div>

          {/* Dark Overlay with Gradient Wipe */}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/40 to-transparent z-[5]" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            {/* Left Content */}
            <div
              className={`transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <span className="label-text text-white/90 block mb-3">
                {slides[currentSlide].category}
              </span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white italic mb-6 max-w-xl">
                {slides[currentSlide].tagline}
              </h2>
              <button
                onClick={scrollToFounders}
                className="border border-white/70 text-white bg-transparent px-8 py-4 hover:border-white hover:bg-transparent transition-all text-sm tracking-wider uppercase"
              >
                {slides[currentSlide].cta}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
