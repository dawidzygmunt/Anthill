"use server"
import prisma from "@/lib/db"
import { CustomError, handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"
import { auth } from "@clerk/nextjs/server"

export const getSingleWeek = async (from: Date) => {
  try {
    return await prisma.week.findFirst({
      where: {
        from,
      },
    })
  } catch (error) {
    return handleError(error, weeksPrismaCodesMap)
  }
}
