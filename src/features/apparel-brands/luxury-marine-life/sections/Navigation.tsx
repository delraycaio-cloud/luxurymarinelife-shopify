import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Navigation() {
  const { setCurrentView, cartCount, setIsCartOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (view: "home" | "products") => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", view: "home" as const },
    { label: "Collection", view: "products" as const },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-3"
            >
              <span
                className={`text-xl md:text-2xl font-light tracking-tight transition-colors duration-300 ${
                  isScrolled ? "text-[#0a1628]" : "text-white"
                }`}
              >
                Luxury <span className="italic">Marine</span> Life
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.view)}
                  className={`text-sm uppercase tracking-widest transition-colors duration-300 relative group ${
                    isScrolled ? "text-[#0a1628]" : "text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                      isScrolled ? "bg-[#0a1628]" : "bg-white"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                className={`hidden md:flex transition-colors duration-300 ${
                  isScrolled ? "text-[#0a1628]" : "text-white"
                }`}
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                className={`hidden md:flex transition-colors duration-300 ${
                  isScrolled ? "text-[#0a1628]" : "text-white"
                }`}
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative transition-colors duration-300 ${
                  isScrolled ? "text-[#0a1628]" : "text-white"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#c9a962] text-[#0a1628] text-xs flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden transition-colors duration-300 ${
                  isScrolled ? "text-[#0a1628]" : "text-white"
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
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-[#0a1628] transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.view)}
              className="text-2xl text-white uppercase tracking-widest hover:text-[#c9a962] transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

