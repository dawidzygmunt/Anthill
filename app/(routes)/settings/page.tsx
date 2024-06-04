import { getActivities } from "@/actions/activities/get-activities"
import { ActivitiesList } from "./components/activities-list"
import toast from "react-hot-toast"
import DisplayError from "@/utils/display-error"

const Settings = async () => {
  const activitiesList = await getActivities()
  if ("error" in activitiesList) {
    DisplayError(activitiesList.error.code)
    return
  }

  return (
    <main className="lg:p-24 pt-24">
      <ActivitiesList data={activitiesList} />
    </main>
  )
}

export default Settings
