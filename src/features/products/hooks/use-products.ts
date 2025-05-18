"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/features/products/types"

// Mock data for products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Asgaard Sofa",
    description: "A beautiful and comfortable sofa with a modern design. Perfect for any living room.",
    price: 199.99,
    salePrice: 149.99,
    onSale: true,
    image: "/placeholder.svg?height=600&width=600",
    category: "sofas",
    vendor: "Furnish",
    rating: 4.5,
    reviewCount: 12,
    sku: "SOFA-001",
    inStock: true,
    createdAt: "2023-01-15T00:00:00.000Z",
    specifications: {
      dimensions: "W180 x D80 x H90 cm",
      material: "Fabric, Wood",
      weight: "45 kg",
      assembly: "Required",
    },
  },
  {
    id: "2",
    name: "Syltherine Table",
    description: "Stylish coffee table with a minimalist design. Made from high-quality materials.",
    price: 149.99,
    salePrice: null,
    onSale: false,
    image: "/placeholder.svg?height=600&width=600",
    category: "tables",
    vendor: "Furnish",
    rating: 4.2,
    reviewCount: 8,
    sku: "TABLE-001",
    inStock: true,
    createdAt: "2023-02-10T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Leviosa Desk",
    description: "Modern desk with ample storage space. Perfect for home office or study.",
    price: 249.99,
    salePrice: 199.99,
    onSale: true,
    image: "/placeholder.svg?height=600&width=600",
    category: "tables",
    vendor: "Furnish",
    rating: 4.8,
    reviewCount: 15,
    sku: "DESK-001",
    inStock: true,
    createdAt: "2023-03-05T00:00:00.000Z",
  },
  {
    id: "4",
    name: "Lolito Chair",
    description: "Comfortable chair with a sleek design. Perfect for dining or as an accent piece.",
    price: 99.99,
    salePrice: null,
    onSale: false,
    image: "/placeholder.svg?height=600&width=600",
    category: "chairs",
    vendor: "Furnish",
    rating: 4.0,
    reviewCount: 10,
    sku: "CHAIR-001",
    inStock: true,
    createdAt: "2023-04-20T00:00:00.000Z",
  },
  {
    id: "5",
    name: "Respira Bookshelf",
    description: "Spacious bookshelf with a modern design. Perfect for displaying books and decorative items.",
    price: 299.99,
    salePrice: 249.99,
    onSale: true,
    image: "/placeholder.svg?height=600&width=600",
    category: "storage",
    vendor: "Furnish",
    rating: 4.6,
    reviewCount: 18,
    sku: "SHELF-001",
    inStock: true,
    createdAt: "2023-05-15T00:00:00.000Z",
  },
  {
    id: "6",
    name: "Grifo Nightstand",
    description: "Elegant nightstand with storage drawer. Perfect for bedside essentials.",
    price: 89.99,
    salePrice: null,
    onSale: false,
    image: "/placeholder.svg?height=600&width=600",
    category: "storage",
    vendor: "Furnish",
    rating: 4.3,
    reviewCount: 7,
    sku: "NIGHT-001",
    inStock: true,
    createdAt: "2023-06-10T00:00:00.000Z",
  },
  {
    id: "7",
    name: "Pingky Bed",
    description: "Comfortable bed with a stylish headboard. Perfect for a good night's sleep.",
    price: 399.99,
    salePrice: 349.99,
    onSale: true,
    image: "/placeholder.svg?height=600&width=600",
    category: "beds",
    vendor: "Furnish",
    rating: 4.7,
    reviewCount: 20,
    sku: "BED-001",
    inStock: true,
    createdAt: "2023-07-05T00:00:00.000Z",
  },
  {
    id: "8",
    name: "Potty Stool",
    description: "Versatile stool that can be used as a side table or extra seating.",
    price: 59.99,
    salePrice: null,
    onSale: false,
    image: "/placeholder.svg?height=600&width=600",
    category: "chairs",
    vendor: "Furnish",
    rating: 4.1,
    reviewCount: 5,
    sku: "STOOL-001",
    inStock: true,
    createdAt: "2023-08-20T00:00:00.000Z",
  },
  {
    id: "9",
    name: "Cloudy Sofa",
    description: "Plush sofa with cloud-like comfort. Perfect for relaxing after a long day.",
    price: 349.99,
    salePrice: 299.99,
    onSale: true,
    image: "/placeholder.svg?height=600&width=600",
    category: "sofas",
    vendor: "Furnish",
    rating: 4.9,
    reviewCount: 25,
    sku: "SOFA-002",
    inStock: true,
    createdAt: "2023-09-15T00:00:00.000Z",
  },
]

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Simulate API call with a delay
    const fetchProducts = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setProducts(mockProducts)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch products"))
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, isLoading, error }
}
