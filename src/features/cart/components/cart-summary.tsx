"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/features/cart/context/cart-context"

export default function CartSummary() {
  const { cartItems } = useCart()

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.onSale && item.salePrice ? item.salePrice : item.price
    return total + price * item.quantity
  }, 0)

  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + shipping

  return (
    <div className="rounded-lg border p-6 space-y-6">
      <h2 className="text-lg font-semibold">Cart Totals</h2>

      <div className="space-y-4">
        <div className="flex justify-between border-b pb-4">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between border-b pb-4">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Button className="w-full">Checkout</Button>

      <div className="text-center text-sm text-muted-foreground">
        <p>Secure Checkout</p>
      </div>
    </div>
  )
}
