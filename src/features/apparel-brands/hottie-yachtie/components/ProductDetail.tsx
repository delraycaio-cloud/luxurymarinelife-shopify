import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, ChevronLeft, ChevronRight, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import type { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

interface ProductDetailProps {
  product: ShopifyProduct;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { node } = product;
  const images = node.images.edges.map(edge => edge.node.url);
  const variants = node.variants.edges.map(edge => edge.node);
  const firstVariant = variants[0];
  
  const [selectedVariantId, setSelectedVariantId] = useState(firstVariant?.id || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAddToCart = () => {
    const variant = variants.find(v => v.id === selectedVariantId) || firstVariant;
    if (variant) {
      addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: quantity,
        selectedOptions: variant.selectedOptions || []
      });
      setAddedToCart(true);
      toast.success("Added to bag");
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectedVariant = variants.find(v => v.id === selectedVariantId) || firstVariant;

  return (
    <div className="fixed inset-0 z-[200] bg-[#0B0B0D]/95 backdrop-blur-lg overflow-y-auto hyyc-page">
      {/* Header */}
      <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 bg-[#0B0B0D]/80 backdrop-blur-md border-b border-[#F6F6F8]/10">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[#F6F6F8] hover:text-[#FF1F3D] transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="hyyc-font-display text-sm uppercase tracking-wider">Back</span>
        </button>
        <div className="hyyc-font-display font-bold text-[#F6F6F8] text-sm tracking-widest uppercase">
          Hottie Yachtie
        </div>
        <div className="w-20" /> {/* Spacer for centering */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-[#141417] rounded-lg overflow-hidden border border-white/5">
              <img
                src={images[currentImageIndex]}
                alt={node.title}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0B0B0D]/60 hover:bg-[#FF1F3D] rounded-full flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft size={20} className="text-[#F6F6F8]" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0B0B0D]/60 hover:bg-[#FF1F3D] rounded-full flex items-center justify-center transition-colors"
                  >
                    <ChevronRight size={20} className="text-[#F6F6F8]" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#FF1F3D] text-[#F6F6F8] px-3 py-1 text-xs hyyc-font-display uppercase tracking-wider">
                  Live Collection
                </span>
                {node.vendor && (
                  <span className="bg-[#F6F6F8] text-[#0B0B0D] px-3 py-1 text-xs hyyc-font-display uppercase tracking-wider">
                    {node.vendor}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      idx === currentImageIndex ? 'border-[#FF1F3D]' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div>
              <div className="hyyc-micro-label text-[#FF1F3D] mb-2">{node.productType || 'Apparel'}</div>
              <h1 className="hyyc-font-display text-3xl sm:text-4xl font-bold text-[#F6F6F8] mb-2 uppercase tracking-tight">
                {node.title}
              </h1>
              
              {/* Rating Mock */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#FF1F3D] text-[#FF1F3D]" />
                  ))}
                </div>
                <span className="text-[#F6F6F8]/60 text-xs uppercase tracking-widest font-bold font-sans">Premium Quality</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="hyyc-font-display text-4xl font-bold text-[#F6F6F8]">
                ${parseFloat(selectedVariant?.price.amount || '0').toFixed(0)}
              </span>
              <span className="text-white/30 text-xs font-mono">{selectedVariant?.price.currencyCode}</span>
            </div>

            {/* Description */}
            <div 
              className="text-[#F6F6F8]/80 leading-relaxed font-sans text-sm"
              dangerouslySetInnerHTML={{ __html: node.description }}
            />

            {/* Variants / Options */}
            {variants.length > 1 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#F6F6F8] font-bold uppercase tracking-widest text-xs">Select Option</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`px-4 py-3 border-2 text-xs font-bold uppercase tracking-widest transition-all ${
                        selectedVariantId === variant.id
                          ? 'border-[#FF1F3D] bg-[#FF1F3D] text-[#F6F6F8]'
                          : 'border-[#F6F6F8]/10 text-[#F6F6F8] hover:border-[#F6F6F8]/30'
                      }`}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <span className="text-[#F6F6F8] font-bold uppercase tracking-widest text-xs mb-4 block">Quantity</span>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-[#F6F6F8]/10 text-[#F6F6F8] hover:border-[#FF1F3D] hover:text-[#FF1F3D] transition-colors flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="text-[#F6F6F8] font-bold w-4 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-[#F6F6F8]/10 text-[#F6F6F8] hover:border-[#FF1F3D] hover:text-[#FF1F3D] transition-colors flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale && selectedVariant !== undefined}
                className={`flex-1 py-5 px-6 hyyc-font-display font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                  addedToCart
                    ? 'bg-green-600 text-[#F6F6F8]'
                    : !selectedVariant?.availableForSale && selectedVariant !== undefined
                    ? 'bg-neutral-800 text-white/20 cursor-not-allowed'
                    : 'bg-[#FF1F3D] text-[#F6F6F8] hover:bg-neutral-100 hover:text-[#0B0B0D]'
                }`}
              >
                <ShoppingBag size={18} />
                {addedToCart ? 'Added to bag' : !selectedVariant?.availableForSale && selectedVariant !== undefined ? 'Sold Out' : 'Add to Collection'}
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-16 h-16 border border-[#F6F6F8]/10 flex items-center justify-center transition-all ${
                  isWishlisted
                    ? 'bg-[#FF1F3D] border-[#FF1F3D]'
                    : 'hover:border-[#FF1F3D]'
                }`}
              >
                <Heart
                  size={20}
                  className={isWishlisted ? 'fill-[#F6F6F8] text-[#F6F6F8]' : 'text-[#F6F6F8]'}
                />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-[#F6F6F8]/10">
              <div className="text-center">
                <Truck size={20} className="mx-auto mb-3 text-[#FF1F3D]" />
                <div className="text-[#F6F6F8] text-[10px] font-bold uppercase tracking-widest mb-1">Worldwide</div>
                <div className="text-[#F6F6F8]/30 text-[9px] uppercase tracking-tighter">Shipping</div>
              </div>
              <div className="text-center">
                <Shield size={20} className="mx-auto mb-3 text-[#FF1F3D]" />
                <div className="text-[#F6F6F8] text-[10px] font-bold uppercase tracking-widest mb-1">Authentic</div>
                <div className="text-[#F6F6F8]/30 text-[9px] uppercase tracking-tighter">Guaranteed</div>
              </div>
              <div className="text-center">
                <RotateCcw size={20} className="mx-auto mb-3 text-[#FF1F3D]" />
                <div className="text-[#F6F6F8] text-[10px] font-bold uppercase tracking-widest mb-1">Private</div>
                <div className="text-[#F6F6F8]/30 text-[9px] uppercase tracking-tighter">Exclusive</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
