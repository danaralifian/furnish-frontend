"use client"

import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/features/products/types"
import { Button } from "@/components/ui/button"
import { useCart } from "@/features/cart/context/cart-context"
import { ShoppingCart } from "lucide-react"
import { useToast } from "@/lib/hooks/use-toast"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart(product, 1)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="group relative">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Link href={`/shop/${product.id}`}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        {product.onSale && <div className="sale-badge">Sale</div>}
        <div className="absolute inset-x-0 bottom-0 flex-col gap-2 bg-black/40 p-4 opacity-0 transition-opacity group-hover:opacity-100">
          <Button onClick={handleAddToCart} variant="secondary" className="w-full" size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium">
            <Link href={`/shop/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">By {product.vendor}</p>
        </div>
        <p className="text-sm font-medium">
          {product.onSale ? (
            <span className="flex items-center gap-2">
              <span className="text-destructive">${product.salePrice}</span>
              <span className="text-muted-foreground line-through">${product.price}</span>
            </span>
          ) : (
            <span>${product.price}</span>
          )}
        </p>
      </div>
    </div>
  )
}
