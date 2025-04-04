import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { EmployeeTable } from "@/components/employee-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function EmployeesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Employee Management"
        text="Create, update, and manage employees in the organizational hierarchy."
      >
        <Link href="/employees/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Employee
          </Button>
        </Link>
      </DashboardHeader>
      <EmployeeTable />
    </DashboardShell>
  )
}

