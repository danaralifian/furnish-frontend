"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@/features/user/context/user-context"
import { Form } from "@/components/ui/form"
import { profileSchema, type ProfileFormValues } from "@/features/user/schemas/profile-schemas"
import { FormInputField } from "@/features/forms/components/form-field"
import { FormSubmitButton } from "@/features/forms/components/form-submit-button"
import { Save } from "lucide-react"

export default function ProfileInfo() {
  const { user, updateUser } = useUser()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  })

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true)
    try {
      updateUser(data)
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal information and contact details.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInputField name="firstName" label="First Name" autoComplete="given-name" required />
              <FormInputField name="lastName" label="Last Name" autoComplete="family-name" required />
            </div>

            <FormInputField name="email" label="Email" type="email" autoComplete="email" required />

            <FormInputField name="phone" label="Phone Number" type="tel" autoComplete="tel" />
          </CardContent>
          <CardFooter>
            <FormSubmitButton isLoading={isLoading} loadingText="Saving..." icon={Save}>
              Save Changes
            </FormSubmitButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
