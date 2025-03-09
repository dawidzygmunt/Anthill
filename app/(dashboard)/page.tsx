import WeekRow from "./components/week-row"

import TracksGrid from "./components/tracks-grid"
import { addDays, startOfWeek, isValid, subDays } from "date-fns"
import WeekToggler from "./components/week-toggler"
import { Suspense } from "react"
import { SkeletonLoader } from "@/components/skeleton-lodaer"
import { TopBar } from "../../components/top-bar"
import { Metadata } from "next"
import { auth } from "@clerk/nextjs/server"
import { handleError } from "@/utils/error-handler"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ListWeeks } from "@/components/sidebar/list-weeks"
import { getWeeks } from "@/actions/weeks/get-weeks"
import DisplayError from "@/utils/display-error"

interface HomeProps {
  searchParams: Promise<{ from: string }>
}

export const generateMetadata = async ({
  searchParams,
}: HomeProps): Promise<Metadata> => {
  const params = await searchParams
  return {
    title: `Anthill v2 - ${params.from}`,
  }
}

export default async function Home(props: HomeProps) {
  const searchParams = await props.searchParams
  const today = new Date()
  const from = subDays(today, 180)
  const to = addDays(today, 180)
  const weeks = await getWeeks(from, to)

  if ("error" in weeks) {
    if (typeof DisplayError === "function") {
      DisplayError(weeks.error)
    }
    return
  }

  try {
    const paramDate = new Date(searchParams.from)
    const from = isValid(paramDate)
      ? startOfWeek(paramDate, { weekStartsOn: 1 })
      : startOfWeek(new Date(), { weekStartsOn: 1 })

    const to = addDays(from, 6)

    return (
      <main className="py-3 md:px-7 flex gap-5">
        <Card className="px-0">
          <CardHeader>
            <TopBar from={from} to={to} />
          </CardHeader>
          <CardContent className="px-1 md:px-4 lg:px-7">
            <div className="grid grid-cols-9 lg:gap-1 px-0 max-w-[900px]">
              <WeekToggler from={addDays(from, 1)} />
              <WeekRow from={from} />
              <Suspense fallback={<SkeletonLoader />}>
                <TracksGrid from={from} to={addDays(to, 1)} />
              </Suspense>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-black/5 hidden lg:flex pt-4">
          <CardContent>
            <ListWeeks weeks={weeks} />
          </CardContent>
        </Card>
      </main>
    )
  } catch (error) {
    handleError(error)
  }
}
