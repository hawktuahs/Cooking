import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { NewClaimForm } from "@/components/new-claim-form"

export default function NewClaimPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Submit New Claim" text="Fill out the form below to submit a new unemployment claim." />
      <NewClaimForm />
    </DashboardShell>
  )
}

