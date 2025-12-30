// D:\flavordesk\flavordesk-client\app\(auth)\(routes)\sign-in\[[...sign-in]]\page.tsx

import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[600px] max-w-5xl mx-auto w-full">
      
      {/* Left: Visual Side */}
      <div className="relative hidden lg:flex flex-col items-center justify-center p-12 bg-primary text-[#F4EFE9]">
         {/* Background Image/Texture */}
         <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <Image 
              src="/images/image.png" 
              alt="Sign In Background"
              fill
              className="object-cover"
              priority
            />
         </div>
         
         <div className="relative z-10 text-center space-y-6 max-w-sm">
            <h2 className="text-5xl font-serif font-black tracking-tight leading-none">Welcome Back!</h2>
            <p className="text-lg opacity-80 font-medium">
               Sign in to track your orders, save your favorite dishes, and unlock exclusive tasty rewards.
            </p>
         </div>

         {/* Decorative Circles */}
         <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 border border-white/10 rounded-full" />
         <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      </div>

      {/* Right: Clerk Form */}
      <div className="flex items-center justify-center p-8 lg:p-12 bg-white">
        <SignIn 
           path="/sign-in"
           appearance={{
             elements: {
               // Remove default card shadow/border as we have our own container
               card: "shadow-none border-none w-full bg-transparent",
               rootBox: "w-full",
               headerTitle: "text-3xl font-serif font-bold text-primary",
               headerSubtitle: "text-neutral-500 font-medium",
               
               // Social Buttons
               socialButtonsBlockButton: "rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-600 font-bold h-12",
               socialButtonsBlockButtonText: "font-semibold",
               
               // Divider
               dividerLine: "bg-neutral-100",
               dividerText: "text-neutral-400 font-medium uppercase text-xs tracking-widest",

               // Inputs
               formFieldLabel: "text-primary font-bold ml-1 mb-1.5",
               formFieldInput: "rounded-xl border-neutral-200 bg-neutral-50 focus:bg-white focus:border-primary focus:ring-primary/20 h-12 px-4 shadow-sm transition-all",
               
               // Primary Button
               formButtonPrimary: "bg-primary hover:bg-primary/90 text-[#F4EFE9] rounded-xl h-12 text-base font-bold shadow-lg shadow-primary/20 transition-all",
               
               // Footer
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
    </div>
  )
}