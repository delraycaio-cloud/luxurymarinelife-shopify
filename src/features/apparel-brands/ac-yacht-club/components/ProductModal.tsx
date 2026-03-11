import { useState, useEffect } from 'react';
import { X, Minus, Plus, Check, Ruler } from 'lucide-react';
import { useCart } from '@/features/apparel-brands/ac-yacht-club/context/CartContext';
import { sizeGuides } from '@/features/apparel-brands/ac-yacht-club/data';
import type { Product } from '@/features/apparel-brands/ac-yacht-club/types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || '');
      setSelectedColor(product.colors?.[0]?.name || '');
      setQuantity(1);
      setIsAdded(false);
      setActiveImage(0);
      setShowSizeGuide(false);
    }
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!product || !isOpen) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const getSizeGuide = () => {
    if (product.category === 'footwear') {
      return sizeGuides.find(g => g.category === 'footwear');
    }
    if (product.subcategory === 'blazers') {
      return sizeGuides.find(g => g.category === 'blazers');
    }
    return sizeGuides.find(g => g.category === 'apparel');
  };

  const sizeGuide = getSizeGuide();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-harbor/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-harbor-light overflow-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-harbor/80 flex items-center justify-center text-ivory hover:text-gold transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <div className="grid lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="bg-harbor">
            <div className="aspect-square">
              <img
                src={product.images[activeImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 p-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-16 h-16 border-2 overflow-hidden ${
                      activeImage === idx ? 'border-gold' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 lg:p-10">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs text-slate/60 mb-3">
              <span className="capitalize">{product.category}</span>
              <span>/</span>
              <span className="text-gold">{product.collection}</span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-2xl lg:text-3xl text-ivory">
              {product.name}
            </h2>

            {/* Price */}
            <p className="mt-3 font-mono text-xl text-gold">
              €{product.price.toLocaleString()}
            </p>

            {/* Description */}
            <p className="mt-4 text-slate/70 leading-relaxed text-sm">
              {product.description}
            </p>

            {/* Material & Craftsmanship */}
            <div className="mt-4 p-4 bg-harbor/50 space-y-2">
              <p className="text-sm">
                <span className="text-slate/50">Material:</span>{' '}
                <span className="text-ivory">{product.material}</span>
              </p>
              <p className="text-sm">
                <span className="text-slate/50">Craftsmanship:</span>{' '}
                <span className="text-ivory">{product.craftsmanship}</span>
              </p>
              {product.fit && (
                <p className="text-sm">
                  <span className="text-slate/50">Fit:</span>{' '}
                  <span className="text-ivory capitalize">{product.fit}</span>
                </p>
              )}
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate/60 mb-3">
                  Color: <span className="text-ivory">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-gold scale-110'
                          : 'border-transparent hover:border-gold/50'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate/60">
                    Size
                  </label>
                  {sizeGuide && (
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-xs text-gold hover:text-gold-light flex items-center gap-1"
                    >
                      <Ruler className="w-3 h-3" strokeWidth={1.5} />
                      Size Guide
                    </button>
                  )}
                </div>
                
                {/* Size Guide Panel */}
                {showSizeGuide && sizeGuide && (
                  <div className="mb-4 p-4 bg-harbor/50 border border-gold/20">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono uppercase text-slate/60">Size Guide</span>
                      <button
                        onClick={() => setShowSizeGuide(false)}
                        className="text-xs text-slate/40 hover:text-ivory"
                      >
                        Close
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-slate/50 border-b border-gold/20">
                            <th className="text-left py-2 pr-4">Size</th>
                            {sizeGuide.measurements[0].chest && <th className="text-left py-2 pr-4">Chest</th>}
                            {sizeGuide.measurements[0].waist && <th className="text-left py-2 pr-4">Waist</th>}
                            {sizeGuide.measurements[0].us && <th className="text-left py-2 pr-4">US</th>}
                            {sizeGuide.measurements[0].eu && <th className="text-left py-2 pr-4">EU</th>}
                            {sizeGuide.measurements[0].uk && <th className="text-left py-2 pr-4">UK</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {sizeGuide.measurements.map((m) => (
                            <tr key={m.size} className="text-ivory border-b border-gold/10">
                              <td className="py-2 pr-4">{m.size}</td>
                              {m.chest && <td className="py-2 pr-4">{m.chest}</td>}
                              {m.waist && <td className="py-2 pr-4">{m.waist}</td>}
                              {m.us && <td className="py-2 pr-4">{m.us}</td>}
                              {m.eu && <td className="py-2 pr-4">{m.eu}</td>}
                              {m.uk && <td className="py-2 pr-4">{m.uk}</td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-10 px-3 border text-sm transition-colors ${
                        selectedSize === size
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-gold/30 text-slate hover:border-gold/60'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-6">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate/60 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gold/30 flex items-center justify-center text-slate hover:border-gold transition-colors"
                >
                  <Minus className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <span className="w-10 text-center text-ivory">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gold/30 flex items-center justify-center text-slate hover:border-gold transition-colors"
                >
                  <Plus className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`mt-8 w-full py-4 flex items-center justify-center gap-2 transition-all ${
                isAdded
                  ? 'bg-green-600 text-white'
                  : 'bg-gold text-harbor font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:bg-gold-light shadow-glow'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" strokeWidth={1.5} />
                  Added to Cart
                </>
              ) : (
                `Add to Cart — €${(product.price * quantity).toLocaleString()}`
              )}
            </button>

            {/* Care Instructions */}
            {product.careInstructions && product.careInstructions.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gold/10">
                <p className="text-xs font-mono uppercase tracking-wider text-slate/50 mb-2">
                  Care Instructions
                </p>
                <ul className="text-xs text-slate/70 space-y-1">
                  {product.careInstructions.map((instruction, idx) => (
                    <li key={idx}>• {instruction}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
