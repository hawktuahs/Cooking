import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { NewRequestForm } from "@/components/new-request-form"

export default function NewRequestPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Submit New Request"
        text="Create a new approval request that will be routed to your supervisor."
      />
      <NewRequestForm />
    </DashboardShell>
  )
}

