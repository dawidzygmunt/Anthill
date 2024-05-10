"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { GetActivities } from "@/actions/get-activities"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Edit, Trash2 } from "lucide-react"
import { EditModal } from "./components/edit-modal"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

function onSubmit(data: z.infer<typeof FormSchema>) {
  toast({
    title: "You submitted the following values:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  })
}

const Settings = async () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  const activitiesList = await GetActivities()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <EditModal />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-[300px]"
                    placeholder="Activity name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-[200px] mx-3" type="submit">
            Add
          </Button>
        </form>
      </Form>
      <div className="flex flex-col">
        {activitiesList?.map((activity, index) => (
          <div
            key={index}
            className="px-3 pl-5 py-2 bg-[#e5e3e3] m-3 w-[400px] rounded-sm flex justify-between items-center"
          >
            {activity.name}
            <div>
              <Button className="mr-1">
                <Edit size={15} />
              </Button>
              <Button className="ml-2" variant="destructive">
                <Trash2 size={15} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Settings
