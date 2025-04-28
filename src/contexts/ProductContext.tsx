import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockProducts } from '../data/mockProducts';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  newArrivals: Product[];
  bestSellers: Product[];
  loading: boolean;
  getProductById: (id: string) => Product | null;
  getProductsByCategory: (category: string) => Product[];
  getRelatedProducts: (productId: string) => Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load products from localStorage or use mock data
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (error) {
        console.error('Failed to parse stored products', error);
        setProducts(mockProducts);
      }
    } else {
      setProducts(mockProducts);
    }
    setLoading(false);
  }, []);

  // Save products to localStorage when they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products, loading]);

  // Featured products - products with a discount
  const featuredProducts = products.filter(product => product.discount > 0).slice(0, 8);
  
  // New arrivals - sort by created date and take first 8
  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);
  
  // Best sellers - products with rating >= 4.5
  const bestSellers = products.filter(product => product.rating >= 4.5).slice(0, 8);

  const getProductById = (id: string): Product | null => {
    return products.find(product => product.id === id) || null;
  };

  const getProductsByCategory = (category: string): Product[] => {
    if (category === 'featured') return featuredProducts;
    if (category === 'new') return newArrivals;
    if (category === 'best-sellers') return bestSellers;
    
    return products.filter(product => product.category === category);
  };

  const getRelatedProducts = (productId: string): Product[] => {
    const product = getProductById(productId);
    if (!product) return [];
    
    return products
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, 4);
  };

  const addProduct = (product: Product) => {
    // Generate a new ID if not provided
    const newProduct = {
      ...product,
      id: product.id || `prod_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: product.createdAt || new Date().toISOString()
    };
    
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        featuredProducts,
        newArrivals,
        bestSellers,
        loading,
        getProductById,
        getProductsByCategory,
        getRelatedProducts,
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};