"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Track } from "@prisma/client"
import { useEffect } from "react"

import handleTrackChange from "../utils/handleTrackChange"

const FormSchema = z.object({
  trackInput: z.string(),
})

export interface EmptyTrack {
  activityId: string
  date: Date
  minutes?: number
}

interface Props {
  track: Track | EmptyTrack
}

const TrackInput = ({ track }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trackInput: track.minutes?.toString() ?? "",
    },
  })

  useEffect(() => {
    form.setValue("trackInput", track.minutes?.toString() ?? "")
  }, [track])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await handleTrackChange(
      track.activityId,
      track.date,
      parseInt(data.trackInput)
    )
    if ("error" in result)
      return form.setValue("trackInput", track.minutes?.toString() ?? "")
    form.setValue("trackInput", result.minutes.toString())
  }
  return (
    <>
      <Form {...form}>
        <form
          onBlur={form.handleSubmit(onSubmit)}
          className="space-y-6 justify-start"
        >
          <FormField
            control={form.control}
            name="trackInput"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  )
}

export default TrackInput
