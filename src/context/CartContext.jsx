import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'skff_b2b_demo_cart_v1';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Unable to persist cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, packSize = null, quantity = 1) => {
    const chosenPackSize = packSize || (product.packSizes && product.packSizes[0]) || '5 kg Standard';
    const numQty = Math.max(1, parseInt(quantity, 10) || 1);

    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.selectedPackSize === chosenPackSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + numQty
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            ...product,
            selectedPackSize: chosenPackSize,
            quantity: numQty
          }
        ];
      }
    });
  };

  const removeFromCart = (productId, packSize) => {
    setCartItems(prev =>
      prev.filter(item => !(item.id === productId && item.selectedPackSize === packSize))
    );
  };

  const updateQuantity = (productId, packSize, quantity) => {
    const numQty = parseInt(quantity, 10);
    if (numQty <= 0) {
      removeFromCart(productId, packSize);
      return;
    }

    setCartItems(prev =>
      prev.map(item => {
        if (item.id === productId && item.selectedPackSize === packSize) {
          return { ...item, quantity: numQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Separate priced items from quote-required formulations
  const isPriced = (item) => !item.quoteRequired && Boolean(item.price || item.demoPrice);
  const pricedItems = cartItems.filter(isPriced);
  const quoteItems = cartItems.filter(item => !isPriced(item));
  const hasPricedItems = pricedItems.length > 0;
  const hasQuoteItems = quoteItems.length > 0;

  // Subtotal calculated strictly for items with known prices
  const subtotal = pricedItems.reduce(
    (sum, item) => sum + (item.price || item.demoPrice || 0) * item.quantity,
    0
  );

  // Demo logistics and GST calculations apply only when priced items exist
  const shipping = hasPricedItems ? (subtotal > 5000 || subtotal === 0 ? 0 : 350) : 0;
  const tax = hasPricedItems ? Math.round(subtotal * 0.18) : 0; // 18% demo GST
  const total = hasPricedItems ? (subtotal + shipping + tax) : 0;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        pricedItems,
        quoteItems,
        hasPricedItems,
        hasQuoteItems,
        subtotal,
        shipping,
        tax,
        total,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
