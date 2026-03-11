export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: 'apparel' | 'accessories' | 'footwear';
  subcategory?: string;
  collection: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  material: string;
  craftsmanship: string;
  fit?: 'slim' | 'regular' | 'relaxed';
  careInstructions?: string[];
  inStock: boolean;
  featured: boolean;
  isNew: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

export interface SectionProps {
  className?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface LookbookItem {
  id: string;
  image: string;
  title: string;
  products: string[];
}

export interface SizeGuide {
  category: string;
  measurements: {
    size: string;
    chest?: string;
    waist?: string;
    hips?: string;
    length?: string;
    us?: string;
    eu?: string;
    uk?: string;
  }[];
}
