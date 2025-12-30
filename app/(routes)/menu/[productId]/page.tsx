// D:\flavordesk\flavordesk-client\app\(routes)\menu\[productId]\page.tsx

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';
import Container from '@/components/container';
import Gallery from '../components/gallery';
import Info from '../components//info';
import SuggestedList from '@/components/suggested-list';

interface ProductPageProps {
   params: Promise<{ productId: string }>; 
}

export const revalidate = 0; // Don't cache product details to ensure stock/price is fresh

const ProductPage = async ({ params }: ProductPageProps) => {
   // Await params (Next.js 15 Requirement)
   const { productId } = await params;
   
   // Fetch Data
   const product = await getProduct(productId);

   // Handle 404 Case
   if (!product) {
      return (
         <Container className="py-32 px-4 text-center min-h-[60vh] flex flex-col items-center justify-center">
            <h2 className="text-3xl font-serif font-bold text-neutral-800">
               Product not found
            </h2>
            <p className="text-neutral-500 mt-2 mb-8">
               The item you are looking for might have been removed or is temporarily unavailable.
            </p>
            <Link 
               href="/menu" 
               className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition"
            >
               Back to Menu
            </Link>
         </Container>
      );
   }

   // Fetch Related Products (same category, excluding current)
   const allCategoryProducts = await getProducts({ category: product.category });
   const suggestProducts = allCategoryProducts
      .filter((item) => item.id !== product.id)
      .slice(0, 4);

   return (
      <Container className="px-4 sm:px-6 lg:px-12 pb-24 pt-24 md:pt-32 space-y-16">
         
         {/* Breadcrumbs */}
         <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
               <Home size={14} />
               <span>Home</span>
            </Link>
            <ChevronRight size={14} />
            <Link href="/menu" className="hover:text-primary transition-colors">
               Menu
            </Link>
            <ChevronRight size={14} />
            <span className="font-medium text-neutral-800 truncate max-w-[200px]">
               {product.name}
            </span>
         </div>

         {/* Product Details Section */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Gallery */}
            <Gallery images={product.images} />
            
            {/* Right: Info */}
            <div className="sticky top-32">
               <Info product={product} />
            </div>
         </div>

         <div className="w-full h-px bg-neutral-200" />

         {/* Suggested Products */}
         <SuggestedList products={suggestProducts} />

      </Container>
   );
};

export default ProductPage;