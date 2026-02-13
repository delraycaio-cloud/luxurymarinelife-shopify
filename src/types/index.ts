export interface Product {
  id: string;
  variantId?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

export interface NavLink {
  label: string;
  href: string;
}
