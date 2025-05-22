"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [haveChome, setHaveChrome] = useState(true);

  // Load cart from localStorage on client side only
  useEffect(() => {
    const savedCart = localStorage.getItem("qrshop_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    console.log("1: ", cart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("qrshop_cart", JSON.stringify(cart));
    console.log("2: ", cart);
  }, [cart]);

  const loadCart = () => {
    const savedCart = localStorage.getItem("qrshop_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }

      return [...prevCart, product];
    });
  };

  const isExist = (product) => {
    const savedCart = localStorage.getItem("qrshop_cart");
    const jsc = JSON.parse(savedCart);
    const existingItem = jsc.find((item) => item.id === product.id);
    if (existingItem) {
      return true;
    }
    return false;
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isExist,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
