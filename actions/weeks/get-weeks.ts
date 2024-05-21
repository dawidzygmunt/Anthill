import prismaCodesMap from "@/app/(dashboard)/utils/prisma-codes"
import prisma from "@/lib/db"

export const getWeeks = async (from: Date, to: Date) => {
  try {
    const weeks = await prisma.trackRow.findMany({
      where: {
        from: {
          gte: from,
          lt: to,
        },
      },
      include: {
        Track: true,
      },
    })
    return weeks
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
