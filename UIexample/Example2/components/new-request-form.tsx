"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  requesterId: z.string({
    required_error: "Please select a requester.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})

export function NewRequestForm() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  })

  const employees = [
    {
      id: 3,
      name: "Charlie",
      position: "Teacher",
    },
    {
      id: 4,
      name: "David",
      position: "Teacher",
    },
    {
      id: 5,
      name: "Eva",
      position: "Teacher",
    },
    {
      id: 7,
      name: "Grace",
      position: "Teacher",
    },
    {
      id: 8,
      name: "Henry",
      position: "Teacher",
    },
  ]

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // In a real application, you would submit this data to your backend
    toast({
      title: "Request Submitted",
      description: "Your approval request has been submitted successfully.",
    })
    router.push("/")
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="requesterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requester</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a requester" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id.toString()}>
                          {employee.name} ({employee.position})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the employee who is making this request</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe the details of your request..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a clear and detailed description of what you're requesting approval for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit Request</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

