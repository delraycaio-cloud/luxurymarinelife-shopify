import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  RotateCcw,
  Share2,
  Shield,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function ProductDetail() {
  const { selectedProduct, setCurrentView, addToCart, setIsCartOpen } =
    useStore();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f6f3]">
        <button onClick={() => setCurrentView("home")} className="text-[#0a1628] underline">
          Select a product first
        </button>
      </div>
    );
  }

  const { node } = selectedProduct;
  const price = node.priceRange.minVariantPrice.amount;
  const images = node.images.edges.map(e => e.node.url);
  
  // Extract options
  const colorOption = node.options.find(o => o.name.toLowerCase().includes('color'));
  const sizeOption = node.options.find(o => o.name.toLowerCase().includes('size'));
  
  const [selectedColor, setSelectedColor] = useState(colorOption?.values[0] || "Default");
  const [selectedSize, setSelectedSize] = useState(sizeOption?.values[0] || "M");

  const handleAddToCart = () => {
    addToCart(selectedProduct, 1, selectedSize, selectedColor);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] pt-24 pb-20">
      <div className="container-luxury">
        <div className="flex items-center gap-2 mb-8 text-sm">
          <button
            onClick={() => setCurrentView("home")}
            className="text-[#0a1628]/50 hover:text-[#0a1628] transition-colors"
          >
            Home
          </button>
          <span className="text-[#0a1628]/30">/</span>
          <button
            onClick={() => setCurrentView("products")}
            className="text-[#0a1628]/50 hover:text-[#0a1628] transition-colors"
          >
            Collection
          </button>
          <span className="text-[#0a1628]/30">/</span>
          <span className="text-[#0a1628]">{node.title}</span>
        </div>

        <button
          onClick={() => setCurrentView("products")}
          className="flex items-center gap-2 text-[#0a1628]/60 hover:text-[#0a1628] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm uppercase tracking-widest">
            Back to Collection
          </span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div>
            <div className="aspect-square bg-[#e8e6e3] overflow-hidden mb-4">
              <img
                src={images[selectedImage]}
                alt={node.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 bg-[#e8e6e3] flex-shrink-0 overflow-hidden transition-all duration-300 ${
                    selectedImage === index
                      ? "ring-2 ring-[#0a1628]"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex gap-2 mb-4">
              {node.tags?.includes('new') && (
                <span className="px-3 py-1 bg-[#0a1628] text-white text-xs uppercase tracking-wider">
                  New
                </span>
              )}
              {node.tags?.includes('limited') && (
                <span className="px-3 py-1 bg-[#c9a962] text-[#0a1628] text-xs uppercase tracking-wider">
                  Limited Edition
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#c9a962] text-[#c9a962]"
                  />
                ))}
              </div>
              <span className="text-sm text-[#0a1628]/50">(Premium Quality)</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#0a1628] font-light mb-4">
              {node.title}
            </h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-2xl md:text-3xl text-[#0a1628] font-medium">
                ${parseFloat(price).toFixed(0)}
              </span>
            </div>

            <p className="text-[#0a1628]/70 leading-relaxed mb-8">
              {node.description}
            </p>

            {colorOption && (
              <div className="mb-6">
                <label className="text-sm text-[#0a1628]/60 uppercase tracking-wider mb-3 block">
                  Color: <span className="text-[#0a1628]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {colorOption.values.map((val) => (
                    <button
                      key={val}
                      onClick={() => setSelectedColor(val)}
                      className={`px-4 py-2 border text-sm transition-all duration-300 ${
                        selectedColor === val
                          ? "bg-[#0a1628] text-white"
                          : "border-[#0a1628]/20 text-[#0a1628] hover:border-[#0a1628]"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sizeOption && (
              <div className="mb-8">
                <label className="text-sm text-[#0a1628]/60 uppercase tracking-wider mb-3 block">
                  Size: <span className="text-[#0a1628]">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizeOption.values.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        selectedSize === size
                          ? "bg-[#0a1628] text-white"
                          : "bg-white border border-[#0a1628]/20 text-[#0a1628] hover:border-[#0a1628]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 px-8 py-4 bg-[#0a1628] text-white text-sm uppercase tracking-widest font-medium hover:bg-[#1a2a44] transition-colors duration-300 flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-14 h-14 flex items-center justify-center border-2 transition-all duration-300 ${
                  isWishlisted
                    ? "border-red-500 text-red-500"
                    : "border-[#0a1628]/20 text-[#0a1628] hover:border-[#0a1628]"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? "fill-current" : ""
                  }`}
                />
              </button>
              <button className="w-14 h-14 flex items-center justify-center border-2 border-[#0a1628]/20 text-[#0a1628] hover:border-[#0a1628] transition-colors duration-300">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#0a1628]/10">
              <div className="text-center">
                <Truck className="w-6 h-6 text-[#1e6b7a] mx-auto mb-2" />
                <span className="text-xs text-[#0a1628]/60">
                  Free Shipping
                </span>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-[#1e6b7a] mx-auto mb-2" />
                <span className="text-xs text-[#0a1628]/60">
                  30-Day Returns
                </span>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-[#1e6b7a] mx-auto mb-2" />
                <span className="text-xs text-[#0a1628]/60">
                  2-Year Warranty
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
