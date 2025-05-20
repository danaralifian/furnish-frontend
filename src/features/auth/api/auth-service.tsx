import { fetcher } from "@/lib/api/fetcher"
import { API_ENDPOINTS } from "@/lib/endpoints"
import { ApiResponse } from "@/lib/types/api-response"
import { Auth } from "../interface"

const signIn = async (email: string, password: string): Promise<ApiResponse<Auth>> => {
    return fetcher(API_ENDPOINTS.auth.signIn(), {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        })
    })
}

const signUp = async (email: string, password: string): Promise<ApiResponse<Auth>> => {
    return fetcher(API_ENDPOINTS.auth.signUp(), {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        })
    })
}

export const AuthService = { signIn, signUp }