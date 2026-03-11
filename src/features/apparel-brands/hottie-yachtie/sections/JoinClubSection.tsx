import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface JoinClubSectionProps {
  bgImage: string;
  circleImages: string[];
  zIndex: number;
}

export default function JoinClubSection({ bgImage, circleImages, zIndex }: JoinClubSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({ 
        scrollTrigger: { 
          trigger: section, 
          start: 'top 80%', 
          end: 'bottom 20%', 
          toggleActions: 'play none none reverse' 
        } 
      });
      scrollTl.fromTo(ribbonRef.current, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power3.out', duration: 1 }, 0);
      scrollTl.fromTo(headlineRef.current, { y: '12vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power3.out', duration: 1 }, 0);
      scrollTl.fromTo(bodyRef.current, { y: '8vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power3.out', duration: 1 }, 0.05);

      const fields = formRef.current?.querySelectorAll('.form-field');
      if (fields) scrollTl.fromTo(fields, { y: '6vh', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, ease: 'power2.out', duration: 0.8 }, 0.1);

      scrollTl.fromTo(circlesRef.current, { x: '40vw', scale: 0.85, opacity: 0 }, { x: 0, scale: 1, opacity: 1, ease: 'back.out(1.2)', duration: 1 }, 0.1);
      scrollTl.fromTo(bgRef.current, { scale: 1.08, opacity: 0.8 }, { scale: 1, opacity: 1, ease: 'power2.out', duration: 1.2 }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hyyc-section-pinned" style={{ zIndex }}>
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-[#0B0B0D]/55" />
      </div>
      <div ref={ribbonRef} className="absolute left-0 top-0 w-[64vw] h-full bg-[#FF1F3D]/92 hyyc-ribbon-left" style={{ zIndex: 2 }} />
      <div ref={headlineRef} className="absolute left-[6vw] top-[14vh] z-[3]">
        <div className="hyyc-headline-display text-[#F6F6F8]">
          <div className="text-[clamp(42px,6vw,100px)]">Join the Club</div>
        </div>
      </div>
      <p ref={bodyRef} className="absolute left-[6vw] top-[30vh] w-[38vw] text-[#F6F6F8]/82 text-[clamp(14px,1.2vw,18px)] leading-relaxed z-[3]">
        Get drop alerts, secret pre-sales, and party invites—only for members.
      </p>
      
      <form ref={formRef} onSubmit={handleSubmit} className="absolute left-[6vw] top-[46vh] w-[38vw] z-[3] hyyc-page">
        {!submitted ? (
          <>
            <div className="form-field mb-6"><input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full" required /></div>
            <div className="form-field mb-6"><input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full" required /></div>
            <div className="form-field mb-8"><input type="tel" placeholder="Phone (optional)" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full" /></div>
            <button type="submit" className="hyyc-btn-primary flex items-center gap-3">Join the List <ArrowRight size={18} /></button>
            <p className="hyyc-micro-label text-[#F6F6F8]/50 mt-4">Unsubscribe anytime. We don't spam.</p>
          </>
        ) : (
          <div className="flex items-center gap-4 text-[#F6F6F8]">
            <div className="w-12 h-12 rounded-full bg-[#0B0B0D] flex items-center justify-center"><Check size={24} /></div>
            <div><div className="hyyc-font-display text-xl font-bold">You're on the list!</div><div className="text-[#F6F6F8]/70">Check your inbox for confirmation.</div></div>
          </div>
        )}
      </form>

      <div ref={circlesRef} className="absolute right-[6vw] top-1/2 -translate-y-1/2 z-[5]">
        <div className="relative w-[280px] h-[200px] md:w-[350px] md:h-[250px]">
          {circleImages.map((img, i) => (
            <div key={i} className="absolute w-[clamp(110px,14vw,210px)] h-[clamp(110px,14vw,210px)] rounded-full hyyc-circle-border overflow-hidden"
              style={{ right: `${i * 90}px`, top: i === 0 ? '22px' : i === 1 ? '-10px' : '8px', zIndex: 3 - i }}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
