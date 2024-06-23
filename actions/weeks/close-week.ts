import prisma from "@/lib/db"
import { CustomError, handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"
import { auth } from "@clerk/nextjs/server"

export const CloseWeek = async (weekId: string, isClosed: boolean) => {
  try {
    return await prisma.week.update({
      where: { id: weekId },
      data: {
        isClosed: isClosed,
      },
    })
  } catch (error) {
    return handleError(error, weeksPrismaCodesMap)
  }
}
