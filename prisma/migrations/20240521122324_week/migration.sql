-- AlterTable
ALTER TABLE "TrackRow" ADD COLUMN     "weekId" TEXT;

-- CreateTable
CREATE TABLE "Week" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Week_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Week_startDate_endDate_key" ON "Week"("startDate", "endDate");

-- AddForeignKey
ALTER TABLE "TrackRow" ADD CONSTRAINT "TrackRow_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week"("id") ON DELETE SET NULL ON UPDATE CASCADE;
