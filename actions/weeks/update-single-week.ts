"use server"
import prismaCodesMap from "@/app/(dashboard)/utils/prisma-codes"
import prisma from "@/lib/db"
import { addDays } from "date-fns"

export const updateSingleWeek = async (from: Date, isDone: boolean) => {
  try {
    const week = await prisma.week.findFirst({
      where: {
        from,
      },
    })
    if (!week) return { error: "Week not found!" }
    return await prisma.week.update({
      where: { id: week.id },
      data: {
        isClosed: isDone,
      },
    })
  } catch (err: any) {
    if ("code" in err && err.code in prismaCodesMap) {
      return {
        error: prismaCodesMap[err.code],
      }
    }
    if ("errors" in err && err.errors.length > 0)
      return { error: err.errors[0].message }
    console.log(err.message)
    return { error: "Something went wrong!" }
  }
}
