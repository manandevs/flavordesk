"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  Menu,
  Search,
  ListOrdered,
  Home,
  UtensilsCrossed,
  Phone,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Logo from "./logo";
import CartSidebar from "./cart-sidebar";
import WishlistSidebar from "./wishlist-sidebar";

interface HeaderProps {
  userId: string | null;
}

const Header: React.FC<HeaderProps> = ({ userId }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter(); // Hook for navigation
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Search Submit
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    if ((e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') || !searchValue.trim()) return;
    
    router.push(`/menu?search=${encodeURIComponent(searchValue)}`);
    setSearchValue(""); 
  };

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Menu", href: "/menu", icon: UtensilsCrossed },
    { label: "Orders", href: "/orders", icon: ListOrdered },
    { label: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <header
      className={cn(
        "fixed top-4 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-300",
        isScrolled ? "translate-y-0" : "translate-y-0"
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto rounded-[50px] py-2.5 px-4 flex items-center justify-between transition-all duration-300 border border-gray-400/10",
          isScrolled
            ? "bg-[#E8DCCF]/90 backdrop-blur-xl shadow-xl"
            : "bg-[#F4EFE9]/80"
        )}
      >
        <div className="flex items-center gap-8">
          <Logo />
          
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-primary/70 hover:text-primary transition-colors hover:bg-white/50 px-3 py-1.5 rounded-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="text-xl flex items-center gap-3">
          
          {/* Wishlist Sidebar */}
          <WishlistSidebar />

          {/* Cart Sidebar Button */}
          {userId ? (
            <CartSidebar />
          ) : (
            <Link
              href={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in"}
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-primary bg-white hover:bg-primary/5 transition-colors shadow-sm border border-primary/5"
            >
              <span className="text-xl">🛍️</span>
            </Link>
          )}

          {/* User Button */}
          <div className="px-2 aspect-square bg-white rounded-2xl flex justify-center items-center">
            {userId ? (
                <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
            ) : (
              <Link
                href={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in"}
                className="w-9 h-9 flex items-center justify-center rounded-full text-primary hover:bg-primary/5 text-2xl"
              >
                👤
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm border border-primary/5 hover:bg-primary hover:text-white transition-colors">
                  <Menu size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 mt-4 bg-[#F4EFE9] border-primary/10 rounded-[2rem] shadow-xl p-4">
                <div className="relative w-full mb-4 md:hidden">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleSearch}
                    className="w-full h-10 rounded-full bg-white pl-4 pr-10 text-sm outline-none"
                  />
                  <Search 
                    className="absolute right-3 top-2.5 text-primary/40 cursor-pointer" 
                    size={16} 
                    onClick={handleSearch}
                  />
                </div>

                {navItems.map((item) => (
                  <DropdownMenuItem asChild key={item.href}>
                    <Link href={item.href} className="flex items-center gap-3 text-primary p-3 rounded-2xl font-bold cursor-pointer hover:bg-white transition-colors">
                      <item.icon size={18} />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;