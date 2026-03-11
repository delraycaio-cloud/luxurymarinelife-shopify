import type { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { ShoppingCart, Heart, Share2, Star, CheckCircle2, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ProductDetailModalProps {
  product: ShopifyProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) return null;

  const { node } = product;
  const variants = node.variants.edges;
  const currentVariant = selectedVariantId 
    ? variants.find(v => v.node.id === selectedVariantId)?.node 
    : variants[0]?.node;

  const handleAddToCart = () => {
    if (!currentVariant) return;

    addItem({
      product,
      variantId: currentVariant.id,
      variantTitle: currentVariant.title,
      price: currentVariant.price,
      quantity,
      selectedOptions: currentVariant.selectedOptions || []
    });

    toast.success(`${node.title} added to cart!`);
    onClose();
  };

  const price = currentVariant ? parseFloat(currentVariant.price.amount) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-navy border border-gold/20 text-white max-w-4xl p-0 overflow-hidden sm:rounded-2xl">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-square bg-white/5 relative">
            {node.images.edges[0]?.node && (
              <img
                src={node.images.edges[0].node.url}
                alt={node.title}
                className="w-full h-full object-cover"
              />
            )}
            <Badge className="absolute top-4 left-4 bg-teal text-white">
              <Star className="w-3 h-3 mr-1 fill-white" />
              Impact Choice
            </Badge>
          </div>

          {/* Info */}
          <div className="p-8 space-y-6 flex flex-col justify-center">
            <DialogHeader>
              <DialogTitle className="text-3xl font-display font-bold text-white mb-2">
                {node.title}
              </DialogTitle>
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-gold">
                  {currentVariant?.price.currencyCode} {price.toFixed(2)}
                </span>
                <span className="text-white/60 text-sm">
                  tax included
                </span>
              </div>
            </DialogHeader>

            <div className="text-white/70 text-sm leading-relaxed max-h-32 overflow-y-auto">
              {node.description || "Premium educational tool designed to empower students through technology and gamified learning."}
            </div>

            {/* Variants */}
            {variants.length > 1 && (
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-white/40">Select Option</label>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <Button
                      key={v.node.id}
                      variant="outline"
                      size="sm"
                      className={`border-white/10 ${
                        currentVariant?.id === v.node.id 
                          ? 'bg-gold text-navy border-gold' 
                          : 'bg-white/5 text-white hover:bg-white/10'
                      }`}
                      onClick={() => setSelectedVariantId(v.node.id)}
                    >
                      {v.node.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-6">
              <div className="flex items-center border border-white/20 rounded-lg overflow-hidden h-12">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-full px-3 text-white/50 hover:text-white"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-bold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-full px-3 text-white/50 hover:text-white"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                className="flex-1 bg-gold hover:bg-gold/90 text-navy font-bold h-12"
                onClick={handleAddToCart}
                disabled={!currentVariant?.availableForSale}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {currentVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
              </Button>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-teal">
                <CheckCircle2 className="w-4 h-4" />
                <span>Impact verified by GARMN</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
