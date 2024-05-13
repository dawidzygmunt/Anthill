"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Activity } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import changeActivityForTrackRow from "../server-actions/changeActivityForTrackRow"
import revalidateTracks from "../server-actions/revalidateTracks"

interface Props {
  activities: Activity[]
  activityId: string
  trackRowId: string
  onChange?: (activityId: string) => void
}

const FormSchema = z.object({
  picker: z.string(),
})

export function ActivitySelector({
  activities,
  activityId,
  onChange,
  trackRowId,
}: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(activities: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(activities, null, 2)}
          </code>
        </pre>
      ),
    })
  }

  return (
    <div className="col-span-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[200px] space-y-6"
        >
          <FormField
            name="picker"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={async (value) => {
                    field.onChange(value)
                    if (onChange) onChange(value)
                    else {
                      const result = await changeActivityForTrackRow(
                        trackRowId,
                        value
                      )
                      if ("error" in result) {
                        return field.onChange(activityId)
                      }
                      revalidateTracks()
                    }
                  }}
                  value={field.value || activityId}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your activity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {activities?.map((activity, index) => (
                      <SelectItem key={index} value={activity.id}>
                        {activity.name}
                      </SelectItem>
                    ))}
                    <SelectItem className="font-bold" value="new">
                      Add new +
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default ActivitySelector
