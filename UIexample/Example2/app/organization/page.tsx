import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { OrganizationChart } from "@/components/organization-chart"

export default function OrganizationPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Organization Hierarchy"
        text="View the organizational structure and reporting relationships."
      />
      <OrganizationChart />
    </DashboardShell>
  )
}

