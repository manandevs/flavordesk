"use client"
import { Product } from '@/types-db'
import { useParams } from 'next/navigation'
import React, { FC, Fragment } from 'react'
import PopularContent from '../popular-content'

interface SuggestedListProps {
  product: Product[]
}

const SuggestedList: FC<SuggestedListProps> = ({ product }) => {
  const params = useParams()
  const productId = params?.productId as string

  const suggestedProducts = product.filter(item => String(item.id) !== String(productId))

  return (
    <Fragment>
      <h2 className='text-3xl text-neutral-600 font-semibold mb-4'>
        Suggested Products
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-16'>
        {suggestedProducts.length > 0 ? (
          suggestedProducts.slice(0,3).map(item => (
            <PopularContent key={item.id} product={item} />
          ))
        ) : (
          <p className='text-neutral-500'>No suggested products available.</p>
        )}
      </div>
    </Fragment>
  )
}

export default SuggestedList
