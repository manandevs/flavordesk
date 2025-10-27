import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import Image from "next/image";
import Header from "@/components/header";
import { auth } from "@clerk/nextjs/server";
import Footer from "@/components/footer";
import { ToastProvider } from "@/providers/toast-provider";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "ShopVerse | Trendy Products, Great Prices",
  description: "Discover the latest fashion, tech, and home essentials at unbeatable prices. ShopVerse makes online shopping simple and stylish.",
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
          className={cn("bg-background antialiased font-urbanist", urbanist.variable)}
        >
          <Header userId={userId} />
          <div>
            {children}
            <ToastProvider />
          </div>
          <Footer />
          <Image
            src={'/svg/hero.svg'}
            alt="image"
            width={2765}
            height={2765}
            className="absolute top-0 right-0 w-3/5 h-auto -z-10"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
