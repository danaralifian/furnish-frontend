import { Breadcrumb } from "@/features/layout/components/breadcrumb"
import CartItems from "@/features/cart/components/cart-items"

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cart</h1>

      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Cart", path: "/cart" },
        ]}
      />

      <div className="mt-8">
        <CartItems />
      </div>
    </div>
  )
}
