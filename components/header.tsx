"use client";
import { cn } from '@/lib/utils';
import React, { Fragment, useEffect, useState } from 'react';
import Container from './container';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import Navigation from './navigation';
import CartActionButton from './cart/cart-action-button';

interface HeaderProps {
  userId: string | null;
}

const Header: React.FC<HeaderProps> = ({ userId, ...props }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      )}
      {...props}
    >
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-12 flex h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="uppercase flex gap-x-2 font-bold text-neutral-700 text-lg md:text-xl"
          >
            Foodied
          </Link>

          {/* Navigation */}
          <Navigation scrolled={isScrolled} />

          {/* Auth */}
          <div className="flex items-center space-x-2 ml-4">
            {userId ? (
              <Fragment>
                <UserButton afterSignOutUrl="/" />
                <CartActionButton />
              </Fragment>
            ) : (
              <Fragment>
                <Link
                  href={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/sign-in'}
                >
                  <Button
                    variant="outline"
                    className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  >
                    Login
                  </Button>
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/sign-up'}
                >
                  <Button className="h-10 px-4 py-2 bg-green-400 text-black hover:bg-green-500">
                    Sign Up
                  </Button>
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
