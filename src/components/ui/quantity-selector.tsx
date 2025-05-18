"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuantitySelectorProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  min?: number
  max?: number
  className?: string
  size?: "sm" | "md" | "lg"
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  className,
  size = "md",
}: QuantitySelectorProps) {
  const sizeClasses = {
    sm: {
      button: "h-7 w-7",
      icon: "h-3 w-3",
      text: "w-6 text-xs",
    },
    md: {
      button: "h-9 w-9",
      icon: "h-4 w-4",
      text: "w-8 text-sm",
    },
    lg: {
      button: "h-10 w-10",
      icon: "h-5 w-5",
      text: "w-10 text-base",
    },
  }

  return (
    <div className={cn("flex items-center", className)}>
      <Button
        variant="outline"
        size="icon"
        className={sizeClasses[size].button}
        onClick={onDecrease}
        disabled={quantity <= min}
      >
        <Minus className={sizeClasses[size].icon} />
      </Button>
      <span className={cn("text-center", sizeClasses[size].text)}>{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className={sizeClasses[size].button}
        onClick={onIncrease}
        disabled={quantity >= max}
      >
        <Plus className={sizeClasses[size].icon} />
      </Button>
    </div>
  )
}
