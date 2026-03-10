export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  sizes: string[];
  colors?: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}
