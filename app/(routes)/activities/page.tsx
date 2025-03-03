import {
  getActivities,
  getAllActivities,
} from "@/actions/activities/get-activities"
import { DataTable } from "./components/data-table/data-table"
import { columns } from "./components/data-table/columns"
import DisplayError from "@/utils/display-error"
import { Card, CardContent } from "@/components/ui/card"

interface SettingsProps {
  searchParams: Promise<{ showDeleted: string }>
}

const Settings = async (props: SettingsProps) => {
  const searchParams = await props.searchParams
  let activitiesList
  if (searchParams.showDeleted === "true") {
    activitiesList = await getAllActivities()
    if ("error" in activitiesList) {
      if (typeof DisplayError === "function") {
        DisplayError(activitiesList.error)
      }
      return
    }
  } else {
    activitiesList = await getActivities()
    if ("error" in activitiesList) {
      if (typeof DisplayError === "function") {
        DisplayError(activitiesList.error)
      }
      return
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardContent>
          <DataTable columns={columns} data={activitiesList} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Settings
