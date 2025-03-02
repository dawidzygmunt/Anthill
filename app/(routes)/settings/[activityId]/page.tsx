import { getSingleActivity } from "@/actions/activities/get-single-activity"
import { EditActivityForm } from "./components/edit-activity-form"
import { Metadata } from "next"

export const generateMetadata = async (
  props: {
    params: Promise<{ activityId: string }>
  }
): Promise<Metadata> => {
  const params = await props.params;
  return {
    title: `Anthill v2 - Edit activity ${params.activityId}`,
  }
}
import DisplayError from "@/utils/display-error"

const EditActivity = async (props: { params: Promise<{ activityId: string }> }) => {
  const params = await props.params;
  const activity = await getSingleActivity(params.activityId)
  if ("error" in activity) {
    if (typeof DisplayError === "function") {
      DisplayError(activity.error)
    }
    return
  }
  return (
    <div className="flex flex-col items-center m-24">
      <EditActivityForm initialData={activity} />
    </div>
  )
}

export default EditActivity
