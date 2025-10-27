"use client"

import { useCart } from '@/hooks/use-cart'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { Badge } from '../ui/badge'

const CartActionButton = () => {
  const [isMounted, setIsMounted] = useState(false)
  const cart = useCart()
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const handleCartClick = () => {
    router.push('/cart')
  }

  return (
    <div className="flex items-center justify-center">
      <Button
        size="icon"
        variant="outline"
        onClick={handleCartClick}
        className="relative rounded-full"
      >
        <ShoppingCart className="w-5 h-5 text-neutral-700" />

        {/* 🔹 Small badge showing cart item count */}
        {cart.items.length > 0 && (
          <Badge className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-semibold text-white">
            {cart.items.length}
          </Badge>
        )}
      </Button>
    </div>
  )
}

export default CartActionButton
