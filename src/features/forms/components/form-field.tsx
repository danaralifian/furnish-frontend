"use client"

import type { ReactNode } from "react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface FormInputFieldProps {
  name: string
  label: string
  placeholder?: string
  type?: string
  description?: string
  className?: string
  required?: boolean
  disabled?: boolean
  autoComplete?: string
}

export function FormInputField({
  name,
  label,
  placeholder,
  type = "text",
  description,
  className,
  required,
  disabled,
  autoComplete,
}: FormInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPasswordField = type === "password"
  const inputType = isPasswordField ? (showPassword ? "text" : "password") : type

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeholder}
                type={inputType}
                disabled={disabled}
                autoComplete={autoComplete}
                {...field}
              />
              {isPasswordField && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              )}
            </div>
          </FormControl>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

interface FormTextareaFieldProps {
  name: string
  label: string
  placeholder?: string
  description?: string
  className?: string
  required?: boolean
  disabled?: boolean
  rows?: number
}

export function FormTextareaField({
  name,
  label,
  placeholder,
  description,
  className,
  required,
  disabled,
  rows,
}: FormTextareaFieldProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} disabled={disabled} rows={rows} {...field} />
          </FormControl>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

interface FormCheckboxFieldProps {
  name: string
  label: ReactNode
  description?: string
  className?: string
  disabled?: boolean
}

export function FormCheckboxField({ name, label, description, className, disabled }: FormCheckboxFieldProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-row items-start space-x-2 space-y-0", className)}>
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              id={name}
              className="mt-1"
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel htmlFor={name} className="text-sm font-normal">
              {label}
            </FormLabel>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}

interface SelectOption {
  value: string
  label: string
}

interface FormSelectFieldProps {
  name: string
  label: string
  options: SelectOption[]
  placeholder?: string
  description?: string
  className?: string
  required?: boolean
  disabled?: boolean
}

export function FormSelectField({
  name,
  label,
  options,
  placeholder,
  description,
  className,
  required,
  disabled,
}: FormSelectFieldProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

interface RadioOption {
  value: string
  label: string
}

interface FormRadioGroupFieldProps {
  name: string
  label: string
  options: RadioOption[]
  description?: string
  className?: string
  required?: boolean
  disabled?: boolean
  orientation?: "horizontal" | "vertical"
}

export function FormRadioGroupField({
  name,
  label,
  options,
  description,
  className,
  required,
  disabled,
  orientation = "vertical",
}: FormRadioGroupFieldProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
              className={cn("flex", orientation === "horizontal" ? "flex-row space-x-4" : "flex-col space-y-2")}
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                  <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
