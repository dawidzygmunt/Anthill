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
}

const myParse = (number: string) => {
  const result = number.replace(",", ".")
  const hours = parseFloat(result)
  const minutes = hours * 60

  const integerPart = Math.floor(hours)
  const decimalPart = hours - integerPart

  if (decimalPart >= 0.1 && decimalPart <= 0.5) {
    return minutes + 30 - decimalPart * 60
  } else if (decimalPart >= 0.6 && decimalPart <= 0.9) {
    return Math.floor(minutes + 60 - decimalPart * 60)
  } else {
    return minutes - decimalPart * 60
  }
}

const TrackInput = ({ track }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trackInput: track.minutes ? (track.minutes / 60).toString() : "",
    },
  })

  useEffect(() => {
    form.setValue(
      "trackInput",
      track.minutes ? (track.minutes / 60).toString() : ""
    )
  }, [track, form])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if ("id" in track && data.trackInput === "") {
      const result = await deleteTrack(track.id)
      if ("error" in result) {
        DisplayError(result.error)
        return form.setValue(
          "trackInput",
          track.minutes ? (track.minutes / 60).toString() : ""
        )
      }
      return revalidateTracks()
    }

    if (data.trackInput.length < 1) return

    const minutes = parseInt(myParse(data.trackInput).toString(), 10)

    const result = await handleTrackChange(
      track.trackRowId,
      track.date,
      minutes
    )
    if ("error" in result) {
      DisplayError(result.error)
      return form.setValue(
        "trackInput",
        track.minutes ? (track.minutes / 60).toString() : ""
      )
    }
    form.setValue("trackInput", (result.minutes / 60).toString())
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
                    className="p-0 text-center md:text-left md:px-2"
                    placeholder=""
                    {...field}
                    key={track.date.toString()}
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
