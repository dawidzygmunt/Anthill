import { getSingleActivity } from "@/actions/get-single-activity"
import toast from "react-hot-toast"
import { EditActivityForm } from "./components/edit-activity-form"

const EditActivity = async ({ params }: { params: { activityId: string } }) => {
  const activity = await getSingleActivity(params.activityId)
  if ("error" in activity) {
    toast.error(activity.error)
    return
  }
  return (
    <div className="flex flex-col items-center m-24">
      <EditActivityForm initialData={activity} />
    </div>
  )
}

export default EditActivity
