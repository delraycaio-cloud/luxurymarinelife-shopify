import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    shop: [
      { label: 'All Products', href: '#shop' },
      { label: 'New Arrivals', href: '#new' },
    ],
    help: [
      { label: 'Size Guide', href: '#' },
      { label: 'Shipping Info', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Contact Us', href: '#contact' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Sustainability', href: '#' },
    ],
  };

  return (
    <footer className="relative z-[80] bg-harbor border-t border-gold/20">
      {/* Main Footer */}
      <div className="px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
              <a href="#" className="font-serif text-2xl text-ivory">
                AC Yacht Club
              </a>
              <p className="mt-3 text-sm text-slate/60 max-w-xs">
                Premium yacht club apparel and accessories. 
                Crafted with Italian materials and timeless attention to detail.
              </p>
              
              {/* Social */}
              <div className="mt-6 flex items-center gap-3">
                <a href="#" className="w-9 h-9 border border-gold/30 flex items-center justify-center text-slate/60 hover:text-gold hover:border-gold transition-colors">
                  <Instagram className="w-4 h-4" strokeWidth={1.5} />
                </a>
                <a href="#" className="w-9 h-9 border border-gold/30 flex items-center justify-center text-slate/60 hover:text-gold hover:border-gold transition-colors">
                  <Facebook className="w-4 h-4" strokeWidth={1.5} />
                </a>
                <a href="#" className="w-9 h-9 border border-gold/30 flex items-center justify-center text-slate/60 hover:text-gold hover:border-gold transition-colors">
                  <Twitter className="w-4 h-4" strokeWidth={1.5} />
                </a>
                <a href="#" className="w-9 h-9 border border-gold/30 flex items-center justify-center text-slate/60 hover:text-gold hover:border-gold transition-colors">
                  <Youtube className="w-4 h-4" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-serif text-sm text-ivory mb-4">Shop</h4>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-slate/60 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-serif text-sm text-ivory mb-4">Help</h4>
              <ul className="space-y-2">
                {footerLinks.help.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => link.href.startsWith('#') ? scrollToSection(link.href) : null}
                      className="text-sm text-slate/60 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-serif text-sm text-ivory mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => link.href.startsWith('#') ? scrollToSection(link.href) : null}
                      className="text-sm text-slate/60 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10 px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate/40">
            © 2026 AC Yacht Club. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className="text-xs text-slate/40 hover:text-slate/60 transition-colors">
              Privacy Policy
            </button>
            <button className="text-xs text-slate/40 hover:text-slate/60 transition-colors">
              Terms of Service
            </button>
            <button className="text-xs text-slate/40 hover:text-slate/60 transition-colors">
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
