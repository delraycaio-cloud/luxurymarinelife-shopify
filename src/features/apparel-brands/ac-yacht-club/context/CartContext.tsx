import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Product, CartItem, CartContextType } from '@/features/apparel-brands/ac-yacht-club/types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((product: Product, quantity: number, size: string, color: string) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => 
          item.product.id === product.id && 
          item.size === size && 
          item.color === color
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { product, quantity, size, color }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string, size: string, color: string) => {
    setItems((prevItems) => 
      prevItems.filter((item) => 
        !(item.product.id === productId && item.size === size && item.color === color)
      )
    );
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isCartOpen,
      setIsCartOpen,
    }),
    [items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isCartOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
