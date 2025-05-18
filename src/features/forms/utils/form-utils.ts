import { z } from "zod"

// Common validation patterns
export const emailSchema = z.string().email({ message: "Please enter a valid email address" })

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })

export const nameSchema = z.string().min(1, { message: "This field is required" })

export const phoneSchema = z
  .string()
  .min(1, { message: "Phone number is required" })
  .regex(/^\+?[0-9\s\-()]+$/, { message: "Please enter a valid phone number" })

export const zipCodeSchema = z
  .string()
  .min(1, { message: "ZIP code is required" })
  .regex(/^[0-9]{5}(-[0-9]{4})?$/, { message: "Please enter a valid ZIP code" })

export const termsSchema = z.literal(true, {
  errorMap: () => ({ message: "You must agree to the terms and conditions" }),
})

// Helper function to create form error handler
export function createFormErrorHandler(setError: any) {
  return (error: any) => {
    if (error.name === "ZodError") {
      error.errors.forEach((err: any) => {
        setError(err.path.join("."), {
          type: "manual",
          message: err.message,
        })
      })
    } else {
      console.error("Form submission error:", error)
    }
  }
}
