import { Product } from '@/types-db'

const getProduct = async (id: string): Promise<Product | null> => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) return null;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return null;
    }

    const text = await res.text();
    if (!text) {
      return null;
    }

    return JSON.parse(text);
  } catch (err) {
    console.warn('[GET_PRODUCT] Error:', err);
    return null;
  }
}

export default getProduct;