"use server"

import prisma from "@/lib/db"

const deleteTrack = async (trackId: string) => {
  try {
    return await prisma.track.delete({ where: { id: trackId } })
  } catch (err) {
    console.log(err)
    return { error: "Something went wrong!" }
  }
}

export default deleteTrack
