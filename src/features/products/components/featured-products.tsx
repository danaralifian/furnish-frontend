"use client"

import { useProducts } from "@/features/products/hooks/use-products"
import ProductCard from "./product-card"

export default function FeaturedProducts() {
  const { products, isLoading } = useProducts()

  if (isLoading) {
    return <div>Loading featured products...</div>
  }

  // Get 4 random products as featured
  const featuredProducts = products.sort(() => 0.5 - Math.random()).slice(0, 4)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
