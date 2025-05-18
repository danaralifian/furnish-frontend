"use client"

import { useState } from "react"
import ProductCard from "./product-card"
import { useProducts } from "@/features/products/hooks/use-products"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid3X3, LayoutGrid } from "lucide-react"

export default function ProductGrid() {
  const { products, isLoading } = useProducts()
  const [sortBy, setSortBy] = useState("featured")
  const [gridCols, setGridCols] = useState<"grid-cols-2" | "grid-cols-3" | "grid-cols-4">("grid-cols-3")

  if (isLoading) {
    return <div>Loading products...</div>
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price
    if (sortBy === "price-desc") return b.price - a.price
    if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    return 0 // featured
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <p className="text-sm text-muted-foreground">Showing {products.length} products</p>

        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-md">
            <Button
              variant={gridCols === "grid-cols-2" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setGridCols("grid-cols-2")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={gridCols === "grid-cols-3" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setGridCols("grid-cols-3")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={gridCols === "grid-cols-4" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setGridCols("grid-cols-4")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect width="4" height="4" x="3" y="3" />
                <rect width="4" height="4" x="10" y="3" />
                <rect width="4" height="4" x="17" y="3" />
                <rect width="4" height="4" x="3" y="10" />
                <rect width="4" height="4" x="10" y="10" />
                <rect width="4" height="4" x="17" y="10" />
                <rect width="4" height="4" x="3" y="17" />
                <rect width="4" height="4" x="10" y="17" />
                <rect width="4" height="4" x="17" y="17" />
              </svg>
            </Button>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:${gridCols} gap-x-6 gap-y-10`}>
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <nav className="flex items-center gap-2">
          <Button variant="outline" size="icon" disabled>
            <span className="sr-only">Previous page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="icon">
            <span className="sr-only">Next page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </nav>
      </div>
    </div>
  )
}
