import prisma from "@/lib/db"
import { handleError } from "@/utils/error-handler"
import weeksPrismaCodesMap from "@/utils/prisma-codes/weeks-prisma-codes"

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
