import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"
import { addDays, subDays, startOfWeek, setDefaultOptions } from "date-fns"

const prisma = new PrismaClient()
setDefaultOptions({ weekStartsOn: 1 })

// Configuration
const SEED_CONFIG = {
  activities: 20,
  weeks: 26,
  avgTrackRowsPerWeek: 6,
  tracksPerRow: 5,
}

async function clearDatabase() {
  console.log("🗑️  Clearing existing data...")
  await prisma.track.deleteMany()
  await prisma.trackRow.deleteMany()
  await prisma.week.deleteMany()
  await prisma.activity.deleteMany()
  console.log("✅ Database cleared")
}

async function seedActivities(count: number) {
  console.log(`📝 Creating ${count} activities...`)
  const names = new Set<string>()

  while (names.size < count) {
    names.add(faker.company.name())
  }

  const activities = Array.from(names).map((name) => ({
    name,
    color: faker.internet.color(),
  }))

  await prisma.activity.createMany({ data: activities })
  const created = await prisma.activity.findMany()
  console.log(`✅ Created ${created.length} activities`)
  return created
}

async function seedWeeksAndTrackRows(
  activities: any[],
  weekCount: number,
  avgRowsPerWeek: number
) {
  console.log(`📅 Creating ${weekCount} weeks with track rows...`)
  const weekStart = startOfWeek(new Date())

  for (let i = 0; i < weekCount; i++) {
    const weekDate = subDays(weekStart, i * 7)

    // Create week
    const week = await prisma.week.create({
      data: { from: weekDate },
    })

    // Random subset of activities for this week
    const shuffled = [...activities].sort(() => Math.random() - 0.5)
    const rowCount = Math.max(
      1,
      avgRowsPerWeek + Math.floor(Math.random() * 6) - 3
    )
    const selectedActivities = shuffled.slice(0, rowCount)

    // Create track rows
    const trackRowData = selectedActivities.map((activity) => ({
      activityId: activity.id,
      weekId: week.id,
      createdAt: faker.date.between({
        from: subDays(weekDate, 5),
        to: weekDate,
      }),
    }))

    await prisma.trackRow.createMany({ data: trackRowData })
  }

  const totalRows = await prisma.trackRow.count()
  console.log(`✅ Created ${weekCount} weeks with ${totalRows} track rows`)
}

async function seedTracks(tracksPerRow: number) {
  console.log("⏱️  Creating tracks for all track rows...")

  const weeks = await prisma.week.findMany({
    include: { TrackRow: true },
  })

  const tracks = weeks.flatMap((week) =>
    week.TrackRow.flatMap((row) =>
      Array.from({ length: tracksPerRow }, (_, i) => ({
        date: addDays(week.from, i),
        trackRowId: row.id,
        minutes: faker.number.int({ min: 30, max: 480 }),
      }))
    )
  )

  await prisma.track.createMany({ data: tracks })
  const totalTracks = await prisma.track.count()
  console.log(`✅ Created ${totalTracks} tracks`)
}

async function main() {
  console.log("\n🌱 Starting database seed...\n")

  try {
    await clearDatabase()
    const activities = await seedActivities(SEED_CONFIG.activities)
    await seedWeeksAndTrackRows(
      activities,
      SEED_CONFIG.weeks,
      SEED_CONFIG.avgTrackRowsPerWeek
    )
    await seedTracks(SEED_CONFIG.tracksPerRow)

    // Summary
    const counts = {
      activities: await prisma.activity.count(),
      weeks: await prisma.week.count(),
      trackRows: await prisma.trackRow.count(),
      tracks: await prisma.track.count(),
    }

    console.log("\n🎉 Seeding complete!")
    console.log("📊 Summary:")
    console.log(`   - Activities: ${counts.activities}`)
    console.log(`   - Weeks: ${counts.weeks}`)
    console.log(`   - Track Rows: ${counts.trackRows}`)
    console.log(`   - Tracks: ${counts.tracks}\n`)
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
