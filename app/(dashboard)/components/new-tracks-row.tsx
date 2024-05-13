"use client"

import { Activity } from "@prisma/client"
import React, { useState } from "react"
import Selector from "./selector"
import TracksRow from "./tracks-row"
import populateWithNewTracks from "../utils/populateWithNewTracks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import createTrackRow from "../server-actions/createTrackRow"
import { Form } from "@/components/ui/form"

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
          if (id) createTrackRow(id, from)
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
