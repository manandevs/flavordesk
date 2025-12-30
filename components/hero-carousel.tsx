"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/types-db";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
  products: Product[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fallback if no products are passed, though page.tsx should handle this
  const currentProduct = products[currentIndex] || products[0];

  useEffect(() => {
    if (products.length <= 1) return;

    const interval = setInterval(() => {
      // Start exit animation
      setIsAnimating(true);
      
      // Wait for animation to finish (500ms), then swap data and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
        setIsAnimating(false);
      }, 500); 
    }, 5500); // 5.5 Seconds

    return () => clearInterval(interval);
  }, [products.length]);

  // Custom vector line SVG (Preserved exactly from your code)
  const CurveLine = () => (
    <svg className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M0 100 C 30 50 70 50 100 0" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-primary" />
    </svg>
  );

  if (!currentProduct) return null;

  return (
    <section className="relative w-full bg-[#E8DCCF] rounded-[2.5rem] overflow-hidden px-8 md:px-16 py-8 min-h-[600px] flex items-center shadow-sm">
      <CurveLine />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full relative z-10 items-center">
        
        {/* === Left Text Content === */}
        {/* Added transition classes for animation, kept all design classes identical */}
        <div 
          className={cn(
            "flex flex-col items-start gap-3 transition-all duration-500 ease-in-out",
            isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}
        >
          <h1 className="text-6xl md:text-8xl font-serif font-black text-primary leading-[0.9] tracking-tighter">
            {currentProduct.name}
          </h1>
          <p className="text-lg md:text-xl text-primary/80 max-w-md font-medium leading-relaxed">
            {/* Dynamic Description based on product data to fit design */}
            Experience the creamy, tangy, and rich flavors of {currentProduct.name}. Rooted in {currentProduct.cuisine} tradition, delivered fresh to your door.
          </p>
          
          {/* Tags/Chips */}
          <div className="flex flex-wrap gap-3">
            {['Fresh Ingredients', 'Fast Delivery', currentProduct.category].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full border border-primary/20 text-primary text-sm font-semibold bg-white/30 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-2">
            <Link href={`/menu/${currentProduct.id}`}>
              <Button className="rounded-full h-14 px-8 text-base bg-primary text-[#E8DCCF] hover:bg-primary/90">
                Order Now
              </Button>
            </Link>
            <Link href="/menu">
              <Button variant="outline" className="rounded-full h-14 px-8 text-base border-primary text-primary hover:bg-primary/5">
                View Menu
              </Button>
            </Link>
          </div>
        </div>

        {/* === Right Image Content === */}
        <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
           {/* Circular background graphic (Preserved) */}
           <div className="absolute w-[300px] h-[400px] md:w-[400px] md:h-[500px] border-[1px] border-primary/20 rounded-[50%] rotate-12" />
            
            {/* Dynamic Image with Animation */}
            <div 
              className={cn(
                "relative w-full h-full transition-all duration-500 ease-in-out",
                 isAnimating ? "opacity-0 scale-95 rotate-3" : "opacity-100 scale-100 rotate-0"
              )}
            >
              <Image
                src={currentProduct.images?.[0]?.url || "/images/placeholder.png"} 
                alt={currentProduct.name}
                fill
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
            
            {/* Floating Badge 1 (Mapped to Price for dynamic data) */}
            <div className="absolute top-10 right-0 bg-[#F4EFE9] p-4 rounded-3xl shadow-lg border border-primary/10 max-w-[150px]">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Price</p>
              <p className="text-xl font-serif text-primary">${currentProduct.price}</p>
            </div>

            {/* Floating Badge 2 (Mapped to Size for dynamic data) */}
            <div className="absolute bottom-10 left-10 bg-primary text-[#F4EFE9] p-5 rounded-3xl shadow-lg">
              <p className="text-xs opacity-80 uppercase font-bold tracking-widest mb-1">Size</p>
              <p className="text-2xl font-serif">{currentProduct.size}</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;