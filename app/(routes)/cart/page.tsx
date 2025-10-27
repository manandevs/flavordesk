import Box from '@/components/box';
import CartContent from '@/components/cart/cart-content';
import Container from '@/components/container';
import { auth } from '@clerk/nextjs/server';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const CartPage = async () => {
  const { userId } = await auth()
  return (
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
          <Link href="/cart" className="flex items-center gap-2">
            Cart
          </Link>
        </Box>
        <CartContent userId={userId} />
      </Box>
    </Container >
  )
}

export default CartPage