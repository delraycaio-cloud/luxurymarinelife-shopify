import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X, Minus, Plus, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CartDrawer() {
  const { items, updateQuantity, removeItem, createCheckout, isLoading } = useCartStore();
  
  const total = items.reduce((acc, item) => acc + parseFloat(item.price.amount) * item.quantity, 0);
  const currency = items[0]?.price.currencyCode || 'USD';

  const handleCheckout = async () => {
    const url = await createCheckout();
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-navy/60 border-gold/30 text-gold hover:bg-gold/20">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-gold text-navy text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-navy border-l border-gold/20 text-white sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-white flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-gold" />
            Your Cart
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="flex-1 -mx-6 px-6 mt-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-white/50">
              <ShoppingCart className="h-12 w-12 mb-4 opacity-20" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6 pb-20">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4">
                  <div className="h-20 w-20 rounded-lg overflow-hidden border border-white/10 bg-white/5 flex-shrink-0">
                    {item.product.node.images.edges[0]?.node && (
                      <img
                        src={item.product.node.images.edges[0].node.url}
                        alt={item.product.node.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium text-sm line-clamp-1">{item.product.node.title}</h4>
                    <p className="text-xs text-white/50">{item.variantTitle}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-white/10 rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-white/70 hover:text-white"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-xs w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-white/70 hover:text-white"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm font-bold text-gold">
                        {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white/30 hover:text-white"
                    onClick={() => removeItem(item.variantId)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <SheetFooter className="absolute bottom-0 left-0 right-0 bg-navy p-6 border-t border-gold/20">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-gold">{currency} {total.toFixed(2)}</span>
              </div>
              <Button 
                onClick={handleCheckout} 
                disabled={isLoading}
                className="w-full bg-gold hover:bg-gold/90 text-navy font-bold h-12"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Preparing Checkout...
                  </>
                ) : (
                  'Proceed to Checkout'
                )}
              </Button>
              <p className="text-[10px] text-center text-white/40">
                Checkout is handled securely by Shopify
              </p>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
