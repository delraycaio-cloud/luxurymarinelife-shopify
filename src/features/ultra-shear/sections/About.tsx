import { useInView } from "@/hooks/useInView";

interface AboutProps {
  onNavigate: (page: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-[#FAFAFA]">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Image */}
          <div
            className={`transition-all duration-1000 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-20"
            }`}
          >
            <div className="aspect-[4/5] overflow-hidden rounded-xl">
              <video
                src="/images/droplets_gone.mp4"
                aria-label="About Shear Sciences"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>

          {/* Right Content */}
          <div>
            <p
              className={`label-text text-gray-500 mb-4 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              ABOUT
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-6 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              SHEAR SCIENCES, A DIVISION OF PRESSURE BIOSCIENCES, INC.
            </h2>
            <div
              className={`space-y-4 text-gray-600 leading-relaxed mb-8 transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <p>
                Pressure BioSciences, Inc. (PBIO) is a pioneer in the
                development of novel, broadly enabling, high-pressure-based
                instruments and topical/ingestible consumer products.
              </p>
              <p>
                PBIO's unique, multi-patented UltraShear Technology™ (UST)
                platform is revolutionizing the delivery of nanoemulsified
                products for the health & wellness, cosmeceutical, and other
                consumer industries.
              </p>
            </div>
            <button
              onClick={() => onNavigate("discover")}
              className={`btn-outline transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              DISCOVER MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

