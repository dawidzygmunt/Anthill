"use client"

import { TracksProps } from '@/lib/types'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"


const FormSchema = z.object({
  trackInput1: z.number().min(1, {
    message: "Username must be at least 2 characters.",
  }),
})



const TracksRow = ({
  trackData
}: { trackData: TracksProps[] }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {

    },
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
  return (
    <>
      {trackData.map((track, index) => (
        <div key={index} className="text-center py-1 px-2">
          <Form {...form}>
            <form onBlur={form.handleSubmit(onSubmit)} className="space-y-6 justify-start">
              <FormField
                control={form.control}
                name={`trackInput${index}`}
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
        </div>
      ))}
    </>
  )
}

export default TracksRow