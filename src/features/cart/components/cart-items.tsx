"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/features/cart/context/cart-context"
import CartSummary from "./cart-summary"
import EmptyCart from "./empty-cart"

export default function CartItems() {
  const { cartItems, updateQuantity, removeFromCart } = useCart()

  if (cartItems.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4">Product</th>
                <th className="text-left p-4 hidden md:table-cell">Price</th>
                <th className="text-left p-4">Quantity</th>
                <th className="text-left p-4 hidden md:table-cell">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {cartItems.map((item) => (
                <tr key={`${item.id}-${item.selectedColor || "default"}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded overflow-hidden bg-muted">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                        </p>
                        <p className="text-sm text-muted-foreground md:hidden">
                          ${item.onSale && item.salePrice ? item.salePrice : item.price}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    ${item.onSale && item.salePrice ? item.salePrice : item.price}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => removeFromCart(item)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    ${((item.onSale && item.salePrice ? item.salePrice : item.price) * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:col-span-1">
        <CartSummary />
      </div>
    </div>
  )
}
