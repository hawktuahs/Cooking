import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { ClaimsTable } from "@/components/claims-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function ClaimsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Claims Management" text="View and manage all unemployment claims in the system.">
        <Link href="/claims/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Claim
          </Button>
        </Link>
      </DashboardHeader>
      <ClaimsTable />
    </DashboardShell>
  )
}

