"use client"

import { cn } from "@/lib/utils"
import type { Address } from "@/features/user/types"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

interface AddressCardProps {
  address: Address
  isSelected?: boolean
  isSelectable?: boolean
  onSelect?: () => void
  onEdit?: () => void
  onDelete?: () => void
  showActions?: boolean
  className?: string
}

export function AddressCard({
  address,
  isSelected = false,
  isSelectable = false,
  onSelect,
  onEdit,
  onDelete,
  showActions = true,
  className,
}: AddressCardProps) {
  return (
    <div
      className={cn(
        "border rounded-md p-3 transition-colors",
        isSelectable && "cursor-pointer hover:bg-muted/50",
        isSelected && "ring-2 ring-primary",
        className,
      )}
      onClick={isSelectable ? onSelect : undefined}
    >
      <div className="flex justify-between">
        <span className="font-medium">{address.name}</span>
        {address.isDefault && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
        )}
      </div>
      <div className="text-sm text-muted-foreground mt-1">
        <p>{address.street}</p>
        <p>
          {address.city}, {address.state} {address.zipCode}
        </p>
        <p>{address.country}</p>
      </div>

      {showActions && (onEdit || onDelete) && (
        <div className="flex justify-end gap-2 mt-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }}
              className="h-8 w-8"
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              className="h-8 w-8"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
              <span className="sr-only">Delete</span>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
