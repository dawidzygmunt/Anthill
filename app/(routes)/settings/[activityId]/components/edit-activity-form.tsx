"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { PatchActivity } from "@/actions/patch-activity"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import { ActivitiesProps } from "@/lib/types"

interface EditActivityFormProps {
  addFunction: () => void
}

const FormSchema = z.object({
  name: z.string({
    message: "Name must be at least 2 characters." || "",
  }),
})

export function EditActivityForm({
  initialData,
}: {
  initialData: { id: string; name: string; color: string }
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData,
  })

  async function onSubmit(data: { name: string }) {
    console.log(data)

    const result = await PatchActivity({ id: initialData.id, ...data })
    if ("error" in result) {
      toast.error(result.error)
      return
    }
    toast.success("Activity added")
  }
  return (
    <main className="flex m-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => onSubmit(data, initialData))}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity Name</FormLabel>
                <FormControl>
                  <Input placeholder="Activity 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  )
}
