import React from "react";
import Container from "@/components/container";
import MenuClient from "./components/menu-client";
import getProducts from "@/actions/get-products";
import { getFilterOptions } from "@/actions/get-filter-options";
import { Category, Size, Kitchen, Cuisine } from "@/types-db";

export const revalidate = 0;

interface MenuPageProps {
  searchParams: Promise<{
    size?: string;
    isFeatured?: string;
    category?: string;
    kitchen?: string;
    cuisine?: string;
  }>;
}

const MenuPage = async ({ searchParams }: MenuPageProps) => {
  // Await params (Next.js 15 requirement)
  const params = await searchParams;
  
  const query = {
    size: params.size,
    category: params.category,
    kitchen: params.kitchen,
    cuisine: params.cuisine,
    isFeatured: params.isFeatured === "true" ? true : undefined,
  };

  // Fetch all data in parallel for performance
  const [products, categories, sizes, kitchens, cuisines] = await Promise.all([
    getProducts(query),
    getFilterOptions<Category>("categories"),
    getFilterOptions<Size>("sizes"),
    getFilterOptions<Kitchen>("kitchens"),
    getFilterOptions<Cuisine>("cuisines"),
  ]);

  return (
    <Container className="px-4 sm:px-6 lg:px-12 pb-24 pt-24 md:pt-32">
      <MenuClient 
        products={products}
        categories={categories}
        sizes={sizes}
        kitchens={kitchens}
        cuisines={cuisines}
      />
    </Container>
  );
};

export default MenuPage;