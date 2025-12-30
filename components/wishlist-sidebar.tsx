"use client";

import React from "react";
import Image from "next/image";
import { Trash2, Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
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

const WishlistSidebar = () => {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  // Helper to move item to cart
  const onAddToCart = (item: any) => {
    addItem(item);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full text-primary bg-white hover:bg-primary/5 transition-colors shadow-sm border border-primary/5">
           {/* EMOJI PRESERVED */}
          <span className="text-xl">❤️</span> 
          {items.length > 0 && (
             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
          )}
        </button>
      </SheetTrigger>
      
      <SheetContent className="flex flex-col h-full bg-[#F5F3F0] border-l border-[#E6E0D9] w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 pb-2 text-left">
          <SheetTitle className="text-3xl font-serif font-black text-[#2A1B12]">
            My Wishlist
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-[#2A1B12]/40 gap-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                 <Heart size={40} className="opacity-40" />
              </div>
              <div className="text-center space-y-2">
                 <p className="text-xl font-serif font-bold text-[#2A1B12]">Your wishlist is empty</p>
                 <p className="text-sm font-medium">Save your favorite items here.</p>
              </div>
              <SheetClose asChild>
                <Button className="rounded-full bg-[#2A1B12] text-[#F5F3F0] hover:bg-[#2A1B12]/90 px-8">
                  Explore Products
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
                  {/* Product Image Box */}
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

                  {/* Content Section */}
                  <div className="flex flex-col flex-1 min-w-0 gap-1">
                    
                    {/* Title & Category */}
                    <div>
                        <h4 className="font-serif font-bold text-[#2A1B12] text-lg leading-none truncate">
                        {item.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">
                        {item.category || "ITEM"}
                        </p>
                    </div>

                    {/* Price & Actions Row */}
                    <div className="flex items-center justify-between mt-2">
                       <p className="font-bold text-xl text-[#2A1B12]">${item.price}</p>

                       <div className="flex items-center gap-2">
                           {/* Add to Cart Button */}
                           <Button 
                             onClick={() => onAddToCart(item)}
                             className="h-9 w-9 p-0 rounded-full bg-[#2A1B12] text-white hover:bg-[#2A1B12]/90 shadow-sm flex items-center justify-center"
                             title="Add to Cart"
                           >
                             <ShoppingBag size={14} />
                           </Button>

                           {/* Delete Button */}
                           <button
                              onClick={() => removeItem(item.id)}
                              className="h-9 w-9 flex items-center justify-center bg-[#F5F3F0] rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all"
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default WishlistSidebar;