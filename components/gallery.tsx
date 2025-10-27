import React, { FC } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import Image from 'next/image'

interface GalleryProps {
  images?: { url: string }[]
}

const Gallery: FC<GalleryProps> = ({ images = [] }) => {
  return (
    <Tabs defaultValue={images[0]?.url} className="w-full">
      {images.map((tab, i) => (
        <TabsContent key={i} value={tab.url}>
          <Image
            src={tab.url}
            alt={`Image ${i}`}
            width={2222}
            height={2222}
            className="w-[300px] h-[300px] object-cover"
          />
        </TabsContent>
      ))}

       {/* Tab triggers (thumbnails) */}
      <TabsList className='w-16 h-16 bg-none border-none shadow-none outline-none'>
        {images.map((tab, i) => (
          <TabsTrigger
            key={i}
            value={tab.url.toString()}
            className='w-16 h-16 p-0 px-0 py-0  bg-none border-none shadow-none outline-none'
          >
            <Image
              src={tab.url}
              alt={`Thumbnail ${i}`}
              width={50}
              height={50}
              className="w-16 h-16 object-cover rounded-md"
            />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default Gallery