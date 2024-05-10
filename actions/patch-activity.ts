"use server"
import prismadb from '@/lib/prismadb'
import { Activity } from '@prisma/client'


export const PatchActivity = async (activity: Activity) => {
  const newActivity = await prismadb.activity.update({
    where: {
      id: activity.id
    },
    data: activity
  })
  return newActivity
}
