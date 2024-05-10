import prismadb from "@/lib/prismadb"



export const GetActivities = async () => {
  const actions = await prismadb.activity.findMany()
  return actions
}
