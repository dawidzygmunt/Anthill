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
import { toast } from "@/components/ui/use-toast"
import { Track } from "@prisma/client"

const FormSchema = z.object({
  trackInput: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
})

interface TrackInputProps {
  track: Track | null
}

const TrackInput = ({ track }: TrackInputProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  })

  form.setValue("trackInput", (track?.date?.toISOString() || "").toString())

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
