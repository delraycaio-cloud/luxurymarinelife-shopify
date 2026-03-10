import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Instagram, Twitter, Youtube, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterSectionProps {
  zIndex: number;
}

export default function FooterSection({ zIndex }: FooterSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(headlineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, scrollTrigger: { trigger: headlineRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );

      // Form reveal
      gsap.fromTo(formRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.1, scrollTrigger: { trigger: formRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );

      // Contact reveal
      gsap.fromTo(contactRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, scrollTrigger: { trigger: contactRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );

      // Footer links reveal
      gsap.fromTo(footerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.3, scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none reverse' } }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#FF1F3D] min-h-screen hyyc-page" style={{ zIndex }}>
      <div className="px-[6vw] py-[8vh]">
        {/* Newsletter reaffirm */}
        <div ref={headlineRef} className="max-w-[52vw] mb-12">
          <h2 className="hyyc-headline-display text-[#F6F6F8] text-[clamp(36px,5vw,72px)] mb-4">
            Stay on the list.
          </h2>
          <p className="text-[#F6F6F8]/80 text-[clamp(14px,1.2vw,18px)]">
            New drops sell out fast. Be the first to know.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-[52vw] mb-16">
          {!submitted ? (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <button type="submit" className="bg-[#0B0B0D] text-[#F6F6F8] px-8 py-4 hyyc-font-display font-bold text-sm tracking-wider uppercase flex items-center gap-3 hover:bg-[#F6F6F8] hover:text-[#0B0B0D] transition-colors">
                Subscribe
                <ArrowRight size={18} />
              </button>
            </>
          ) : (
            <div className="text-[#F6F6F8] hyyc-font-display text-xl">
              Thanks! You're subscribed.
            </div>
          )}
        </form>

        {/* Contact block */}
        <div ref={contactRef} className="max-w-[44vw] mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="hyyc-micro-label text-[#F6F6F8]/60 mb-2">Email</div>
              <a href="mailto:hello@hottieyachtie.com" className="text-[#F6F6F8] hover:text-[#0B0B0D] transition-colors flex items-center gap-2">
                <Mail size={16} /> hello@hottieyachtie.com
              </a>
            </div>
            <div>
              <div className="hyyc-micro-label text-[#F6F6F8]/60 mb-2">Support Hours</div>
              <div className="text-[#F6F6F8]">Mon–Fri 10am–6pm EST</div>
            </div>
            <div>
              <div className="hyyc-micro-label text-[#F6F6F8]/60 mb-2">Shipping</div>
              <div className="text-[#F6F6F8]">Worldwide from Miami, FL</div>
            </div>
            <div>
              <div className="hyyc-micro-label text-[#F6F6F8]/60 mb-2">Social</div>
              <div className="flex gap-4">
                <a href="#" className="text-[#F6F6F8] hover:text-[#0B0B0D] transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-[#F6F6F8] hover:text-[#0B0B0D] transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-[#F6F6F8] hover:text-[#0B0B0D] transition-colors"><Youtube size={20} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div ref={footerRef} className="border-t border-[#F6F6F8]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-wrap gap-6">
              {['Shop', 'Shipping', 'Returns', 'Privacy', 'Terms'].map((link) => (
                <a key={link} href="#" className="hyyc-micro-label text-[#F6F6F8]/70 hover:text-[#F6F6F8] transition-colors">
                  {link}
                </a>
              ))}
            </div>
            <div className="text-[#F6F6F8]/50 text-sm">
              © Hottie Yachtie Yacht Club. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
