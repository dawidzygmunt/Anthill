"use server"
import prisma from "@/lib/db"
import { CustomError, handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"
import { auth } from "@clerk/nextjs/server"

export const getSingleWeek = async (from: Date) => {
  try {
    const { userId } = auth()
    if (!userId) {
      throw new CustomError("User not authenticated", "NOT_AUTHENTICATED")
    }

    return await prisma.week.findFirst({
      where: {
        from,
        userId,
      },
    })
  } catch (error) {
    return handleError(error, weeksPrismaCodesMap)
  }
}
