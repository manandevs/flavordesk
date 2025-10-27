"use client";

import React, { FC } from "react";
import { Order } from "@/types-db";
import { ClipboardCheck } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { Button } from "../ui/button";
import OrderItem from "./order-item";

interface PageContentProps {
  orders: Order[];
}

const PageContent: FC<PageContentProps> = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ClipboardCheck className="size-6 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>No Orders Found</EmptyTitle>
          <EmptyDescription>
            You haven’t placed any orders yet. Once you make a purchase, your
            orders will appear here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={() => (window.location.href = "/")}>
            Browse Products
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full rounded-lg">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default PageContent;
