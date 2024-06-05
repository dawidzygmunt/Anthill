import {
  getActivities,
  getAllActivities,
} from "@/actions/activities/get-activities"
import { DataTable } from "./components/data-table/data-table"
import { columns } from "./components/data-table/columns"

interface SettingsProps {
  searchParams: { showDeleted: string }
}

const Settings = async ({ searchParams }: SettingsProps) => {
  let activitiesList
  if (searchParams.showDeleted === "true") {
    activitiesList = await getAllActivities()
    if ("error" in activitiesList) {
      console.log(activitiesList.error)

      return
    }
  } else {
    activitiesList = await getActivities()
    if ("error" in activitiesList) {
      console.error(activitiesList.error)
      return
    }
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={activitiesList} />
    </div>
  )
}

export default Settings
