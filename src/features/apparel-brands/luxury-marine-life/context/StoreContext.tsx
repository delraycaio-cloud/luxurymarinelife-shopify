import React, { createContext, useCallback, useContext, useState } from "react";
import type { CartItem, Product, View } from "../types";

interface StoreContextType {
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    size: string,
    color: string,
  ) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  currentView: View;
  setCurrentView: (view: View) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback(
    (product: Product, quantity: number, size: string, color: string) => {
      setCart((prev) => {
        const existingItem = prev.find(
          (item) =>
            item.product.id === product.id &&
            item.size === size &&
            item.color === color,
        );

        if (existingItem) {
          return prev.map((item) =>
            item.product.id === product.id &&
            item.size === size &&
            item.color === color
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }

        return [...prev, { product, quantity, size, color }];
      });
    },
    [],
  );

  const removeFromCart = useCallback(
    (productId: string, size: string, color: string) => {
      setCart((prev) =>
        prev.filter(
          (item) =>
            !(
              item.product.id === productId &&
              item.size === size &&
              item.color === color
            ),
        ),
      );
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId, size, color);
        return;
      }
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity }
            : item,
        ),
      );
    },
    [removeFromCart],
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce(
    (count, item) => count + item.quantity,
    0,
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
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

