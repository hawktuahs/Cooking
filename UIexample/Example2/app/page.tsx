import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { PendingApprovals } from "@/components/pending-approvals"
import { RequestStats } from "@/components/request-stats"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Approval Dashboard" text="View and manage approval requests assigned to you.">
        <Link href="/requests/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </Link>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <RequestStats />
      </div>
      <div className="grid gap-4">
        <PendingApprovals />
      </div>
    </DashboardShell>
  )
}

