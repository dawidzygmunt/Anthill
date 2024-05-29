"use server"
import prisma from "@/lib/db"
import { extractErrorMessage } from "@/lib/utils"
import weeksPrismaCodesMap from "@/utils/weeks-prisma-codes"

export const getSingleWeek = async (from: Date) => {
  try {
    return await prisma.week.findFirst({
      where: {
        from,
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
