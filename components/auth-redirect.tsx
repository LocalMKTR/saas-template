"use client"

import type React from "react"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthRedirectProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AuthRedirect({ children, redirectTo = "/dashboard" }: AuthRedirectProps) {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push(redirectTo)
    }
  }, [isLoaded, isSignedIn, router, redirectTo])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (isSignedIn) {
    return null // Will redirect, so don't show content
  }

  return <>{children}</>
}
