import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';

const testimonials = [
  {
    text: "As an athlete and person who deeply cares about health and wellness, I am very careful about what I put into my body. The ingredients in the Super Antioxidant are nothing short of impressive, the taste is awesome, the delivery method is unique and powerful, and it's all natural, plant-based, and preservative-free. It has also helped me better cope with my painful arthritis. It's about time a product with these major attributes has found its way to the market. Where have you been all my life!",
    author: 'David "Super Dave" Vitak',
    verified: true,
  },
  {
    text: 'In just three months of daily use, my total cholesterol and LDL both went down more than 15% and my HDL increased by the same percentage. My doc was amazed!',
    author: 'R. Vilker, Laguna Niguel, CA',
    verified: true,
  },
  {
    text: "Having a family with kids who have gotten sick multiple times during the current school year is problematic, and not getting sick myself leads me to believe that taking the Super Antioxidant NanoSpray routinely over this time isn't luck of the draw. This is one product I can't live without now.",
    author: 'R. Jenson, Phoenix, AZ',
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
            <span className="text-gray-500">(3 reviews)</span>
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
                - {testimonials[currentIndex].author}
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
