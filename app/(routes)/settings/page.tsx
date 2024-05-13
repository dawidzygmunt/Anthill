import { GetActivities } from "@/actions/get-activities"
import { ActivitiesList } from "./components/activities-list"
import { AddActivityForm } from "./components/add-activity-form"

const Settings = async () => {
  const activitiesList = await GetActivities()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <ActivitiesList data={activitiesList} />
    </main>
  )
}

export default Settings
