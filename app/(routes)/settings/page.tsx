import { getActivities } from "@/actions/activities/get-activities"
import { ActivitiesList } from "./components/activities-list"

const Settings = async () => {
  const activitiesList = await getActivities()
  if ("error" in activitiesList) {
    return activitiesList.error
  }

  return (
    <main className="flex min-h-screen flex-col items-center lg:p-24 pt-24">
      <ActivitiesList data={activitiesList} />
    </main>
  )
}

export default Settings
