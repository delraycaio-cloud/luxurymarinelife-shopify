import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye, Plus } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
  onViewDetails: (product: ShopifyProduct) => void;
}

export const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  
  const { node } = product;
  const firstVariant = node.variants.edges[0]?.node;
  const firstImage = node.images.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const impactAmount = (price * 0.1).toFixed(0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) {
      toast.error("Product unavailable");
      return;
    }

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    });

    toast.success(`${node.title} added to cart!`, {
      description: `$${impactAmount} will go to Magic Santa wishes`,
    });
  };

  return (
    <Card 
      className="group relative overflow-hidden bg-navy/60 border-gold/10 hover:border-gold/30 transition-all duration-500 shadow-none border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Impact Badge */}
      <Badge className="absolute top-3 left-3 z-10 bg-teal text-white text-[10px] font-bold">
        ${impactAmount} IMPACT
      </Badge>
      
      {/* Quick Actions */}
      <div className={`absolute top-3 right-3 z-10 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 bg-white/90 hover:bg-gold hover:text-navy rounded-full"
          onClick={() => onViewDetails(product)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-navy/50 to-navy/80 cursor-pointer" onClick={() => onViewDetails(product)}>
        {firstImage ? (
          <img
            src={firstImage.url}
            alt={firstImage.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/40">
            <ShoppingCart className="h-12 w-12" />
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-display text-lg text-white group-hover:text-gold transition-colors line-clamp-1 font-bold">
          {node.title}
        </h3>
        
        {/* Description */}
        <p className="text-xs text-white/60 line-clamp-2 min-h-[2.5rem]">
          {node.description || "Premium product from GARMN Shop"}
        </p>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xl font-bold text-gold">
              ${price.toFixed(2)}
            </span>
          </div>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-gold hover:bg-gold/90 text-navy font-bold"
            disabled={!firstVariant?.availableForSale}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
