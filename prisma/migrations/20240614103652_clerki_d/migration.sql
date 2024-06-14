-- DropForeignKey
ALTER TABLE "Week" DROP CONSTRAINT "Week_userId_fkey";

-- AddForeignKey
ALTER TABLE "Week" ADD CONSTRAINT "Week_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
