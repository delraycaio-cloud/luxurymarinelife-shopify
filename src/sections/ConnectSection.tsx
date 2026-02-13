import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

gsap.registerPlugin(ScrollTrigger);

export function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-marine-800 py-20 lg:py-28"
    >
      <div className="px-6 lg:px-[7vw]">
        <div
          ref={contentRef}
          className="max-w-[720px] mx-auto text-center"
        >
          <h2 className="heading-display text-white text-[clamp(32px,4vw,56px)]">
            Join the Movement
          </h2>
          <p className="mt-4 text-white/60 text-base lg:text-lg leading-relaxed">
            Get early access to new drops, conservation updates, and limited experiences.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 lg:mt-10">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-marine-700 border-marine-600 text-white placeholder:text-white/40 h-12 px-5 rounded-full focus:ring-teal focus:border-teal"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitted}
                className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-marine-900 font-semibold px-6 h-12 rounded-full transition-all duration-300 hover:translate-y-[-2px] disabled:opacity-70"
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    Subscribed
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>

          <p className="mt-4 text-white/40 text-sm">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}