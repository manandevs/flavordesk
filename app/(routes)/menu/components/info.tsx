"use client";

import React, { useState } from "react";
import { Product } from "@/types-db";
import { ShoppingCart, Heart, Minus, Plus, ChefHat, Utensils, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/lib/utils";

interface InfoProps {
  product: Product;
}

const Info: React.FC<InfoProps> = ({ product }) => {
  const [qty, setQty] = useState(1);
  const cart = useCart();
  const wishlist = useWishlist();

  const isWished = wishlist.items.some((item) => item.id === product.id);

  const onAddToCart = () => {
    cart.addItem({ ...product, qty });
  };

  const onToggleWishlist = () => {
    if (isWished) {
      wishlist.removeItem(product.id);
    } else {
      wishlist.addItem(product);
    }
  };

  const increment = () => setQty((prev) => prev + 1);
  const decrement = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-serif font-black text-primary leading-tight">
          {product.name}
        </h1>
        <div className="flex items-center gap-4 text-primary/60 font-medium">
           <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {product.category}
           </Badge>
           {/* Mock rating if not in DB yet */}
           <div className="flex items-center gap-1 text-[#E96E32]">
              <span>★★★★★</span>
              <span className="text-sm text-neutral-500">(4.8)</span>
           </div>
        </div>
      </div>

      <div className="text-3xl font-serif font-bold text-primary">
        ${product.price}
      </div>

      <Separator className="bg-neutral-200" />

      {/* Attributes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
          <div className="flex items-center gap-2 text-primary/70">
            <Ruler size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Size</span>
          </div>
          <span className="font-semibold text-primary">{product.size}</span>
        </div>

        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
          <div className="flex items-center gap-2 text-primary/70">
            <ChefHat size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Kitchen</span>
          </div>
          <span className="font-semibold text-primary">{product.kitchen}</span>
        </div>

        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
          <div className="flex items-center gap-2 text-primary/70">
            <Utensils size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Cuisine</span>
          </div>
          <span className="font-semibold text-primary">{product.cuisine}</span>
        </div>
      </div>

      {/* Description (Static or Dynamic) */}
      <div className="space-y-3">
        <h3 className="font-serif font-bold text-xl text-primary">Description</h3>
        <p className="text-neutral-500 leading-relaxed">
           {/* Fallback description since it's not in types-db currently */}
           Experience the authentic taste of our {product.name}. Prepared with fresh ingredients 
           sourced from local farms, this dish brings the essence of {product.cuisine} cuisine straight to your table.
           Perfect for a quick lunch or a hearty dinner.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        {/* Quantity Selector */}
        <div className="flex items-center bg-neutral-100 rounded-full p-1 w-fit">
           <button 
             onClick={decrement}
             className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm hover:scale-105 transition-transform"
           >
             <Minus size={18} />
           </button>
           <span className="w-12 text-center font-bold text-lg">{qty}</span>
           <button 
             onClick={increment}
             className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm hover:scale-105 transition-transform"
           >
             <Plus size={18} />
           </button>
        </div>

        {/* Add to Cart */}
        <Button 
          onClick={onAddToCart}
          className="flex-1 h-14 rounded-full text-lg font-bold bg-primary text-[#F4EFE9] hover:bg-primary/90"
        >
          <ShoppingCart className="mr-2 w-5 h-5" />
          Add to Cart
        </Button>

        {/* Wishlist Toggle */}
        <Button 
           variant="outline"
           onClick={onToggleWishlist}
           className={cn(
              "h-14 w-14 rounded-full border-2 p-0 flex items-center justify-center transition-colors",
              isWished 
                ? "border-red-500 text-red-500 bg-red-50 hover:bg-red-100" 
                : "border-neutral-200 text-neutral-500 hover:border-primary hover:text-primary"
           )}
        >
           <Heart size={24} fill={isWished ? "currentColor" : "none"} />
        </Button>
      </div>
    </div>
  );
};

export default Info;