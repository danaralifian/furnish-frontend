import type { ReactNode } from "react"
import Link from "next/link"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-semibold text-xl">🪑 Furnish</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">{children}</main>
    </div>
  )
}
