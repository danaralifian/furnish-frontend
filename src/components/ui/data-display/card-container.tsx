import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CardContainerProps {
  children: ReactNode
  className?: string
}

/**
 * A responsive grid container for cards
 */
export function CardContainer({ children, className }: CardContainerProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", className)}>
      {children}
    </div>
  )
}
