import getOrders from '@/actions/get-orders'
import getProducts from '@/actions/get-products'
import Box from '@/components/box'
import Container from '@/components/container'
import SuggestedList from '@/components/menu/suggested-list'
import PageContent from '@/components/orders/page-content'
import { auth } from '@clerk/nextjs/server'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const revalidate = 0;

const OrdersPage = async () => {
   const orders = await getOrders()
   const { userId } = await auth()

   const formatedOrdrees = orders.filter((item) => item.userId === userId)

   const allProducts = await getProducts();
   const suggestProducts = allProducts
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
   return (
      <Container className='space-y-12 pb-14 px-4 sm:px-6 lg:px-12'>
         <Box className="block bg-white rounded-lg my-4 shadow-md mx-auto mt-20 mb-12 py-4 px-4 sm:px-6 lg:px-12">
            <Box className="text-neutral-700 text-sm flex items-center justify-start">
               <Link href="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Main Page
               </Link>
               <ChevronRight className="w-4 h-4" />
               <Link href="/orders" className="flex items-center gap-2">
                  Orders
               </Link>
            </Box>

            <div className="px-4 py-10 sm:px-6 lg:px-8 space-y-10">
               <div className="flex flex-col md:flex-row lg:items-start gap-x-4 lg:gap-x-6">
                  <PageContent orders={formatedOrdrees} />
               </div>
            </div>
         </Box>
         <SuggestedList product={suggestProducts} />
      </Container>)
}

export default OrdersPage