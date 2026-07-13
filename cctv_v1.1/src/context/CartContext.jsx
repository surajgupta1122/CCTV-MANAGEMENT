import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../utils/auth";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load current user, then load THEIR cart
  useEffect(() => {
    const init = async () => {
      const user = await getCurrentUser();
      const id = user?._id || user?.id || null;
      setUserId(id);

      if (id) {
        const saved = localStorage.getItem(`cart_${id}`);
        setCartItems(saved ? JSON.parse(saved) : []);
      } else {
        setCartItems([]);
      }
      setLoaded(true);
    };
    init();
  }, []);

  // Save cart under the current user's key whenever it changes
  useEffect(() => {
    if (loaded && userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId, loaded]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}