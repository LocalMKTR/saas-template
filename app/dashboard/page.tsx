"use client"

import { AppHeader } from "@/components/app-header"
import { SummaryReport } from "@/components/summary-report"
import { CustomersReport } from "@/components/customers-report"
import { ManagerReport } from "@/components/manager-report"
import { Card, CardContent } from "@/components/ui/card"
import { User, TrendingUp, Users, Users2 } from "lucide-react"
import { useState } from "react"
import { CompanyDropdown } from "@/components/company-dropdown"

export default function Page() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [loading] = useState(false)

  // Mock data - replace with real data
  const currentRep = {
    name: "John Doe",
    salesId: "SD001",
  }

  interface Customer {
    id: string;
    name: string;
    date: string;
    amount: number;
    status?: 'active' | 'inactive';
  }

  // Mock customer data
  const salesData: Customer[] = [
    {
      id: 'C001',
      name: 'Jane Smith',
      date: '2023-04-15',
      amount: 1250.75,
      status: 'active'
    },
    {
      id: 'C002',
      name: 'Bob Johnson',
      date: '2023-04-14',
      amount: 875.50,
      status: 'active'
    },
    {
      id: 'C003',
      name: 'Alice Brown',
      date: '2023-04-13',
      amount: 2100.25,
      status: 'inactive'
    }
  ]

  const detailedSalesData = [
    {
      id: 'S001',
      customer: 'Jane Smith',
      product: 'Premium Package',
      amount: 1250.75,
      date: '2023-04-15',
      status: 'completed'
    },
    {
      id: 'S002',
      customer: 'Bob Johnson',
      product: 'Standard Package',
      amount: 875.50,
      date: '2023-04-14',
      status: 'pending'
    }
  ]

  const handleBackToDashboard = () => {
    setActiveTab("dashboard")
  }

  if (activeTab !== "dashboard") {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader />
        <main className="container mx-auto px-4 py-8">
          {activeTab === "summary" && (
            <div className="space-y-4">
              <SummaryReport 
                data={detailedSalesData}
                loading={loading} 
                onBackClick={handleBackToDashboard}
                currentRep={currentRep}
              />
            </div>
          )}
          
          {activeTab === "customers" && (
            <div className="space-y-4">
              <CustomersReport 
                data={salesData} 
                loading={loading} 
                onBackClick={handleBackToDashboard} 
              />
            </div>
          )}
          
          {activeTab === "manager" && (
            <div className="space-y-4">
              <ManagerReport 
                currentRep={currentRep} 
                loading={loading} 
                onBackClick={handleBackToDashboard} 
              />
            </div>
          )}
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
      <CompanyDropdown/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveTab("summary")}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <TrendingUp className="h-8 w-8 mb-2 text-blue-600" />
              <h3 className="text-lg font-semibold">Summary Report</h3>
              <p className="text-sm text-gray-600 text-center">
                View detailed sales summary
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveTab("customers")}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Users className="h-8 w-8 mb-2 text-green-600" />
              <h3 className="text-lg font-semibold">Customers Report</h3>
              <p className="text-sm text-gray-600 text-center">
                Manage customer data
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveTab("manager")}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <User className="h-8 w-8 mb-2 text-purple-600" />
              <h3 className="text-lg font-semibold">Manager Report</h3>
              <p className="text-sm text-gray-600 text-center">
                Manager dashboard view
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow opacity-50">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Users2 className="h-8 w-8 mb-2 text-gray-400" />
              <h3 className="text-lg font-semibold">Team Report</h3>
              <p className="text-sm text-gray-600 text-center">
                Coming soon
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
