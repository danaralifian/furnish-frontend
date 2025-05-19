import useSWR, { SWRConfiguration } from "swr";

/**
 * React hook that wraps SWR to handle fetching data from an API.
 * @param key a unique key to identify the data
 * @param fetcher a function that performs the actual fetch of the data
 * @param options additional options to pass to SWR
 * @returns an object with three properties: `data` the fetched data, `isLoading` a boolean indicating whether the data is currently being fetched, and `isError` a boolean indicating whether there was an error fetching the data
 */
export function useFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: SWRConfiguration
) {
  const { data, error } = useSWR(key, fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 30000, // 30 seconds before refetch
    cache: "default",
    ...options,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
