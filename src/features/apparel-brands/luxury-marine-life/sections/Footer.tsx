import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Footer() {
  const { setCurrentView } = useStore();

  const footerLinks = {
    shop: [
      { label: "All Products", action: () => setCurrentView("products") },
      { label: "New Arrivals", action: () => setCurrentView("products") },
      { label: "Best Sellers", action: () => setCurrentView("products") },
      { label: "Limited Editions", action: () => setCurrentView("products") },
    ],
    company: [
      { label: "About Us", action: () => {} },
      { label: "Sustainability", action: () => {} },
      { label: "Careers", action: () => {} },
      { label: "Press", action: () => {} },
    ],
    support: [
      { label: "Contact Us", action: () => {} },
      { label: "Shipping Info", action: () => {} },
      { label: "Returns", action: () => {} },
      { label: "Size Guide", action: () => {} },
    ],
  };

  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="border-b border-white/10">
        <div className="container-luxury py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-light mb-2">
                Join the <span className="italic text-[#c9a962]">Crew</span>
              </h3>
              <p className="text-white/60">
                Subscribe for exclusive offers, new arrivals, and ocean
                conservation updates.
              </p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-[#c9a962] outline-none transition-colors"
              />
              <button className="px-8 py-4 bg-[#c9a962] text-[#0a1628] font-medium hover:bg-white transition-colors flex items-center gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-luxury py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="text-2xl font-light tracking-tight mb-6">
              Luxury <span className="italic text-[#c9a962]">Marine</span> Life
            </div>
            <p className="text-white/60 leading-relaxed mb-6 max-w-sm">
              Engineered for life on the water. Premium performance wear
              crafted with sustainable materials and uncompromising attention to
              detail.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:border-[#c9a962] hover:text-[#c9a962] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-white/40 mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-white/40 mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-white/40 mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-8 justify-center md:justify-start">
            <div className="flex items-center gap-3 text-white/60">
              <MapPin className="w-4 h-4 text-[#c9a962]" />
              <span className="text-sm">Monaco • Marina Bay</span>
            </div>
            <div className="flex items-center gap-3 text-white/60">
              <Mail className="w-4 h-4 text-[#c9a962]" />
              <span className="text-sm">crew@luxurymarinelife.com</span>
            </div>
            <div className="flex items-center gap-3 text-white/60">
              <Phone className="w-4 h-4 text-[#c9a962]" />
              <span className="text-sm">+377 98 06 36 36</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-luxury py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © 2024 Luxury Marine Life. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button className="text-white/40 text-sm hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button className="text-white/40 text-sm hover:text-white transition-colors">
                Terms of Service
              </button>
              <button className="text-white/40 text-sm hover:text-white transition-colors">
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

