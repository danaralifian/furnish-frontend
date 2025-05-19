"use client";

import { useState, useCallback } from "react";
import { useToast } from "./use-toast";

interface UseFormSubmitOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

interface UseFormSubmitReturn<T, P> {
  isSubmitting: boolean;
  handleSubmit: (values: P) => Promise<T | null>;
}

/**
 * A hook for handling form submissions with loading state and toast notifications
 */
export function useFormSubmit<T, P = unknown>(
  submitFn: (values: P) => Promise<T>,
  options: UseFormSubmitOptions<T> = {}
): UseFormSubmitReturn<T, P> {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (values: P) => {
      setIsSubmitting(true);
      try {
        const result = await submitFn(values);

        if (options.successMessage) {
          toast({
            title: "Success",
            description: options.successMessage,
          });
        }

        if (options.onSuccess) {
          options.onSuccess(result);
        }

        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));

        if (options.errorMessage) {
          toast({
            title: "Error",
            description: options.errorMessage,
            variant: "destructive",
          });
        }

        if (options.onError) {
          options.onError(err);
        }

        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    [submitFn, options, toast]
  );

  return { isSubmitting, handleSubmit };
}
