import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  children: ReactNode
  title?: string
  description?: string
  action?: ReactNode
  className?: string
  contentClassName?: string
}

/**
 * A container for page sections with optional title, description, and action
 */
export function SectionContainer({
  children,
  title,
  description,
  action,
  className,
  contentClassName,
}: SectionContainerProps) {
  return (
    <section className={cn("py-8", className)}>
      {(title || description || action) && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            {title && <h2 className="text-2xl font-bold tracking-tight">{title}</h2>}
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={contentClassName}>{children}</div>
    </section>
  )
}
