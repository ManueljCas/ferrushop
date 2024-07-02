import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from '../Javascript/AuthContext';

interface CartItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  clearCart: () => void;
  fetchCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      if (user) {
        const response = await fetch(`https://localhost:7271/api/Cart/${user.email}`);
        if (!response.ok) throw new Error('Error fetching cart');
        const data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (item: CartItem) => {
    console.log('addToCart called with item:', item); // Debug message
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

      if (user) {
        const response = await fetch(`https://localhost:7271/api/Cart/${user.email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCart),
        });

        if (!response.ok) throw new Error('Error updating cart');

        const updatedCart = await response.json();
        setCart(updatedCart); // Actualizar el estado local del carrito con la respuesta del servidor
        console.log('Cart updated:', updatedCart);
      } else {
        setCart(newCart);
        console.log('Cart updated locally:', newCart);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error; // Re-lanzar el error para manejarlo en el componente
    }
  };

  const clearCart = async () => {
    try {
      if (user) {
        const response = await fetch(`https://localhost:7271/api/Cart/${user.email}`, {
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
