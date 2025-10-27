import { Product } from "@/types-db"
import toast from "react-hot-toast"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface CartStore {
  items: Product[]
  addItem: (data: Product) => void
  removeItem: (id: string) => void
  removeAll: () => void
  updateItemQuantity: (id: string, qty: number) => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (data: Product) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === data.id)

        if (existingItem) {
          // ✅ Don't update quantity, just show toast
          toast.error(`${data.name} is already in the cart`)
          return
        }

        const qtyToAdd = data.qty && data.qty > 0 ? data.qty : 1
        const newItem = { ...data, qty: qtyToAdd }

        set({ items: [...currentItems, newItem] })
        toast.success(`${data.name} added to cart`)
      },

      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) })
        toast.success("Item removed from cart")
      },

      removeAll: () => {
        set({ items: [] })
        toast.success("All items removed from cart")
      },

      updateItemQuantity: (id: string, qty: number) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === id)

        if (!existingItem) {
          toast.error("Item not found in cart")
          return
        }

        const newQty = Math.max(1, qty)
        const updatedItems = currentItems.map((item) =>
          item.id === id ? { ...item, qty: newQty } : item
        )

        set({ items: updatedItems })
        toast.success("Quantity updated")
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
