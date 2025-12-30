// D:\flavordesk\flavordesk-client\app\(auth)\(routes)\sign-up\[[...sign-up]]\page.tsx

import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[600px] max-w-5xl mx-auto w-full">
      
      {/* Left: Clerk Form (Swapped for variety) */}
      <div className="flex items-center justify-center p-8 lg:p-12 bg-white order-2 lg:order-1">
        <SignUp 
           path="/sign-up"
           appearance={{
             elements: {
               card: "shadow-none border-none w-full bg-transparent",
               rootBox: "w-full",
               headerTitle: "text-3xl font-serif font-bold text-primary",
               headerSubtitle: "text-neutral-500 font-medium",
               
               socialButtonsBlockButton: "rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-600 font-bold h-12",
               socialButtonsBlockButtonText: "font-semibold",
               
               dividerLine: "bg-neutral-100",
               dividerText: "text-neutral-400 font-medium uppercase text-xs tracking-widest",

               formFieldLabel: "text-primary font-bold ml-1 mb-1.5",
               formFieldInput: "rounded-xl border-neutral-200 bg-neutral-50 focus:bg-white focus:border-primary focus:ring-primary/20 h-12 px-4 shadow-sm transition-all",
               
               formButtonPrimary: "bg-primary hover:bg-primary/90 text-[#F4EFE9] rounded-xl h-12 text-base font-bold shadow-lg shadow-primary/20 transition-all",
               
               footerActionLink: "text-primary hover:underline font-bold decoration-2 underline-offset-4",
               footerActionText: "text-neutral-500 font-medium"
             },
             variables: {
               colorPrimary: "#2A1B12",
               colorText: "#2A1B12",
               borderRadius: "1rem",
               fontFamily: "var(--font-urbanist)"
             }
           }}
        />
      </div>

      {/* Right: Visual Side */}
      <div className="relative hidden lg:flex flex-col items-center justify-center p-12 bg-[#2A1B12] text-[#F4EFE9] order-1 lg:order-2">
         {/* Background Image/Texture */}
         <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <Image 
              src="/images/image.png" 
              alt="Sign Up Background"
              fill
              className="object-cover"
              priority
            />
         </div>
         
         <div className="relative z-10 text-center space-y-6 max-w-sm">
            <h2 className="text-5xl font-serif font-black tracking-tight leading-none">Join the Flavor.</h2>
            <p className="text-lg opacity-80 font-medium">
               Create an account today to get fast delivery, member-only deals, and track your culinary journey.
            </p>
         </div>

         {/* Decorative Circles */}
         <div className="absolute top-[-50px] right-[-50px] w-48 h-48 border border-white/10 rounded-full" />
         <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      </div>

    </div>
  )
}