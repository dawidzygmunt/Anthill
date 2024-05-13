-- CreateTable
CREATE TABLE "TrackRow" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackRow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrackRow" ADD CONSTRAINT "TrackRow_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
