import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Youtube, Music2, Linkedin, Anchor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  shop: [
    { label: 'UltraShear™ NanoSpray', href: '/ultra-shear' },
    { label: 'Biohacking Bundles', href: '/biohacking-bundles' },
    { label: 'Apparel Brands', href: '/apparel-brands' },
    { label: 'Sustainable Tech', href: '/sustainable-tech' },
    { label: 'Donation Gift Cards', href: '/gift-cards' },
  ],
  brands: [
    { label: 'Luxury Marine Life', href: '/luxury-marine-life-brand' },
    { label: 'AC Yacht Club', href: '/ac-yacht-club-apparel' },
    { label: 'Hottie Yachtie', href: '/hottie-yachtie-brand' },
  ],
  company: [
    { label: 'Yacht Charters', href: 'https://luxurymarinelife.com/charter', external: true },
    { label: 'Yacht Club Membership', href: 'https://luxurymarinelife.com/acyachtclub', external: true },
    { label: 'Impact (GARMN)', href: 'https://luxurymarinelife.com/garmn', external: true },
    { label: 'GARMN.Yacht', href: 'https://luxurymarinelife.com/garmn.yacht', external: true },
    { label: 'GARMN.Boat', href: 'https://luxurymarinelife.com/garmn.boat', external: true },
    { label: 'Tax Advantages', href: 'https://luxurymarinelife.com/garmn/depreciation', external: true },
    { label: 'Become a Partner', href: '/partners' },
    { label: 'SmartYacht', href: 'https://luxurymarinelife.com/smartyacht', external: true },
  ],
  support: [
    { label: 'Contact', href: 'mailto:hello@luxurymarinelife.com', external: true },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/luxurymarinelife', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/@luxurymarinelife', label: 'YouTube' },
  { icon: Music2, href: 'https://tiktok.com/@luxurymarinelife', label: 'TikTok' },
  { icon: Linkedin, href: 'https://linkedin.com/company/luxury-marine-life', label: 'LinkedIn' },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
    if (external) return; // Let default behavior handle external links
    e.preventDefault();
    navigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="bg-marine-900 border-t border-white/5 py-12 lg:py-16"
    >
      <div className="px-6 lg:px-[7vw]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Logo & Tagline */}
          <div className="col-span-2 footer-column">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 group"
            >
              <Anchor className="w-6 h-6 text-teal group-hover:rotate-12 transition-transform" />
              <span className="font-display text-xl font-bold text-white">
                Luxury Marine Life
              </span>
            </a>
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xs">
              Healthy People. Healthy Water. Healthy Animals.
              <br />
              <span className="text-teal/80 text-xs">Premium wellness & lifestyle for the water</span>
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-white/60 hover:text-teal text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Links */}
          <div className="footer-column">
            <h4 className="text-white font-semibold text-sm mb-4">Brands</h4>
            <ul className="space-y-3">
              {footerLinks.brands.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
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
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    onClick={(e) => handleLinkClick(e, link.href, link.external)}
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
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    onClick={(e) => handleLinkClick(e, link.href, link.external)}
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
            © {new Date().getFullYear()} Luxury Marine Life. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/partners"
              onClick={(e) => handleLinkClick(e, '/partners')}
              className="text-teal/70 hover:text-teal text-sm transition-colors font-medium"
            >
              Become a Partner →
            </a>
          </div>
        </div>

        {/* Impact Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-white/40 text-sm">
          <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
          10% of every purchase supports ocean restoration through{' '}
          <a
            href="https://luxurymarinelife.com/garmn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal/80 hover:text-teal underline underline-offset-2 transition-colors"
          >
            GARMN
          </a>
        </div>
      </div>
    </footer>
  );
}