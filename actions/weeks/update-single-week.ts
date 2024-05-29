"use server"
import prisma from "@/lib/db"
import { extractErrorMessage } from "@/lib/utils"
import weeksPrismaCodesMap from "@/utils/weeks-prisma-codes"

export const updateSingleWeek = async (from: Date, isDone: boolean) => {
  try {
    const week = await prisma.week.findFirst({
      where: {
        from,
      },
    })
    if (!week) return { error: "There are no activities for this week" }
    return await prisma.week.update({
      where: { id: week.id },
      data: {
        isClosed: isDone,
      },
    })
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      String(error.code) in weeksPrismaCodesMap
    ) {
      const prismaCode = String(error.code)
      const message = weeksPrismaCodesMap[prismaCode]
      return { error: message }
    }
    return { error: extractErrorMessage(error) }
  }
}
