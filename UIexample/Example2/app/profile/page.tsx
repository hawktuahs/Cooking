import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProfileForm } from "@/components/profile-form"

export default function ProfilePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Your Profile" text="Manage your personal information and preferences." />
      <ProfileForm />
    </DashboardShell>
  )
}

