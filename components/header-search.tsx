"use client";

import React, { FC, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import clsx from "clsx";
import getProducts from "@/actions/get-products";
import { Product } from "@/types-db";
import Image from "next/image";
import Link from "next/link";

interface HeaderSearchProps {
  placeholder?: string;
}

const HeaderSearch: FC<HeaderSearchProps> = ({ placeholder = "Search..." }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch featured products initially or when modal opens
  useEffect(() => {
    if (!open) {
      // Clear query and products when closing the search
      setQuery("");
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch all products to allow searching across them, not just featured
        const data = await getProducts({}); // Fetch all products
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [open]);

  // Filter products by search query (debounced filtering could be added for performance)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleLinkClick = () => {
    setOpen(false); // Close the modal when a product link is clicked
  };

  return (
    <div className="relative">
      {/* Search Button */}
      <button
        onClick={() => setOpen(true)}
        className="text-gray-700 hover:text-black flex items-center gap-2"
        aria-label="Open search"
      >
        <Search size={22} />
      </button>

      {/* Fullscreen Search Modal */}
      {open && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 overflow-y-auto animate-fadeIn">
          <div className="max-w-5xl mx-auto px-4 py-6">
            {/* === Search Bar === */}
            <div className="flex items-center justify-between mb-8">
              <div
                className={clsx(
                  "flex items-center w-full max-w-2xl mx-auto bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm"
                )}
              >
                <Search size={20} className="text-gray-500" />
                <input
                  type="text"
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 px-3 py-2 text-gray-700 outline-none"
                  autoFocus // Automatically focus the input when modal opens
                />
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-black p-1" // Added padding for easier clicking
                  aria-label="Close search"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* === Product Results === */}
            <div className="text-center space-y-8">
              {loading ? (
                <p className="text-gray-500">Loading products...</p>
              ) : filteredProducts.length > 0 ? (
                <>
                  <h3 className="font-medium text-gray-700">
                    {query ? `Results for "${query}"` : "All Products"}
                  </h3> {/* Changed to "All Products" when no query */}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {filteredProducts.map((item) => (
                      <Link
                        href={`/menu/${item.id}`}
                        key={item.id}
                        onClick={handleLinkClick} // Use the new handler
                        className="text-center hover:opacity-90 transition block" // Added block for better click area
                      >
                        <div className="bg-gray-50 rounded-xl overflow-hidden mb-2 aspect-square relative">
                          <Image
                            src={
                              item.images?.[0]?.url || "/images/placeholder.png"
                            }
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Added sizes for better image optimization
                          />
                        </div>
                        <p className="text-sm text-gray-700 truncate px-1">
                          {item.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-500">
                  {query
                    ? `No products found matching "${query}".` // More specific message
                    : "No products available at the moment."}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSearch