"use client";

import { useState, useCallback } from "react";

interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseAsyncReturn<T, P extends unknown[]> extends AsyncState<T> {
  execute: (...params: P) => Promise<T | null>;
  reset: () => void;
}

/**
 * A hook for handling async operations with loading and error states
 */
export function useAsync<T, P extends unknown[] = []>(
  asyncFunction: (...params: P) => Promise<T>,
  immediate = false,
  initialParams?: P
): UseAsyncReturn<T, P> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });

  const execute = useCallback(
    async (...params: P) => {
      setState({ data: null, isLoading: true, error: null });
      try {
        const data = await asyncFunction(...params);
        setState({ data, isLoading: false, error: null });
        return data;
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        });
        return null;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  // Execute immediately if requested
  useState(() => {
    if (immediate && initialParams) {
      execute(...initialParams);
    }
  });

  return { ...state, execute, reset };
}
