import { useAuth } from "@/features/auth/hooks/use-auth"
import { useToast } from "@/lib/hooks/use-toast"
import { useRouter } from "next/navigation"


export const mockUseRouter = (push = jest.fn()) => {
    (useRouter as jest.Mock).mockReturnValue({ push })
    return push
}

export const mockUseAuth = (login = jest.fn(), register = jest.fn()) => {
    (useAuth as jest.Mock).mockReturnValue({ login, register })
    return { login, register }
}

export const mockUseToast = (toast = jest.fn()) => {
    (useToast as jest.Mock).mockReturnValue({ toast })
    return toast
}
