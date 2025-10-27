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
      Object.entries(query).filter(([_, v]) => v !== undefined && v !== null)
    );

    // Build URL with query string
    const url = qs.stringifyUrl({
      url: `${BASE_URL}/products`,
      query: cleanQuery,
    });

    const res = await fetch(url);

    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; 
  }
};

export default getProducts;
