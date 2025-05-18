"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/features/user/context/user-context"
import type { Order } from "@/features/user/types"
import { ChevronDown, ChevronUp, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { EmptyState } from "@/components/ui/empty-state"

export default function OrderHistory() {
  const { user } = useUser()
  const [expandedOrders, setExpandedOrders] = useState<string[]>([])

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user?.orders || user.orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No orders yet"
        description="You haven't placed any orders yet."
        actionLabel="Start Shopping"
        actionHref="/"
      />
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Your Orders</h3>

      <div className="space-y-4">
        {user.orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <CardTitle className="text-base">Order #{order.orderNumber}</CardTitle>
                  <CardDescription>Placed on {new Date(order.date).toLocaleDateString()}</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className="text-sm font-medium">Total: ${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-4">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="relative h-10 w-10 rounded-full border overflow-hidden bg-muted">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="relative h-10 w-10 rounded-full border bg-muted flex items-center justify-center text-xs">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {order.items.length} {order.items.length === 1 ? "item" : "items"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/profile/orders/${order.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => toggleOrderExpand(order.id)}>
                    {expandedOrders.includes(order.id) ? (
                      <>
                        <span className="mr-1">Hide</span>
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span className="mr-1">Quick View</span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {expandedOrders.includes(order.id) && (
                <div className="mt-4 space-y-4">
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Order Items</h4>
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="relative h-16 w-16 rounded overflow-hidden bg-muted">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium">{item.name}</h5>
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>Qty: {item.quantity}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>{order.shippingAddress.street}</p>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                      </p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Order Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>${order.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>${order.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium pt-1 border-t">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="w-full flex flex-col sm:flex-row gap-2 justify-end">
                <Button variant="outline" size="sm">
                  Track Order
                </Button>
                {order.status !== "cancelled" && order.status !== "delivered" && (
                  <Button variant="outline" size="sm">
                    Cancel Order
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
