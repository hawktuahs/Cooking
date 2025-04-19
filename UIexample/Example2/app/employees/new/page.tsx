import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { NewEmployeeForm } from "@/components/new-employee-form"

export default function NewEmployeePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create New Employee" text="Add a new employee to the organizational hierarchy." />
      <NewEmployeeForm />
    </DashboardShell>
  )
}

