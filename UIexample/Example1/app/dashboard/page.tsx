"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ApprovalRequestList } from "@/components/approval-request-list"
import { DashboardStats } from "@/components/dashboard-stats"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
    totalRequests: 0,
  })

  useEffect(() => {
    // In a real app, you would fetch these stats from your API
    setStats({
      pendingRequests: 5,
      approvedRequests: 12,
      rejectedRequests: 3,
      totalRequests: 20,
    })
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => router.push("/dashboard/requests/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Approval Requests</CardTitle>
            <CardDescription>Your most recent approval requests</CardDescription>
          </CardHeader>
          <CardContent>
            <ApprovalRequestList limit={5} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user?.username}</CardTitle>
            <CardDescription>Here's a summary of your activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Your Role</div>
                  <div className="text-lg font-bold">{user?.roles[0] || "Employee"}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Your Requests</div>
                  <div className="text-lg font-bold">{stats.totalRequests}</div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 text-sm font-medium">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/requests")}>
                    View All Requests
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/employees")}>
                    Manage Employees
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

