import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';

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
