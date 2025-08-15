"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface Representative {
  name: string;
  salesId: string | number;
}

interface SummaryReportProps {
  data: Array<{
    id: string;
    customer: string;
    product: string;
    amount: number;
    date: string;
    status: string;
  }>
  loading: boolean
  onBackClick: () => void
  currentRep: Representative | null
}

export function SummaryReport({ loading, onBackClick, currentRep }: SummaryReportProps) {
  if (loading) {
    return <div className="p-4">Loading summary...</div>
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={onBackClick}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h2 className="text-xl font-bold">Check Stubs Summary</h2>
      </div>
      <div className="bg-white rounded-lg border p-6">
        <p className="text-gray-600">Summary report content will be displayed here.</p>
        {currentRep && (
          <p className="mt-2 text-sm text-gray-500">
            Report for: {currentRep.name} (ID: {currentRep.salesId})
          </p>
        )}
      </div>
    </div>
  )
}