"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { getRandomHexColor } from "@/lib/utils"
import revalidate from "@/actions/tracks/revalidate"
import { createActivity } from "@/actions/activities/create-activity"
import toast from "react-hot-toast"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Activity name must be at least 2 characters.",
  }),
})

export function AddActivityForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const newData = {
      ...data,
      color: getRandomHexColor(),
    }
    const result = await createActivity(newData)
    if ("error" in result) {
      toast.error(result.error)
      return
    }
    toast.success("Activity added successfully")
    revalidate("/settings")
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[400px] mb-5">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add new activity</DialogTitle>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Add your activity..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogClose>
                  <Button type="submit">Submit</Button>
                </DialogClose>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
