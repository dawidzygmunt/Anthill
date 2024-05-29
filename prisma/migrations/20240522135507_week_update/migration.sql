/*
  Warnings:

  - You are about to drop the column `totalMinutes` on the `TrackRow` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Week` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Week` table. All the data in the column will be lost.
  - You are about to drop the column `totalMinutes` on the `Week` table. All the data in the column will be lost.
  - Added the required column `from` to the `Week` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Week_startDate_endDate_key";

-- AlterTable
ALTER TABLE "TrackRow" DROP COLUMN "totalMinutes";

-- AlterTable
ALTER TABLE "Week" DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "totalMinutes",
ADD COLUMN     "from" TIMESTAMP(3) NOT NULL;
