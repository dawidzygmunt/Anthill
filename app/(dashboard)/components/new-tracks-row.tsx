"use client"

import { Activity } from "@prisma/client"
import React, { useState } from "react"
import Selector from "./selector"
import TracksRow from "./tracks-row"
import populateWithNewTracks from "../utils/populateWithNewTracks"
import { Button } from "@/components/ui/button"

interface Props {
  allActivities: Activity[]
  from: Date
  to: Date
  opened: boolean
}

function NewTracksRow({ allActivities, from, to, opened }: Props) {
  const [add, setAdd] = useState(opened)
  const [activityId, setActivityId] = useState("")

  if (!add) return <Button onClick={() => setAdd(true)}>Add</Button>

  return (
    <>
      <Selector
        activityId={activityId}
        onChange={(id) => {
          setActivityId(id)
        }}
        activities={allActivities}
      />
      <TracksRow trackData={populateWithNewTracks([], activityId, from, to)} />
    </>
  )
}

export default NewTracksRow
