/*
  Warnings:

  - A unique constraint covering the columns `[from,activityId]` on the table `TrackRow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TrackRow_from_activityId_key" ON "TrackRow"("from", "activityId");
