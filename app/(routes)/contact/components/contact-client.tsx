"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Home, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Facebook, 
  Instagram, 
  Twitter, 
  Loader2 
} from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ContactClient = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll get back to you shortly.");
      // Reset form logic here if needed
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-10">
      
      {/* === 1. Breadcrumbs & Header === */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-neutral-800">Contact</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-100 pb-6">
           <div>
             <h1 className="text-3xl md:text-4xl font-serif font-black text-primary">
               Get in Touch
             </h1>
             <p className="text-neutral-500 text-lg mt-2 max-w-lg">
               Have a question about our menu or an order? We&lsquo;re here to help.
             </p>
           </div>
        </div>
      </div>

      {/* === 2. Content Grid === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left: Contact Info Card (Dark Theme) */}
        <div className="bg-primary text-[#F4EFE9] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between shadow-xl relative overflow-hidden">
           {/* Decorative Background */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

           <div className="relative z-10 space-y-10">
              <div>
                 <h3 className="text-2xl font-serif font-bold mb-6">Contact Information</h3>
                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <MapPin size={20} />
                       </div>
                       <div>
                          <p className="font-bold text-lg">Our Location</p>
                          <p className="text-white/70 leading-relaxed">123 Culinary Avenue,<br/>Foodie District, NY 10012</p>
                       </div>
                    </div>

                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <Phone size={20} />
                       </div>
                       <div>
                          <p className="font-bold text-lg">Phone Number</p>
                          <p className="text-white/70">+1 (555) 123-4567</p>
                       </div>
                    </div>

                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <Mail size={20} />
                       </div>
                       <div>
                          <p className="font-bold text-lg">Email Address</p>
                          <p className="text-white/70">support@flavordesk.com</p>
                       </div>
                    </div>

                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <Clock size={20} />
                       </div>
                       <div>
                          <p className="font-bold text-lg">Opening Hours</p>
                          <p className="text-white/70">Mon - Sun: 10:00 AM - 11:00 PM</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Social Links */}
              <div>
                 <p className="font-serif font-bold mb-4">Follow Us</p>
                 <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-white/90 transition-colors">
                       <Facebook size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-white/90 transition-colors">
                       <Instagram size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-white/90 transition-colors">
                       <Twitter size={18} />
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Contact Form (White Theme) */}
        <div className="bg-white border border-neutral-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
           <h3 className="text-2xl font-serif font-bold text-primary mb-2">Send a Message</h3>
           <p className="text-neutral-500 mb-8">Fill out the form below and we&lsquo;ll reply within 24 hours.</p>

           <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-700 ml-1">First Name</label>
                    <Input placeholder="John" className="rounded-xl h-12 bg-neutral-50 border-neutral-200 focus:bg-white" required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-700 ml-1">Last Name</label>
                    <Input placeholder="Doe" className="rounded-xl h-12 bg-neutral-50 border-neutral-200 focus:bg-white" required />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-semibold text-neutral-700 ml-1">Email Address</label>
                 <Input type="email" placeholder="john@example.com" className="rounded-xl h-12 bg-neutral-50 border-neutral-200 focus:bg-white" required />
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-semibold text-neutral-700 ml-1">Phone (Optional)</label>
                 <Input type="tel" placeholder="+1 (555) 000-0000" className="rounded-xl h-12 bg-neutral-50 border-neutral-200 focus:bg-white" />
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-semibold text-neutral-700 ml-1">Message</label>
                 <textarea 
                    className="flex min-h-[120px] w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:bg-white resize-none"
                    placeholder="How can we help you?"
                    required
                 />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold text-lg shadow-lg shadow-primary/10 mt-2"
              >
                 {loading ? <Loader2 className="animate-spin" /> : <span className="flex items-center gap-2">Send Message <Send size={18} /></span>}
              </Button>
           </form>
        </div>

      </div>

      {/* === 3. Simple Map Placeholder === */}
      <div className="w-full h-64 md:h-96 bg-[#E8DCCF] rounded-[2.5rem] flex items-center justify-center relative overflow-hidden border border-neutral-100">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2A1B12_1px,transparent_1px)] [background-size:16px_16px]"></div>
         <div className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center gap-2 z-10 animate-bounce">
            <MapPin size={32} className="text-primary" />
            <span className="font-bold text-primary">FlavorDesk HQ</span>
         </div>
      </div>

    </div>
  );
};

export default ContactClient;