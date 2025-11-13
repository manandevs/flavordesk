import { Product } from "@/types-db";
import qs from "query-string";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface Query {
  size?: string;
  isFeatured?: boolean;
  cuisine?: string;
  category?: string;
  kitchen?: string;
}

const getProducts = async (query: Query = {}): Promise<Product[]> => {
  try {
    const cleanQuery = Object.fromEntries(
      Object.entries(query).filter(([v]) => v !== undefined && v !== null)
    );

    const url = qs.stringifyUrl({
      url: `${BASE_URL}/products`,
      query: cleanQuery,
    });

    console.log("Fetching products from:", url); 

    const res = await fetch(url);

    if (!res.ok) { 
      const errorText = await res.text();
      console.error(`Fetch failed with status ${res.status}: ${errorText}`);
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default getProducts;