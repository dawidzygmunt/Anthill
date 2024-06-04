"use server"
import prisma from "@/lib/db"
import { CustomError, handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"

export const updateSingleWeek = async (from: Date, isDone: boolean) => {
  try {
    const week = await prisma.week.findFirst({
      where: {
        from,
      },
    })
    if (!week) throw new CustomError("Week not found", "NOT_FOUND")
    return await prisma.week.update({
      where: { id: week.id },
      data: {
        isClosed: isDone,
      },
    })
  } catch (error) {
    return handleError(error, weeksPrismaCodesMap)
  }
}
