export interface Product {
  id: string
  name: string
  description: string
  price: number
  salePrice: number | null
  onSale: boolean
  image: string
  category: string
  vendor: string
  rating: number
  reviewCount: number
  sku: string
  inStock: boolean
  createdAt: string
  specifications?: {
    dimensions?: string
    material?: string
    weight?: string
    assembly?: string
  }
  selectedColor?: string
}
