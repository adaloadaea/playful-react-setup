import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveCartItems, getCartItems } from '@/utils/cartStorage';
import { getPersonalizations } from '@/utils/personalizationStorage';
import { calculateDiscountedPrice } from '@/utils/priceCalculations';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  personalization?: string;
  fromPack?: boolean;
  pack?: string;
  withBox?: boolean;
  discount_product?: string;
  type_product?: string;
  itemgroup_product?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  hasNewsletterDiscount: boolean;
  applyNewsletterDiscount: () => void;
  removeNewsletterDiscount: () => void;
  calculateTotal: () => { subtotal: number; discount: number; total: number; boxTotal: number };
}

const BOX_PRICE = 30;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hasNewsletterDiscount, setHasNewsletterDiscount] = useState<boolean>(() => {
    return localStorage.getItem('newsletterSubscribed') === 'true';
  });

  useEffect(() => {
    const savedItems = getCartItems();
    const personalizations = getPersonalizations();
    
    const itemsWithPersonalization = savedItems.map(item => ({
      ...item,
      personalization: item.personalization || personalizations[item.id] || '',
    }));
    
    if (itemsWithPersonalization.length > 0) {
      setCartItems(itemsWithPersonalization);
    }

    // Check if user has already used the discount with their email
    const subscribedEmail = localStorage.getItem('subscribedEmail');
    const usedDiscountEmails = JSON.parse(localStorage.getItem('usedDiscountEmails') || '[]');
    
    if (subscribedEmail && usedDiscountEmails.includes(subscribedEmail)) {
      setHasNewsletterDiscount(false);
      localStorage.removeItem('newsletterSubscribed');
    }
  }, []);

  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => 
        i.id === item.id && 
        i.size === item.size && 
        i.color === item.color && 
        i.personalization === item.personalization &&
        i.withBox === item.withBox &&
        i.pack === item.pack // Add pack to comparison
      );
      
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id && 
          i.size === item.size && 
          i.color === item.color && 
          i.personalization === item.personalization &&
          i.withBox === item.withBox &&
          i.pack === item.pack
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      // Calculate discounted price if applicable
      const originalPrice = item.price;
      const finalPrice = item.discount_product 
        ? calculateDiscountedPrice(originalPrice, item.discount_product)
        : originalPrice;

      // Ensure pack information is included
      const itemWithPack = {
        ...item,
        price: finalPrice,
        originalPrice: item.discount_product ? originalPrice : undefined,
        pack: item.pack || 'aucun', // Default to 'aucun' if no pack specified
        size: item.size || '-', // Default to '-' if no size specified
        personalization: item.personalization || '-' // Default to '-' if no personalization
      };

      return [...prevItems, itemWithPack];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyNewsletterDiscount = () => {
    const subscribedEmail = localStorage.getItem('subscribedEmail');
    if (!subscribedEmail) return;

    // Get array of emails that have used the discount
    const usedDiscountEmails = JSON.parse(localStorage.getItem('usedDiscountEmails') || '[]');
    
    // Check if this email has already used the discount
    if (usedDiscountEmails.includes(subscribedEmail)) {
      console.log('Email has already used the newsletter discount');
      setHasNewsletterDiscount(false);
      localStorage.removeItem('newsletterSubscribed');
      return;
    }

    // Add email to used discounts list
    usedDiscountEmails.push(subscribedEmail);
    localStorage.setItem('usedDiscountEmails', JSON.stringify(usedDiscountEmails));
    
    setHasNewsletterDiscount(true);
    localStorage.setItem('newsletterSubscribed', 'true');
  };

  const removeNewsletterDiscount = () => {
    setHasNewsletterDiscount(false);
    localStorage.removeItem('newsletterSubscribed');
  };

  const calculateTotal = () => {
    const itemsSubtotal = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    const boxTotal = cartItems.reduce((sum, item) => 
      sum + (item.withBox ? BOX_PRICE * item.quantity : 0), 0);
    
    const subtotal = itemsSubtotal + boxTotal;
    const discount = hasNewsletterDiscount ? subtotal * 0.05 : 0;
    const total = subtotal - discount;
    
    return { subtotal: itemsSubtotal, discount, total, boxTotal };
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      hasNewsletterDiscount,
      applyNewsletterDiscount,
      removeNewsletterDiscount,
      calculateTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};