import { Suspense } from "react"
import { Breadcrumb } from "@/features/layout/components/breadcrumb"
import ProductDetail from "@/features/products/components/product-detail"
import ProductDetailSkeleton from "@/features/products/components/product-detail-skeleton"
import RelatedProducts from "@/features/products/components/related-products"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Product Details", path: `/shop/${params.id}` },
        ]}
      />

      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail id={params.id} />
      </Suspense>

      <section className="my-16">
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <RelatedProducts currentProductId={params.id} />
      </section>
    </div>
  )
}
