import { useState, useEffect } from "react";
import { fetchProducts } from "@/lib/shopify";
import type { ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./components/ProductCard";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { CartDrawer } from "./components/CartDrawer";
import { Loader2, ShoppingBag, Sparkles, LayoutGrid, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ShopifyDemoPage = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Shop All Products | Luxury Marine Life";
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(50);
      // Filter products by vendor name
      const filtered = data.filter(p => p.node.vendor === 'Hottie Yachtie Yacht Club');
      setProducts(filtered);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (product: ShopifyProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-navy text-white">

      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-lg border-b border-gold/20 h-20">
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
              <ShoppingBag className="text-navy h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold tracking-tighter">
                GARMN <span className="text-gold">SHOP</span>
              </h1>
              <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">
                Storefront API v2025.07
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="outline" className="hidden sm:flex border-gold/30 text-gold bg-gold/5 font-bold px-3 py-1">
              LIVE CONNECTION
            </Badge>
            <CartDrawer />
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Card */}
          <div className="relative mb-16 p-8 md:p-12 rounded-3xl overflow-hidden border border-gold/20 bg-gradient-to-br from-white/10 to-transparent">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <Sparkles className="h-24 w-24 text-gold" />
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <Badge className="mb-4 bg-teal text-white">READY FOR GARMN INTEGRATION</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Live <span className="text-gold">Shopify</span> Products
              </h2>
              <p className="text-lg text-white/70 mb-8">
                This page is connected directly to your Shopify Storefront API. 
                Everything you see here is live data, including inventory, pricing, 
                and high-fidelity images. Products added to your cart will lead to your 
                secure Shopify checkout.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-sm">
                  <LayoutGrid className="h-4 w-4 text-gold" />
                  Grid Layout
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-sm">
                  <Info className="h-4 w-4 text-gold" />
                  Dynamic Details
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-sm">
                  <ShoppingBag className="h-4 w-4 text-gold" />
                  Zustand Persistent Cart
                </div>
              </div>
            </div>
          </div>

          {/* Grid Header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-gold" />
              Latest Arrivals
            </h3>
            <p className="text-sm text-white/50">{products.length} Products Found</p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="h-12 w-12 text-gold animate-spin" />
              <p className="text-white/60 animate-pulse font-medium">Fetching Storefront Assets...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/20 rounded-3xl">
              <ShoppingBag className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h4 className="text-xl font-bold">No products found</h4>
              <p className="text-white/50 mb-6">Make sure you have products published to your Storefront channel.</p>
              <Button onClick={loadProducts} variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                Retry Connection
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard 
                  key={product.node.id} 
                  product={product} 
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Footer Decoration */}
      <footer className="py-20 text-center border-t border-white/10 opacity-30">
        <div className="flex items-center justify-center gap-2 mb-4">
           <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ShoppingBag className="h-4 w-4" />
           </div>
           <span className="font-bold tracking-widest text-xs uppercase">Powered by Shopify Storefront API</span>
        </div>
      </footer>
    </div>
  );
};

export default ShopifyDemoPage;
