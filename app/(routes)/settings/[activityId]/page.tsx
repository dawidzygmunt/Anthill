import { GetSingleActivity } from "@/actions/get-single-activity"
import { EditActivityForm } from "./components/edit-activity-form"
import { Activity } from "@prisma/client"

const EditActivity = async ({ params }: { params: { activityId: string } }) => {
  const activity = await GetSingleActivity(params.activityId)
  return (
    <div className="flex flex-col items-center m-24">
      <EditActivityForm initialData={activity} />
    </div>
  )
}

export default EditActivity
