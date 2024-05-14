import { GetActivities } from "@/actions/get-activities"
import { ActivitiesList } from "./components/activities-list"

const Settings = async () => {
  const activitiesList = await GetActivities()
  if ("error" in activitiesList) {
    return activitiesList.error
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <ActivitiesList data={activitiesList} />
    </main>
  )
}

export default Settings
