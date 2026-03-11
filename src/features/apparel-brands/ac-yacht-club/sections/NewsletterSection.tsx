import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
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
      className="relative bg-harbor-light/30 ac-yc-grain-overlay py-20 lg:py-28"
    >
      <div className="relative z-10 px-6 lg:px-12">
        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 border border-gold/30 flex items-center justify-center">
            <Mail className="w-6 h-6 text-gold" strokeWidth={1.5} />
          </div>
          
          <span className="label-mono text-gold">Stay Connected</span>
          <h2 className="mt-4 font-serif text-ivory" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
            Join the Inner Circle
          </h2>
          <p className="mt-4 text-slate/70 max-w-lg mx-auto">
            Be the first to know about new collections, exclusive offers, and 
            members-only events. Subscribe to receive 10% off your first order.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitted}
                  className="w-full bg-harbor border border-gold/30 px-4 py-3 text-ivory placeholder:text-slate/40 focus:border-gold focus:outline-none transition-colors disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitted}
                className={`px-6 py-3 flex items-center gap-2 transition-all ${
                  isSubmitted
                    ? 'bg-green-600 text-white'
                    : 'bg-gold text-harbor hover:bg-gold-light'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-4 h-4" strokeWidth={1.5} />
                    <span className="hidden sm:inline">Subscribed</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Subscribe</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="mt-4 text-xs text-slate/50">
            By subscribing, you agree to receive marketing emails. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
