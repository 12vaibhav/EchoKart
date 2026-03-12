import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  title: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  quantity: number;
  variant?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('echokart_cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error('Failed to parse cart from local storage', e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('echokart_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any, quantity: number = 1, variant?: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id && item.variant === variant);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.variant === variant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { 
        id: product.id, 
        title: product.name || product.title || 'Product', 
        brand: product.brand,
        price: product.price, 
        oldPrice: product.oldPrice,
        image: product.image, 
        quantity, 
        variant 
      }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartTotal, 
      cartCount 
    }}>
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
