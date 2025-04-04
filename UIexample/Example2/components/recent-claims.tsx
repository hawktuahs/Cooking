import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RecentClaimsProps {
  className?: string
}

export function RecentClaims({ className }: RecentClaimsProps) {
  const recentClaims = [
    {
      id: "CL-7829",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      amount: "$450",
      status: "approved",
      date: "2 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    {
      id: "CL-7830",
      name: "Michael Chen",
      email: "m.chen@example.com",
      amount: "$380",
      status: "pending",
      date: "3 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    {
      id: "CL-7831",
      name: "Jessica Williams",
      email: "j.williams@example.com",
      amount: "$420",
      status: "approved",
      date: "5 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JW",
    },
    {
      id: "CL-7832",
      name: "David Miller",
      email: "d.miller@example.com",
      amount: "$390",
      status: "rejected",
      date: "6 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DM",
    },
    {
      id: "CL-7833",
      name: "Emily Rodriguez",
      email: "e.rodriguez@example.com",
      amount: "$410",
      status: "pending",
      date: "8 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ER",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Claims</CardTitle>
        <CardDescription>Latest unemployment claims submitted to the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentClaims.map((claim) => (
            <div key={claim.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={claim.avatar} alt={claim.name} />
                <AvatarFallback>{claim.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{claim.name}</p>
                <p className="text-sm text-muted-foreground">{claim.email}</p>
              </div>
              <div className="ml-auto font-medium">
                <div className="flex flex-col items-end gap-1">
                  <span>{claim.amount}</span>
                  <Badge
                    variant={
                      claim.status === "approved" ? "default" : claim.status === "pending" ? "outline" : "destructive"
                    }
                    className="text-xs"
                  >
                    {claim.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

