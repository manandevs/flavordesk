import getProducts from '@/actions/get-products';
import Container from '@/components/container';
import HeroCarousel from '@/components/hero-carousel';
import PopularContent from '@/components/popular-content';
import { Button } from '@/components/ui/button';
import WhyChooseUsCard from '@/components/why-choose-us-card';
import { getFilterOptions } from '@/actions/get-filter-options';
import { Billboard as BillboardType } from '@/types-db';
import {
  Leaf,
  Sparkles,
  Truck,
  Smartphone,
  Star
} from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import BillboardCard from '@/components/billboard-card';
import StoreSearch from '@/components/store-search';

const HomePage = async () => {
  const [products, billboards] = await Promise.all([
    getProducts({ isFeatured: true }),
    getFilterOptions<BillboardType>("billboards")
  ]);

  const signatureDishes = products.slice(0, 6);
  const kitchenSpecials = products.slice(6, 14);

  return (
    <Container className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 space-y-16">
      <HeroCarousel products={signatureDishes} />
      {billboards[0] && <BillboardCard data={billboards[0]} index={0} className="w-full h-[400px]" />}
      <StoreSearch />

      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-4xl md:text-5xl font-serif text-primary">Browse Categories</h2>

        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Pizza', icon: '🍕' },
            { name: 'Burgers', icon: '🍔' },
            { name: 'Asian', icon: '🍜' },
            { name: 'Desserts', icon: '🍰' },
            { name: 'Drinks', icon: '🥤' },
            { name: 'Healthy', icon: '🥗' }
          ].map((cat, i) => (
            <Link href={`/menu?category=${cat.name}`} key={i} className="group cursor-pointer flex flex-col items-center gap-4 p-6 bg-white rounded-[2rem] border border-primary/5 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-[#F9F6F3] rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <span className="font-bold text-primary text-lg">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Signature Dishes */}
      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-4xl md:text-5xl font-serif text-primary">Signature Dishes</h2>
          <Link href="/menu" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">
            See all products &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {signatureDishes.map((item) => (
            <PopularContent key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* Middle Billboards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {billboards[1] && <BillboardCard data={billboards[1]} index={3} className="md:col-span-2" />}
        {billboards[2] && <BillboardCard data={billboards[2]} index={7} className="md:col-span-1" />}
      </div>

      {/* Offers Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Offer 1 */}
        <div className="bg-[#E8DCCF] rounded-[2.5rem] p-10 md:p-12 flex flex-col justify-center items-start gap-4 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
          <span className="relative bg-white/60 px-4 py-1.5 rounded-full text-xs font-bold text-primary uppercase tracking-wider backdrop-blur-sm">Promo Deal</span>
          <h3 className="relative text-5xl md:text-6xl font-serif font-black text-primary leading-[0.9]">50% Off <br /> First Order</h3>
          <p className="relative text-primary/80 font-medium text-lg">Use code <span className="font-mono font-bold bg-white/40 px-2 py-0.5 rounded border border-primary/10">WELCOME50</span> at checkout.</p>
          <Button className="relative mt-4 h-12 rounded-full px-8 bg-primary text-[#E8DCCF] hover:shadow-lg transition-all">Grab Deal</Button>
        </div>

        {/* Offer 2 */}
        <div className="bg-primary rounded-[2.5rem] p-10 md:p-12 flex flex-col justify-center items-start gap-4 shadow-sm relative overflow-hidden text-[#E8DCCF] group">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
          <span className="relative bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">Limited Time</span>
          <h3 className="relative text-5xl md:text-6xl font-serif font-black leading-[0.9]">Free Delivery <br /> Weekend</h3>
          <p className="relative opacity-80 font-medium text-lg">Enjoy free delivery on all orders over $30.</p>
          <Button variant="secondary" className="relative mt-4 h-12 rounded-full px-8 bg-[#E8DCCF] text-primary hover:bg-white hover:shadow-lg transition-all">Order Now</Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-center gap-6 shadow-sm border border-primary/5 relative overflow-hidden">
          <div className="w-14 h-14 rounded-full bg-[#E8DCCF] flex items-center justify-center text-primary mb-2">
            <Sparkles size={28} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
            Rooted in Tradition, <br /> Delivered with Care.
          </h2>
          <p className="text-lg text-primary/60 max-w-lg font-medium">
            We blend classic recipes with modern convenience. Every dish is prepared with finely chopped ingredients, fresh herbs, and a hint of passion.
          </p>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
        </div>

        <div className="space-y-6 flex flex-col">
          <WhyChooseUsCard
            title="Fresh Ingredients"
            description="Sourced daily from local farmers for the best taste."
            icon={<Leaf className="w-6 h-6 text-[#E8DCCF]" />}
          />
          <WhyChooseUsCard
            title="Fast Delivery"
            description="Hot and fresh to your doorstep in under 30 minutes."
            icon={<Truck className="w-6 h-6 text-[#E8DCCF]" />}
          />
        </div>
      </section>

      {billboards[3] && <BillboardCard data={billboards[3]} index={3} className="w-full h-[350px]" />}

      {/* Kitchen Specials */}
      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-4xl md:text-5xl font-serif text-primary">Kitchen Specials</h2>
          <Link href="/menu" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">
            See all specials &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kitchenSpecials.length > 0 ? (
            kitchenSpecials.map((item) => (
              <PopularContent key={`${item.id}-special`} product={item} />
            ))
          ) : (
            <p className="col-span-full text-center text-primary/50">Check out our menu for more tasty options!</p>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white rounded-[2.5rem] p-10 md:p-20 border border-primary/5 shadow-sm text-center space-y-12">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">How It Works</h2>
          <p className="text-primary/60 text-xl font-medium">Order your favorite food in 3 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[2px] bg-dashed-line border-t-2 border-dashed border-primary/10 -z-0" />
          {/* Steps omitted for brevity, they remain unchanged */}
          <div className="flex flex-col items-center gap-6 relative z-10 group">
            {/* ... existing SVG/Text ... */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-primary">1. Select Location</h3>
              <p className="text-primary/60 text-base leading-relaxed max-w-[250px] mx-auto">Enter your location to browse restaurants available near you.</p>
            </div>
          </div>
          {/* ... other steps ... */}
          <div className="flex flex-col items-center gap-6 relative z-10 group">
            {/* ... existing SVG/Text ... */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-primary">2. Choose Food</h3>
              <p className="text-primary/60 text-base leading-relaxed max-w-[250px] mx-auto">Browse our curated menus and add favorites to your cart.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 relative z-10 group">
            {/* ... existing SVG/Text ... */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-primary">3. Fast Delivery</h3>
              <p className="text-primary/60 text-base leading-relaxed max-w-[250px] mx-auto">Relax while we deliver your food hot and fresh in minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="bg-primary rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden shadow-2xl text-[#E8DCCF]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-10">
            <h2 className="text-5xl md:text-7xl font-serif font-black leading-[0.95]">
              Get the full <br /> experience <br /> on the App
            </h2>
            <p className="opacity-80 text-xl max-w-md font-medium">
              Track orders in real-time, get exclusive mobile-only deals, and pay securely with one tap.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="h-16 px-6 bg-black/20 hover:bg-black/40 text-white rounded-2xl flex items-center gap-4 border border-white/10 backdrop-blur-md transition-all hover:scale-105">
                <Smartphone className="w-8 h-8" />
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Download on</p>
                  <p className="text-lg font-bold">App Store</p>
                </div>
              </button>
              <button className="h-16 px-6 bg-black/20 hover:bg-black/40 text-white rounded-2xl flex items-center gap-4 border border-white/10 backdrop-blur-md transition-all hover:scale-105">
                <Smartphone className="w-8 h-8" />
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Get it on</p>
                  <p className="text-lg font-bold">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end relative">
            <div className="w-[280px] h-[550px] bg-[#E8DCCF] rounded-[3rem] border-[10px] border-[#2A1B12]/20 shadow-2xl flex flex-col p-4 gap-4 rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-20 h-6 bg-primary/10 rounded-full mx-auto" />
              <div className="w-full h-32 bg-primary/10 rounded-2xl animate-pulse" />
              <div className="w-full h-20 bg-primary/5 rounded-xl" />
              <div className="w-full h-20 bg-primary/5 rounded-xl" />
              <div className="w-full h-20 bg-primary/5 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section>
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">What Our Customers Say</h2>
          <p className="text-primary/60 text-xl">Real feedback from real foodies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Sarah J.', role: 'Pizza Lover', text: "The delivery was insanely fast! The pizza arrived steaming hot and the crust was perfection." },
            { name: 'Michael C.', role: 'Food Critic', text: "I've tried many services, but FlavorDesk stands out for the quality of ingredients. Truly chef-grade." },
            { name: 'Emily R.', role: 'Busy Mom', text: "A lifesaver for weeknight dinners. Healthy options that my kids actually eat. Highly recommended!" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-primary/5 flex flex-col gap-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex gap-1 text-[#E96E32]">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-primary/80 leading-relaxed text-lg font-medium italic">
                &quot;{item.text}&quot;
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-primary/5">
                <div className="w-12 h-12 bg-[#E8DCCF] rounded-full flex items-center justify-center">
                  <span className="font-serif font-bold text-primary text-lg">{item.name[0]}</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary">{item.name}</h4>
                  <p className="text-xs text-primary/50 font-bold uppercase tracking-wider">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </Container>
  )
}

export default HomePage