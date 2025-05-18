"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { addressSchema, type AddressFormValues } from "@/features/user/schemas/profile-schemas"
import { FormInputField, FormCheckboxField, FormSelectField } from "@/features/forms/components/form-field"
import { FormSection } from "@/components/ui/forms/form-section"
import { FormActions } from "@/components/ui/forms/form-actions"
import { useUser } from "@/features/user/context/user-context"
import { useFormSubmit } from "@/lib/hooks/use-form-submit"
import type { Address } from "@/features/user/types"

interface AddressFormProps {
  initialData?: Partial<AddressFormValues>
  onSuccess?: (address: Address) => void
  onCancel?: () => void
  editMode?: boolean
  addressId?: string
  compact?: boolean
}

export function AddressForm({
  initialData,
  onSuccess,
  onCancel,
  editMode = false,
  addressId,
  compact = false,
}: AddressFormProps) {
  const { addAddress, updateAddress } = useUser()

  const defaultValues: AddressFormValues = {
    name: initialData?.name || "",
    street: initialData?.street || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    zipCode: initialData?.zipCode || "",
    country: initialData?.country || "US",
    isDefault: initialData?.isDefault || false,
  }

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  })

  const submitAddress = async (data: AddressFormValues) => {
    if (editMode && addressId) {
      updateAddress(addressId, data)
      return { ...data, id: addressId } as Address
    } else {
      // The addAddress function in the context will generate an ID
      addAddress(data)
      // We don't have the ID here, but we can pass the data for UI updates
      return { ...data, id: "temp-id" } as Address
    }
  }

  const { isSubmitting, handleSubmit } = useFormSubmit<Address, AddressFormValues>(submitAddress, {
    successMessage: editMode ? "Address updated successfully" : "Address added successfully",
    errorMessage: editMode ? "Failed to update address" : "Failed to add address",
    onSuccess: (address) => {
      form.reset()
      if (onSuccess) onSuccess(address)
    },
  })

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "UK", label: "United Kingdom" },
    { value: "AU", label: "Australia" },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormSection>
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
        </FormSection>

        <FormActions
          align="right"
          primaryLabel={editMode ? "Update Address" : "Add Address"}
          secondaryLabel={onCancel ? "Cancel" : undefined}
          onSecondaryAction={onCancel}
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  )
}
