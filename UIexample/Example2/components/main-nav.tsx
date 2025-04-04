"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, FileText, GitPullRequest, Network } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      active: pathname === "/",
    },
    {
      href: "/employees",
      label: "Employees",
      icon: <Users className="mr-2 h-4 w-4" />,
      active: pathname === "/employees" || pathname.startsWith("/employees/"),
    },
    {
      href: "/requests",
      label: "Requests",
      icon: <FileText className="mr-2 h-4 w-4" />,
      active: pathname === "/requests" || pathname.startsWith("/requests/"),
    },
    {
      href: "/organization",
      label: "Organization",
      icon: <Network className="mr-2 h-4 w-4" />,
      active: pathname === "/organization",
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <GitPullRequest className="h-6 w-6" />
        <span className="font-bold text-xl hidden sm:inline-block">Approval System</span>
      </Link>
      <div className="flex items-center space-x-2">
        {routes.map((route) => (
          <Link key={route.href} href={route.href}>
            <Button
              variant={route.active ? "default" : "ghost"}
              className={cn(
                "h-9",
                route.active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {route.icon}
              <span className="hidden md:inline">{route.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  )
}

