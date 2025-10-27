"use client";

import React, { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Separator } from "../ui/separator";
import { DollarSign, PrinterCheck } from "lucide-react";
import axios from "axios";

export default function Summary() {
  const cart = useCart();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.price * (item.qty || 1),
    0
  );

  const onCheckout = async () => {
    if (!user) {
      toast.error("Please log in to proceed to checkout.");
      return;
    }

    if (cart.items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          products: cart.items,
          userId: user.id,
        }
      );

      toast.success("Checkout simulation successful! Order placed.");
      window.location.href = res.data.url; 
      cart.removeAll();
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl inline-block w-full max-w-md bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
      <h2 className="text-xl font-semibold text-neutral-800 pb-4">
        Order Summary
      </h2>
      <Separator />

      <div className="mt-6 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left text-sm font-semibold text-gray-700">
                Item
              </TableHead>
              <TableHead className="text-center text-sm font-semibold text-gray-700">
                Qty
              </TableHead>
              <TableHead className="text-right text-sm font-semibold text-gray-700">
                Price
              </TableHead>
              <TableHead className="text-right text-sm font-semibold text-gray-700">
                Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.items.length > 0 ? (
              cart.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-gray-800 font-medium">
                    {item.name.length > 15
                      ? item.name.slice(0, 14) + "..."
                      : item.name}
                  </TableCell>
                  <TableCell className="text-center text-gray-600">
                    {item.qty || 1}
                  </TableCell>
                  <TableCell className="text-right text-gray-600">
                    <p className="flex items-center justify-center">
                      <DollarSign className="w-3 h-3 mr-0.5" />
                      {item.price.toFixed(2)}
                    </p>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-800">
                    <p className="flex items-center justify-center">
                      <DollarSign className="w-3 h-3 mr-0.5" />
                      {formatPrice(item.price * (item.qty || 1))}
                    </p>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-gray-500 py-4"
                >
                  No items in your cart.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Separator />
      <div className="mt-6 mb-2 flex items-center justify-between text-base font-medium text-neutral-700">
        <div>Total</div>
        <p className="flex items-center justify-center">
          <DollarSign className="w-4 h-4 mr-1" />
          {formatPrice(totalPrice)}
        </p>
      </div>
      <Separator />

      <div className="flex items-center justify-end">
        <Button
          onClick={onCheckout}
          disabled={cart.items.length === 0 || loading}
          className="mt-4 hover:bg-[#84B74E]"
        >
          {loading ? (
            <p className="flex justify-center items-center space-x-6">
              <PrinterCheck /> Processing...
            </p>
          ) : (
            <p className="flex justify-center items-center space-x-6">
              <DollarSign /> Checkout
            </p>
          )}
        </Button>
      </div>

      {!user && (
        <p className="text-center text-sm text-red-500 mt-2">
          * Please log in to complete your order.
        </p>
      )}
    </div>
  );
}
