"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  //  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import qs from "query-string";

const StoreSearch = () => {
  const router = useRouter();
  // const [storeName, setStoreName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const onSearch = () => {
    // Push query params to /menu page
    const query = {
      // store: storeName || null,
      search: searchQuery || null,
    };

    const url = qs.stringifyUrl(
      {
        url: "/menu",
        query: query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <section className="-mt-12 md:-mt-24 relative z-20 px-2 md:px-10">
      <div className="bg-white p-3 rounded-[2rem] shadow-xl border border-primary/5 flex flex-col md:flex-row gap-3 items-center max-w-5xl mx-auto">

        {/* Store Name Input */}
        {/* <div className="flex-1 w-full bg-[#F9F6F3] rounded-[1.5rem] px-6 py-4 flex items-center gap-3 hover:bg-[#F0EBE5] transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10">
          <MapPin className="text-primary w-5 h-5 shrink-0" />
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Delivery Location (Store Name)..."
            className="bg-transparent w-full outline-none text-primary placeholder:text-primary/50 font-medium"
          />
        </div> */}

        {/* Food Name Input */}
        <div className="flex-[1.5] w-full bg-[#F9F6F3] rounded-[1.5rem] px-6 py-4 flex items-center gap-3 hover:bg-[#F0EBE5] transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10">
          <Search className="text-primary w-5 h-5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for food, categories..."
            className="bg-transparent w-full outline-none text-primary placeholder:text-primary/50 font-medium"
          />
        </div>

        <Button
          onClick={onSearch}
          className="w-full md:w-auto h-14 px-8 rounded-[1.5rem] bg-primary text-[#E8DCCF] text-lg font-bold hover:bg-primary/90 transition-transform active:scale-95"
        >
          Search
        </Button>
      </div>
    </section>
  );
};

export default StoreSearch;