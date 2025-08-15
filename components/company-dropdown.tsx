"use client"

import { useState, useTransition } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AddCompanyForm } from "./add-company-form"
import { addUserToExistingCompany } from "@/lib/actions/company.actions"

// Sample companies data
const companies = [
  { id: "1", name: "Acme Corporation" },
  { id: "2", name: "TechStart Inc." },
  { id: "3", name: "Global Solutions Ltd." },
  { id: "4", name: "Innovation Labs" },
]

export function CompanyDropdown() {
  const [selectedCompany, setSelectedCompany] = useState<string>(companies.length > 0 ? companies[0].id : "add-new")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleCompanyChange = (value: string) => {
    setSelectedCompany(value)
    if (value === "add-new") {
      setIsModalOpen(true)
    }
  }

  const handleAddNewCompany = async (data: { 
    salesId: string; 
    code: string; 
    team?: string;
    role?: string;
  }) => {
    startTransition(async () => {
      try {
        await addUserToExistingCompany(data.salesId, data.code, data.team, data.role)
        setIsModalOpen(false)
      } catch (error) {
        console.error('Error adding company:', error)
        // Handle error appropriately
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    // Reset to first company when canceling
    setSelectedCompany(companies.length > 0 ? companies[0].id : "add-new")
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <Select value={selectedCompany} onValueChange={handleCompanyChange}>
          <SelectTrigger className="bg-white p-6 m-4" size="sm" id="company-select">
            <SelectValue placeholder="Select a company" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.name}
              </SelectItem>
            ))}
            <SelectItem value="add-new">Add New Company</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Company</DialogTitle>
          </DialogHeader>
          {/* <div className="py-4"> */}
            <AddCompanyForm onSubmit={handleAddNewCompany} onCancel={handleCancel} isSubmitting={isPending} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
