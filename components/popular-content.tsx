"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Plus } from "lucide-react";
import { Product } from "@/types-db";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/lib/utils";

interface PopularContentProps {
   product: Product;
}

export default function PopularContent({ product }: PopularContentProps) {
   const imageSrc = product.images?.[0]?.url || "/images/placeholder.png";
   const cart = useCart();
   const wishlist = useWishlist();

   const isWished = React.useMemo(
      () => wishlist.items.some((item) => item.id === product.id),
      [wishlist.items, product.id]
   );

   const isInCart = React.useMemo(
      () => cart.items.some((item) => item.id === product.id),
      [cart.items, product.id]
   );

   const addToCart = (e: React.MouseEvent) => {
      e.preventDefault();
      if (isInCart) return;
      cart.addItem({ ...product });
   };

   const toggleWishlist = (e: React.MouseEvent) => {
      e.preventDefault();
      if (isWished) {
         wishlist.removeItem(product.id);
      } else {
         wishlist.addItem({ ...product });
      }
   };

   return (
      <Link href={`/menu/${product.id}`} className="group block h-full">
        {/* The Card Container - Dark Brown Theme */}
        <div className="relative h-full w-full bg-primary rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            
            {/* Background Decoration Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -rotate-12 scale-150" />
            
            {/* Header: Title & Weight/Size */}
            <div className="relative z-10">
                <h3 className="text-3xl font-serif text-[#F4EFE9] mb-1 leading-none">{product.name}</h3>
                <p className="text-white/60 text-sm font-medium">{product.size || "Standard Size"}</p>
            </div>

            {/* Central Image */}
            <div className="relative w-full aspect-square my-6 z-10 group-hover:scale-105 transition-transform duration-500">
                <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                />
                
                {/* Floating Price Tag Style */}
                <div className="absolute top-4 right-0 bg-white text-primary font-bold px-4 py-1.5 rounded-full rotate-6 shadow-lg border-2 border-primary">
                    ${product.price}
                </div>
            </div>

            {/* Footer: Add to Cart & Wishlist */}
            <div className="relative z-10 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                    {/* Add Button - Circle Style */}
                    <button 
                        onClick={addToCart}
                        className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center transition-colors border-2",
                            isInCart 
                                ? "bg-[#84B74E] border-[#84B74E] text-white" 
                                : "bg-[#F4EFE9] border-[#F4EFE9] text-primary hover:bg-white"
                        )}
                    >
                        {isInCart ? <ShoppingCart size={20} /> : <Plus size={24} />}
                    </button>
                    <span className="text-[#F4EFE9]/80 text-sm font-medium ml-2">1 pc</span>
                </div>

                <button 
                    onClick={toggleWishlist}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                    <Heart size={18} fill={isWished ? "currentColor" : "none"} />
                </button>
            </div>
        </div>
      </Link>
   );
}