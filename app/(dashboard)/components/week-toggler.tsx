import { Button } from "@/components/ui/button"
import { addDays, subDays } from "date-fns"
import Link from "next/link"
import React from "react"
import { URLSearchParams } from "url"

interface WeekToggler {
  from: Date
}

const WeekToggler: React.FC<WeekToggler> = ({ from: date }) => {
  const searchParamsPrev = new URLSearchParams()
  searchParamsPrev.set("from", subDays(date, 7).toISOString().split("T")[0])

  const searchParamsNext = new URLSearchParams()
  searchParamsNext.set("from", addDays(date, 7).toISOString().split("T")[0])

  return (
    <div className="col-span-2 flex">
      <Link
        href={`/?${searchParamsPrev}`}
        className="flex justify-start items-center m-0 p-0"
      >
        <Button className="m-0 px-2 sm:p-4 ">{"<"}</Button>
      </Link>
      <Link
        href={`/?${searchParamsNext}`}
        className="flex justify-start items-center"
      >
        <Button className="mx-1 px-2 sm:p-4 md:ml-1">{">"}</Button>
      </Link>
    </div>
  )
}

export default WeekToggler
