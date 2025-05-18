import Image from "next/image"

export default function ShopBanner() {
  return (
    <div className="relative h-48 md:h-64 lg:h-80 mb-6 rounded-lg overflow-hidden">
      <Image src="/placeholder.svg?height=400&width=1200" alt="Shop Banner" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Furnish</h1>
      </div>
    </div>
  )
}
