import {
  getActivities,
  getAllActivities,
} from "@/actions/activities/get-activities"
import { DataTable } from "./components/data-table/data-table"
import { columns } from "./components/data-table/columns"
import { AddActivityForm } from "./components/add-activity-form"

interface SettingsProps {
  searchParams: { showDeleted: string }
}

const Settings = async ({ searchParams }: SettingsProps) => {
  let activitiesList
  if (searchParams.showDeleted === "true") {
    activitiesList = await getAllActivities()
    if ("error" in activitiesList) {
      const errorMessage = "code" in activitiesList.error
        ? `Failed to load activities: ${activitiesList.error.code}`
        : `Failed to load activities: ${activitiesList.error.message}`
      throw new Error(errorMessage)
    }
  } else {
    activitiesList = await getActivities()
    if ("error" in activitiesList) {
      const errorMessage = "code" in activitiesList.error
        ? `Failed to load activities: ${activitiesList.error.code}`
        : `Failed to load activities: ${activitiesList.error.message}`
      throw new Error(errorMessage)
    }
  }

  const activeCount = activitiesList.filter((a) => !a.deletedAt).length

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeCount} active {activeCount === 1 ? "activity" : "activities"}{" "}
            · tracked across your team
          </p>
        </div>
        <div className="flex items-end py-3">
          <AddActivityForm />
        </div>
      </div>
      <DataTable columns={columns} data={activitiesList} />
    </div>
  )
}

export default Settings
