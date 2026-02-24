import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';

const testimonials = [
  {
    text: "This antioxidant spray tastes great and is insanely easy to use. Way better than pills — fast, simple, and something I actually look forward to taking every day.",
    author: 'Anonymous',
    verified: false,
  },
  {
    text: "My nails and skin have dramatically changed. Having a family with kids being sick multiple times during school year is problematic and not getting sick myself lends me to believe this isn't luck. This is one product I can't live without now.",
    author: 'R.J.',
    verified: true,
  },
  {
    text: 'Very effective in lowering my lipid panel results by 10 to 15 percent.',
    author: 'Robert V.',
    verified: true,
  },
  {
    text: "Over the 6 months I've been using it, I've never had so much as a sniffle — and this includes a virulent flu and Covid season where many around me have been caught.",
    author: 'Jeffrey P.',
    verified: true,
  },
  {
    text: "Clearly this company cares about the quality of what they are selling. Five super oils and multiple potent antioxidants, all in a highly bioavailable, entirely unique NanoSpray. All natural and preservative-free. AMAZING!",
    author: 'Anonymous',
    verified: false,
  },
];

export function Testimonials() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section ref={ref} className="section-padding bg-[#FAFAFA]">
      <div className="container-luxury">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row md:items-center md:justify-between mb-12 transition-all duration-700 ${
            isInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-4 md:mb-0">
            CUSTOMERS ARE SAYING
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[#D4A84B] text-[#D4A84B]"
                />
              ))}
            </div>
            <span className="font-medium text-[#1A1A1A]">5.00</span>
            <span className="text-gray-500">(7 reviews)</span>
            <BadgeCheck className="w-5 h-5 text-[#8B1A1A] ml-2" />
          </div>
        </div>

        {/* Testimonial Card */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-700 ${
            isInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="bg-white p-8 md:p-12 shadow-sm">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[#D4A84B] text-[#D4A84B]"
                />
              ))}
            </div>

            <blockquote className="font-serif text-xl md:text-2xl text-[#1A1A1A] leading-relaxed mb-8">
              "{testimonials[currentIndex].text}"
            </blockquote>

            <div className="flex items-center gap-2">
              <span className="font-medium text-[#1A1A1A]">
                — {testimonials[currentIndex].author}
              </span>
              {testimonials[currentIndex].verified && (
                <span className="inline-flex items-center gap-1 text-xs text-[#8B1A1A]">
                  <BadgeCheck className="w-4 h-4" />
                  Verified
                </span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 border border-gray-200 text-[#1A1A1A] bg-white hover:border-[#8B1A1A] hover:text-[#8B1A1A] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#8B1A1A] w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 border border-gray-200 text-[#1A1A1A] bg-white hover:border-[#8B1A1A] hover:text-[#8B1A1A] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
