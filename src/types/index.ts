export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
  stock: number;
  rating: number;
  discount: number;
  createdAt: string;
  colors?: string[];
  sizes?: string[];
  quantity?: number;
  selectedSize?: string | null;
  selectedColor?: string | null;
}