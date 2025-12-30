"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/types-db";
import { motion, AnimatePresence } from "framer-motion";

interface HeroCarouselProps {
  products: Product[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (products.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [products.length]);

  if (!products || products.length === 0) return null;

  const getProductAt = (offset: number) => {
    const index = (currentIndex + offset + products.length) % products.length;
    return products[index];
  };
  const activeProduct = getProductAt(0);
  const nextProduct = getProductAt(1);
  const prevProduct = getProductAt(2);

  const CurveLine = () => (
    <svg className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M0 100 C 30 50 70 50 100 0" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-primary" />
    </svg>
  );

  const positions = {
    center: { x: 0, y: 30, scale: 1.3, zIndex: 30, opacity: 1 },
    right: { x: 160, y: -60, scale: 0.7, zIndex: 20, opacity: 0.6 },
    left: { x: -160, y: -60, scale: 0.7, zIndex: 10, opacity: 0.4 },
  };

  return (
    <section className="relative w-full bg-[#E8DCCF] rounded-[2.5rem] overflow-hidden px-8 md:px-16 py-8 min-h-[600px] flex items-center shadow-sm">
      <CurveLine />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full relative z-10 items-center">

        {/* Left Side: Content */}
        <div className="flex flex-col items-start gap-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-6xl md:text-8xl font-serif font-black text-primary leading-[0.9] tracking-tighter line-clamp-3">
                {activeProduct.name || "Crafted to elevate taste."}
              </h1>
              <p className="text-lg md:text-xl text-primary/80 max-w-md font-medium leading-relaxed mt-4">
                Experience the creamy, tangy, and rich flavors of FlavorDesk. Delivered fresh to your door.
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap gap-3 mt-4">
            {['Fresh Ingredients', 'Fast Delivery', 'Top Chefs'].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full border border-primary/20 text-primary text-sm font-semibold bg-white/30 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/menu">
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

        {/* Right Side: Animated Image Stack */}
        <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
          <div className="absolute w-[300px] h-[400px] md:w-[400px] md:h-[500px] border-[1px] border-primary/20 rounded-[50%] rotate-12 z-0" />
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence initial={false}>
              {[
                { prod: prevProduct, pos: "left" },
                { prod: nextProduct, pos: "right" },
                { prod: activeProduct, pos: "center" },
              ].map((item) => (
                <motion.div
                  key={item.prod.id}
                  layout
                  initial={positions[item.pos === "center" ? "right" : item.pos === "right" ? "left" : "center"]}
                  animate={positions[item.pos as keyof typeof positions]}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute  w-[300px] h-[400px] md:w-[400px] md:h-[500px]"
                >
                  <Image
                    src={item.prod.images?.[0]?.url || "/images/placeholder.png"}
                    alt={item.prod.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Floating Stats */}
          <div className="absolute top-10 right-0 bg-[#F4EFE9] p-4 rounded-3xl shadow-lg border border-primary/10 max-w-[150px] z-40">
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Price</p>
            <p className="text-xl font-serif text-primary">${activeProduct.price}</p>
          </div>

          <div className="absolute bottom-10 left-10 bg-primary text-[#F4EFE9] p-5 rounded-3xl shadow-lg z-40">
            <p className="text-xs opacity-80 uppercase font-bold tracking-widest mb-1">Category</p>
            <p className="text-xl font-serif">{activeProduct.category}</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroCarousel;