import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const CART_KEY = 'cartItems';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (room, hotelName) => {
    setCart((prev) => [...prev, { ...room, hotelName }]);
  };

  const removeFromCart = (roomId) => {
    setCart((prev) => prev.filter((room) => room.roomId !== roomId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
