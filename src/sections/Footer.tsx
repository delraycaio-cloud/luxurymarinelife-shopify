import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Youtube, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  shop: [
    { label: 'UltraShear™ NanoSpray', href: '/ultra-shear' },
    { label: 'All Supplements', href: '#shop' },
  ],
  learn: [
    { label: 'Bio-Hacking', href: '#learn' },
    { label: 'Our Framework', href: '#framework' },
  ],
  company: [
    { label: 'About', href: '#about' },
    { label: 'Impact (GARMN)', href: '#impact' },
  ],
  support: [
    { label: 'Contact', href: '#contact' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'TikTok' },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const columns = footer.querySelectorAll('.footer-column');

      gsap.fromTo(columns,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-marine-900 border-t border-white/5 py-12 lg:py-16"
    >
      <div className="px-6 lg:px-[7vw]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Logo & Tagline */}
          <div className="col-span-2 footer-column">
            <a href="#" className="font-display text-xl font-bold text-white">
              Health on the Water
            </a>
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xs">
              Healthy People. Healthy Water. Healthy Animals.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 text-white/60 hover:text-teal transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div className="footer-column">
            <h4 className="text-white font-semibold text-sm mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-teal text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Links */}
          <div className="footer-column">
            <h4 className="text-white font-semibold text-sm mb-4">Learn</h4>
            <ul className="space-y-3">
              {footerLinks.learn.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-teal text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-column">
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-teal text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-column">
            <h4 className="text-white font-semibold text-sm mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-teal text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Health on the Water. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Impact Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-white/40 text-sm">
          <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
          10% of every purchase supports ocean restoration through GARMN
        </div>
      </div>
    </footer>
  );
}