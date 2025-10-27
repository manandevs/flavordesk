import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';
import Box from '@/components/box';
import Container from '@/components/container';
import Gallery from '@/components/gallery';
import Info from '@/components/menu/info';
import SuggestedList from '@/components/menu/suggested-list';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';

interface ProductPageProps {
   params: Promise<{ productId: string }>; 
}

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
   const { productId } = await params;
   const product = await getProduct(productId);

   if (!product) {
      return (
         <Container className="py-20 text-center">
            <h2 className="text-2xl font-semibold text-neutral-600">
               Product not found.
            </h2>
            <Link href="/menu" className="text-blue-600 hover:underline mt-4 inline-block">
               Back to Menu
            </Link>
         </Container>
      );
   }

   const suggestProducts = await getProducts({ category: product.category });

   return (
      <Container className='space-y-12 pb-14 px-4 sm:px-6 lg:px-12'>
         <Box className="block bg-white rounded-lg my-4 shadow-md mx-auto mt-20 mb-12 py-4 px-4 sm:px-6 lg:px-12">
            <Box className="text-neutral-700 text-sm flex items-center justify-start">
               <Link href="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Main Page
               </Link>
               <ChevronRight className="w-4 h-4" />
               <Link href="/menu" className="flex items-center gap-2">
                  Products
               </Link>
            </Box>

            <div className="px-4 py-10 sm:px-6 lg:px-8 space-y-10">
               <div className="flex flex-col md:flex-row lg:items-start gap-x-4 lg:gap-x-6">
                  <Gallery images={product.images} />
                  <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                     <Info product={product} />
                  </div>
               </div>
            </div>
         </Box>
         <SuggestedList product={suggestProducts} />
      </Container>
   );
};

export default ProductPage;
