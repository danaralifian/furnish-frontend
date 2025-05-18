"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FormActionsProps {
  children?: ReactNode
  primaryLabel?: string
  secondaryLabel?: string
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
  isSubmitting?: boolean
  className?: string
  align?: "left" | "center" | "right" | "between"
}

/**
 * A container for form actions with optional primary and secondary buttons
 */
export function FormActions({
  children,
  primaryLabel,
  secondaryLabel,
  onPrimaryAction,
  onSecondaryAction,
  isSubmitting,
  className,
  align = "right",
}: FormActionsProps) {
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
  }

  return (
    <div className={cn("flex items-center gap-3 pt-2", alignmentClasses[align], className)}>
      {children ? (
        children
      ) : (
        <>
          {secondaryLabel && (
            <Button type="button" variant="outline" onClick={onSecondaryAction} disabled={isSubmitting}>
              {secondaryLabel}
            </Button>
          )}
          {primaryLabel && (
            <Button type="submit" onClick={onPrimaryAction} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Loading...
                </>
              ) : (
                primaryLabel
              )}
            </Button>
          )}
        </>
      )}
    </div>
  )
}
