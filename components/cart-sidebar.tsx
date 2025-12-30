"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trash2, ShoppingCart, Plus, Minus, Loader2 } from "lucide-react"; 
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const CartSidebar = () => {
  const { items, removeItem, updateItemQuantity } = useCart();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce((total, item) => {
    return total + (Number(item.price) * (item.qty || 1));
  }, 0);

  const onCheckout = async () => {
    if (!user) {
      toast.error("Please log in to proceed to checkout.");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          products: items,
          userId: user.id,
        }
      );

      // Redirect to Stripe/Checkout URL
      window.location.href = res.data.url; 
      // Optional: removeAll() here or wait for success_url callback
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full text-primary bg-white hover:bg-primary/5 transition-colors shadow-sm border border-primary/5">
          <span className="text-xl">🛍️</span>
          {items.length > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-white" />
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="flex flex-col h-full bg-[#F5F3F0] border-l border-[#E6E0D9] w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 pb-2 text-left">
          <SheetTitle className="text-3xl font-serif font-black text-[#2A1B12]">
            My Cart
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-[#2A1B12]/40 gap-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                <ShoppingCart size={40} className="opacity-40" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-xl font-serif font-bold text-[#2A1B12]">Your cart is empty</p>
                <p className="text-sm font-medium">Looks like you haven&apos;t added anything yet.</p>
              </div>
              <SheetClose asChild>
                <Button className="rounded-full bg-[#2A1B12] text-[#F5F3F0] hover:bg-[#2A1B12]/90 px-8">
                  Start Ordering
                </Button>
              </SheetClose>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3 rounded-[1.5rem] shadow-sm flex gap-4 items-center"
                >
                  <div className="relative h-20 w-20 rounded-[1rem] bg-[#F9F6F3] flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {item.images?.[0]?.url ? (
                      <Image
                        src={item.images[0].url}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="text-xs text-gray-400">No Img</div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 min-w-0 gap-1">
                    <div>
                      <h4 className="font-serif font-bold text-[#2A1B12] text-lg leading-none truncate pb-0.5">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">
                        {item.category || "ITEM"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <p className="font-bold text-xl text-[#2A1B12]">${item.price}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-[#F4EFE9] rounded-full px-1.5 py-1 h-9">
                          <button
                            onClick={() => item.qty > 1 && updateItemQuantity(item.id, item.qty - 1)}
                            disabled={item.qty <= 1}
                            className="w-7 h-7 flex items-center justify-center bg-white rounded-full text-[#2A1B12] shadow-sm border border-black/5 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                          >
                            <Minus size={14} strokeWidth={2} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center text-[#2A1B12]">{item.qty || 1}</span>
                          <button
                            onClick={() => updateItemQuantity(item.id, (item.qty || 1) + 1)}
                            className="w-7 h-7 flex items-center justify-center bg-white rounded-full text-[#2A1B12] shadow-sm border border-black/5 hover:scale-105 active:scale-95 transition-all"
                          >
                            <Plus size={14} strokeWidth={2} />
                          </button>
                        </div>

                        {removeItem && (
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-600 transition-colors pl-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <div className="p-6 bg-[#F5F3F0] border-t border-[#E6E0D9] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-[#2A1B12]">Subtotal</span>
              <span className="text-2xl font-serif font-black text-[#2A1B12]">${subtotal.toFixed(2)}</span>
            </div>
            
            <Button 
              onClick={onCheckout}
              disabled={loading}
              className="w-full h-14 rounded-[1.2rem] bg-[#2A1B12] text-[#F5F3F0] hover:bg-[#2A1B12]/90 font-bold text-lg shadow-xl shadow-[#2A1B12]/10 transition-transform active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                </>
              ) : (
                "Checkout Now"
              )}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;