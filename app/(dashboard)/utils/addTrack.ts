"use server"

import { EmptyTrack } from "../components/track-input"
import prisma from "@/lib/db"

const addTrack = async (track: EmptyTrack) => {
  if (!track.minutes) return
  return await prisma.track.create({
    data: track as EmptyTrack & { minutes: number },
  })
}

export default addTrack
