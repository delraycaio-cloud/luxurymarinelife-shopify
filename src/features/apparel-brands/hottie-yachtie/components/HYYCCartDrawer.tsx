import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, X, Minus, Plus, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

export function HYYCCartDrawer() {
  const { items, updateQuantity, removeItem, createCheckout, isLoading } = useCartStore();
  
  const total = items.reduce((acc, item) => acc + parseFloat(item.price.amount) * item.quantity, 0);

  const handleCheckout = async () => {
    const url = await createCheckout();
    if (url) {
      window.location.href = url;
    }
  };

  const cartCount = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative flex items-center gap-2 group cursor-pointer text-[#F6F6F8] hover:text-[#FF1F3D] transition-colors">
          <ShoppingBag size={20} />
          <span className="text-xs uppercase tracking-widest font-bold font-sans">Bag</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#FF1F3D] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="bg-[#0B0B0D] border-l border-[#F6F6F8]/10 text-[#F6F6F8] sm:max-w-md hyyc-page">
        <SheetHeader className="border-b border-[#F6F6F8]/5 pb-6">
          <SheetTitle className="text-[#F6F6F8] flex items-center gap-3 hyyc-font-display text-2xl uppercase tracking-tight">
            <ShoppingBag className="h-6 w-6 text-[#FF1F3D]" />
            Your Collection
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="flex-1 -mx-6 px-6 mt-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-[#F6F6F8]/30">
              <ShoppingBag className="h-16 w-16 mb-6 opacity-10" />
              <p className="hyyc-font-display text-lg uppercase tracking-widest">Empty Bag</p>
              <p className="text-sm mt-2 font-sans italic">Your next favorite piece is waiting.</p>
            </div>
          ) : (
            <div className="space-y-8 pb-24">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-5 group">
                  <div className="h-24 w-20 rounded bg-[#141417] overflow-hidden border border-[#F6F6F8]/5 flex-shrink-0 transition-transform group-hover:scale-105">
                    {item.product.node.images.edges[0]?.node && (
                      <img
                        src={item.product.node.images.edges[0].node.url}
                        alt={item.product.node.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="hyyc-font-display font-bold text-[#F6F6F8] text-sm uppercase tracking-tight leading-tight group-hover:text-[#FF1F3D] transition-colors">
                        {item.product.node.title}
                      </h4>
                      <p className="text-[10px] uppercase font-bold text-[#F6F6F8]/40 tracking-widest mt-1">
                        {item.variantTitle}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center bg-[#141417] border border-[#F6F6F8]/10 rounded px-1">
                        <button
                          className="h-8 w-8 text-[#F6F6F8]/50 hover:text-[#FF1F3D] transition-colors flex items-center justify-center"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs w-6 text-center font-bold">{item.quantity}</span>
                        <button
                          className="h-8 w-8 text-[#F6F6F8]/50 hover:text-[#FF1F3D] transition-colors flex items-center justify-center"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-[#F6F6F8]">
                        ${parseFloat(item.price.amount).toFixed(0)}
                      </p>
                    </div>
                  </div>
                  <button
                    className="h-8 w-8 text-[#F6F6F8]/20 hover:text-[#FF1F3D] flex items-center justify-center transition-colors"
                    onClick={() => removeItem(item.variantId)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <SheetFooter className="absolute bottom-0 left-0 right-0 bg-[#0B0B0D] p-8 border-t border-[#F6F6F8]/10 backdrop-blur-md">
            <div className="w-full space-y-6">
              <div className="flex justify-between items-center">
                <span className="hyyc-font-display font-bold text-lg uppercase tracking-tight">Total</span>
                <span className="hyyc-font-display font-bold text-2xl text-[#FF1F3D]">
                  ${total.toFixed(0)}
                </span>
              </div>
              <button 
                onClick={handleCheckout} 
                disabled={isLoading}
                className="w-full bg-[#FF1F3D] hover:bg-[#F6F6F8] hover:text-[#0B0B0D] text-[#F6F6F8] font-bold py-4 hyyc-font-display uppercase tracking-widest text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    Checkout Now
                  </>
                )}
              </button>
              <p className="text-[9px] text-center text-[#F6F6F8]/30 uppercase tracking-[0.2em] font-bold">
                Secure Shopify Checkout
              </p>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
