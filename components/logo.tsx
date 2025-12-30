import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3 group shrink-0">
      <div className="relative w-12 h-12 overflow-hidden flex justify-center items-center rounded-full shadow">
        <Image
          src="/logo.png"
          alt="FlavorDesk"
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-300 scale-105"
        />
      </div>
      <span className="text-3xl font-serif font-black text-primary tracking-tight hidden sm:block">
        FlavorDesk.
      </span>
    </Link>
  )
}

export default Logo