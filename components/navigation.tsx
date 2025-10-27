"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  scrolled: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ className, scrolled, ...props }) => {
  const pathname = usePathname();

  const routes = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/orders', label: 'Orders' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <nav className={cn('ml-auto', className)} {...props}>
      <nav className="flex items-center space-x-4 lg:space-x-12 pl-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'text-sm md:text-base font-medium transition-colors hover:text-primary',
              pathname === route.href
                ? 'text-primary'
                : scrolled
                ? 'text-black'
                : 'text-gray-100 dark:text-white'
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </nav>
  );
};

export default Navigation;
