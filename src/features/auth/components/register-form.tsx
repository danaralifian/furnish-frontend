"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RegisterFormValues, registerSchema } from '../schemas/auth-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useToast } from '@/lib/hooks/use-toast'
import { useAuth } from '../hooks/use-auth'
import { CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import { FormSubmitButton } from '@/features/forms/components/form-submit-button'
import { UserPlus } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { FormInputField } from '@/features/forms/components/form-field'

export default function RegisterForm() {
    const router = useRouter()
    const { toast } = useToast()
    const { register } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })


    const onSubmit = async (data: RegisterFormValues) => {
        setIsLoading(true)

        try {
            const success = await register(data.email, data.password)

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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id='register-form'>
                <CardContent className="space-y-4">
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
                        autoComplete="current-password"
                        required
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
    )
}
