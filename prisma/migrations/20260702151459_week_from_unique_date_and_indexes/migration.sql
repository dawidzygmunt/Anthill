-- AlterTable
ALTER TABLE "Week" ALTER COLUMN "from" SET DATA TYPE DATE;

-- CreateIndex
CREATE INDEX "Track_date_idx" ON "Track"("date");

-- CreateIndex
CREATE INDEX "TrackRow_activityId_idx" ON "TrackRow"("activityId");

-- CreateIndex
CREATE INDEX "TrackRow_weekId_idx" ON "TrackRow"("weekId");

-- CreateIndex
CREATE UNIQUE INDEX "Week_from_key" ON "Week"("from");
