import { useState } from 'react';
import { Instagram, Facebook, Twitter, Youtube, CreditCard } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  const footerLinks = {
    shop: [
      { label: 'All Products', page: 'products' },
      { label: 'UltraShear NanoSpray', page: 'products' },
    ],
    discover: [
      { label: 'The Science', page: 'science' },
      { label: 'Our Story', page: 'discover' },
      { label: 'Ingredients', page: 'discover' },
    ],
    support: [
      { label: 'Contact Us', page: 'contact' },
    ],
    legal: [
      { label: 'Privacy Policy', page: 'discover' },
      { label: 'Terms of Service', page: 'discover' },
    ],
  };

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="container-luxury">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl mb-2">SHEAR SCIENCES</h3>
            <p className="text-gray-400 text-sm mb-6">THE SCIENCE OF WELLNESS</p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="label-text text-gray-400 mb-4">SHOP</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover Links */}
          <div>
            <h4 className="label-text text-gray-400 mb-4">DISCOVER</h4>
            <ul className="space-y-2">
              {footerLinks.discover.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="label-text text-gray-400 mb-4">SUPPORT</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="label-text text-gray-400 mb-4">SUBSCRIBE</h4>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#8B1A1A] hover:bg-[#6d1515] transition-colors text-sm"
              >
                SEND
              </button>
            </form>
          </div>
        </div>

        {/* Payment Icons */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-gray-400" />
          </div>
          <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
            <span className="text-xs text-gray-400">VISA</span>
          </div>
          <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
            <span className="text-xs text-gray-400">MC</span>
          </div>
          <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
            <span className="text-xs text-gray-400">AMEX</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2025 Shear Sciences, a Division of Pressure BioSciences, Inc.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-right max-w-xl">
              FDA Disclaimer: These statements have not been evaluated by the
              FDA. This product is not intended to diagnose, treat, cure, or
              prevent any disease.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
