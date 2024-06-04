import { Activity } from "@prisma/client"
import { AddActivityForm } from "./add-activity-form"
import { ElementActions } from "./element-actions"

export const ActivitiesList = ({ data }: { data: Activity[] }) => {
  return (
    <div className="flex flex-col items-center">
      <AddActivityForm />
      {data.map((activity) => (
        <div
          key={activity.id}
          className="px-3 pl-5 py-2 bg-[#e5e3e3] m-3 w-[400px] rounded-sm flex justify-between items-center shadow-lg"
        >
          {activity.name}
          <div>
            <ElementActions activity={activity} />
          </div>
        </div>
      ))}
    </div>
  )
}
