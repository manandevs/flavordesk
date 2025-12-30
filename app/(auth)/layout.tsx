import React from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center py-32 px-4 bg-[#F4EFE9] overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#84B74E]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
         <Link 
            href="/" 
            className="flex items-center gap-2 text-primary font-bold hover:opacity-70 transition-opacity bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/5"
         >
            <ChevronLeft size={18} />
            <span className="text-sm">Back to Home</span>
         </Link>
      </div>

      {/* Auth Content */}
      <div className="relative z-10 w-full flex justify-center">
         {children}
      </div>
    </div>
  )
}