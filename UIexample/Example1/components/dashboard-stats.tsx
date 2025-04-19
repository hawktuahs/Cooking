"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, XCircle, FileText } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    pendingRequests: number
    approvedRequests: number
    rejectedRequests: number
    totalRequests: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="flex flex-row items-center gap-4 p-6">
          <Clock className="h-8 w-8 text-yellow-500" />
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
            <h3 className="text-2xl font-bold">{stats.pendingRequests}</h3>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-row items-center gap-4 p-6">
          <CheckCircle className="h-8 w-8 text-green-500" />
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved</p>
            <h3 className="text-2xl font-bold">{stats.approvedRequests}</h3>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-row items-center gap-4 p-6">
          <XCircle className="h-8 w-8 text-red-500" />
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rejected</p>
            <h3 className="text-2xl font-bold">{stats.rejectedRequests}</h3>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-row items-center gap-4 p-6">
          <FileText className="h-8 w-8 text-blue-500" />
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total</p>
            <h3 className="text-2xl font-bold">{stats.totalRequests}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

