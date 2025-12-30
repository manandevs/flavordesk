"use client";

import React, { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import Link from "next/link";
import { ChevronRight, Home, X, Check, Filter, Frown } from "lucide-react";

import { Product, Category, Size, Kitchen, Cuisine } from "@/types-db";
import PopularContent from "@/components/popular-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface MenuClientProps {
  products: Product[];
  categories: Category[];
  sizes: Size[];
  kitchens: Kitchen[];
  cuisines: Cuisine[];
}

const MenuClient: FC<MenuClientProps> = ({
  products,
  categories,
  sizes,
  kitchens,
  cuisines,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search"); // Get search query

  // === Filter Logic ===
  const handleFilter = (key: string, value: string) => {
    const current = qs.parse(searchParams.toString());
    
    const query = {
      ...current,
      [key]: current[key] === value ? null : value,
    };

    const url = qs.stringifyUrl({
      url: "/menu",
      query,
    }, { skipNull: true, skipEmptyString: true });

    router.push(url);
  };

  const clearFilters = () => {
    router.push("/menu");
  };

  const removeFilter = (key: string) => {
    const current = qs.parse(searchParams.toString());
    const query = { ...current, [key]: null };
    const url = qs.stringifyUrl({ url: "/menu", query }, { skipNull: true });
    router.push(url);
  };

  const filterGroups = [
    { id: "category", label: "Categories", data: categories },
    { id: "size", label: "Sizes", data: sizes },
    { id: "kitchen", label: "Kitchens", data: kitchens },
    { id: "cuisine", label: "Cuisines", data: cuisines },
  ];

  const activeFilters = Array.from(searchParams.entries()).filter(
    ([key]) => key !== "isFeatured"
  );

  // === Filter Products by Search Query (Client Side) ===
  const filteredProducts = searchQuery
    ? products.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 pt-6">
      
      {/* SIDEBAR (FILTERS) */}
      <div className="w-full md:w-64 shrink-0 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b">
           <Filter className="w-5 h-5" />
           <h3 className="font-serif font-bold text-xl">Filters</h3>
        </div>

        <Accordion type="multiple" defaultValue={["category", "size"]} className="w-full">
          {filterGroups.map((group) => (
            <AccordionItem key={group.id} value={group.id} className="border-b-neutral-200">
              <AccordionTrigger className="hover:no-underline py-3 text-base font-semibold text-neutral-700">
                {group.label}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1 pb-2">
                  {group.data.map((item) => {
                    const isActive = searchParams.get(group.id) === item.name;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleFilter(group.id, item.name)}
                        className={cn(
                          "flex items-center justify-between w-full text-sm py-2 px-3 rounded-md transition-colors text-left",
                          isActive 
                            ? "bg-primary/10 text-primary font-bold" 
                            : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                        )}
                      >
                        <span>{item.name}</span>
                        {isActive && <Check size={16} />}
                      </button>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* CONTENT (GRID & HEADER) */}
      <div className="flex-1">
        
        {/* Breadcrumbs & Header */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Home size={14} />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} />
            <span className="font-medium text-neutral-800">Menu</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-100 pb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-black text-primary capitalize">
                {searchQuery ? `Search: "${searchQuery}"` : (searchParams.get("category") || "Full Menu")}
              </h1>
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {activeFilters.map(([key, value]) => (
                    <Badge
                      key={key}
                      variant="secondary"
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 gap-2 cursor-pointer border border-primary/10"
                      onClick={() => removeFilter(key)}
                    >
                      <span className="capitalize">{key}: {value}</span>
                      <X size={12} />
                    </Badge>
                  ))}
                  <button 
                    onClick={clearFilters} 
                    className="text-xs text-red-500 hover:underline font-medium px-2"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
            <p className="text-neutral-500 text-sm font-medium whitespace-nowrap">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Result' : 'Results'}
            </p>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <PopularContent key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-400 gap-4 bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
            <Frown size={64} strokeWidth={1.5} />
            <h3 className="text-xl font-medium text-neutral-600">No products found</h3>
            <p className="text-center max-w-xs text-sm">
              We couldn't find any items matching your filters or search. Try adjusting them or search for something else.
            </p>
            <Button onClick={clearFilters} variant="outline" className="mt-4">
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuClient;