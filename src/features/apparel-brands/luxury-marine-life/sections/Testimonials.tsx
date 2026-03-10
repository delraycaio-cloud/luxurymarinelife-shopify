import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";
import { testimonials } from "../data/products";

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-[#0a1628] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c9a962] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#1e6b7a] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-luxury">
        <div className="text-center mb-16 md:mb-20">
          <span
            className={`text-[#c9a962] text-xs uppercase tracking-[0.3em] font-medium mb-6 block transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Testimonials
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl text-white font-light transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Voices from the{" "}
            <span className="italic text-[#c9a962]">Water</span>
          </h2>
        </div>

        <div
          className={`relative max-w-4xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="absolute -top-8 left-0 md:-left-12">
            <Quote className="w-16 h-16 md:w-24 md:h-24 text-[#c9a962]/20" />
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="text-center">
                    <div className="flex justify-center gap-1 mb-8">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-[#c9a962] text-[#c9a962]"
                        />
                      ))}
                    </div>

                    <blockquote className="text-xl md:text-2xl lg:text-3xl text-white font-light leading-relaxed mb-10">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-[#c9a962]/30">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-white font-medium">
                        {testimonial.name}
                      </div>
                      <div className="text-white/50 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 flex items-center justify-center border border-white/20 text-white hover:border-[#c9a962] hover:text-[#c9a962] transition-colors duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-[#c9a962] w-6"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 flex items-center justify-center border border-white/20 text-white hover:border-[#c9a962] hover:text-[#c9a962] transition-colors duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          className={`mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { value: "15,000+", label: "Happy Customers" },
            { value: "4.9", label: "Average Rating" },
            { value: "98%", label: "Would Recommend" },
            { value: "50+", label: "Countries Shipped" },
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

