"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/features/products/types"
import { useProducts } from "./use-products"

export function useProduct(id: string) {
  const { products, isLoading: isProductsLoading } = useProducts()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (isProductsLoading) return

    // Simulate API call with a delay
    const fetchProduct = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 300))
        const foundProduct = products.find((p) => p.id === id)

        if (foundProduct) {
          setProduct(foundProduct)
        } else {
          throw new Error("Product not found")
        }

        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch product"))
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id, products, isProductsLoading])

  return { product, isLoading, error }
}
