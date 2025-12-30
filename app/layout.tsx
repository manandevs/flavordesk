import type { Metadata } from "next";
import { Urbanist, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { auth } from "@clerk/nextjs/server";
import Footer from "@/components/footer";
import { ToastProvider } from "@/providers/toast-provider";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"], 
});

export const metadata: Metadata = {
  title: "FlavorDesk | Delicious Food, Fast Delivery",
  description: "Order fresh and tasty meals from FlavorDesk. Enjoy healthy, high-quality food delivered fast to your doorstep.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth()
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn("bg-background antialiased font-sans", urbanist.variable, fraunces.variable)}
        >
          <div className="relative min-h-screen flex flex-col">
             <Header userId={userId} />
             <main className="flex-1">
                {children}
             </main>
             <ToastProvider />
             <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}