"use server"
import prismadb from '@/lib/prismadb'


export const DeleteActivity = (id: string) => {
  const activity = prismadb.activity.delete({
    where: {
      id: id
    }
  })
  return activity
}
