import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <main className="flex-1 flex items-center justify-center">{children}</main>
    </div>
  )
}
