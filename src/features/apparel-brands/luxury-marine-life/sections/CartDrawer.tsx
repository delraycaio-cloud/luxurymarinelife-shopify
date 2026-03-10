import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl animate-slide-in-right">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-[#0a1628]/10">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#0a1628]" />
              <h2 className="text-lg text-[#0a1628] font-medium">Your Cart</h2>
              <span className="text-sm text-[#0a1628]/50">
                ({cart.length} items)
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-10 h-10 flex items-center justify-center hover:bg-[#f8f6f3] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-[#0a1628]/20 mb-4" />
                <h3 className="text-xl text-[#0a1628] mb-2">
                  Your cart is empty
                </h3>
                <p className="text-[#0a1628]/50 mb-6">
                  Discover our collection of luxury marine apparel
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-8 py-3 bg-[#0a1628] text-white text-sm uppercase tracking-widest hover:bg-[#1a2a44] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-4"
                  >
                    <div className="w-24 h-24 bg-[#f8f6f3] flex-shrink-0 overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#0a1628] font-medium truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-[#0a1628]/50">
                        {item.color} / {item.size}
                      </p>
                      <p className="text-[#0a1628] font-medium mt-1">
                        ${item.product.price}
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-[#0a1628]/20">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity - 1,
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-[#f8f6f3] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity + 1,
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-[#f8f6f3] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            removeFromCart(
                              item.product.id,
                              item.size,
                              item.color,
                            )
                          }
                          className="text-[#0a1628]/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-[#0a1628]/10 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#0a1628]/60">Subtotal</span>
                <span className="text-xl text-[#0a1628] font-medium">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#0a1628]/60">Shipping</span>
                <span className="text-[#1e6b7a]">Free</span>
              </div>

              <p className="text-xs text-[#0a1628]/50">
                Shipping & taxes calculated at checkout. 10% of your purchase
                supports ocean conservation.
              </p>

              <button className="w-full py-4 bg-[#0a1628] text-white text-sm uppercase tracking-widest font-medium hover:bg-[#1a2a44] transition-colors flex items-center justify-center gap-3">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3 border border-[#0a1628]/20 text-[#0a1628] text-sm uppercase tracking-widest hover:border-[#0a1628] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

