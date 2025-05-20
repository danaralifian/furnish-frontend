
import { CardContent, CardFooter } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { FormInputField } from '@/features/forms/components/form-field'
import { FormSubmitButton } from '@/features/forms/components/form-submit-button'
import { LogIn } from 'lucide-react'
import React, { useState } from 'react'
import { LoginFormValues, loginSchema } from '../schemas/auth-schemas'
import { useToast } from '@/lib/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/use-auth'
import Link from 'next/link'

export default function LoginForm() {
    const { toast } = useToast()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth()


    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true)

        try {
            const success = await login(data.email, data.password)

            if (success) {
                toast({
                    title: "Login successful",
                    description: "Welcome back to Furnish!",
                })
                router.push("/")
            } else {
                toast({
                    title: "Login failed",
                    description: "Invalid email or password. Please try again.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error("Login failed:", error)
            toast({
                title: "Login failed",
                description: "An error occurred. Please try again later.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id='login-form'>
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

                    <div className="flex items-center justify-between">
                        <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <FormSubmitButton isLoading={isLoading} loadingText="Logging in..." icon={LogIn}>
                        Login
                    </FormSubmitButton>
                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        Don`t have an account?{" "}
                        <Link href="/auth/register" className="text-primary hover:underline">
                            Register
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Form>
    )
}
