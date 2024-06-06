import { Prisma } from "@prisma/client"
import { error } from "console"
import { string, ZodError } from "zod"

const errorDefaultCodeMap: Record<string, string> = {
  NOT_FOUND: "9001",
}

export class CustomError extends Error {
  code: string
  constructor(message: string, errorCode: string) {
    super(message)
    this.code = errorCode
  }
}

const UNKNOWN_ERROR = "9000"
const NOT_FOUND_ERROR = "9001"

export const handleError = (
  error: unknown,
  customPrismaMap: Record<string, string> = errorDefaultCodeMap
): { error: { code: string } | { message: string } } => {
  // To translate Prisma errors
  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    (error instanceof CustomError && error.code in customPrismaMap)
  ) {
    return { error: { code: customPrismaMap[error.code] || UNKNOWN_ERROR } }
  }

  if (error instanceof ZodError) {
    console.log("ZodError", error.errors[0].message)

    return { error: { message: error.errors[0].message } }
  }

  // To translate unknown errors
  if (!(error instanceof CustomError)) {
    return { error: { code: UNKNOWN_ERROR } }
  }

  // To translate custom errors
  if (error.code in errorDefaultCodeMap) {
    return { error: { code: errorDefaultCodeMap[error.code] } }
  } else {
    return { error: { code: UNKNOWN_ERROR } }
  }
}
