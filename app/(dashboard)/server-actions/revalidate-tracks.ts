"use server"

import { de } from "@faker-js/faker"
import { revalidatePath } from "next/cache"

const revalidateTracks = () => {
  revalidatePath("/")
}

export default revalidateTracks
