import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
  setCartItems(prev => {
    const existing = prev.find(i => i.id === item.id);
    if (existing) {
      return prev.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      return [...prev, { ...item, price: Number(item.price), quantity: 1 }];
    }
  });
     console.log("Cart Items :", cartItems);
};

  const removeFromCart = (id) => {
    setCartItems(prev =>
      prev
        .map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter(i => i.quantity > 0)
    );
  };

  useEffect(() => {
    console.log("Cart Items updated:", cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
