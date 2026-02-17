import { useState, useEffect } from 'react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Search, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const { isScrolled } = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const { getTotalItems, toggleCart } = useCartStore();
  // const cartCount = getTotalItems();

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Our Products', page: 'products' },
    { label: 'Discover', page: 'discover' },
    { label: 'The Science', page: 'science' },
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled ? 'top-0' : 'top-16 sm:top-10'
        } ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`nav-text relative group ${
                    isScrolled ? 'text-[#1A1A1A]' : 'text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                      isScrolled ? 'bg-[#1A1A1A]' : 'bg-white'
                    }`}
                  />
                </button>
              ))}
            </nav>

            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className={`absolute left-1/2 -translate-x-1/2 font-serif text-2xl sm:text-3xl tracking-wide transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'text-[#1A1A1A]' : 'text-white'
              }`}
            >
              SHEAR SCIENCES
            </button>

            {/* Right Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <button
                className={`transition-transform hover:scale-110 ${
                  isScrolled ? 'text-[#1A1A1A]' : 'text-white'
                }`}
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                className={`transition-transform hover:scale-110 ${
                  isScrolled ? 'text-[#1A1A1A]' : 'text-white'
                }`}
              >
                <User className="w-5 h-5" />
              </button>
              {/* <button
                onClick={toggleCart}
                className={`relative transition-transform hover:scale-110 ${
                  isScrolled ? 'text-[#1A1A1A]' : 'text-white'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#8B1A1A] text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button> */}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 ${
                isScrolled ? 'text-[#1A1A1A]' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <div className="p-8 pt-24">
            <nav className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className="text-left text-lg font-serif text-[#1A1A1A] hover:text-[#8B1A1A] transition-colors"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-6">
                <button className="text-[#1A1A1A] hover:text-[#8B1A1A] transition-colors">
                  <Search className="w-6 h-6" />
                </button>
                <button className="text-[#1A1A1A] hover:text-[#8B1A1A] transition-colors">
                  <User className="w-6 h-6" />
                </button>
                {/* <button
                  onClick={() => {
                    toggleCart();
                    setIsMobileMenuOpen(false);
                  }}
                  className="relative text-[#1A1A1A] hover:text-[#8B1A1A] transition-colors"
                >
                  <ShoppingBag className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#8B1A1A] text-white text-xs rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
