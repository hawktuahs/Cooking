"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, ArrowUpCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface RequestDetailsProps {
  id: string
}

export function RequestDetails({ id }: RequestDetailsProps) {
  const { toast } = useToast()
  const router = useRouter()

  // In a real application, you would fetch this data from your API
  const [request, setRequest] = useState({
    id,
    requesterId: 3,
    requesterName: "Charlie",
    requesterEmail: "charlie@example.com",
    requesterPosition: "Teacher",
    approverId: 2,
    approverName: "Bob",
    approverEmail: "bob@example.com",
    approverPosition: "Supervisor",
    status: "PENDING",
    description: "Budget approval for science lab equipment",
    createdAt: "2023-04-01T10:30:00Z",
    updatedAt: "2023-04-01T10:30:00Z",
  })

  const handleApprove = () => {
    setRequest({
      ...request,
      status: "APPROVED",
      updatedAt: new Date().toISOString(),
    })
    toast({
      title: "Request Approved",
      description: `Request ${id} has been approved successfully.`,
    })
  }

  const handleReject = () => {
    setRequest({
      ...request,
      status: "REJECTED",
      updatedAt: new Date().toISOString(),
    })
    toast({
      title: "Request Rejected",
      description: `Request ${id} has been rejected.`,
      variant: "destructive",
    })
  }

  const handleEscalate = () => {
    setRequest({
      ...request,
      status: "ESCALATED",
      updatedAt: new Date().toISOString(),
    })
    toast({
      title: "Request Escalated",
      description: `Request ${id} has been escalated to a higher level.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">Request #{request.id}</CardTitle>
            <CardDescription>Created on {new Date(request.createdAt).toLocaleString()}</CardDescription>
          </div>
          <Badge
            className="w-fit"
            variant={
              request.status === "APPROVED"
                ? "default"
                : request.status === "PENDING"
                  ? "outline"
                  : request.status === "ESCALATED"
                    ? "secondary"
                    : "destructive"
            }
          >
            {request.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Description</h3>
          <p className="mt-2 text-muted-foreground">{request.description}</p>
        </div>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-medium mb-2">Requester</h3>
            <div className="space-y-1">
              <p className="font-medium">{request.requesterName}</p>
              <p className="text-sm text-muted-foreground">{request.requesterEmail}</p>
              <p className="text-sm text-muted-foreground">{request.requesterPosition}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Approver</h3>
            <div className="space-y-1">
              <p className="font-medium">{request.approverName}</p>
              <p className="text-sm text-muted-foreground">{request.approverEmail}</p>
              <p className="text-sm text-muted-foreground">{request.approverPosition}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium">Timeline</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Created:</span>
              <span>{new Date(request.createdAt).toLocaleString()}</span>
            </div>
            {request.updatedAt !== request.createdAt && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Last Updated:</span>
                <span>{new Date(request.updatedAt).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {request.status === "PENDING" && (
          <>
            <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button variant="outline" onClick={handleEscalate}>
              <ArrowUpCircle className="mr-2 h-4 w-4" />
              Escalate
            </Button>
          </>
        )}
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </CardFooter>
    </Card>
  )
}

