import React from "react";
import Container from "@/components/container";
import MenuClient from "./components/menu-client";
import getProducts from "@/actions/get-products";
import getStores from "@/actions/get-stores"; 
import { getFilterOptions } from "@/actions/get-filter-options";
import { Category, Size, Kitchen, Cuisine, Billboard } from "@/types-db";
import StoreSearch from "@/components/store-search";

export const revalidate = 0;

interface MenuPageProps {
  searchParams: Promise<{
    size?: string;
    isFeatured?: string;
    category?: string;
    kitchen?: string;
    cuisine?: string;
    search?: string;
    store?: string; // Receive Store Name
  }>;
}

const MenuPage = async ({ searchParams }: MenuPageProps) => {
  const params = await searchParams;
  let targetStoreId: string | undefined = undefined;

  // 1. If 'store' param exists, try to find the ID
  if (params.store) {
    const stores = await getStores();
    const foundStore = stores.find(
      (s) => s.name.toLowerCase() === params.store?.toLowerCase()
    );
    if (foundStore) {
      targetStoreId = foundStore.id;
    }
  }

  // 2. Fetch Data
  const [products, categories, sizes, kitchens, cuisines, billboards] = await Promise.all([
    getProducts({
      size: params.size,
      category: params.category,
      kitchen: params.kitchen,
      cuisine: params.cuisine,
      isFeatured: params.isFeatured === "true" ? true : undefined,
      storeId: targetStoreId, // Pass ID if found, else undefined (fetches global)
    }),
    getFilterOptions<Category>("categories"),
    getFilterOptions<Size>("sizes"),
    getFilterOptions<Kitchen>("kitchens"),
    getFilterOptions<Cuisine>("cuisines"),
    getFilterOptions<Billboard>("billboards"),
  ]);

  // 3. Filter by Search Query locally (if provided)
  const filteredProducts = params.search 
    ? products.filter(p => 
        p.name.toLowerCase().includes(params.search!.toLowerCase()) || 
        (p.category && p.category.toLowerCase().includes(params.search!.toLowerCase()))
      )
    : products;

  return (
    <Container className="px-4 sm:px-6 lg:px-12 pb-24 pt-52">
      <StoreSearch />
      <div className="mb-8">
        {params.store && (
             <h2 className="text-2xl font-bold text-primary mb-2">
                Viewing Menu: {targetStoreId ? params.store : `"${params.store}" not found (Showing all)`}
             </h2>
        )}
      </div>
      <MenuClient 
        products={filteredProducts}
        categories={categories}
        sizes={sizes}
        kitchens={kitchens}
        cuisines={cuisines}
        billboards={billboards}
      />
    </Container>
  );
};

export default MenuPage;