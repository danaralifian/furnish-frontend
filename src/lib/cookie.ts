// Import cookies only if server-side
const isServer = typeof window === "undefined";
let serverCookies:
  | (() => Map<string, { value: string }> | undefined)
  | undefined;

if (isServer) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  serverCookies = require("next/headers").cookies;
}

// Interface for cookie options
export interface CookieOptions {
  path?: string;
  maxAge?: number; // Max age in seconds
  secure?: boolean;
  httpOnly?: boolean;
  domain?: string; // Add domain option
}

/**
 * Safely parse JSON strings.
 */
function safeJsonParse<T>(value: string, defaultValue: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Get a cookie value.
 * @param name - Cookie name
 * @param defaultValue - Default value if the cookie does not exist
 * @returns Cookie value or defaultValue
 */
export function getCookie<T>(name: string, defaultValue: T): T {
  if (isServer && serverCookies) {
    // Server-side using `next/headers`
    const cookieStore = serverCookies();
    const cookieValue = cookieStore?.get(`__${name}__`)?.value;
    return cookieValue
      ? safeJsonParse<T>(cookieValue, defaultValue)
      : defaultValue;
  } else {
    // Client-side using `document.cookie`
    const match = document.cookie.match(
      new RegExp(`(?:^|; )__${name}__=([^;]*)`)
    );
    return match
      ? safeJsonParse<T>(decodeURIComponent(match[1] || ""), defaultValue)
      : defaultValue;
  }
}

/**
 * @param name - Cookie name
 * @param value - Cookie value
 * @param options - Cookie options
 */
export function setCookie(
  name: string,
  value: string | number | object,
  options?: CookieOptions
): void {
  if (isServer) {
    console.warn(
      "Setting cookies directly from the server-side is not supported. Use API routes or middleware for this."
    );
  } else {
    let cookieString = `${encodeURIComponent(
      `__${name}__`
    )}=${encodeURIComponent(JSON.stringify(value))}`;

    // Apply options
    if (options?.maxAge) {
      cookieString += `; max-age=${options.maxAge}`;
    }
    if (options?.path) {
      cookieString += `; path=${options.path}`;
    }
    if (options?.secure) {
      cookieString += `; secure`;
    }
    if (options?.domain) {
      cookieString += `; domain=${options.domain}`;
    }
    if (options?.httpOnly) {
      cookieString += `; HttpOnly`;
    }

    document.cookie = cookieString;
  }
}

/**
 * @param name - Cookie name
 * @param path - Path for the cookie (default: "/")
 */
export function removeCookie(name: string, path: string = "/"): void {
  if (isServer) {
    console.warn(
      "Removing cookies directly from the server-side is not supported. Use API routes or middleware for this."
    );
  } else {
    document.cookie = `${encodeURIComponent(
      `__${name}__`
    )}=; path=${path}; max-age=0; domain=${location.hostname}`;
  }
}
