"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserCheck, UserX } from "lucide-react"

interface Employee {
  id: number
  name: string
  email: string
  position: string
  managerId: number | null
  availabilityStatus: "AVAILABLE" | "UNAVAILABLE"
  children?: Employee[]
}

export function OrganizationChart() {
  // In a real application, you would fetch this data from your API
  const [flatEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      position: "Principal",
      managerId: null,
      availabilityStatus: "AVAILABLE",
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      position: "Supervisor",
      managerId: 1,
      availabilityStatus: "AVAILABLE",
    },
    {
      id: 3,
      name: "Charlie",
      email: "charlie@example.com",
      position: "Teacher",
      managerId: 2,
      availabilityStatus: "UNAVAILABLE",
    },
    {
      id: 4,
      name: "David",
      email: "david@example.com",
      position: "Teacher",
      managerId: 2,
      availabilityStatus: "AVAILABLE",
    },
    {
      id: 5,
      name: "Eva",
      email: "eva@example.com",
      position: "Teacher",
      managerId: 2,
      availabilityStatus: "AVAILABLE",
    },
    {
      id: 6,
      name: "Frank",
      email: "frank@example.com",
      position: "Supervisor",
      managerId: 1,
      availabilityStatus: "AVAILABLE",
    },
    {
      id: 7,
      name: "Grace",
      email: "grace@example.com",
      position: "Teacher",
      managerId: 6,
      availabilityStatus: "AVAILABLE",
    },
    {
      id: 8,
      name: "Henry",
      email: "henry@example.com",
      position: "Teacher",
      managerId: 6,
      availabilityStatus: "UNAVAILABLE",
    },
  ])

  // Convert flat list to hierarchical structure
  const buildHierarchy = (employees: Employee[]): Employee[] => {
    const employeeMap = new Map<number, Employee>()

    // Create a map of all employees
    employees.forEach((employee) => {
      employeeMap.set(employee.id, { ...employee, children: [] })
    })

    // Build the hierarchy
    const rootEmployees: Employee[] = []

    employeeMap.forEach((employee) => {
      if (employee.managerId === null) {
        // This is a root employee
        rootEmployees.push(employee)
      } else {
        // This employee has a manager
        const manager = employeeMap.get(employee.managerId)
        if (manager) {
          if (!manager.children) {
            manager.children = []
          }
          manager.children.push(employee)
        }
      }
    })

    return rootEmployees
  }

  const hierarchicalEmployees = buildHierarchy(flatEmployees)

  const EmployeeNode = ({ employee }: { employee: Employee }) => {
    return (
      <div className="flex flex-col">
        <div className="flex items-center p-4 rounded-lg border bg-card">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={employee.name} />
            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">{employee.name}</div>
            <div className="text-sm text-muted-foreground">{employee.position}</div>
          </div>
          <Badge variant={employee.availabilityStatus === "AVAILABLE" ? "default" : "destructive"} className="ml-2">
            {employee.availabilityStatus === "AVAILABLE" ? (
              <UserCheck className="mr-1 h-3 w-3" />
            ) : (
              <UserX className="mr-1 h-3 w-3" />
            )}
            {employee.availabilityStatus}
          </Badge>
        </div>

        {employee.children && employee.children.length > 0 && (
          <div className="ml-8 mt-2 pl-4 border-l">
            <div className="space-y-2">
              {employee.children.map((child) => (
                <EmployeeNode key={child.id} employee={child} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Hierarchy</CardTitle>
        <CardDescription>
          Visual representation of the organizational structure and reporting relationships.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hierarchicalEmployees.map((employee) => (
            <EmployeeNode key={employee.id} employee={employee} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

