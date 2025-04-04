import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { RequestDetails } from "@/components/request-details"

export default function RequestDetailsPage({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <DashboardHeader heading={`Request #${params.id}`} text="View and manage the details of this approval request." />
      <RequestDetails id={params.id} />
    </DashboardShell>
  )
}

