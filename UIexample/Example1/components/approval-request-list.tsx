"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./auth-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"

interface ApprovalRequest {
  id: number
  title: string
  description: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  createdAt: string
  createdBy: string
}

interface ApprovalRequestListProps {
  limit?: number
}

export function ApprovalRequestList({ limit }: ApprovalRequestListProps) {
  const [requests, setRequests] = useState<ApprovalRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const mockRequests: ApprovalRequest[] = [
      {
        id: 1,
        title: "Purchase Request - Office Supplies",
        description: "Request for new office supplies including stationery and printer ink",
        status: "PENDING",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        createdBy: "john.doe",
      },
      {
        id: 2,
        title: "Travel Expense Reimbursement",
        description: "Reimbursement for business trip to New York",
        status: "APPROVED",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        createdBy: "jane.smith",
      },
      {
        id: 3,
        title: "Software License Request",
        description: "Request for Adobe Creative Cloud license",
        status: "REJECTED",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
        createdBy: "john.doe",
      },
      {
        id: 4,
        title: "Training Course Approval",
        description: "Request to attend React Advanced conference",
        status: "PENDING",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
        createdBy: "jane.smith",
      },
      {
        id: 5,
        title: "Equipment Purchase",
        description: "Request for new laptop for development team",
        status: "APPROVED",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
        createdBy: "john.doe",
      },
    ]

    setRequests(limit ? mockRequests.slice(0, limit) : mockRequests)
    setIsLoading(false)
  }, [limit])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            Pending
          </Badge>
        )
      case "APPROVED":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Approved
          </Badge>
        )
      case "REJECTED":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">No approval requests found</p>
        <Button size="sm" onClick={() => router.push("/dashboard/requests/new")}>
          Create New Request
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div
          key={request.id}
          className="flex flex-col space-y-2 rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
          onClick={() => router.push(`/dashboard/requests/${request.id}`)}
        >
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{request.title}</h4>
            {getStatusBadge(request.status)}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{request.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>By: {request.createdBy}</span>
            <span>{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</span>
          </div>
        </div>
      ))}
      {limit && requests.length >= limit && (
        <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/requests")}>
          View All Requests
        </Button>
      )}
    </div>
  )
}

