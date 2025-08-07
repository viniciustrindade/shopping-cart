'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartState, CartAction, CartItem, Product } from '@/lib/types';
import { calculateCartTotals, storage } from '@/lib/utils';
import toast from 'react-hot-toast';

// Initial cart state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Cart reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'LOAD_CART': {
      const items = action.payload;
      const { totalItems, totalPrice } = calculateCartTotals(items);
      return {
        items,
        totalItems,
        totalPrice,
      };
    }

    case 'ADD_ITEM': {
      const product = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);

      let updatedItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: product.id,
          title: product.title,
          quantity: 1,
          price: product.price,
          image: product.image,
        };
        updatedItems = [...state.items, newItem];
      }

      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
      return {
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case 'REMOVE_ITEM': {
      const productId = action.payload;
      const updatedItems = state.items.filter(item => item.id !== productId);
      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);

      return {
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }

      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
      
      return {
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case 'CLEAR_CART': {
      return initialState;
    }

    default:
      return state;
  }
}

// Context type
interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  getItemQuantity: (productId: number) => number;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Local storage key
const CART_STORAGE_KEY = 'shopping-cart';

// Cart provider component
interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = storage.get<CartItem[]>(CART_STORAGE_KEY);
    if (savedCart && Array.isArray(savedCart)) {
      dispatch({ type: 'LOAD_CART', payload: savedCart });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (state.items.length > 0 || storage.get<CartItem[]>(CART_STORAGE_KEY)) {
      storage.set(CART_STORAGE_KEY, state.items);
    }
  }, [state.items]);

  // Action creators with useCallback to prevent unnecessary re-renders
  const addItem = React.useCallback((product: Product) => {
    const existingItem = state.items.find(item => item.id === product.id);
    
    dispatch({ type: 'ADD_ITEM', payload: product });
    
    // Use setTimeout to defer toast to next tick
    setTimeout(() => {
      if (existingItem) {
        toast.success(`Updated ${product.title} quantity`);
      } else {
        toast.success(`Added ${product.title} to cart`);
      }
    }, 0);
  }, [state.items]);

  const removeItem = React.useCallback((productId: number) => {
    const removedItem = state.items.find(item => item.id === productId);
    
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
    
    // Use setTimeout to defer toast to next tick
    setTimeout(() => {
      if (removedItem) {
        toast.success(`Removed ${removedItem.title} from cart`);
      }
    }, 0);
  }, [state.items]);

  const updateQuantity = React.useCallback((productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  }, []);

  const clearCart = React.useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
    storage.remove(CART_STORAGE_KEY);
    
    // Use setTimeout to defer toast to next tick
    setTimeout(() => {
      toast.success('Cart cleared');
    }, 0);
  }, []);

  // Helper functions
  const isInCart = React.useCallback((productId: number): boolean => {
    return state.items.some(item => item.id === productId);
  }, [state.items]);

  const getItemQuantity = React.useCallback((productId: number): number => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }, [state.items]);

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}
