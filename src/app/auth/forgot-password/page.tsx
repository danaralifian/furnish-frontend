"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Form } from "@/components/ui/form"
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/features/auth/schemas/auth-schemas"
import { FormInputField } from "@/features/forms/components/form-field"
import { FormSubmitButton } from "@/features/forms/components/form-submit-button"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true)

    try {
      // In a real app, this would call an API to send a password reset email
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmittedEmail(data.email)
      setIsSubmitted(true)
      toast({
        title: "Reset link sent",
        description: "Check your email for a link to reset your password.",
      })
    } catch (error) {
      toast({
        title: "Request failed",
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
          <CardTitle className="text-2xl font-bold text-center">Forgot password</CardTitle>
          <CardDescription className="text-center">
            {isSubmitted ? "Check your email for a reset link" : "Enter your email and we'll send you a reset link"}
          </CardDescription>
        </CardHeader>
        {!isSubmitted ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormInputField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  required
                />
              </CardContent>
              <CardFooter className="flex flex-col">
                <FormSubmitButton isLoading={isLoading} loadingText="Sending..." icon={Send}>
                  Send reset link
                </FormSubmitButton>
                <div className="mt-4 text-center">
                  <Link href="/auth/login" className="text-sm text-primary hover:underline inline-flex items-center">
                    <ArrowLeft className="mr-1 h-3 w-3" />
                    Back to login
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Form>
        ) : (
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <p className="text-sm">
                We've sent a password reset link to <strong>{submittedEmail}</strong>. Please check your email.
              </p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Didn't receive the email?</p>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false)
                  toast({
                    title: "Reset link sent again",
                    description: "Check your email for a link to reset your password.",
                  })
                }}
              >
                Resend email
              </Button>
            </div>
            <div className="mt-4 text-center">
              <Link href="/auth/login" className="text-sm text-primary hover:underline inline-flex items-center">
                <ArrowLeft className="mr-1 h-3 w-3" />
                Back to login
              </Link>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
