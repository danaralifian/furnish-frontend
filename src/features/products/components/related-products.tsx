"use client"

import { useProducts } from "@/features/products/hooks/use-products"
import ProductCard from "./product-card"

interface RelatedProductsProps {
  currentProductId: string
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const { products, isLoading } = useProducts()

  if (isLoading) {
    return <div>Loading related products...</div>
  }

  // Filter out the current product and get 4 random products
  const relatedProducts = products
    .filter((product) => product.id !== currentProductId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
