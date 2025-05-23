import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RegisterForm from "@/features/auth/components/register-form"

export default function RegisterPage() {

  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Enter your information to create an account</CardDescription>
        </CardHeader>
        <RegisterForm />
      </Card>
    </div>
  )
}
