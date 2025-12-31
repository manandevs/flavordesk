import { Store } from "@/types-db";

const getApiRoot = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || "";
  return url.split("/stores")[0];
};

const getStores = async (): Promise<Store[]> => {
  try {
    const API_ROOT = getApiRoot();
    const res = await fetch(`${API_ROOT}/stores`, { next: { revalidate: 0 }});
    
    if(!res.ok) return [];
    
    return res.json();
  } catch (error) {
    console.error("GET_STORES_ERROR", error);
    return [];
  }
};

export default getStores;