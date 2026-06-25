import { getSingleActivity } from "@/actions/activities/get-single-activity"
import { EditActivityForm } from "./components/edit-activity-form"
import { Metadata } from "next"

export function generateMetadata({
  params,
}: {
  params: { activityId: string }
}): Metadata {
  return {
    title: `Edit Activity - Anthill`,
  }
}

const EditActivity = async ({ params }: { params: { activityId: string } }) => {
  const activity = await getSingleActivity(params.activityId)
  if ("error" in activity) {
    const errorMessage = "code" in activity.error
      ? `Failed to load activity: ${activity.error.code}`
      : `Failed to load activity: ${activity.error.message}`
    throw new Error(errorMessage)
  }
  return (
    <div className="flex flex-col items-center m-24">
      <EditActivityForm initialData={activity} />
    </div>
  )
}

export default EditActivity
