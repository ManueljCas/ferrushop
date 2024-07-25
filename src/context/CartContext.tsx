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
  subtotal: number;
  iva: number;
  total: number;
  setTotals: (subtotal: number, iva: number, total: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { userEmail } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [iva, setIva] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (userEmail) {
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
        calculateAndSetTotals(data);
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
      calculateAndSetTotals(updatedCart);
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
        setSubtotal(0);
        setIva(0);
        setTotal(0);
        localStorage.removeItem('subtotal');
        localStorage.removeItem('iva');
        localStorage.removeItem('total');
      } else {
        setCart([]);
        setSubtotal(0);
        setIva(0);
        setTotal(0);
        localStorage.removeItem('subtotal');
        localStorage.removeItem('iva');
        localStorage.removeItem('total');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const calculateAndSetTotals = (cart: CartItem[]) => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const iva = subtotal * 0.14;
    const total = subtotal + iva;
    setSubtotal(subtotal);
    setIva(iva);
    setTotal(total);
    localStorage.setItem('subtotal', subtotal.toString());
    localStorage.setItem('iva', iva.toString());
    localStorage.setItem('total', total.toString());
  };

  const setTotals = (subtotal: number, iva: number, total: number) => {
    setSubtotal(subtotal);
    setIva(iva);
    setTotal(total);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, fetchCart, subtotal, iva, total, setTotals }}>
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
