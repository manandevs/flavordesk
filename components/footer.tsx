"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [_currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="bg-gray-100 text-gray-800 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About Us</h3>
            <p className="text-sm">
              We are dedicated to providing the best culinary experiences with a focus on quality and service.  
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/" className="hover:text-hero">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-hero">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-hero">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-hero">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-hero">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact</h3>
            <p className="text-sm">123 Food Street, Quetta, Pakistan</p>
            <p className="text-sm">Phone: +92 123 456789</p>
            <p className="text-sm">Email: info@foofied.com</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center items-center gap-6 pb-6">
          <Link href="#" className="text-xl text-gray-600 hover:text-hero">
            <Facebook className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-xl text-gray-600 hover:text-hero">
            <Instagram className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-xl text-gray-600 hover:text-hero">
            <Twitter className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-xl text-gray-600 hover:text-hero">
            <Youtube className="w-5 h-5" />
          </Link>
        </div>

        {/* Copyright Notice */}
        <div className="text-center py-6 border-t border-gray-300">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Foofied. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
