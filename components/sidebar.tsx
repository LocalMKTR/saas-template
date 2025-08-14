"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Home, Info } from "lucide-react"

interface User {
  name: string
  salesId: string
  company?: string
}

interface SidebarProps {
  user?: User
  children?: React.ReactNode
  onNavigate?: (path: string) => void
}

export function Sidebar({ user, children, onNavigate }: SidebarProps) {
  const isLoggedIn = !!user

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path)
    } else {
      console.log(`Navigate to ${path}`)
    }
  }

  // Default content for non-logged-in users
  const defaultContent = (
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-4">Navigation</h3>
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigation("/")}>
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigation("/about")}>
          <Info className="mr-2 h-4 w-4" />
          About
        </Button>
      </div>
    </div>
  )

  return <div className="w-64 h-full">{isLoggedIn && children ? children : defaultContent}</div>
}
