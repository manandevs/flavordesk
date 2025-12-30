"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: { url: string }[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  // Default to first image or placeholder
  const [selectedImage, setSelectedImage] = useState(
    images[0]?.url || "/images/placeholder.png"
  );

  if (images.length === 0) {
    return (
      <div className="aspect-square w-full rounded-[2.5rem] bg-neutral-100 flex items-center justify-center overflow-hidden">
         <Image 
            src="/images/placeholder.png" 
            alt="No image" 
            width={500} 
            height={500} 
            className="object-cover opacity-50"
         />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      {/* Main Image */}
      <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden bg-white border border-primary/5 shadow-sm group">
        <Image
          src={selectedImage}
          alt="Product Image"
          fill
          className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image.url)}
              className={cn(
                "relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all",
                selectedImage === image.url
                  ? "border-primary ring-2 ring-primary/20 ring-offset-2"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;