"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

interface Employee {
  id: number
  name: string
  email: string
  department: string
  role: string
  status: "ACTIVE" | "INACTIVE"
}

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [employees, setEmployees] = useState<Employee[]>([])
  const router = useRouter()
  const { user } = useAuth()

  const isAdmin = user?.roles.includes("ADMIN")

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const mockEmployees: Employee[] = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        department: "Engineering",
        role: "Developer",
        status: "ACTIVE",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        department: "Marketing",
        role: "Manager",
        status: "ACTIVE",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        department: "Finance",
        role: "Analyst",
        status: "ACTIVE",
      },
      {
        id: 4,
        name: "Alice Williams",
        email: "alice.williams@example.com",
        department: "HR",
        role: "Director",
        status: "ACTIVE",
      },
      {
        id: 5,
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        department: "Engineering",
        role: "QA Engineer",
        status: "INACTIVE",
      },
    ]

    setEmployees(mockEmployees)
  }, [])

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Employees</h1>
        {isAdmin && (
          <Button onClick={() => router.push("/dashboard/employees/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search employees..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              {isAdmin && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isAdmin ? 6 : 5} className="text-center">
                  No employees found
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>
                    {employee.status === "ACTIVE" ? (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      >
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  {isAdmin && (
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/dashboard/employees/${employee.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

