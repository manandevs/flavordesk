import { Billboard } from "@/types-db";

const getBillboards = async (): Promise<Billboard[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/billboards`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    return res.json();
  } catch (error) {
    console.error("GET_BILLBOARDS_ERROR", error);
    return [];
  }
};

export default getBillboards;