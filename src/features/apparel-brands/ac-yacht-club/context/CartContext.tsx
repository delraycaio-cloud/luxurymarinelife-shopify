import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useBrandCart } from '@/store/cartStore';

const CartContext = createContext<any | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { items, addItem, updateQuantity, removeItem, clearCart, createCheckout, isLoading, checkoutUrl } = useBrandCart('acyc');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0),
    [items]
  );

  const addToCart = useCallback((product: any, quantity: number, size: string, color: string) => {
    const variant = product.node.variants.edges.find((v: any) => {
      const sizeMatch = v.node.selectedOptions.some((opt: any) => opt.name === 'Size' && opt.value === size);
      const colorMatch = v.node.selectedOptions.some((opt: any) => opt.name === 'Color' && opt.value === color);
      return sizeMatch && colorMatch;
    }) || product.node.variants.edges[0];

    addItem({
      product,
      variantId: variant.node.id,
      variantTitle: variant.node.title,
      price: variant.node.price,
      quantity,
      selectedOptions: variant.node.selectedOptions
    });
    setIsCartOpen(true);
  }, [addItem]);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart: (productId: string, size: string, color: string) => {
        const item = items.find(i => 
          i.product.node.id === productId && 
          i.selectedOptions.some(opt => opt.name === 'Size' && opt.value === size) &&
          i.selectedOptions.some(opt => opt.name === 'Color' && opt.value === color)
        );
        if (item) removeItem(item.variantId);
      },
      updateQuantity: (productId: string, size: string, color: string, quantity: number) => {
        const item = items.find(i => 
          i.product.node.id === productId && 
          i.selectedOptions.some(opt => opt.name === 'Size' && opt.value === size) &&
          i.selectedOptions.some(opt => opt.name === 'Color' && opt.value === color)
        );
        if (item) updateQuantity(item.variantId, quantity);
      },
      clearCart,
      createCheckout,
      isLoading,
      checkoutUrl,
      totalItems,
      totalPrice,
      isCartOpen,
      setIsCartOpen,
    }),
    [items, addToCart, updateQuantity, removeItem, clearCart, createCheckout, isLoading, checkoutUrl, totalItems, totalPrice, isCartOpen]
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
