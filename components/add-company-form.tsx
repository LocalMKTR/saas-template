"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AddCompanyFormProps {
  onSubmit: (data: { 
    salesId: string; 
    code: string; 
    team?: string;
    role?: string;
  }) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export function AddCompanyForm({ onSubmit, onCancel, isSubmitting = false }: AddCompanyFormProps) {
  const [salesId, setSalesId] = useState("")
  const [code, setCode] = useState("")
  const [team, setTeam] = useState("")
  const [role, setRole] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!salesId || !code) {
      setError("Sales ID and Code are required")
      return
    }

    try {
      onSubmit({ 
        salesId, 
        code, 
        team: team || undefined,
        role: role || undefined
      })
      
      // Reset form after successful submission
      setSalesId("")
      setCode("")
      setTeam("")
      setRole("")
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    }
  }

  const handleCancel = () => {
    setSalesId("")
    setCode("")
    setTeam("")
    setRole("")
    setError("")
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="sales-id">Sales ID</Label>
        <Input
          id="sales-id"
          type="text"
          value={salesId}
          onChange={(e) => setSalesId(e.target.value)}
          placeholder="Enter your sales ID"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="code">Code</Label>
        <Input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your access code"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="team">Team (Optional)</Label>
        <Input
          id="team"
          type="text"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          placeholder="Enter your team"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role (Optional)</Label>
        <Input
          id="role"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter your role"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleCancel} 
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting || !salesId || !code}
        >
          {isSubmitting ? "Adding..." : "Join Company"}
        </Button>
      </div>
    </form>
  )
}
