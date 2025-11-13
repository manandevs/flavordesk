import qs from "query-string";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type FilterQuery = {
  [key: string]: string | boolean | number | undefined | null;
};

export async function getFilterOptions<T>(
  endpoint: string,
  query: FilterQuery = {}
): Promise<T[]> {
  try {
    const cleanQuery = Object.fromEntries(
      Object.entries(query).filter(
        ([value]) => value !== undefined && value !== null
      )
    );

    const url = qs.stringifyUrl({
      url: `${BASE_URL}/${endpoint}`,
      query: cleanQuery,
    });

    const res = await fetch(url);

    const data: T[] = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}
