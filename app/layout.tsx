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
          className={cn("bg-background antialiased font-urbanist", urbanist.variable)}
        >
          <Header userId={userId} />
          <div>
            {children}
            <ToastProvider />
          </div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
