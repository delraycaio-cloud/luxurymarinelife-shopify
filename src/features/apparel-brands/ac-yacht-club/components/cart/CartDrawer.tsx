import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/features/apparel-brands/ac-yacht-club/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/features/apparel-brands/ac-yacht-club/components/ui/sheet';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-harbor border-l border-gold/20 overflow-auto">
        <SheetHeader className="border-b border-gold/20 pb-4">
          <SheetTitle className="font-serif text-2xl text-ivory flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-gold" strokeWidth={1.5} />
            Your Cart
            {totalItems > 0 && (
              <span className="text-sm font-mono text-slate/60">({totalItems} items)</span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-16 h-16 text-slate/20 mb-4" strokeWidth={1} />
              <p className="font-serif text-xl text-ivory/60 mb-2">Your cart is empty</p>
              <p className="text-sm text-slate/60 mb-6">Add items to begin your purchase</p>
              <button onClick={onClose} className="btn-outline">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-4 p-4 bg-harbor-light/50"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-24 bg-harbor flex-shrink-0 overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif text-sm text-ivory truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-slate/50 mt-0.5">
                            {item.color} / {item.size}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                          className="text-slate/30 hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center border border-gold/30 text-slate hover:border-gold hover:text-gold transition-colors"
                          >
                            <Minus className="w-3 h-3" strokeWidth={1.5} />
                          </button>
                          <span className="w-6 text-center text-sm text-ivory">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center border border-gold/30 text-slate hover:border-gold hover:text-gold transition-colors"
                          >
                            <Plus className="w-3 h-3" strokeWidth={1.5} />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="font-mono text-sm text-gold">
                          €{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="mt-8 pt-6 px-6 border-t border-gold/20 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate">Subtotal</span>
                  <span className="font-mono text-xl text-gold">
                    €{totalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-slate/60">
                  Shipping and taxes calculated at checkout. Complimentary shipping on orders over €500.
                </p>
                <button className="w-full btn-primary py-4">
                  Proceed to Checkout
                </button>
                <button
                  onClick={onClose}
                  className="w-full btn-outline py-3"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
