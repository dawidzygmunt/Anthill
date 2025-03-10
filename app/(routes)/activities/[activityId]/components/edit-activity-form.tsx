"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { patchActivity } from "@/actions/activities/update-activity"
import revalidate from "@/actions/tracks/revalidate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { editFormSchema } from "@/schemas/edit-form-schema"
import DisplayError from "@/utils/display-error"
import { zodResolver } from "@hookform/resolvers/zod"
import { Activity } from "@prisma/client"
import { X } from "lucide-react"

export function EditActivityForm({ initialData }: { initialData: Activity }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: initialData,
  })

  async function onSubmit(data: { name: string; color: string }) {
    const newData = { ...data, id: initialData.id }
    const result = await patchActivity(newData)
    if ("error" in result) {
      if (typeof DisplayError === "function") {
        DisplayError(result.error)
      }
      return
    }
    revalidate(`/settings/`)
    toast.success("Activity modified")
    router.push(`/settings?${searchParams}`)
  }
  return (
    <main className="flex m-24">
      <Card>
        <CardContent className="pt-6">
          <Button
            className="absolute right-2 top-2 w-[20px] h-[20px] p-0"
            onClick={() => {
              router.push(`/settings?${searchParams}`)
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
        </CardContent>
      </Card>
    </main>
  )
}
