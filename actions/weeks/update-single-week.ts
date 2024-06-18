"use server"
import prisma from "@/lib/db"
import { CustomError, handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"
import { auth } from "@clerk/nextjs/server"

export const updateSingleWeek = async (from: Date, isDone: boolean) => {
  try {
    const { userId } = auth()
    if (!userId) {
      throw new CustomError("User not authenticated", "NOT_AUTHENTICATED")
    }

    const week = await prisma.week.findFirst({
      where: {
        from,
        userId,
      },
    })

    if (!week) throw new CustomError("Week not found", "NOT_FOUND")
    return await prisma.week.update({
      where: { id: week.id, userId },
      data: {
        isClosed: isDone,
      },
    })
  } catch (error) {
    return handleError(error, weeksPrismaCodesMap)
  }
}
