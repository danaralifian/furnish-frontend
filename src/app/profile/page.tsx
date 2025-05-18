"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb } from "@/features/layout/components/breadcrumb"
import ProfileInfo from "@/features/user/components/profile-info"
import AddressManager from "@/features/user/components/address-manager"
import OrderHistory from "@/features/user/components/order-history"
import { Suspense, useEffect, useState } from "react"
import { ProfileSkeleton } from "@/features/user/components/profile-skeleton"
import { useSearchParams } from "next/navigation"

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("profile")

  // Set the active tab based on the URL query parameter
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["profile", "addresses", "orders"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Profile", path: "/profile" },
        ]}
      />

      <div className="mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Suspense fallback={<ProfileSkeleton />}>
              <ProfileInfo />
            </Suspense>
          </TabsContent>

          <TabsContent value="addresses" className="mt-6">
            <Suspense fallback={<ProfileSkeleton />}>
              <AddressManager />
            </Suspense>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Suspense fallback={<ProfileSkeleton />}>
              <OrderHistory />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
