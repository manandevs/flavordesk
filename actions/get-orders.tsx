import { Order } from "@/types-db";

const getOrders = async (): Promise<Order[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch orders:", res.status, res.statusText);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("⚠️ Invalid response format — expected an array.");
      return [];
    }

    return data as Order[];
  } catch (error) {
    console.error("⚠️ Error fetching orders:", error);
    return [];
  }
};

export default getOrders;
