import { cn } from "@/lib/utils"

type StatusType = "success" | "info" | "warning" | "error" | "default"

interface StatusBadgeProps {
  status: StatusType | string
  label: string
  className?: string
}

/**
 * A reusable badge for displaying status information
 */
export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "success":
      case "delivered":
      case "completed":
        return "bg-green-100 text-green-800"
      case "info":
      case "shipped":
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "warning":
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "error":
      case "cancelled":
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusClasses(status), className)}>
      {label}
    </span>
  )
}
