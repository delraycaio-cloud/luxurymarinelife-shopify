import { useEffect, useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function StickyCTABar() {
  const { setCurrentView, cartCount, setIsCartOpen } = useStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      if (scrollY > heroHeight * 0.8 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-[#0a1628] border-t border-white/10">
        <div className="container-luxury py-4">
          <div className="flex items-center justify-between gap-4">


            <div className="flex items-center gap-4 flex-1 md:flex-none justify-center">
              <button
                onClick={() => setCurrentView("products")}
                className="px-6 py-3 bg-[#c9a962] text-[#0a1628] text-sm uppercase tracking-widest font-medium hover:bg-white transition-colors duration-300"
              >
                Shop Now
              </button>

              {cartCount > 0 && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-2 px-4 py-3 border border-white/30 text-white text-sm hover:border-[#c9a962] hover:text-[#c9a962] transition-colors duration-300"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline">Cart ({cartCount})</span>
                </button>
              )}
            </div>

            <button
              onClick={() => setIsDismissed(true)}
              className="text-white/40 hover:text-white transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

