import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";
import { Product } from "@/types-db";

interface WishlistStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item: Product) => {
        const currentItems = get().items;
        const existing = currentItems.find((i) => i.id === item.id);

        if (existing) {
          toast.error(`${item.name} is already in your wishlist`);
          return;
        }

        set({ items: [...currentItems, item] });
        toast.success(`${item.name} added to wishlist`);
      },

      removeItem: (id: string) => {
        const currentItems = get().items;
        const itemToRemove = currentItems.find((i) => i.id === id);

        if (!itemToRemove) {
          toast.error("Item not found in wishlist");
          return;
        }

        set({ items: currentItems.filter((i) => i.id !== id) });
        toast.success(`${itemToRemove.name} removed from wishlist`);
      },

      clear: () => {
        set({ items: [] });
        toast.success("Wishlist cleared");
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
