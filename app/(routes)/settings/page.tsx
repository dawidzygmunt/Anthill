import { getActivities } from "@/actions/activities/get-activities"
import { ActivitiesList } from "./components/activities-list"
import { Metadata } from "next"
import DisplayError from "@/utils/display-error"

export const generateMetadata: Metadata = {
  title: `Anthill v2 - Settings`,
}

const Settings = async () => {
  const activitiesList = await getActivities()
  if ("error" in activitiesList) {
    DisplayError(activitiesList.error)
    return
  }

  return (
    <main className="lg:p-24 pt-24">
      <ActivitiesList data={activitiesList} />
    </main>
  )
}

export default Settings
