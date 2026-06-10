"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity } from "@prisma/client"
import { useState } from "react"
import createTrackRow from "../../../actions/tracks/create-track-row"
import Selector from "./selector"
import DisplayError from "@/utils/display-error"
import toast from "react-hot-toast"
import { CustomError } from "@/utils/error-handler"

interface Props {
  allActivities: Activity[]
  from: Date
  to: Date
  opened: boolean
}

function NewTracksRow({ allActivities, from, to, opened = false }: Props) {
  const [add, setAdd] = useState(opened)
  const [activityId, setActivityId] = useState("")

  if (!add)
    return (
      <>
        <div className="col-span-2 flex items-center gap-2 text-sm text-gray-500 cursor-pointer" onClick={() => setAdd(true)}>
          <span className="text-lg">+</span> Add activity
        </div>
        {Array.from(Array(7).keys()).map((number) => (
          <div key={number}></div>
        ))}
        <div></div>
      </>
    )

  return (
    <>
      <Selector
        activityId={activityId}
        onChange={async (id) => {
          if (id === "DELETE") {
            toast.error("Create track first")
            return
          }
          setActivityId(id)
          if (id) {
            const result = await createTrackRow(id, from)
            if ("error" in result && result.error) {
              if (typeof DisplayError === "function") {
                DisplayError(result.error)
              }
              setActivityId("")
            }
          }
        }}
        activities={allActivities}
      />
      {Array.from(Array(7).keys()).map((number) => (
        <Input disabled key={number}></Input>
      ))}
      <div></div>
    </>
  )
}

export default NewTracksRow
