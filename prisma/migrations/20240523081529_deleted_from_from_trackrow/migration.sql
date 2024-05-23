/*
  Warnings:

  - You are about to drop the column `from` on the `TrackRow` table. All the data in the column will be lost.
  - You are about to drop the column `isDone` on the `TrackRow` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TrackRow_from_activityId_key";

-- AlterTable
ALTER TABLE "TrackRow" DROP COLUMN "from",
DROP COLUMN "isDone";
