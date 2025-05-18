"use client"

import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface FormSubmitButtonProps extends ButtonProps {
  isLoading?: boolean
  loadingText?: string
  icon?: LucideIcon
  iconPosition?: "left" | "right"
}

export function FormSubmitButton({
  children,
  isLoading,
  loadingText,
  icon: Icon,
  iconPosition = "left",
  className,
  ...props
}: FormSubmitButtonProps) {
  return (
    <Button type="submit" className={cn("w-full", className)} disabled={isLoading} {...props}>
      {isLoading ? (
        <span className="flex items-center gap-1">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          {loadingText || "Loading..."}
        </span>
      ) : (
        <span className="flex items-center gap-1">
          {Icon && iconPosition === "left" && <Icon className="h-4 w-4" />}
          {children}
          {Icon && iconPosition === "right" && <Icon className="h-4 w-4" />}
        </span>
      )}
    </Button>
  )
}
