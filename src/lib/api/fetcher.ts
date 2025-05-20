import { ApiResponse } from "../types/api-response";

/**
 * A fetcher function that wraps the native `fetch` API and adds Next.js
 * App Router SSR caching support.
 *
 * @param {string} url - The URL to fetch
 * @param {RequestInit & { revalidate?: number | false }} [options] - The
 *   `fetch` options plus an optional `revalidate` property to control
 *   Next.js App Router SSR caching.
 * @returns {Promise<T>} - The response body as JSON
 */
export async function fetcher<T>(
  url: string,
  options?: RequestInit & { revalidate?: number | false }
): Promise<ApiResponse<T>> {
  const revalidate = options?.revalidate;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    // Next.js App Router SSR caching
    next: {
      revalidate: typeof revalidate === "number" ? revalidate : 0,
    },
    cache: revalidate === false ? "no-store" : "force-cache",
  });

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.statusText}`);
  }

  return res.json();
}
