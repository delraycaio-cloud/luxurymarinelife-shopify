import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/features/apparel-brands/ac-yacht-club/context/CartContext';
import { navItems } from '@/features/apparel-brands/ac-yacht-club/data';

interface NavigationProps {
  onCartClick?: () => void;
}

export function Navigation({ onCartClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-harbor/95 backdrop-blur-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo and Back */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="text-ivory hover:text-gold transition-colors flex items-center justify-center pointer"
                aria-label="Go back"
              >
                <ArrowLeft className="w-6 h-6" strokeWidth={1.5} />
              </button>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-serif text-xl lg:text-2xl text-ivory hover:text-gold transition-colors"
                style={{ lineHeight: '1' }}
              >
                AC Yacht Club
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm text-ivory/80 hover:text-gold transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button
                className="text-ivory/60 hover:text-gold transition-colors hidden sm:block"
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
              
              <button
                className="text-ivory/60 hover:text-gold transition-colors hidden sm:block"
                aria-label="Account"
              >
                <User className="w-5 h-5" strokeWidth={1.5} />
              </button>

              {/* Cart Button */}
              <button
                onClick={onCartClick}
                className="relative text-ivory hover:text-gold transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-harbor text-[10px] font-medium flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-ivory hover:text-gold transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-harbor/98 backdrop-blur-lg transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pt-20">
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="font-serif text-3xl text-ivory hover:text-gold transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {item.label}
            </button>
          ))}
          
          <div className="mt-8 pt-8 border-t border-gold/20 flex items-center gap-6">
            <button className="text-slate/60 hover:text-ivory transition-colors">
              <Search className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <button className="text-slate/60 hover:text-ivory transition-colors">
              <User className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
