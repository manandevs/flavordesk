"use client";

import { Product } from "@/types-db";
import { BadgeDollarSignIcon, CloudAlertIcon, X } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";
import { Button } from "../ui/button";
import { useCart } from "@/hooks/use-cart";
import { Badge } from "../ui/badge";
import { formatPrice, cn } from "@/lib/utils";

interface CartItemProps {
  item: Product;
}

const CartItem: FC<CartItemProps> = ({ item }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(item.id);
  };

  const handleQty = (num: number) => {
    cart.updateItemQuantity(item.id, num);
  };

  const imageSrc = item.images?.[0]?.url;
  const qty = item.qty || 1;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full border border-gray-200 p-4 rounded-lg bg-white shadow-sm">
      {/* === Image Section === */}
      <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-50">
        {imageSrc ? (
          <Image
            fill
            src={imageSrc}
            alt={item.name}
            className="object-cover object-center"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* === Details Section === */}
      <div className="flex-1 flex flex-col justify-between items-start w-full sm:w-auto">
        <h3 className="text-lg sm:text-xl font-semibold text-neutral-700 truncate max-w-[180px] sm:max-w-[220px]">
          {item.name}
        </h3>

        <div className="flex items-center flex-wrap gap-2 mt-1">
          {item.category && (
            <Badge
              variant="secondary"
              className="rounded-md bg-blue-500/10 px-2 py-[2px] text-[11px] font-medium capitalize"
            >
              {item.category.length > 7
                ? item.category.slice(0, 7) + "..."
                : item.category}
            </Badge>
          )}
          {item.size && (
            <Badge
              variant="secondary"
              className="rounded-md bg-yellow-500/10 px-2 py-[2px] text-[11px] font-medium capitalize"
            >
              {item.size.length > 7
                ? item.size.slice(0, 7) + "..."
                : item.size}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col justify-between items-end">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-neutral-700">
              Qty:
            </p>
            {[1, 2, 3, 4, 5].map((num) => (
              <Badge
                key={num}
                onClick={() => handleQty(num)}
                className={cn(
                  "flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm p-0.5 font-semibold shadow transition-colors",
                  qty === num
                    ? "bg-[#2a5c2a] text-white"
                    : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                )}
              >
                {num}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={onRemove}
            variant={"outline"}
            className="text-sm rounded-sm py-1 relative"
          >
            <Badge
              variant={"outline"}
              className="absolute -bottom-3 -left-3 text-[8px] rounded-full bg-white"
            >
              CheckOut
            </Badge>
            {formatPrice(item.price * qty)}
            <BadgeDollarSignIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={onRemove}
            className="text-sm rounded-sm py-1"
          >
            Remove
            <CloudAlertIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
