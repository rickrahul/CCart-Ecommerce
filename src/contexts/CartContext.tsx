import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '../components/ui/Toaster';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string | null;
  selectedColor?: string | null;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string, selectedSize?: string | null, selectedColor?: string | null) => void;
  updateCartItemQuantity: (productId: string, quantity: number, selectedSize?: string | null, selectedColor?: string | null) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse stored cart', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      // Check if product already exists in cart with same options
      const existingItemIndex = prevItems.findIndex(
        item => 
          item.id === product.id && 
          item.selectedSize === product.selectedSize && 
          item.selectedColor === product.selectedColor
      );

      if (existingItemIndex !== -1) {
        // Update existing item
        const updatedItems = [...prevItems];
        const item = updatedItems[existingItemIndex];
        
        // Make sure we don't exceed stock
        const newQuantity = Math.min(item.quantity + (product.quantity || 1), product.stock);
        
        updatedItems[existingItemIndex] = {
          ...item,
          quantity: newQuantity
        };
        
        return updatedItems;
      } else {
        // Add new item
        return [
          ...prevItems,
          {
            ...product,
            quantity: product.quantity || 1
          }
        ];
      }
    });
  };

  const removeFromCart = (productId: string, selectedSize?: string | null, selectedColor?: string | null) => {
    setCartItems(prevItems => 
      prevItems.filter(
        item => 
          !(
            item.id === productId && 
            item.selectedSize === selectedSize && 
            item.selectedColor === selectedColor
          )
      )
    );
  };

  const updateCartItemQuantity = (
    productId: string, 
    quantity: number, 
    selectedSize?: string | null, 
    selectedColor?: string | null
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => {
        if (
          item.id === productId && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItemCount = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => {
      const price = item.discount 
        ? item.price - (item.price * item.discount / 100)
        : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        getCartItemCount,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};