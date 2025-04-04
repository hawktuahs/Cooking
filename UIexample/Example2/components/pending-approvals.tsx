"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle, ArrowUpCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export function PendingApprovals() {
  const { toast } = useToast()
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: "REQ-001",
      requester: {
        name: "Charlie",
        email: "charlie@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "C",
      },
      description: "Budget approval for science lab equipment",
      status: "PENDING",
      createdAt: "2 hours ago",
    },
    {
      id: "REQ-002",
      requester: {
        name: "David",
        email: "david@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "D",
      },
      description: "Request for additional classroom supplies",
      status: "PENDING",
      createdAt: "3 hours ago",
    },
    {
      id: "REQ-003",
      requester: {
        name: "Eva",
        email: "eva@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "E",
      },
      description: "Field trip permission for 10th grade students",
      status: "PENDING",
      createdAt: "5 hours ago",
    },
  ])

  const handleApprove = (id: string) => {
    setPendingRequests(pendingRequests.filter((req) => req.id !== id))
    toast({
      title: "Request Approved",
      description: `Request ${id} has been approved successfully.`,
    })
  }

  const handleReject = (id: string) => {
    setPendingRequests(pendingRequests.filter((req) => req.id !== id))
    toast({
      title: "Request Rejected",
      description: `Request ${id} has been rejected.`,
      variant: "destructive",
    })
  }

  const handleEscalate = (id: string) => {
    setPendingRequests(pendingRequests.filter((req) => req.id !== id))
    toast({
      title: "Request Escalated",
      description: `Request ${id} has been escalated to your supervisor.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Approval Requests</CardTitle>
        <CardDescription>Requests awaiting your approval. Approve, reject, or escalate as needed.</CardDescription>
      </CardHeader>
      <CardContent>
        {pendingRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">All caught up!</h3>
            <p className="text-sm text-muted-foreground mt-1">You have no pending approval requests.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingRequests.map((request) => (
              <div key={request.id} className="flex flex-col space-y-4 rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9 mr-4">
                      <AvatarImage src={request.requester.avatar} alt={request.requester.name} />
                      <AvatarFallback>{request.requester.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{request.requester.name}</div>
                      <div className="text-sm text-muted-foreground">{request.requester.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline">{request.status}</Badge>
                    <div className="text-sm text-muted-foreground ml-4">{request.createdAt}</div>
                  </div>
                </div>
                <div>
                  <p className="text-sm">{request.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(request.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleReject(request.id)}>
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEscalate(request.id)}>
                      <ArrowUpCircle className="mr-2 h-4 w-4" />
                      Escalate
                    </Button>
                  </div>
                  <Link href={`/requests/${request.id}`}>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

