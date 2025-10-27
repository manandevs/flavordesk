"use client";

import { Product } from "@/types-db";
import React, { FC, useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import {
  UtensilsCrossed,
  Salad,
  Package,
  Tag,
  DollarSign,
  ShoppingBag,
} from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useCart } from "@/hooks/use-cart";
import toast from "react-hot-toast";

interface InfoProps {
  product: Product;
}

const Info: FC<InfoProps> = ({ product }) => {
  const cart = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const existingItem = cart.items.find((item) => item.id === product.id);
    if (existingItem?.qty) {
      setQty(existingItem.qty);
    }
  }, [cart.items, product.id]);

  const handleQty = (num: number) => {
    setQty(num);
    const existingItem = cart.items.find((item) => item.id === product.id);
    if (existingItem) {
      cart.updateItemQuantity(product.id, num);
      toast.success(`Quantity updated to x${num}`);
    }
  };

  const addToCart = (data: Product) => {
    const existingItem = cart.items.find((item) => item.id === data.id);

    if (existingItem) {
      toast.error(`${data.name} is already in the cart`);
      return;
    }

    cart.addItem({ ...data, qty });
    toast.success(`${data.name} added to cart (x${qty})`);
  };

  return (
    <div className="w-full space-y-6">
      {/* === Product Name === */}
      <h1 className="text-3xl font-semibold text-neutral-700">
        {product.name}
      </h1>

      {/* === Description === */}
      <p className="text-base text-left text-neutral-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores neque
        magni eos quisquam et quibusdam facere doloremque facilis ipsum iusto
        nesciunt sed porro laborum voluptates delectus illo fugiat ratione
        aliquid.
      </p>

      {/* === Badges Section === */}
      <div className="mt-6 flex w-full flex-wrap items-center gap-3">
        {product.category && (
          <Badge className="flex items-center gap-2 rounded-full bg-[#5fb7006e] px-3 py-1 capitalize text-white">
            <Tag className="h-4 w-4" />
            {product.category}
          </Badge>
        )}

        {product.size && (
          <Badge className="flex items-center gap-2 rounded-full bg-[#007bff6e] px-3 py-1 capitalize text-white">
            <Package className="h-4 w-4" />
            {product.size.length > 15
              ? product.size.slice(0, 15) + "..."
              : product.size}
          </Badge>
        )}

        {product.kitchen && (
          <Badge className="flex items-center gap-2 rounded-full bg-[#ff7b0073] px-3 py-1 capitalize text-white">
            <UtensilsCrossed className="h-4 w-4" />
            {product.kitchen}
          </Badge>
        )}

        {product.cuisine && (
          <Badge className="flex items-center gap-2 rounded-full bg-[#b7005f6e] px-3 py-1 capitalize text-white">
            <Salad className="h-4 w-4" />
            {product.cuisine}
          </Badge>
        )}
      </div>

      {/* === Table Info === */}
      <Table>
        <TableBody>
          <TableRow className="border-none">
            <TableCell className="text-lg font-medium text-gray-600">
              Price
            </TableCell>
            <TableCell>
              {product.price && (
                <div className="flex items-center gap-2 text-xl font-semibold text-neutral-800">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  ${product.price.toFixed(2)}
                </div>
              )}
            </TableCell>
          </TableRow>

          <TableRow className="border-none">
            <TableCell className="text-lg font-medium text-gray-600">
              Serves
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 flex-wrap">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Badge
                    key={num}
                    onClick={() => handleQty(num)}
                    className={cn(
                      "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md px-2 py-1 font-semibold shadow transition-colors",
                      qty === num
                        ? "bg-[#2a5c2a] text-white"
                        : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                    )}
                  >
                    {num}
                  </Badge>
                ))}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Button
        onClick={() => addToCart(product)}
        className="w-full rounded-none py-6 font-semibold hover:bg-[#84B74E] space-x-2"
      >
        <span>Add To Cart</span>
        <ShoppingBag className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Info;
