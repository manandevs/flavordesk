"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, HeartCrack } from "lucide-react";
import { Product } from "@/types-db";
import { useCart } from "@/hooks/use-cart";

interface PopularContentProps {
   product: Product;
}

export default function PopularContent({ product }: PopularContentProps) {
   const imageSrc = product.images?.[0]?.url || "/images/placeholder.png";
   const cart = useCart();

   const addToCart = (data: Product) => {
      cart.addItem({ ...data });
   };

   return (
      <Card className="border text-card-foreground w-[300px] max-h-[340px] rounded-md bg-white shadow-lg border-none flex flex-col items-center justify-center relative py-6 pt-28">
         <div className="absolute -top-[4%] md:-top-[20%] overflow-hidden w-24 md:w-40 h-24 md:h-40 rounded-full bg-white p-2 border-8 border-[#84B74E]">
            <div className="w-full h-full rounded-full bg-white relative overflow-hidden p-2.5">
               <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  className="object-cover"
               />
            </div>
         </div>

         <Link href={`/menu/${product.id}`} className="w-full px-2 text-center">
            <h3 className="text-2xl font-semibold leading-none tracking-tight text-neutral-700 w-full truncate">
               {product.name}
            </h3>
         </Link>

         <div className="w-full flex items-center justify-center gap-2 flex-wrap px-2">
            {product.category && (
               <Badge
                  variant="secondary"
                  className="rounded-md bg-blue-500/10 px-2 py-[2px] text-[11px] font-semibold capitalize"
               >
                  {product.category.length > 10 ? product.category.slice(0, 10) + '...' : product.category}
               </Badge>
            )}
            {product.size && (
               <Badge
                  variant="secondary"
                  className="rounded-md bg-yellow-500/10 px-2 py-[2px] text-[11px] font-semibold capitalize"
               >
                  {product.size.length > 10 ? product.size.slice(0, 10) + "..." : product.size}
               </Badge>
            )}
         </div>

         <p className="text-sm text-muted-foreground text-center px-2 my-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid architecto Aliquid architecto
         </p>

         <div className="w-full flex items-center px-2 gap-3 absolute -bottom-5">
            <Button
               variant="outline"
               className="inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold text-lg text-muted-foreground h-10 w-28 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
               ${product.price}
            </Button>

            <Link href={`/menu/${product.id}`} className="w-full">
               <Button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium text-primary-foreground hover:bg-primary/90 h-10 w-28 px-4 py-2 rounded-full">
                  Buy Now
               </Button>
            </Link>
         </div>

         {/* === Top Right Cart Icon === */}
         <Button
            size="icon"
            onClick={() => addToCart(product)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 absolute top-0 right-0 rounded-tl-none rounded-tr-lg rounded-bl-lg rounded-br-none p-2 px-3"
         >
            <ShoppingCart className="w-4 h-4" />
         </Button>

         {/* === Top Left Heart Icon === */}
         <Button
            variant="ghost"
            size="icon"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium hover:text-accent-foreground h-10 px-4 py-2 absolute left-0 top-0 hover:bg-transparent text-black"
         >
            <HeartCrack className="w-5 h-5" />
         </Button>
      </Card>
   );
}
