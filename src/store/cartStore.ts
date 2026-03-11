import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storefrontApiRequest, CART_CREATE_MUTATION } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface CartState {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
}

interface CartStore {
  carts: Record<string, CartState>;
  isLoading: boolean;
  
  // Actions
  addItem: (brand: string, item: CartItem) => void;
  updateQuantity: (brand: string, variantId: string, quantity: number) => void;
  removeItem: (brand: string, variantId: string) => void;
  clearCart: (brand: string) => void;
  setCartId: (brand: string, cartId: string) => void;
  setCheckoutUrl: (brand: string, url: string) => void;
  setLoading: (loading: boolean) => void;
  createCheckout: (brand: string) => Promise<string | null>;
}

const DEFAULT_CART: CartState = {
  items: [],
  cartId: null,
  checkoutUrl: null,
};

async function createStorefrontCheckout(items: CartItem[]): Promise<string> {
  const lines = items.map(item => ({
    quantity: item.quantity,
    merchandiseId: item.variantId,
  }));

  const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: { lines },
  });

  if (!cartData) {
    throw new Error('Failed to create cart');
  }

  if (cartData.data.cartCreate.userErrors.length > 0) {
    throw new Error(`Cart creation failed: ${cartData.data.cartCreate.userErrors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  const cart = cartData.data.cartCreate.cart;
  
  if (!cart.checkoutUrl) {
    throw new Error('No checkout URL returned from Shopify');
  }

  const url = new URL(cart.checkoutUrl);
  url.searchParams.set('channel', 'online_store');
  return url.toString();
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      carts: {},
      isLoading: false,

      addItem: (brand, item) => {
        const { carts } = get();
        const cart = carts[brand] || { ...DEFAULT_CART };
        const existingItem = cart.items.find(i => i.variantId === item.variantId);
        
        let newItems;
        if (existingItem) {
          newItems = cart.items.map(i =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        } else {
          newItems = [...cart.items, item];
        }

        set({
          carts: {
            ...carts,
            [brand]: { ...cart, items: newItems }
          }
        });
      },

      updateQuantity: (brand, variantId, quantity) => {
        const { carts } = get();
        const cart = carts[brand];
        if (!cart) return;

        if (quantity <= 0) {
          get().removeItem(brand, variantId);
          return;
        }
        
        set({
          carts: {
            ...carts,
            [brand]: {
              ...cart,
              items: cart.items.map(item =>
                item.variantId === variantId ? { ...item, quantity } : item
              )
            }
          }
        });
      },

      removeItem: (brand, variantId) => {
        const { carts } = get();
        const cart = carts[brand];
        if (!cart) return;

        set({
          carts: {
            ...carts,
            [brand]: {
              ...cart,
              items: cart.items.filter(item => item.variantId !== variantId)
            }
          }
        });
      },

      clearCart: (brand) => {
        const { carts } = get();
        set({
          carts: {
            ...carts,
            [brand]: { ...DEFAULT_CART }
          }
        });
      },

      setCartId: (brand, cartId) => {
        const { carts } = get();
        const cart = carts[brand] || { ...DEFAULT_CART };
        set({
          carts: {
            ...carts,
            [brand]: { ...cart, cartId }
          }
        });
      },

      setCheckoutUrl: (brand, checkoutUrl) => {
        const { carts } = get();
        const cart = carts[brand] || { ...DEFAULT_CART };
        set({
          carts: {
            ...carts,
            [brand]: { ...cart, checkoutUrl }
          }
        });
      },

      setLoading: (isLoading) => set({ isLoading }),

      createCheckout: async (brand) => {
        const { carts, setLoading, setCheckoutUrl, clearCart } = get();
        const cart = carts[brand];
        if (!cart || cart.items.length === 0) return null;

        setLoading(true);
        try {
          const checkoutUrl = await createStorefrontCheckout(cart.items);
          setCheckoutUrl(brand, checkoutUrl);
          
          // Clear cart after checkout URL is generated as requested
          clearCart(brand);
          
          return checkoutUrl;
        } catch (error) {
          console.error('Failed to create checkout:', error);
          return null;
        } finally {
          setLoading(false);
        }
      }
    }),
    {
      name: 'garmn-multi-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Hook to get a specific brand's cart and actions
 */
export function useBrandCart(brand: string) {
  const store = useCartStore();
  const cart = store.carts[brand] || DEFAULT_CART;
  
  return {
    items: cart.items,
    cartId: cart.cartId,
    checkoutUrl: cart.checkoutUrl,
    isLoading: store.isLoading,
    addItem: (item: CartItem) => store.addItem(brand, item),
    updateQuantity: (variantId: string, qty: number) => store.updateQuantity(brand, variantId, qty),
    removeItem: (variantId: string) => store.removeItem(brand, variantId),
    clearCart: () => store.clearCart(brand),
    createCheckout: () => store.createCheckout(brand),
  };
}
