"use server"

import { revalidatePath } from "next/cache"

const revalidateTracks = () => {
  revalidatePath("/")
}

export default revalidateTracks
