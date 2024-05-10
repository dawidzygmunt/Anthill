"use server"
import prismadb from '@/lib/prismadb'
import { ActivitiesProps } from '@/lib/types'


export const PostActivities = async (data: ActivitiesProps) => {
  const activity = await prismadb.activity.create({
    data: data
  })
  return activity
}
