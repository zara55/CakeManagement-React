import { createContext, useState, useEffect } from "react";
import { getCartItemsAPI, deleteCartItemAPI } from "../service/commonService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await getCartItemsAPI(userId);
        setCartItems(response.data);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };
    fetchCart();
  }, []);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const deleteItemCompletely = async (productId) => {
    try {
      await deleteCartItemAPI(productId);
      setCartItems((prev) => prev.filter((i) => i.productId !== productId));
    } catch (err) {
      console.error("Delete cart item error:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, removeFromCart, deleteItemCompletely }}
    >
      {children}
    </CartContext.Provider>
  );
};
