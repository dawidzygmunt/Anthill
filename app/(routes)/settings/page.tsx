import {
  getActivities,
  getAllActivities,
} from "@/actions/activities/get-activities"
import { DataTable } from "./components/data-table/data-table"
import { columns } from "./components/data-table/columns"
import { AddActivityForm } from "./components/add-activity-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings - Anthill",
}

interface SettingsProps {
  searchParams: { showDeleted: string }
}

const Settings = async ({ searchParams }: SettingsProps) => {
  const result =
    searchParams.showDeleted === "true"
      ? await getAllActivities()
      : await getActivities()

  if (!result.ok) {
    const errorMessage = "code" in result.error
      ? `Failed to load activities: ${result.error.code}`
      : `Failed to load activities: ${result.error.message}`
    throw new Error(errorMessage)
  }

  const activitiesList = result.data
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
