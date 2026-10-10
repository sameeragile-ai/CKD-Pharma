import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

export const FREE_DELIVERY_THRESHOLD = 2000;
export const STANDARD_DELIVERY_FEE = 150;

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  appliedCoupon: string | null;
  discountPercentage: number;
  fixedDiscountAmount: number;
  recentAddedProduct: Product | null;
  
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Computations
  getItemCount: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getDiscount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      appliedCoupon: null,
      discountPercentage: 0,
      fixedDiscountAmount: 0,
      recentAddedProduct: null,

      addItem: (product: Product, quantity = 1) => {
        // Enforce OTC requirement - prescription items cannot be added to cart
        if (!product.isOTC) {
          return;
        }

        set((state) => {
          const existingIndex = state.items.findIndex(item => item.product.id === product.id);
          let newItems: CartItem[];

          if (existingIndex > -1) {
            newItems = [...state.items];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + quantity
            };
          } else {
            newItems = [...state.items, { product, quantity }];
          }

          return {
            items: newItems,
            isCartOpen: true,
            recentAddedProduct: product
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId)
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map(item => 
            item.product.id === productId ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => {
        set({
          items: [],
          appliedCoupon: null,
          discountPercentage: 0,
          fixedDiscountAmount: 0
        });
      },

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      applyCoupon: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === 'HEALTHPK' || cleanCode === 'CKD10') {
          set({
            appliedCoupon: cleanCode,
            discountPercentage: 10,
            fixedDiscountAmount: 0
          });
          return { success: true, message: '10% discount applied to your order!' };
        } else if (cleanCode === 'WELCOME200') {
          set({
            appliedCoupon: cleanCode,
            discountPercentage: 0,
            fixedDiscountAmount: 200
          });
          return { success: true, message: 'Rs. 200 discount applied!' };
        }
        return { success: false, message: 'Invalid promo code. Try CKD10 or WELCOME200' };
      },

      removeCoupon: () => {
        set({
          appliedCoupon: null,
          discountPercentage: 0,
          fixedDiscountAmount: 0
        });
      },

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0);
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD) {
          return 0;
        }
        return STANDARD_DELIVERY_FEE;
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const { discountPercentage, fixedDiscountAmount } = get();
        if (discountPercentage > 0) {
          return Math.round((subtotal * discountPercentage) / 100);
        }
        return Math.min(subtotal, fixedDiscountAmount);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const delivery = get().getDeliveryFee();
        const discount = get().getDiscount();
        return Math.max(0, subtotal + delivery - discount);
      }
    }),
    {
      name: 'ckd-pharma-cart-storage',
      partialize: (state) => ({
        items: state.items,
        appliedCoupon: state.appliedCoupon,
        discountPercentage: state.discountPercentage,
        fixedDiscountAmount: state.fixedDiscountAmount
      })
    }
  )
);
