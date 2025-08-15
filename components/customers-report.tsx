"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface Customer {
  id: string;
  name: string;
  email?: string;
  // Add other relevant customer fields as needed
}

interface CustomersReportProps {
  data: Customer[];
  loading: boolean;
  onBackClick: () => void;
}

export function CustomersReport({ data, loading, onBackClick }: CustomersReportProps) {
  if (loading) {
    return <div className="p-4">Loading customers...</div>
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={onBackClick}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h2 className="text-xl font-bold">Customers Report</h2>
      </div>
      <div className="bg-white rounded-lg border p-6">
        {data.length === 0 ? (
          <p className="text-gray-600">No customer data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
