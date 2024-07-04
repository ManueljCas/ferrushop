import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from '../Javascript/AuthContext';

interface CartItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  clearCart: () => void;
  fetchCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { userEmail } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (userEmail) {
      console.log('Fetching cart for userEmail:', userEmail);
      fetchCart();
    }
  }, [userEmail]);

  const fetchCart = async () => {
    try {
      if (userEmail) {
        const response = await fetch(`https://localhost:7271/api/Cart/${userEmail}`);
        if (!response.ok) throw new Error('Error fetching cart');
        const data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (item: CartItem) => {
    if (!userEmail) {
      console.error('User not logged in');
      return;
    }

    console.log('Adding to cart with userEmail:', userEmail);

    if (item.quantity <= 0) {
      throw new Error('Cantidad debe ser mayor que cero');
    }

    try {
      let newCart: CartItem[] = [];
      const existingItem = cart.find(cartItem => cartItem.productId === item.productId);

      if (existingItem) {
        newCart = cart.map(cartItem =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        newCart = [...cart, item];
      }

      const response = await fetch(`https://localhost:7271/api/Cart/${userEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCart),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error updating cart: ${errorText}`);
      }

      const updatedCart = await response.json().catch(() => {
        console.warn('Response is not a valid JSON, returning newCart instead');
        return newCart;
      });
      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      if (userEmail) {
        const response = await fetch(`https://localhost:7271/api/Cart/${userEmail}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Error clearing cart');
        setCart([]);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider };
