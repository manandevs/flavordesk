import { Product } from "@/types-db";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 1. Define a CartItem type that extends Product with a quantity property
export interface CartItem extends Product {
  qty: number;
}

interface CartStore {
  items: CartItem[];
  // Allow passing an optional qty when adding (e.g. from product page)
  addItem: (data: Product & { qty?: number }) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateItemQuantity: (id: string, qty: number) => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (data: Product & { qty?: number }) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          toast.error(`${data.name} is already in the cart`);
          return;
        }

        // Use passed qty or default to 1
        const qtyToAdd = data.qty && data.qty > 0 ? data.qty : 1;
        
        // Create the new item with the quantity property
        const newItem: CartItem = { ...data, qty: qtyToAdd };

        set({ items: [...currentItems, newItem] });
        toast.success(`${data.name} added to cart`);
      },

      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success("Item removed from cart");
      },

      removeAll: () => {
        set({ items: [] });
        toast.success("All items removed from cart");
      },

      updateItemQuantity: (id: string, qty: number) => {
        const currentItems = get().items;
        
        // Ensure quantity is at least 1
        const newQty = Math.max(1, qty);

        const updatedItems = currentItems.map((item) =>
          item.id === id ? { ...item, qty: newQty } : item
        );

        set({ items: updatedItems });
        // Toast is optional here; usually removed to prevent spamming while clicking +/-
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);