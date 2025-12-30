import React from "react";
import { auth } from "@clerk/nextjs/server";
import getOrders from "@/actions/get-orders";
import getProducts from "@/actions/get-products";
import Container from "@/components/container";
import OrderClient from "./components/order-client";

export const revalidate = 0;

const OrdersPage = async () => {
   // 1. Fetch User
   const { userId } = await auth();

   // 2. Fetch Data Parallelly
   const [orders, allProducts] = await Promise.all([
      getOrders(),
      getProducts()
   ]);

   // 3. Filter orders for current user
   const userOrders = orders.filter((order) => order.userId === userId);

   // 4. Get random suggestions (simple randomization)
   const suggestedProducts = allProducts
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

   return (
      <Container className="px-4 sm:px-6 lg:px-12 pb-24 pt-24 md:pt-32">
         <OrderClient orders={userOrders} suggestedProducts={suggestedProducts} />
      </Container>
   );
};

export default OrdersPage;