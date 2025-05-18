import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroBanner() {
  return (
    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
      <Image src="/placeholder.svg?height=600&width=1200" alt="Hero Banner" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/30 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Modern Furniture For Modern Homes</h1>
            <p className="text-white/90 mb-6">
              Find the perfect furniture to transform your space into a stylish and comfortable home.
            </p>
            <Link href="/shop">
              <Button size="lg" className="font-medium">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
