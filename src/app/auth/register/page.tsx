"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserPlus } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { Form } from "@/components/ui/form"
import { registerSchema, type RegisterFormValues } from "@/features/auth/schemas/auth-schemas"
import { FormInputField, FormCheckboxField } from "@/features/forms/components/form-field"
import { FormSubmitButton } from "@/features/forms/components/form-submit-button"
import { useToast } from "@/lib/hooks/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      agreeTerms: false,
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true)

    try {
      const success = await register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      })

      if (success) {
        toast({
          title: "Registration successful",
          description: "Your account has been created. Welcome to Furnish!",
        })
        router.push("/")
      } else {
        toast({
          title: "Registration failed",
          description: "An error occurred during registration. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Registration failed:", error)

      toast({
        title: "Registration failed",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Enter your information to create an account</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormInputField name="firstName" label="First Name" autoComplete="given-name" required />

                <FormInputField name="lastName" label="Last Name" autoComplete="family-name" required />
              </div>

              <FormInputField
                name="email"
                label="Email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                required
              />

              <FormInputField
                name="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                description="Password must be at least 8 characters and include uppercase, lowercase, and numbers."
                required
              />

              <FormCheckboxField
                name="agreeTerms"
                label={
                  <>
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      terms and conditions
                    </Link>
                  </>
                }
              />
            </CardContent>
            <CardFooter className="flex flex-col">
              <FormSubmitButton isLoading={isLoading} loadingText="Creating account..." icon={UserPlus}>
                Register
              </FormSubmitButton>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
