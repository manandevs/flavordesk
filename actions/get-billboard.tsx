import { Billboard } from "@/types-db";

const getApiRoot = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || "";
  return url.split("/stores")[0];
};

const getBillboards = async (): Promise<Billboard[]> => {
  try {
    const API_ROOT = getApiRoot();
    if (!API_ROOT) return [];

    const res = await fetch(`${API_ROOT}/billboards`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) return [];

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        return [];
    }

    return res.json();
  } catch (error) {
    console.warn("GET_BILLBOARDS_ERROR", error);
    return [];
  }
};

export default getBillboards;