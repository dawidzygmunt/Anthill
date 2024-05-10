"use client"

import { Activity } from "@prisma/client"
import React, { useState } from "react"
import Selector from "./selector"
import TracksRow from "./tracks-row"
import populateWithNewTracks from "../utils/populateWithNewTracks"

interface Props {
  allActivities: Activity[]
  from: Date
  to: Date
}

function NewTracksRow({ allActivities, from, to }: Props) {
  const [activityId, setActivityId] = useState("")

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
