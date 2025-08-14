"use client"

import type React from "react"
import { useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Header } from "./Header"
import { Sidebar } from "./sidebar"

interface Company {
  id: string
  name: string
}

interface User {
  name: string
  salesId: string
  company?: string
}

interface AppHeaderProps {
  user?: User
  companies?: Company[]
  selectedCompany?: string
  onCompanyChange?: (companyId: string) => void
  onRefresh?: () => void
  onNavigate?: (path: string) => void
  isLoading?: boolean
  sidebarContent?: React.ReactNode
  title?: string
}

export function AppHeader({
  user,
  companies = [],
  selectedCompany,
  onCompanyChange,
  onRefresh,
  onNavigate,
  isLoading = false,
  sidebarContent,
  title,
}: AppHeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogin = () => {
    console.log("Login clicked")
    // Add your login logic here - redirect to login page, open modal, etc.
  }

  return (
    <>
      <Header
        user={user}
        companies={companies}
        selectedCompany={selectedCompany}
        onCompanyChange={onCompanyChange}
        onRefresh={onRefresh}
        onLogin={handleLogin}
        onMenuClick={() => setSidebarOpen(true)}
        isLoading={isLoading}
        title={title}
      />

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0">
          <Sidebar user={user} onNavigate={onNavigate}>
            {sidebarContent}
          </Sidebar>
        </SheetContent>
      </Sheet>
    </>
  )
}
