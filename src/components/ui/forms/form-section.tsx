import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FormSectionProps {
  children: ReactNode
  title?: string
  description?: string
  className?: string
}

/**
 * A container for form sections with optional title and description
 */
export function FormSection({ children, title, description, className }: FormSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <div>
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  )
}
