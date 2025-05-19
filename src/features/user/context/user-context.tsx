"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, Address } from "@/features/user/types"
import { v4 as uuidv4 } from "uuid"

interface UserContextType {
  user: User | null
  updateUser: (userData: Partial<User>) => void
  addAddress: (address: Omit<Address, "id">) => void
  updateAddress: (id: string, address: Omit<Address, "id">) => void
  removeAddress: (id: string) => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Mock user data
const mockUser: User = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "(123) 456-7890",
  addresses: [
    {
      id: "1",
      name: "Home",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "US",
      isDefault: true,
    },
    {
      id: "2",
      name: "Work",
      street: "456 Office Blvd",
      city: "Workville",
      state: "NY",
      zipCode: "67890",
      country: "US",
      isDefault: false,
    },
  ],
  orders: [
    {
      id: "1",
      orderNumber: "ORD-12345",
      date: "2023-04-15T10:30:00Z",
      status: "delivered",
      items: [
        {
          id: "1",
          name: "Asgaard Sofa",
          price: 149.99,
          quantity: 1,
          image: "/placeholder.svg?height=600&width=600",
        },
        {
          id: "2",
          name: "Syltherine Table",
          price: 149.99,
          quantity: 2,
          image: "/placeholder.svg?height=600&width=600",
        },
      ],
      subtotal: 449.97,
      shipping: 10.0,
      tax: 36.0,
      total: 495.97,
      shippingAddress: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        country: "US",
      },
    },
    {
      id: "2",
      orderNumber: "ORD-67890",
      date: "2023-05-20T14:45:00Z",
      status: "shipped",
      items: [
        {
          id: "3",
          name: "Leviosa Desk",
          price: 199.99,
          quantity: 1,
          image: "/placeholder.svg?height=600&width=600",
        },
      ],
      subtotal: 199.99,
      shipping: 10.0,
      tax: 16.0,
      total: 225.99,
      shippingAddress: {
        street: "456 Office Blvd",
        city: "Workville",
        state: "NY",
        zipCode: "67890",
        country: "US",
      },
    },
    {
      id: "3",
      orderNumber: "ORD-24680",
      date: "2023-06-10T09:15:00Z",
      status: "processing",
      items: [
        {
          id: "4",
          name: "Lolito Chair",
          price: 99.99,
          quantity: 4,
          image: "/placeholder.svg?height=600&width=600",
        },
        {
          id: "5",
          name: "Respira Bookshelf",
          price: 249.99,
          quantity: 1,
          image: "/placeholder.svg?height=600&width=600",
        },
      ],
      subtotal: 649.95,
      shipping: 15.0,
      tax: 52.0,
      total: 716.95,
      shippingAddress: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        country: "US",
      },
    },
  ],
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
        // For demo purposes, set the mock user if parsing fails
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
      }
    } else {
      // For demo purposes, set the mock user
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    }
    setIsInitialized(true)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else if (isInitialized && !user) {
      localStorage.removeItem("user")
    }
  }, [user, isInitialized])

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null
      return { ...prev, ...userData }
    })
  }

  const addAddress = (address: Omit<Address, "id">) => {
    setUser((prev) => {
      if (!prev) return null

      const newAddress: Address = {
        ...address,
        id: uuidv4(),
      }

      // If this is the first address or it's marked as default, update other addresses
      const updatedAddresses = prev.addresses || []
      if (address.isDefault || updatedAddresses.length === 0) {
        updatedAddresses.forEach((addr) => {
          addr.isDefault = false
        })
      }

      return {
        ...prev,
        addresses: [...updatedAddresses, newAddress],
      }
    })
  }

  const updateAddress = (id: string, address: Omit<Address, "id">) => {
    setUser((prev) => {
      if (!prev) return null

      const updatedAddresses =
        prev.addresses?.map((addr) => {
          if (addr.id === id) {
            return { ...address, id }
          }

          // If the updated address is now default, remove default from others
          if (address.isDefault && addr.id !== id) {
            return { ...addr, isDefault: false }
          }

          return addr
        }) || []

      return {
        ...prev,
        addresses: updatedAddresses,
      }
    })
  }

  const removeAddress = (id: string) => {
    setUser((prev) => {
      if (!prev) return null

      const updatedAddresses = prev.addresses?.filter((addr) => addr.id !== id) || []

      // If we removed the default address and there are other addresses, make the first one default
      const removedDefault = !updatedAddresses.some((addr) => addr.isDefault)
      if (removedDefault && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true
      }

      return {
        ...prev,
        addresses: updatedAddresses,
      }
    })
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log(email, password)
    // This is a mock implementation
    await new Promise((resolve) => setTimeout(resolve, 500))

    // For demo purposes, always log in successfully
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    // This is a mock implementation
    await new Promise((resolve) => setTimeout(resolve, 500))

    const { password, ...userInfo } = userData

    console.log(password)

    const newUser: User = {
      id: uuidv4(),
      firstName: userInfo.firstName || "",
      lastName: userInfo.lastName || "",
      email: userInfo.email || "",
      phone: userInfo.phone || "",
      addresses: [],
      orders: [],
      ...userInfo,
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    return true
  }

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        addAddress,
        updateAddress,
        removeAddress,
        login,
        logout,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
