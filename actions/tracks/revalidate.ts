"use server"

import { de } from "@faker-js/faker"
import { revalidatePath } from "next/cache"

const revalidate = (path: string = "/") => {
  revalidatePath(path)
}

export default revalidate
