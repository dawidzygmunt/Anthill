"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity } from "@prisma/client"
import { useState } from "react"
import toast from "react-hot-toast"
import createTrackRow from "../server-actions/create-track-row"
import Selector from "./selector"

interface Props {
  allActivities: Activity[]
  from: Date
  to: Date
  opened: boolean
}

function NewTracksRow({ allActivities, from, to, opened = false }: Props) {
  const [add, setAdd] = useState(opened)
  const [activityId, setActivityId] = useState("")

  if (!add) return <Button onClick={() => setAdd(true)}>Add</Button>

  return (
    <>
      <Selector
        activityId={activityId}
        onChange={async (id) => {
          setActivityId(id)
          if (id) {
            const result = await createTrackRow(id, from)
            if ("error" in result) {
              toast.error(result.error)
              setActivityId("")
            }
          }
        }}
        activities={allActivities}
      />
      {Array.from(Array(7).keys()).map((number) => (
        <Input disabled key={number}></Input>
      ))}
    </>
  )
}

export default NewTracksRow
