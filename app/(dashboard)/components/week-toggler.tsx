import { Button } from "@/components/ui/button"
import { addDays, subDays } from "date-fns"
import Link from "next/link"
import React, { useState } from "react"
import { URLSearchParams } from "url"

interface WeekToggler {
  from: Date
}

const WeekToggler: React.FC<WeekToggler> = ({ from: date }) => {
  const searchParamsPrev = new URLSearchParams()
  searchParamsPrev.set("from", subDays(date, 7).toISOString())

  const searchParamsNext = new URLSearchParams()
  searchParamsNext.set("from", addDays(date, 7).toISOString())

  return (
    <>
      <Link href={`/?${searchParamsPrev}`}>
        <Button className="mx-2 w-2/3">{"<"}</Button>
      </Link>
      <div>
        <Link href={`/?${searchParamsNext}`}>
          <Button className="mx-2 w-2/3">{">"}</Button>
        </Link>
      </div>
    </>
  )
}

export default WeekToggler
