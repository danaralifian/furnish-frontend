"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AddressForm } from "./address-form"
import { AddressCard } from "./address-card"
import { useDisclosure } from "@/lib/hooks/use-disclosure"
import type { Address } from "@/features/user/types"

interface AddressSelectorProps {
  addresses: Address[]
  selectedAddressId?: string | null
  onSelect: (address: Address) => void
  allowAddNew?: boolean
  compact?: boolean
  className?: string
}

export function AddressSelector({
  addresses,
  selectedAddressId,
  onSelect,
  allowAddNew = true,
  compact = false,
  className,
}: AddressSelectorProps) {
  const { isOpen: isAddingNew, onOpen: openAddNew, onClose: closeAddNew } = useDisclosure()

  const handleAddSuccess = (address: Address) => {
    closeAddNew()
    onSelect(address)
  }

  if (isAddingNew) {
    return (
      <Card className="border">
        <CardContent className={compact ? "p-3" : "p-4"}>
          <AddressForm onSuccess={handleAddSuccess} onCancel={closeAddNew} compact={compact} />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={className}>
      {allowAddNew && (
        <div className="flex justify-end mb-3">
          <Button variant="outline" size={compact ? "sm" : "default"} onClick={openAddNew}>
            <PlusCircle className={compact ? "h-3.5 w-3.5 mr-1" : "h-4 w-4 mr-2"} />
            Add New Address
          </Button>
        </div>
      )}

      <RadioGroup
        value={selectedAddressId || undefined}
        onValueChange={(value) => {
          const address = addresses.find((addr) => addr.id === value)
          if (address) onSelect(address)
        }}
        className="space-y-2"
      >
        {addresses.map((address) => (
          <div key={address.id} className="flex items-start space-x-2">
            <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
            <Label htmlFor={address.id} className="flex-1 cursor-pointer">
              <AddressCard address={address} showActions={false} />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
