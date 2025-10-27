"use client";

import { useCart } from "@/hooks/use-cart";
import { useSearchParams } from "next/navigation";
import React, { FC, Fragment, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { CircleAlertIcon } from "lucide-react";
import CartItem from "./cart-item";
import Summary from "./summary";
import { Separator } from "../ui/separator";

interface CartContentProps {
  userId: string | null;
}

const CartContent: FC<CartContentProps> = ({ userId }) => {
  const cart = useCart();
  const searchParams = useSearchParams();

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.price * (item.qty || 1),
    0
  );

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment Completed");
      cart.removeAll(); 
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams]);
  return (
    <Fragment>
      <div className="w-full flex items-center justify-between gap-6">
        <h2 className="text-3xl font-semibold text-neutral-700">
          Cart Items
        </h2>
        <Button variant="destructive" onClick={cart.removeAll}>
          Clear
          <CircleAlertIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <Separator className="my-4" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-8 gap-6">
        <div className="lg:col-span-5 space-y-4">
          {cart.items.length > 0 ? (
            cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))
          ) : (
            <p className="text-center text-neutral-500 py-6 border rounded-lg bg-gray-50">
              Your cart is empty.
            </p>
          )}
        </div>

        <div className="lg:col-span-3">
          <Summary />
        </div>
      </div>
    </Fragment>
  );
};

export default CartContent;
