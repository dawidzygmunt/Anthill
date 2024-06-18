import prisma from "@/lib/db"
import { CustomError, handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"
import { auth } from "@clerk/nextjs/server"

export const CloseWeek = async (weekId: string, isClosed: boolean) => {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new CustomError("User not authenticated", "NOT_AUTHENTICATED")
    }

    return await prisma.week.update({
      where: { id: weekId, userId },
      data: {
        isClosed: isClosed,
      },
    })
  } catch (error) {
    return handleError(error, weeksPrismaCodesMap)
  }
}
