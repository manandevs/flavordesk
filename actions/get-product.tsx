import { Product } from '@/types-db'

const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.log('Fetch failed:', res.status, res.statusText);
      return null;
    }

    const text = await res.text();
    if (!text) {
      console.log('Empty response body');
      return null;
    }

    return JSON.parse(text);
  } catch (err) {
    console.log('Error fetching product:', err);
    return null;
  }
}

export default getProduct;
