"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = [Facebook, Instagram, Twitter];

  const shopLinks = [
    { label: "All Products", href: "/menu" },
    { label: "Best Sellers", href: "/menu?isFeatured=true" },
    { label: "Vegan Menu", href: "/menu?category=Vegan" },
  ];

  const companyLinks = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Contact Us", href: "/contact" },
  ];

  const contactInfo = [
    { icon: MapPin, text: "123 Culinary Avenue, Foodie District, NY" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: Mail, text: "support@flavordesk.com" },
  ];

  return (
    <footer className="px-4 md:px-6 mt-12 pb-6">
      <div className="bg-primary text-[#F4EFE9] relative overflow-hidden w-full max-w-7xl mx-auto rounded-[3rem] shadow-xl">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-[0.03] pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full blur-[100px]" />
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-white rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 px-8 md:px-16 py-16 md:py-20">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif font-black text-[#F4EFE9] tracking-tight">FlavorDesk.</h2>
              <p className="text-[#F4EFE9]/70 max-w-md text-lg leading-relaxed">
                Experience the art of food delivery. Fresh ingredients, top chefs, and swift delivery to your doorstep.
              </p>
              <div className="flex gap-4 pt-2">
                {socialIcons.map((Icon, i) => (
                  <Link key={i} href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300">
                    <Icon size={20} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white/5 p-8 md:p-10 rounded-[2.5rem] border border-white/5 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <h3 className="text-2xl font-serif font-bold text-[#F4EFE9] mb-3">Subscribe & Save</h3>
              <p className="text-[#F4EFE9]/70 text-base mb-8">Get 10% off your first order and exclusive access.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input placeholder="Enter your email" className="bg-white/10 border-white/10 text-[#F4EFE9] placeholder:text-[#F4EFE9]/40 h-14 rounded-2xl px-6" />
                <Button className="bg-[#E8DCCF] text-primary hover:bg-white h-14 px-8 rounded-2xl font-bold text-base shadow-lg transition-transform active:scale-95">Subscribe</Button>
              </div>
            </div>
          </div>

          <Separator className="bg-white/10 mb-16" />

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            {[
              { title: "Shop", links: shopLinks },
              { title: "Company", links: companyLinks }
            ].map((col, i) => (
              <div key={i} className="space-y-6">
                <h4 className="text-[#F4EFE9] font-serif font-bold text-xl">{col.title}</h4>
                <ul className="space-y-4 text-base text-[#F4EFE9]/70">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="hover:text-white transition-colors flex items-center gap-2 group">
                        {i === 0 && <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />}
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="space-y-6 col-span-2">
              <h4 className="text-[#F4EFE9] font-serif font-bold text-xl">Contact</h4>
              <ul className="space-y-5 text-base text-[#F4EFE9]/70">
                {contactInfo.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-full shrink-0"><item.icon size={18} /></div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom White Pill */}
      <div className="max-w-7xl mx-auto mt-4 md:mt-8">
        <div className="bg-white rounded-full px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm border border-neutral-100">
          <p className="text-sm font-medium text-neutral-500">&copy; {currentYear} FlavorDesk. All rights reserved.</p>
          <div className="flex items-center gap-8 text-sm font-bold text-primary">
            {["Privacy", "Terms"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-neutral-600 hover:text-[#84B74E] transition-colors font-normal">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}