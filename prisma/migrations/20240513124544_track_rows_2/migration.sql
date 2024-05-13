/*
  Warnings:

  - You are about to drop the column `activityId` on the `Track` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date,trackRowId]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `trackRowId` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_activityId_fkey";

-- DropIndex
DROP INDEX "Track_date_activityId_key";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "activityId",
ADD COLUMN     "trackRowId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Track_date_trackRowId_key" ON "Track"("date", "trackRowId");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_trackRowId_fkey" FOREIGN KEY ("trackRowId") REFERENCES "TrackRow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
