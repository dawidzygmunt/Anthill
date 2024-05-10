import prismadb from "@/lib/prismadb"
import { Activity } from "@prisma/client"


export const GetSingleActivity = async (activityId: string) => {
  const action = await prismadb.activity.findFirst({
    where: { id: activityId }
  })
  return action
}
