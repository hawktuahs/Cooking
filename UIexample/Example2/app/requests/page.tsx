import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { RequestsTable } from "@/components/requests-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function RequestsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="All Approval Requests" text="View and manage all approval requests in the system.">
        <Link href="/requests/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </Link>
      </DashboardHeader>
      <RequestsTable />
    </DashboardShell>
  )
}

