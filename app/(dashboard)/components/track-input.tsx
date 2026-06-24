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

import handleTrackChange from "../../../actions/tracks/handle-track-change"
import revalidateTracks from "../../../actions/tracks/revalidate"
import deleteTrack from "../../../actions/tracks/delete-track"
import DisplayError from "@/utils/display-error"
import { parseTime } from "@/lib/utils"

const FormSchema = z.object({
  trackInput: z.string(),
})

export interface EmptyTrack {
  trackRowId: string
  date: Date
  minutes?: number
}

interface Props {
  track: Track | EmptyTrack
  disabled?: boolean
}

const TrackInput = ({ track, disabled = false }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trackInput: track.minutes ? `${(track.minutes / 60).toFixed(1)}h` : "",
    },
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const trackDate = new Date(track.date)
  trackDate.setHours(0, 0, 0, 0)
  const isToday = trackDate.getTime() === today.getTime()
  const isWeekend = trackDate.getDay() === 0 || trackDate.getDay() === 6

  useEffect(() => {
    form.setValue(
      "trackInput",
      track.minutes ? `${(track.minutes / 60).toFixed(1)}h` : ""
    )
  }, [track, form])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const inputValue = data.trackInput.replace("h", "").trim()

    if ("id" in track && inputValue === "") {
      const result = await deleteTrack(track.id)
      if ("error" in result) {        DisplayError(result.error)
        return form.setValue(
          "trackInput",
          track.minutes ? `${(track.minutes / 60).toFixed(1)}h` : ""
        )
      }
      return revalidateTracks()
    }

    if (inputValue.length < 1) return

    const minutes = parseInt(parseTime(inputValue).toString(), 10)

    const result = await handleTrackChange(
      track.trackRowId,
      track.date,
      minutes
    )
    if ("error" in result) {        DisplayError(result.error)
      return form.setValue(
        "trackInput",
        track.minutes ? `${(track.minutes / 60).toFixed(1)}h` : ""
      )
    }
    form.setValue("trackInput", `${(result.minutes / 60).toFixed(1)}h`)
    revalidateTracks()
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
                  <Input
                    className={`p-0 text-center md:text-left md:px-2 ${
                      disabled
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : isToday
                        ? "bg-orange-50"
                        : isWeekend
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                    placeholder=""
                    {...field}
                    key={track.date.toString()}
                    disabled={disabled}
                    readOnly={disabled}
                  />
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
