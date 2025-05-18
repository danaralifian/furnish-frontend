"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { addressSchema, type AddressFormValues } from "@/features/user/schemas/profile-schemas"
import { FormInputField, FormCheckboxField, FormSelectField } from "@/features/forms/components/form-field"
import { FormSubmitButton } from "@/features/forms/components/form-submit-button"
import { useUser } from "@/features/user/context/user-context"
import { useToast } from "@/components/ui/use-toast"
import { Save } from "lucide-react"
import type { Address } from "@/features/user/types"

interface AddressSelectorProps {
  addresses: Address[]
  selectedAddress: Address | null
  onSelect: (address: Address) => void
  isAddingNew: boolean
  onAddNewToggle: () => void
}

export default function AddressSelector({
  addresses,
  selectedAddress,
  onSelect,
  isAddingNew,
  onAddNewToggle,
}: AddressSelectorProps) {
  const { addAddress } = useUser()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
      isDefault: false,
    },
  })

  const onSubmit = async (data: AddressFormValues) => {
    setIsLoading(true)
    try {
      addAddress(data)
      toast({
        title: "Address added",
        description: "Your new address has been added successfully.",
      })
      form.reset()
      onAddNewToggle()
    } catch (error) {
      toast({
        title: "Failed to add address",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "UK", label: "United Kingdom" },
    { value: "AU", label: "Australia" },
  ]

  if (isAddingNew) {
    return (
      <Card className="border">
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInputField name="name" label="Address Name" placeholder="Home, Work, etc." required />

              <FormInputField name="street" label="Street Address" required />

              <div className="grid grid-cols-2 gap-4">
                <FormInputField name="city" label="City" required />
                <FormInputField name="state" label="State/Province" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormInputField name="zipCode" label="ZIP/Postal Code" required />
                <FormSelectField name="country" label="Country" options={countryOptions} required />
              </div>

              <FormCheckboxField name="isDefault" label="Set as default address" />

              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={onAddNewToggle} size="sm">
                  Cancel
                </Button>
                <FormSubmitButton
                  isLoading={isLoading}
                  loadingText="Adding..."
                  icon={Save}
                  className="w-auto"
                  size="sm"
                >
                  Add Address
                </FormSubmitButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    )
  }

  return (
    <RadioGroup
      value={selectedAddress?.id}
      onValueChange={(value) => {
        const address = addresses.find((addr) => addr.id === value)
        if (address) onSelect(address)
      }}
      className="space-y-2"
    >
      {addresses.map((address) => (
        <div key={address.id} className="flex items-start space-x-2 border rounded-md p-3 hover:bg-muted/50">
          <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
          <Label htmlFor={address.id} className="flex-1 cursor-pointer">
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
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}
