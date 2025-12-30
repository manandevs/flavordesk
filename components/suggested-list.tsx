import React from "react";
import { Product } from "@/types-db";
import PopularContent from "@/components/popular-content";

interface SuggestedListProps {
  products: Product[];
}

const SuggestedList: React.FC<SuggestedListProps> = ({ products }) => {
  if (products.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-serif font-bold text-primary">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <PopularContent key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedList;