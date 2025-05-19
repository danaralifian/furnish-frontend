"use client"

import { useState } from "react"
import Image from "next/image"
import { useProduct } from "@/features/products/hooks/use-product"
import { useCart } from "@/features/cart/context/cart-context"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Heart, Minus, Plus, Share2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/lib/hooks/use-toast"

interface ProductDetailProps {
  id: string
}

export default function ProductDetail({ id }: ProductDetailProps) {
  const { product, isLoading } = useProduct(id)
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [selectedColor, setSelectedColor] = useState("blue")
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  if (isLoading || !product) {
    return <div>Loading product details...</div>
  }

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        selectedColor,
      },
      quantity,
    )

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  // Mock images for the product
  const productImages = [
    product.image,
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 my-8">
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={productImages[activeImageIndex] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover object-center"
          />
          {product.onSale && <div className="sale-badge">Sale</div>}
        </div>

        <div className="flex gap-4 overflow-auto pb-2">
          {productImages.map((image, index) => (
            <button
              key={index}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${activeImageIndex === index ? "ring-2 ring-primary" : "ring-1 ring-border"
                }`}
              onClick={() => setActiveImageIndex(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {product.onSale ? (
            <>
              <span className="text-3xl font-bold text-destructive">${product.salePrice}</span>
              <span className="text-xl text-muted-foreground line-through">${product.price}</span>
            </>
          ) : (
            <span className="text-3xl font-bold">${product.price}</span>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Color</h3>
            <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="blue" id="blue" className="sr-only" />
                <Label
                  htmlFor="blue"
                  className={`h-8 w-8 rounded-full bg-blue-500 cursor-pointer ${selectedColor === "blue" ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                />
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="black" id="black" className="sr-only" />
                <Label
                  htmlFor="black"
                  className={`h-8 w-8 rounded-full bg-black cursor-pointer ${selectedColor === "black" ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                />
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gray" id="gray" className="sr-only" />
                <Label
                  htmlFor="gray"
                  className={`h-8 w-8 rounded-full bg-gray-500 cursor-pointer ${selectedColor === "gray" ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                />
              </div>
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="flex-1" size="lg" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button variant="outline" size="lg">
            <Heart className="mr-2 h-5 w-5" />
            Add to Wishlist
          </Button>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </div>
          <div>SKU: {product.sku}</div>
          <div>Availability: {product.inStock ? "In Stock" : "Out of Stock"}</div>
        </div>

        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-medium">Dimensions</div>
                <div className="text-sm text-muted-foreground">
                  {product.specifications?.dimensions || "W80 x D80 x H40 cm"}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-medium">Material</div>
                <div className="text-sm text-muted-foreground">
                  {product.specifications?.material || "Solid Wood, Fabric"}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-medium">Weight</div>
                <div className="text-sm text-muted-foreground">{product.specifications?.weight || "15 kg"}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-medium">Assembly</div>
                <div className="text-sm text-muted-foreground">{product.specifications?.assembly || "Required"}</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm font-medium">{product.rating} out of 5</span>
                </div>
                <span className="text-sm text-muted-foreground">Based on {product.reviewCount} reviews</span>
              </div>

              <Button variant="outline">Write a Review</Button>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-muted-foreground">2 months ago</div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">Excellent quality and very comfortable. Exactly as described and pictured.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Jane Smith</div>
                      <div className="text-sm text-muted-foreground">1 month ago</div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">
                    Great product but assembly was a bit challenging. Overall very satisfied with the purchase.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
