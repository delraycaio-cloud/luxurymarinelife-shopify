import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Hero() {
  const { setCurrentView } = useStore();
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToCollections = () => {
    const element = document.getElementById("collections");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/hero-main.webp"
          alt="Luxury Marine Life sustainable yacht apparel — premium ocean-inspired lifestyle clothing"
          className="absolute inset-0 w-full h-full object-cover object-center scale-110"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/40 via-transparent to-[#0a1628]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center items-start px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          <div
            className={`mb-6 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-[#c9a962] text-xs md:text-sm uppercase tracking-[0.3em] font-medium">
              Sustainable Luxury Apparel
            </span>
          </div>

          <h1
            className={`text-5xl md:text-7xl lg:text-8xl text-white font-light leading-[0.95] mb-8 transition-all duration-1000 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Luxury</span>
            <span className="block italic font-normal text-[#c9a962]">
              Marine
            </span>
            <span className="block">Apparel</span>
          </h1>

          <p
            className={`text-lg md:text-xl text-white/80 font-light max-w-xl mb-10 leading-relaxed transition-all duration-1000 delay-400 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Engineered for life on the water. Premium performance wear crafted
            with sustainable materials and uncompromising attention to detail.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-600 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <button
              onClick={() => setCurrentView("products")}
              className="group px-10 py-4 bg-white text-[#0a1628] text-sm uppercase tracking-widest font-medium hover:bg-[#0a1628] hover:text-white transition-all duration-500 flex items-center justify-center gap-3"
            >
              Shop Collection
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToCollections}
              className="px-10 py-4 border border-white/50 text-white text-sm uppercase tracking-widest font-medium hover:bg-white/10 hover:border-white transition-all duration-500"
            >
              Discover the Mission
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 delay-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-white/60 text-xs uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
      </div>

      <div
        className={`hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-8 transition-all duration-1000 delay-800 ${
          isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
      >
        <div className="text-right">
          <div className="text-3xl text-white font-light">10%</div>
          <div className="text-xs text-white/60 uppercase tracking-wider">
            To Ocean
          </div>
        </div>
        <div className="w-px h-8 bg-white/20 self-end" />
        <div className="text-right">
          <div className="text-3xl text-white font-light">UPF 50+</div>
          <div className="text-xs text-white/60 uppercase tracking-wider">
            Protection
          </div>
        </div>
        <div className="w-px h-8 bg-white/20 self-end" />
        <div className="text-right">
          <div className="text-3xl text-white font-light">100%</div>
          <div className="text-xs text-white/60 uppercase tracking-wider">
            Sustainable
          </div>
        </div>
      </div>
    </section>
  );
}

