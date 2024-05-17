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
import { zodResolver } from "@hookform/resolvers/zod"
import { Activity } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import changeActivityForTrackRow from "../server-actions/change-activity-for-track-row"
import revalidateTracks from "../server-actions/revalidate-tracks"

import { toast } from "react-hot-toast"

interface Props {
  activities: Activity[]
  activityId: string
  trackRowId?: string
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

  return (
    <div className="col-span-2 flex items-center text-[2px]">
      <Form {...form}>
        <form className="w-[200px] space-y-6">
          <FormField
            name="picker"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-16 sm:w-32 xl:w-auto">
                <Select
                  onValueChange={async (value) => {
                    field.onChange(value)
                    if (onChange) onChange(value)
                    else if (trackRowId) {
                      const result = await changeActivityForTrackRow(
                        trackRowId,
                        value
                      )
                      if ("error" in result) {
                        toast.error(result.error)
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
