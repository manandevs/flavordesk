"use client";

import React, { FC, useState } from "react";
import { Order } from "@/types-db";
import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
   CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Tooltip,
   TooltipTrigger,
   TooltipContent,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
   Copy,
   MapPin,
   Phone,
   ShoppingBag,
} from "lucide-react";
import toast from "react-hot-toast";

interface OrderItemProps {
   order: Order;
}

const OrderItem: FC<OrderItemProps> = ({ order }) => {
   const [showAllItems, setShowAllItems] = useState(false);

   const handleCopy = (id: string) => {
      navigator.clipboard.writeText(id);
      toast.success("Order ID copied 📋");
   };

   const isPaid = order.isPaid;
   const statusColor =
      order.order_status === "delivered"
         ? "success"
         : order.order_status === "pending"
            ? "secondary"
            : order.order_status === "cancelled"
               ? "destructive"
               : "outline";

   const displayedItems = showAllItems
      ? order.orderItems
      : order.orderItems?.slice(0, 2) || [];

   return (
      <Card className="shadow-sm hover:shadow-md transition border border-border bg-card text-foreground">
         {/* Header */}
         <CardHeader>
            <div className="flex items-center justify-between">
               <CardTitle className="text-sm font-semibold truncate">
                  {order.name || "Order"} #{order.id.slice(0, 8)}
               </CardTitle>
               <Badge
                  variant={isPaid ? "success" : "destructive"}
                  className="capitalize"
               >
                  {isPaid ? "Paid" : "Unpaid"}
               </Badge>
            </div>
            <CardDescription className="text-xs text-muted-foreground mt-1">
               Order Status:{" "}
               <Badge variant={statusColor} className="capitalize">
                  {order.order_status || "pending"}
               </Badge>
            </CardDescription>
         </CardHeader>

         <Separator />

         {/* Main Details */}
         <CardContent className="mt-4 space-y-3 text-sm">
            <div className="flex items-center gap-2">
               <Phone className="w-4 h-4 text-muted-foreground" />
               <span>{order.phone || "No phone provided"}</span>
            </div>

            <div className="flex items-center gap-2">
               <MapPin className="w-4 h-4 text-muted-foreground" />
               <Tooltip>
                  <TooltipTrigger asChild>
                     <span className="truncate max-w-[180px] cursor-help">
                        {order.address || "No address provided"}
                     </span>
                  </TooltipTrigger>
                  <TooltipContent>
                     {order.address || "No address available"}
                  </TooltipContent>
               </Tooltip>
            </div>

            {/* Products */}
            {order.orderItems && order.orderItems.length > 0 && (
               <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                     <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                     <span className="font-medium">Items:</span>
                  </div>
                  <ul className="space-y-2">
                     {displayedItems.map((product) => (
                        <li
                           key={product.id}
                           className="flex items-center justify-between border rounded-md p-2 text-sm hover:bg-muted transition"
                        >
                           <div className="flex items-center gap-2 truncate">
                              <img
                                 src={product.images?.[0]?.url || "/placeholder.png"}
                                 alt={product.name}
                                 className="w-8 h-8 rounded-md object-cover border"
                              />
                              <span className="truncate max-w-[120px]">
                                 {product.name}
                              </span>
                           </div>
                           <Badge variant="outline">${product.price}</Badge>
                        </li>
                     ))}
                  </ul>

                  {/* Show more / Show less toggle */}
                  {order.orderItems.length > 2 && (
                     <div className="mt-2">
                        <Button
                           variant="ghost"
                           size="sm"
                           className="text-xs text-primary hover:underline px-0"
                           onClick={() => setShowAllItems((prev) => !prev)}
                        >
                           {showAllItems ? "Show Less" : `Show ${order.orderItems.length - 2} More`}
                        </Button>
                     </div>
                  )}
               </div>
            )}
         </CardContent>

         <Separator />

         {/* Footer */}
         <CardFooter className="pt-3 flex justify-between items-center">
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={() => handleCopy(order.id)}
                     className="text-xs"
                  >
                     <Copy className="w-3.5 h-3.5 mr-1" />
                     Copy ID
                  </Button>
               </TooltipTrigger>
               <TooltipContent>Copy order ID</TooltipContent>
            </Tooltip>

            <Badge variant="secondary" className="text-xs px-3 py-1">
               {order.orderItems?.length || 0} Items
            </Badge>
         </CardFooter>
      </Card>
   );
};

export default OrderItem;
