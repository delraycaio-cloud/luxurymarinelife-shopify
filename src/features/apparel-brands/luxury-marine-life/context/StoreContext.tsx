import React, { createContext, useCallback, useContext, useState, useMemo } from "react";
import type { View } from "../types";
import type { ShopifyProduct } from "@/lib/shopify";
import { useBrandCart } from "@/store/cartStore";

interface StoreContextType {
  addToCart: (
    product: ShopifyProduct,
    quantity: number,
    size: string,
    color: string,
  ) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (
    variantId: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
  createCheckout: () => Promise<string | null>;
  isLoading: boolean;
  items: any[];
  cartTotal: number;
  cartCount: number;
  currentView: View;
  setCurrentView: (view: View) => void;
  selectedProduct: ShopifyProduct | null;
  setSelectedProduct: (product: ShopifyProduct | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { items, addItem, removeItem, updateQuantity: updateQty, clearCart: clear, createCheckout, isLoading } = useBrandCart('lml');

  const cartTotal = useMemo(() => 
    items.reduce((total, item) => total + (parseFloat(item.price.amount) * item.quantity), 0)
  , [items]);

  const cartCount = useMemo(() => 
    items.reduce((count, item) => count + item.quantity, 0)
  , [items]);

  const addToCart = useCallback(
    (product: ShopifyProduct, quantity: number, size: string, color: string) => {
      const variant = product.node.variants.edges.find(v => 
        v.node.title.toLowerCase().includes(size.toLowerCase()) || 
        v.node.title.toLowerCase().includes(color.toLowerCase())
      ) || product.node.variants.edges[0];

      if (variant) {
        addItem({
          product,
          variantId: variant.node.id,
          variantTitle: variant.node.title,
          price: variant.node.price,
          quantity,
          selectedOptions: variant.node.selectedOptions
        });
      }
    },
    [addItem],
  );

  const removeFromCart = useCallback(
    (variantId: string) => {
      removeItem(variantId);
    },
    [removeItem],
  );

  const updateQuantity = useCallback(
    (variantId: string, quantity: number) => {
      updateQty(variantId, quantity);
    },
    [updateQty],
  );

  const clearCart = useCallback(() => {
    clear();
  }, [clear]);

  return (
    <StoreContext.Provider
      value={{
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        createCheckout,
        isLoading,
        items,
        cartTotal,
        cartCount,
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
