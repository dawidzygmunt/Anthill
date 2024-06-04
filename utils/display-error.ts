"use client"

import toast from "react-hot-toast"
import { frontErrorCodes } from "./front-error-codes"

type ErrorType = { code: string } | { message: string }

const DisplayError = (error: ErrorType) => {
  try {
    if ("message" in error) {
      toast.error(error.message)
      return
    }
    toast.error(frontErrorCodes[error.code])
    return
  } catch (error) {
    console.log(error)
  }
}

export default DisplayError
