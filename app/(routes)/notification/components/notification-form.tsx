"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const NotificationForm = () => {
  const FormSchema = z.object({
    enable_notifications: z.boolean().default(false).optional(),
    marketing_emails: z.boolean().default(false).optional(),
    security_emails: z.boolean(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      security_emails: true,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    toast.success("Notifications updated")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">
            Time Tracking Notifications
          </h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="enable_notifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Enable Notifications</FormLabel>
                    <FormDescription>Receive notification.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked)
                        form.handleSubmit(onSubmit)()
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketing_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Notify me on end of week</FormLabel>
                    <FormDescription>
                      Receive notification about filling your missing hours.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={
                        form.watch("enable_notifications") ? field.value : false
                      }
                      onCheckedChange={(checked) => {
                        field.onChange(checked)
                        form.handleSubmit(onSubmit)()
                      }}
                      disabled={!form.watch("enable_notifications")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="security_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Notify me on end of month</FormLabel>
                    <FormDescription>
                      Receive notification about missing weeks records.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={
                        form.watch("enable_notifications") ? field.value : false
                      }
                      onCheckedChange={(checked) => {
                        field.onChange(checked)
                        form.handleSubmit(onSubmit)()
                      }}
                      aria-readonly
                      disabled={!form.watch("enable_notifications")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}

export default NotificationForm
