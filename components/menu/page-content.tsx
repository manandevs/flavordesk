"use client";

import React, { FC, Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Product } from "@/types-db";
import Box from "../box";
import Link from "next/link";
import { ChevronRight, Home, X } from "lucide-react";
import { Badge } from "../ui/badge";
import PopularContent from "../popular-content";

interface PageContentProps {
  products: Product[];
}

const PageContent: FC<PageContentProps> = ({ products }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentParams = Object.fromEntries(searchParams.entries());

  const handleClick = (param: string) => {
    if (currentParams.hasOwnProperty(param)) {
      const newParams = { ...currentParams };
      delete newParams[param];

      const url = qs.stringifyUrl({
        url: "/menu",
        query: newParams,
      });

      router.push(url);
    }
  };

  const displayProducts = products;
  const activeFilters = Object.entries(currentParams).filter(
    ([key]) => key !== "isFeatured"
  );


  return (
    <Fragment>
      <Box className="flex flex-col items-start pb-24">
        {/* === Breadcrumb === */}
        <Box className="text-neutral-700 text-sm flex items-center justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Main Page
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/menu" className="flex items-center gap-2">
            Products
          </Link>

          {searchParams.get("category") && (
            <>
              <ChevronRight className="w-4 h-4" />
              <Link href="/menu" className="flex items-center gap-2 capitalize">
                {searchParams.get("category")}
              </Link>
            </>
          )}
        </Box>

        <Box className="mt-8 flex flex-col items-start w-full">
          <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-neutral-600 capitalize">
            {searchParams.get("category") || "ALL"}
          </h2>

          <Box className="gap-3 mt-4 flex flex-wrap items-center justify-start pl-5">
            {activeFilters.map(([key, value]) => (
              <Badge
                key={key}
                onClick={() => handleClick(key)}
                className="px-4 py-1 cursor-pointer shadow hover:shadow-md bg-[#5fb7006e] text-white flex items-center gap-1 rounded-full"
              >
                {String(value)}
                <X className="w-4 h-4" />
              </Badge>
            ))}
          </Box>
        </Box>
      </Box>

      {/* === Product Grid === */}
      <Box className="w-full flex flex-wrap justify-center space-y-24 gap-6">
        {displayProducts.length > 0 ? (
          displayProducts.map((product) => (
            <PopularContent key={product.id} product={product} />
          ))
        ) : (
          <p className="text-neutral-500 text-center py-10">
            No products found.
          </p>
        )}
      </Box>
    </Fragment>
  );
};

export default PageContent;