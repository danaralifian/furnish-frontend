import { cn } from "@/lib/utils"

interface ProductPriceProps {
  price: number
  salePrice?: number | null
  onSale?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function ProductPrice({ price, salePrice, onSale = false, size = "md", className }: ProductPriceProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl md:text-2xl",
  }

  return (
    <div className={cn("flex items-center gap-2", sizeClasses[size], className)}>
      {onSale && salePrice ? (
        <>
          <span className="font-medium text-destructive">${salePrice.toFixed(2)}</span>
          <span className="text-muted-foreground line-through">${price.toFixed(2)}</span>
        </>
      ) : (
        <span className="font-medium">${price.toFixed(2)}</span>
      )}
    </div>
  )
}
