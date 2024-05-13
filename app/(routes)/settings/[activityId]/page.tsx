import { GetSingleActivity } from "@/actions/get-single-activity"
import { EditActivityForm } from "./components/edit-activity-form"
import { Activity } from "@prisma/client"
import toast from "react-hot-toast"

const EditActivity = async ({ params }: { params: { activityId: string } }) => {
  const activity = await GetSingleActivity(params.activityId)
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
