import { z } from "zod"
import { emailSchema, nameSchema, phoneSchema } from "@/features/forms/utils/form-utils"

export const profileSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
})

export type ProfileFormValues = z.infer<typeof profileSchema>

export const addressSchema = z.object({
  name: z.string().min(1, { message: "Address name is required" }),
  street: z.string().min(1, { message: "Street address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(1, { message: "ZIP code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  isDefault: z.boolean().default(false),
})

export type AddressFormValues = z.infer<typeof addressSchema>
