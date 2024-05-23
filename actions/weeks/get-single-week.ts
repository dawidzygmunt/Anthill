"use server"
import prismaCodesMap from "@/app/(dashboard)/utils/prisma-codes"
import prisma from "@/lib/db"

export const getSingleWeek = async (from: Date) => {
  try {
    return await prisma.week.findFirst({
      where: {
        from,
      },
    })
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
