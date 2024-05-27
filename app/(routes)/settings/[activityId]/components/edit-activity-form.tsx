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
import { revalidatePath } from "next/cache"
import revalidateTracks from "@/actions/tracks/revalidate"

const FormSchema = z.object({
  name: z.string({
    message: "Name must be at least 2 characters." || "",
  }),
  color: z.string({
    message: "Color must be a valid hex code." || "",
  }),
})

export function EditActivityForm({
  initialData,
}: {
  initialData: {
    id: string
    name: string
    color: string
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }
}) {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData,
  })

  async function onSubmit(data: { name: string; color: string }) {
    const newData = { ...data, id: initialData.id }
    const result = await patchActivity(newData)
    if ("error" in result) {
      toast.error(result.error)
      return
    }
    toast.success("Activity modified")
    revalidateTracks(`/settings/${initialData.id}`)
    router.push("/settings")
  }
  return (
    <main className="flex m-24">
      <div className="bg-[#c5c5c5] px-10 py-5 rounded-lg shadow-md">
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
