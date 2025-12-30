"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  ChevronRight,
  ClipboardList,
  Copy,
  Phone,
  MapPin,
  ShoppingBag,
  CheckCircle2,
  Clock,
  XCircle,
  LucideIcon
} from "lucide-react";
import toast from "react-hot-toast";

import { Order, Product } from "@/types-db";
import PopularContent from "@/components/popular-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";

interface OrderClientProps {
  orders: Order[];
  suggestedProducts: Product[];
}

// === Sub-Component: Individual Order Card ===
const OrderCard = ({ order }: { order: Order }) => {
  const [showAllItems, setShowAllItems] = useState(false);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Order ID copied");
  };

  const statusMap: Record<string, { color: "default" | "secondary" | "destructive" | "success" | "outline"; icon: LucideIcon }> = {
    delivered: { color: "success", icon: CheckCircle2 },
    pending: { color: "secondary", icon: Clock },
    cancelled: { color: "destructive", icon: XCircle },
    processing: { color: "default", icon: Clock },
  };

  const statusConfig = statusMap[order.order_status?.toLowerCase()] || statusMap.pending;
  const StatusIcon = statusConfig.icon;
  const displayedItems = showAllItems ? order.orderItems : order.orderItems?.slice(0, 2) || [];

  return (
    <Card className="border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden rounded-[1.5rem] bg-white">
      {/* Header */}
      <CardHeader className="bg-neutral-50/50 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-base font-serif font-bold text-neutral-800">
              Order #{order.id.slice(-6).toUpperCase()}
            </CardTitle>
            <CardDescription className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
              {new Date().toLocaleDateString()} {/* Replace with real date if available */}
            </CardDescription>
          </div>
          <Badge variant={statusConfig.color} className="flex items-center gap-1.5 px-3 py-1 rounded-full capitalize">
            <StatusIcon size={14} />
            {order.order_status || "Pending"}
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      {/* Content */}
      <CardContent className="pt-6 space-y-4">
        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-3 text-sm text-neutral-600">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
              <Phone size={14} />
            </div>
            <span className="font-medium">{order.phone || "No phone"}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
              <MapPin size={14} />
            </div>
            <span className="truncate" title={order.address}>{order.address || "No address"}</span>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-neutral-50 rounded-xl p-3 mt-2">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-neutral-500 uppercase tracking-wider">
            <ShoppingBag size={12} />
            Items ({order.orderItems.length})
          </div>

          <div className="space-y-3">
            {displayedItems.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="relative w-10 h-10 rounded-lg bg-white border border-neutral-100 shrink-0 overflow-hidden">
                    <Image
                      src={item.images?.[0]?.url || "/images/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-neutral-700 truncate">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-neutral-800">${item.price}</span>
              </div>
            ))}
          </div>

          {order.orderItems.length > 2 && (
            <button
              onClick={() => setShowAllItems(!showAllItems)}
              className="w-full text-center text-xs font-medium text-primary hover:underline mt-3 pt-2 border-t border-neutral-200"
            >
              {showAllItems ? "Show Less" : `+ ${order.orderItems.length - 2} more items`}
            </button>
          )}
        </div>
      </CardContent>

      <Separator />

      {/* Footer */}
      <CardFooter className="pt-4 pb-4 flex justify-between bg-neutral-50/30">
        <div className="flex flex-col">
          <span className="text-xs text-neutral-400 font-medium uppercase">Total Paid</span>
          <span className="text-lg font-serif font-bold text-primary">
            ${order.orderItems.reduce((acc, i) => acc + Number(i.price), 0).toFixed(2)}
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(order.id)}
                className="gap-2 rounded-full border-neutral-200 hover:bg-white hover:border-primary/20"
              >
                <Copy size={14} />
                <span className="text-xs">Copy ID</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy Order ID</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

// === Main Client Component ===
const OrderClient: React.FC<OrderClientProps> = ({ orders, suggestedProducts }) => {
  return (
    <div className="flex flex-col gap-10">

      {/* 1. Breadcrumbs & Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-neutral-800">Orders</span>
        </div>

        <div className="flex items-end justify-between border-b border-neutral-100 pb-6">
          <h1 className="text-3xl md:text-4xl font-serif font-black text-primary">
            Order History
          </h1>
          <p className="text-neutral-500 text-sm font-medium">
            {orders.length} {orders.length === 1 ? 'Past Order' : 'Past Orders'}
          </p>
        </div>
      </div>

      {/* 2. Orders Grid or Empty State */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-neutral-50 rounded-[2rem] border border-dashed border-neutral-200 text-center px-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
            <ClipboardList size={32} className="text-neutral-400" />
          </div>
          <h2 className="text-xl font-bold text-neutral-700 mb-2">No orders found</h2>
          <p className="text-neutral-500 max-w-sm mb-8">
            You haven&apos;t placed any orders yet. Start exploring our delicious menu to make your first purchase!
          </p>
          <Link href="/menu">
            <Button className="rounded-full px-8 h-12">Browse Menu</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      {/* 3. Suggested Products Section */}
      <div className="pt-10 border-t border-neutral-100">
        <h2 className="text-2xl font-serif font-bold text-neutral-800 mb-8">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {suggestedProducts.map((product) => (
            <PopularContent key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default OrderClient;