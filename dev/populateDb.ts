import prisma from "../lib/db";
import { faker } from "@faker-js/faker";
import { Activity } from "@prisma/client";
import { addDays, subDays, startOfWeek, setDefaultOptions } from "date-fns";
import { clearDb } from "./clearDb";

setDefaultOptions({ weekStartsOn: 1 });

const randomActivities = (n = 100) => {
  const names = Array.from(Array(n).keys()).map(() => faker.company.name());
  return Array.from(new Set(names)).map((name) => ({ name }));
};

const randomTracksForWeek = async (
  weekStart: Date,
  avgActivitiesPerWeek = 10
) => {
  const days = Array.from(Array(5).keys()).map((shift) =>
    addDays(weekStart, shift)
  );

  const randomActivities = await prisma.$queryRawUnsafe<Activity[]>(`
    SELECT * FROM public."Activity"
    ORDER BY RANDOM()
    LIMIT ${avgActivitiesPerWeek + Math.round(Math.random() * 10 - 0.5)};
  `);

  return days
    .map((day) => {
      return (randomActivities || []).map((activity) => ({
        date: day,
        activityId: activity.id,
        minutes: faker.number.int({ min: 60, max: 60 * 8 }),
      }));
    })
    .flat();
};

//52 weeks in year
const populateDb = async (weeks = 52 * 5) => {
  await clearDb();
  console.log("Populating db...");
  const activities = randomActivities();
  await prisma.activity.createMany({ data: activities });

  const weekStart = startOfWeek(new Date());
  const tracks = (
    await Promise.all(
      Array.from(Array(weeks).keys()).map(
        async (shift) =>
          await randomTracksForWeek(subDays(weekStart, shift * 7))
      )
    )
  ).flat();

  await prisma.track.createMany({ data: tracks });
};

populateDb();
