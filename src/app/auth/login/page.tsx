"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LoginForm from "@/features/auth/components/login-form"

export default function LoginPage() {

  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  )
}
