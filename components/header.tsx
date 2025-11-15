"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Badge } from "./ui/badge";
import {
  Menu,
  ShoppingBag,
  Heart,
  UserCircle,
  ListOrdered,
  Home,
  CakeSlice,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  userId: string | null;
}

const Header: React.FC<HeaderProps> = ({ userId }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Menu", href: "/menu", icon: ListOrdered },
  ];

  return (
    <header
      className={cn(
        "w-full fixed top-0 left-0 z-50 transition-all duration-300 border-b bg-white",
        isScrolled ? "shadow-md" : ""
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 lg:py-4">
        {/* === Left: Logo === */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FlavorDesk Logo"
            width={40}
            height={40}
            className="w-auto h-10"
            priority
          />
          <span className="text-lg font-semibold text-gray-900">
            FlavorDesk
          </span>
        </Link>

        {/* === Center: Desktop Navigation === */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors flex items-center gap-1"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}

          <Link
            href="/orders"
            className="relative flex items-center gap-2 text-gray-700 hover:text-black"
          >
            <ShoppingCart />
            Orders
          </Link>

          {/* === FIXED CART LINK === */}
          <Link
            href={
              userId
                ? "/cart"
                : process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in"
            }
            className="relative flex items-center gap-2 text-gray-700 hover:text-black"
          >
            {cartItems.length > 0 && userId && (
              <span className="absolute -top-1 -left-2.5 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
            <ShoppingBag size={18} />
            Cart
          </Link>

          <Link
            href="/wishlist"
            className="relative flex items-center gap-2 text-gray-700 hover:text-black"
          >
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1 -left-2.5 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
            <CakeSlice size={18} />
            Wishlist
          </Link>
        </nav>

        {/* === Right: Buttons & Dropdown === */}
        <div className="flex items-center gap-4">
          {/* Become a host (Desktop only) */}
          <Link
            href="https://flavordesk-admin.vercel.app/"
            className="hidden sm:flex"
          >
            <Badge
              variant="outline"
              className="text-sm rounded-full px-3 py-1 hover:bg-gray-100 transition"
            >
              Become a host
            </Badge>
          </Link>

          {/* User Auth */}
          {userId ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link
              href={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in"}
              className="text-gray-700 hover:text-black"
            >
              <UserCircle size={22} />
            </Link>
          )}

          {/* Mobile Dropdown Menu (Right side) */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="text-gray-700 hover:text-black"
                  aria-label="Open menu"
                >
                  <Menu size={24} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 mt-2 bg-white shadow-md border rounded-md"
              >
                {/* Navigation Items */}
                {navItems.map((item) => (
                  <DropdownMenuItem asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-gray-700 hover:text-black"
                    >
                      <item.icon size={18} />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}

                {/* Orders */}
                <DropdownMenuItem asChild>
                  <Link
                    href="/orders"
                    className="relative flex items-center gap-2 text-gray-700 hover:text-black"
                  >
                    <ShoppingBag size={18} />
                    Orders
                  </Link>
                </DropdownMenuItem>

                {/* === MOBILE CART WITH LOGIN CHECK === */}
                <DropdownMenuItem asChild>
                  <Link
                    href={
                      userId
                        ? "/cart"
                        : process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in"
                    }
                    className="relative flex items-center gap-2 text-gray-700 hover:text-black"
                  >
                    {cartItems.length > 0 && userId && (
                      <span className="absolute -top-1 left-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}

                    <ShoppingBag size={18} />
                    Cart
                  </Link>
                </DropdownMenuItem>

                {/* Wishlist */}
                <DropdownMenuItem asChild>
                  <Link
                    href="/wishlist"
                    className="relative flex items-center gap-2 text-gray-700 hover:text-black"
                  >
                    {wishlistItems.length > 0 && (
                      <span className="absolute -top-1 left-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {wishlistItems.length}
                      </span>
                    )}
                    <CakeSlice size={18} />
                    Wishlist
                  </Link>
                </DropdownMenuItem>

                {/* Become a Host (Mobile only) */}
                <div className="block sm:hidden">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="https://flavordesk-admin.vercel.app/"
                      className="flex items-center gap-2 text-gray-700 hover:text-black"
                    >
                      <Badge
                        variant="outline"
                        className="text-sm rounded-full px-3 py-1 hover:bg-gray-100 transition"
                      >
                        Become a host
                      </Badge>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
