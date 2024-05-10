import prismadb from "@/lib/prismadb"
import { Activity } from "@prisma/client"


export const GetActivities = async () => {
  const actions = await prismadb.activity.findMany()
  return actions
}
