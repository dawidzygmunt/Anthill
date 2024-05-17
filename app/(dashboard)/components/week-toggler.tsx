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
  searchParamsPrev.set("from", subDays(date, 7).toISOString())

  const searchParamsNext = new URLSearchParams()
  searchParamsNext.set("from", addDays(date, 7).toISOString())

  return (
    <div className="col-span-2 flex">
      <Link
        href={`/?${searchParamsPrev}`}
        className="flex justify-start items-center"
      >
        <Button className="p-0 px-2 sm:p-4 md:mx-2 lg:w-2/3">{"<"}</Button>
      </Link>

      <Link
        href={`/?${searchParamsNext}`}
        className="flex justify-start items-center"
      >
        <Button className="p-2 mx-1 sm:p-4 lg:mx-2 lg:w-2/3">{">"}</Button>
      </Link>
    </div>
  )
}

export default WeekToggler
