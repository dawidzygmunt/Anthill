import { Prisma } from "@prisma/client"
import { ZodError } from "zod"
import { Result, err } from "./result"
import { logError } from "./logger"

const errorDefaultCodeMap: Record<string, string> = {
  NOT_FOUND: "9001",
  NOT_AUTHENTICATED: "9002",
  NOT_AUTH: "9003",
}

export class CustomError extends Error {
  code: string
  constructor(message: string, errorCode: string) {
    super(message)
    this.code = errorCode
  }
}

const UNKNOWN_ERROR = "9000"

export const handleError = (
  error: unknown,
  customPrismaMap: Record<string, string> = errorDefaultCodeMap
): Result<never> => {
  logError(error)

  if (error instanceof ZodError) {
    return err({ message: error.errors[0].message })
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return err({ code: customPrismaMap[error.code] || UNKNOWN_ERROR })
  }

  if (error instanceof CustomError) {
    const code = customPrismaMap[error.code] || errorDefaultCodeMap[error.code] || UNKNOWN_ERROR
    return err({ code })
  }

  return err({ code: UNKNOWN_ERROR })
}
