"use client"
import { Button } from "@/components/ui/button"
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Menu,  ChevronDown, Building2} from "lucide-react"

interface Company {
  id: string
  name: string
}

interface User {
  name: string
  salesId: string
  company?: string
}

interface HeaderProps {
  user?: User
  companies?: Company[]
  selectedCompany?: string
  onCompanyChange?: (companyId: string) => void
  onRefresh?: () => void
  onLogin?: () => void
  onMenuClick?: () => void
  isLoading?: boolean
  title?: string
}

export function Header({
  user,
  companies = [],
  selectedCompany,
  onCompanyChange,
  onMenuClick,
  isLoading = false,
  title,
}: HeaderProps) {
  const isLoggedIn = !!user
  const userName = user?.name || "User"
  const userCompany = user?.company || ""

  const displayTitle = title || (userCompany ? `${userCompany} Sales Trkr` : "Sales Trkr")
  const currentCompanyName = selectedCompany
    ? companies.find((c) => c.id === selectedCompany)?.name || userCompany
    : userCompany

  const getUserInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className={`bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 ${isLoading ? 'opacity-80' : ''}`}>
      {/* Left side - Menu and User/Company Info */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-6 w-6" />
        </Button>

        {isLoggedIn && (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-sm">{getUserInitials(userName)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{userName}</span>
              {currentCompanyName && (
                <div className="flex items-center gap-1">
                  <Building2 className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-600">{currentCompanyName}</span>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            {companies.length > 0 && onCompanyChange && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2" disabled={isLoading}>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <div className="px-2 py-1.5 text-sm font-medium text-gray-700">Switch Company</div>
                  <DropdownMenuSeparator />
                  {companies.map((company) => (
                    <DropdownMenuItem
                      key={company.id}
                      onClick={() => onCompanyChange(company.id)}
                      className={`cursor-pointer ${selectedCompany === company.id ? "bg-gray-100" : ""}`}
                      disabled={isLoading}
                    >
                      <Building2 className="mr-2 h-4 w-4" />
                      {company.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
      </div>

      {/* Center - Title */}
      <h1 className="text-lg font-semibold text-center flex-1">{displayTitle}</h1>

      {/* Right side - Actions and Avatar/Login */}
      <div className="flex items-center gap-2">
      <SignedOut>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}
