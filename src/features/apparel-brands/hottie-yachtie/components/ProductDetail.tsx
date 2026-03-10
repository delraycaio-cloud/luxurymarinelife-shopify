import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Share2, ChevronLeft, ChevronRight, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import type { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: () => void;
}

export default function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAddToCart = () => {
    onAddToCart();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

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
            <div className="relative aspect-square bg-[#1a1a1a] rounded-lg overflow-hidden">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
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
                {product.isNew && (
                  <span className="bg-[#FF1F3D] text-[#F6F6F8] px-3 py-1 text-xs hyyc-font-display uppercase tracking-wider">
                    New
                  </span>
                )}
                {product.isBestseller && (
                  <span className="bg-[#F6F6F8] text-[#0B0B0D] px-3 py-1 text-xs hyyc-font-display uppercase tracking-wider">
                    Bestseller
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-[#8B0000] text-[#F6F6F8] px-3 py-1 text-xs hyyc-font-display uppercase tracking-wider">
                    Sale
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img: string, idx: number) => (
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
              <div className="hyyc-micro-label text-[#FF1F3D] mb-2">{product.category}</div>
              <h1 className="hyyc-font-display text-3xl sm:text-4xl font-bold text-[#F6F6F8] mb-2">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#FF1F3D] text-[#FF1F3D]" />
                  ))}
                </div>
                <span className="text-[#F6F6F8]/60 text-sm">(128 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="hyyc-font-display text-3xl font-bold text-[#F6F6F8]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-[#F6F6F8]/50 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-[#F6F6F8]/80 leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#F6F6F8] font-medium">Color</span>
                  <span className="text-[#F6F6F8]/60 text-sm">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border-2 text-sm font-medium transition-colors ${
                        selectedColor === color
                          ? 'border-[#FF1F3D] text-[#FF1F3D]'
                          : 'border-[#F6F6F8]/20 text-[#F6F6F8] hover:border-[#F6F6F8]/50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[#F6F6F8] font-medium">Size</span>
                <button className="text-[#FF1F3D] text-sm hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border-2 font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-[#FF1F3D] bg-[#FF1F3D] text-[#F6F6F8]'
                        : 'border-[#F6F6F8]/20 text-[#F6F6F8] hover:border-[#F6F6F8]/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <span className="text-[#F6F6F8] font-medium mb-3 block">Quantity</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-[#F6F6F8]/20 text-[#F6F6F8] hover:border-[#FF1F3D] hover:text-[#FF1F3D] transition-colors"
                >
                  -
                </button>
                <span className="text-[#F6F6F8] font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-[#F6F6F8]/20 text-[#F6F6F8] hover:border-[#FF1F3D] hover:text-[#FF1F3D] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 hyyc-font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all ${
                  addedToCart
                    ? 'bg-green-600 text-[#F6F6F8]'
                    : 'bg-[#FF1F3D] text-[#F6F6F8] hover:bg-[#FF5A73]'
                }`}
              >
                <ShoppingBag size={20} />
                {addedToCart ? 'Added!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-14 h-14 border-2 flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'border-[#FF1F3D] bg-[#FF1F3D]'
                    : 'border-[#F6F6F8]/20 hover:border-[#FF1F3D]'
                }`}
              >
                <Heart
                  size={20}
                  className={isWishlisted ? 'fill-[#F6F6F8] text-[#F6F6F8]' : 'text-[#F6F6F8]'}
                />
              </button>
              <button className="w-14 h-14 border-2 border-[#F6F6F8]/20 text-[#F6F6F8] hover:border-[#FF1F3D] hover:text-[#FF1F3D] flex items-center justify-center transition-colors">
                <Share2 size={20} />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#F6F6F8]/10">
              <div className="text-center">
                <Truck size={24} className="mx-auto mb-2 text-[#FF1F3D]" />
                <div className="text-[#F6F6F8] text-sm">Free Shipping</div>
                <div className="text-[#F6F6F8]/50 text-xs">Over $100</div>
              </div>
              <div className="text-center">
                <Shield size={24} className="mx-auto mb-2 text-[#FF1F3D]" />
                <div className="text-[#F6F6F8] text-sm">Secure</div>
                <div className="text-[#F6F6F8]/50 text-xs">Checkout</div>
              </div>
              <div className="text-center">
                <RotateCcw size={24} className="mx-auto mb-2 text-[#FF1F3D]" />
                <div className="text-[#F6F6F8] text-sm">Easy Returns</div>
                <div className="text-[#F6F6F8]/50 text-xs">30 Days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
