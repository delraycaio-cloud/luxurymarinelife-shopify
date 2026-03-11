import { useEffect, useState } from 'react';
import { ShoppingBag, X, Truck } from 'lucide-react';
import { useCart } from '@/features/apparel-brands/ac-yacht-club/context/CartContext';

interface StickyPurchaseBarProps {
  onShopClick: () => void;
}

export function StickyPurchaseBar({ onShopClick }: StickyPurchaseBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { totalItems, totalPrice } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show after scrolling past hero and not near the bottom
      if (scrollY > windowHeight * 0.5 && scrollY < documentHeight - windowHeight * 1.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] bg-harbor/95 backdrop-blur-md border-t border-gold/20 py-3 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Message or Cart */}
        <div className="flex items-center gap-3 lg:gap-4">
          {totalItems > 0 ? (
            <>
              <div className="w-10 h-10 bg-gold/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm text-ivory">{totalItems} item{totalItems > 1 ? 's' : ''} in cart</p>
                <p className="text-xs text-gold">€{totalPrice.toLocaleString()}</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 bg-gold/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-ivory">Complimentary Shipping</p>
                <p className="text-xs text-slate/60">On orders over €500</p>
              </div>
            </>
          )}
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onShopClick}
            className="btn-primary text-sm py-2 px-4 lg:px-6"
          >
            {totalItems > 0 ? 'View Cart' : 'Shop Now'}
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-slate/40 hover:text-ivory transition-colors p-2"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
