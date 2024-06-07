"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { patchActivity } from "@/actions/activities/update-activity"
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
import { useRouter } from "next/navigation"
import revalidate from "@/actions/tracks/revalidate"
import { editFormSchema } from "@/schemas/edit-form-schema"
import { X } from "lucide-react"
import { Activity } from "@prisma/client"
import DisplayError from "@/utils/display-error"

export function EditActivityForm({ initialData }: { initialData: Activity }) {
  const router = useRouter()
  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: initialData,
  })

  async function onSubmit(data: { name: string; color: string }) {
    const newData = { ...data, id: initialData.id }
    const result = await patchActivity(newData)
    if ("error" in result) {
      DisplayError(result.error)
      return
    }
    toast.success("Activity modified")
    revalidate(`/settings/`)
    router.push("/settings")
  }
  return (
    <main className="flex m-24">
      <div className="bg-[#c5c5c5] px-10 py-5 rounded-lg shadow-md relative">
        <Button
          className="absolute right-2 top-2 w-[20px] h-[20px] p-0"
          onClick={() => {
            router.push("/settings")
          }}
        >
          <X size={15} />
        </Button>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => onSubmit(data))}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Activity 1..."
                      className="w-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Activity 1..."
                      className="w-[80px] p-0 rounded-lg"
                      {...field}
                      type="color"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
