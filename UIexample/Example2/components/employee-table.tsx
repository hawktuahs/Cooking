"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, UserCheck, UserX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export type Employee = {
  id: number
  name: string
  email: string
  position: string
  manager: string | null
  managerId: number | null
  availabilityStatus: "AVAILABLE" | "UNAVAILABLE"
}

const data: Employee[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    position: "Principal",
    manager: null,
    managerId: null,
    availabilityStatus: "AVAILABLE",
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    position: "Supervisor",
    manager: "Alice",
    managerId: 1,
    availabilityStatus: "AVAILABLE",
  },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@example.com",
    position: "Teacher",
    manager: "Bob",
    managerId: 2,
    availabilityStatus: "UNAVAILABLE",
  },
  {
    id: 4,
    name: "David",
    email: "david@example.com",
    position: "Teacher",
    manager: "Bob",
    managerId: 2,
    availabilityStatus: "AVAILABLE",
  },
  {
    id: 5,
    name: "Eva",
    email: "eva@example.com",
    position: "Teacher",
    manager: "Bob",
    managerId: 2,
    availabilityStatus: "AVAILABLE",
  },
  {
    id: 6,
    name: "Frank",
    email: "frank@example.com",
    position: "Supervisor",
    manager: "Alice",
    managerId: 1,
    availabilityStatus: "AVAILABLE",
  },
  {
    id: 7,
    name: "Grace",
    email: "grace@example.com",
    position: "Teacher",
    manager: "Frank",
    managerId: 6,
    availabilityStatus: "AVAILABLE",
  },
  {
    id: 8,
    name: "Henry",
    email: "henry@example.com",
    position: "Teacher",
    manager: "Frank",
    managerId: 6,
    availabilityStatus: "UNAVAILABLE",
  },
]

export function EmployeeTable() {
  const { toast } = useToast()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [employees, setEmployees] = React.useState<Employee[]>(data)
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null)
  const [isUpdateSupervisorOpen, setIsUpdateSupervisorOpen] = React.useState(false)
  const [newSupervisorId, setNewSupervisorId] = React.useState<string>("")

  const handleToggleAvailability = (employeeId: number) => {
    setEmployees(
      employees.map((emp) => {
        if (emp.id === employeeId) {
          const newStatus = emp.availabilityStatus === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE"
          toast({
            title: `Availability Updated`,
            description: `${emp.name}'s status is now ${newStatus.toLowerCase()}.`,
          })
          return {
            ...emp,
            availabilityStatus: newStatus,
          }
        }
        return emp
      }),
    )
  }

  const handleUpdateSupervisor = () => {
    if (!selectedEmployee || !newSupervisorId) return

    const newSupervisor = employees.find((emp) => emp.id === Number.parseInt(newSupervisorId))
    if (!newSupervisor) return

    setEmployees(
      employees.map((emp) => {
        if (emp.id === selectedEmployee.id) {
          toast({
            title: "Supervisor Updated",
            description: `${emp.name}'s supervisor is now ${newSupervisor.name}.`,
          })
          return {
            ...emp,
            manager: newSupervisor.name,
            managerId: newSupervisor.id,
          }
        }
        return emp
      }),
    )

    setIsUpdateSupervisorOpen(false)
    setNewSupervisorId("")
  }

  const columns: ColumnDef<Employee>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "position",
      header: "Position",
      cell: ({ row }) => <div>{row.getValue("position")}</div>,
    },
    {
      accessorKey: "manager",
      header: "Manager/Supervisor",
      cell: ({ row }) => {
        const manager = row.getValue("manager")
        return <div>{manager || "None (Top Level)"}</div>
      },
    },
    {
      accessorKey: "availabilityStatus",
      header: "Availability",
      cell: ({ row }) => {
        const employee = row.original
        return (
          <div className="flex items-center">
            <Switch
              checked={employee.availabilityStatus === "AVAILABLE"}
              onCheckedChange={() => handleToggleAvailability(employee.id)}
              className="mr-2"
            />
            <Badge variant={employee.availabilityStatus === "AVAILABLE" ? "default" : "destructive"}>
              {employee.availabilityStatus === "AVAILABLE" ? (
                <UserCheck className="mr-1 h-3 w-3" />
              ) : (
                <UserX className="mr-1 h-3 w-3" />
              )}
              {employee.availabilityStatus}
            </Badge>
          </div>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const employee = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(employee.id.toString())}>
                Copy employee ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedEmployee(employee)
                  setIsUpdateSupervisorOpen(true)
                }}
              >
                Update supervisor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleToggleAvailability(employee.id)}>
                Toggle availability
              </DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: employees,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter employees..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>

      <Dialog open={isUpdateSupervisorOpen} onOpenChange={setIsUpdateSupervisorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Supervisor</DialogTitle>
            <DialogDescription>
              {selectedEmployee && `Change the supervisor for ${selectedEmployee.name}.`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supervisor" className="text-right">
                New Supervisor
              </Label>
              <Select value={newSupervisorId} onValueChange={setNewSupervisorId}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a supervisor" />
                </SelectTrigger>
                <SelectContent>
                  {employees
                    .filter((emp) => emp.id !== selectedEmployee?.id)
                    .map((emp) => (
                      <SelectItem key={emp.id} value={emp.id.toString()}>
                        {emp.name} ({emp.position})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateSupervisorOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateSupervisor}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

