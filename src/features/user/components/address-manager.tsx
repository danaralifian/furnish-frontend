"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/features/user/context/user-context"
import { Form } from "@/components/ui/form"
import { addressSchema, type AddressFormValues } from "@/features/user/schemas/profile-schemas"
import { FormInputField, FormCheckboxField, FormSelectField } from "@/features/forms/components/form-field"
import { FormSubmitButton } from "@/features/forms/components/form-submit-button"
import { PlusCircle, Save, Trash2 } from "lucide-react"
import type { Address } from "@/features/user/types"
import { useToast } from "@/lib/hooks/use-toast"

export default function AddressManager() {
  const { user, addAddress, updateAddress, removeAddress } = useUser()
  const { toast } = useToast()
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
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

  const resetForm = () => {
    form.reset({
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
      isDefault: false,
    })
    setIsAddingNew(false)
    setEditingId(null)
  }

  const onSubmit = async (data: AddressFormValues) => {
    setIsLoading(true)
    try {
      if (editingId) {
        updateAddress(editingId, data)
        toast({
          title: "Address updated",
          description: "Your address has been updated successfully.",
        })
      } else {
        addAddress(data)
        toast({
          title: "Address added",
          description: "Your new address has been added successfully.",
        })
      }
      resetForm()
    } catch (error) {
      console.error("Address update failed:", error)
      toast({
        title: editingId ? "Update failed" : "Add failed",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (address: Address) => {
    form.reset({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
    })
    setEditingId(address.id)
    setIsAddingNew(true)
  }

  const handleDelete = (id: string) => {
    removeAddress(id)
    toast({
      title: "Address removed",
      description: "The address has been removed successfully.",
    })
  }

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "UK", label: "United Kingdom" },
    { value: "AU", label: "Australia" },
  ]

  return (
    <div className="space-y-6">
      {!isAddingNew && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Your Addresses</h3>
          <Button onClick={() => setIsAddingNew(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Address
          </Button>
        </div>
      )}

      {isAddingNew ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Address" : "Add New Address"}</CardTitle>
            <CardDescription>
              {editingId ? "Update your address information." : "Add a new shipping or billing address."}
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormInputField name="name" label="Address Name" placeholder="Home, Work, etc." required />

                <FormInputField name="street" label="Street Address" required />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInputField name="city" label="City" required />
                  <FormInputField name="state" label="State/Province" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInputField name="zipCode" label="ZIP/Postal Code" required />
                  <FormSelectField name="country" label="Country" options={countryOptions} required />
                </div>

                <FormCheckboxField name="isDefault" label="Set as default address" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={resetForm}>
                  Cancel
                </Button>
                <FormSubmitButton
                  isLoading={isLoading}
                  loadingText={editingId ? "Updating..." : "Adding..."}
                  icon={Save}
                  className="w-auto"
                >
                  {editingId ? "Update Address" : "Add Address"}
                </FormSubmitButton>
              </CardFooter>
            </form>
          </Form>
        </Card>
      ) : user?.addresses && user.addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.addresses.map((address) => (
            <Card key={address.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{address.name}</CardTitle>
                    {address.isDefault && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(address)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-pencil"
                      >
                        <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(address.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p>{address.country}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground mb-4">You don`t have any saved addresses yet.</p>
          <Button onClick={() => setIsAddingNew(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Address
          </Button>
        </div>
      )}
    </div>
  )
}
