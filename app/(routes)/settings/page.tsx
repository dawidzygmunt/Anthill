import { getActivities } from "@/actions/activities/get-activities"
import { ActivitiesList } from "./components/activities-list"

const Settings = async () => {
  const activitiesList = await getActivities()
  if ("error" in activitiesList) {
    return activitiesList.error
  }

  return (
    <main className="lg:p-24 pt-24">
      <ActivitiesList data={activitiesList} />
    </main>
  )
}

export default Settings
