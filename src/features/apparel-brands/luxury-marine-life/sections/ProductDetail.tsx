import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Heart,
  RotateCcw,
  Share2,
  Shield,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { useStore } from "../context/StoreContext";
import { products } from "../data/products";

export default function ProductDetail() {
  const { selectedProduct, setCurrentView, addToCart, setIsCartOpen } =
    useStore();
  const [selectedSize, setSelectedSize] = useState(
    selectedProduct?.sizes[1] || "M",
  );
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct?.colors[0] || { name: "", hex: "" },
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = selectedProduct || products[0];

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize, selectedColor.name);
    setIsCartOpen(true);
  };

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

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
          <span className="text-[#0a1628]">{product.name}</span>
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
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 bg-[#e8e6e3] overflow-hidden transition-all duration-300 ${
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
              {product.isNew && (
                <span className="px-3 py-1 bg-[#0a1628] text-white text-xs uppercase tracking-wider">
                  New
                </span>
              )}
              {product.isLimited && (
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
              <span className="text-sm text-[#0a1628]/50">(127 reviews)</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#0a1628] font-light mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-2xl md:text-3xl text-[#0a1628] font-medium">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-[#0a1628]/40 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-[#0a1628]/70 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="mb-8">
              <h3 className="text-sm text-[#0a1628]/60 uppercase tracking-wider mb-4">
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#1e6b7a]" />
                    <span className="text-sm text-[#0a1628]/60">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm text-[#0a1628]/60 uppercase tracking-wider mb-3 block">
                Color:{" "}
                <span className="text-[#0a1628]">{selectedColor.name}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      selectedColor.name === color.name
                        ? "border-[#0a1628] scale-110"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="text-sm text-[#0a1628]/60 uppercase tracking-wider mb-3 block">
                Size: <span className="text-[#0a1628]">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
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

        <div className="border-t border-[#0a1628]/10 pt-16">
          <h2 className="text-2xl md:text-3xl text-[#0a1628] font-light mb-8">
            You May Also{" "}
            <span className="italic text-[#1e6b7a]">Like</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div className="aspect-[3/4] bg-[#e8e6e3] overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-[#0a1628] font-medium group-hover:text-[#1e6b7a] transition-colors">
                  {product.name}
                </h3>
                <p className="text-[#0a1628]/50">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

