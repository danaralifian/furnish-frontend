import { Suspense } from "react"
import ProductGrid from "@/features/products/components/product-grid"
import ProductsLoading from "@/features/products/components/products-loading"
import HomeCarousel from "@/features/layout/components/home-carousel"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HomeCarousel />

      <div className="mt-8">
        <Suspense fallback={<ProductsLoading />}>
          <ProductGrid />
        </Suspense>
      </div>
    </div>
  )
}
