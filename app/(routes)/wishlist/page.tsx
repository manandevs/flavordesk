"use client";

import React from "react";
import { useWishlist } from "@/hooks/use-wishlist";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import PopularContent from "@/components/popular-content";
import Container from "@/components/container";
import Box from "@/components/box";
import HomePage from "../page";
import { ChevronRight, Home } from "lucide-react";

export default function WishlistPage() {
   const wishlist = useWishlist();
   const items = wishlist.items;

   if (items.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h2 className="text-2xl font-semibold text-neutral-800 mb-2">
               Your wishlist is empty 💔
            </h2>
            <p className="text-muted-foreground mb-6">
               Browse the menu and add items you love.
            </p>
            <Link href="/menu">
               <Button className="rounded-full px-6 py-2">Go to Menu</Button>
            </Link>
         </div>
      );
   }

   return (
      <div className="container mx-auto py-10 px-4 md:px-8">
         <Container className='pb-14 px-4 sm:px-6 lg:px-12'>
            <Box className="flex flex-col space-x-4 md:space-y-8 bg-white rounded-lg my-4 shadow-md mx-auto mt-20 mb-12 py-4 px-4 sm:px-6 lg:px-12">
               <Box className="text-neutral-700 text-sm flex items-center justify-start">
                  <Link href="/" className="flex items-center gap-2">
                     <Home className="w-4 h-4" />
                     Main Page
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                  <Link href="/menu" className="flex items-center gap-2">
                     Products
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                  <Link href="/wishlist" className="flex items-center gap-2">
                     Wishlist
                  </Link>
                  <Button
                     variant="destructive"
                     onClick={() => wishlist.clear()}
                     className="ml-auto rounded-md"
                  >
                     Clear Wishlist
                  </Button>
               </Box>
               <div className="flex flex-wrap justify-center items-center space-x-8 space-y-28 md:gap-12 my-4 py-12 px-4 sm:px-6 lg:px-12">
                  {items.map((product) => (
                     <PopularContent key={product.id} product={product} />
                  ))}
               </div>
            </Box>
         </Container >
      </div>
   );
}
