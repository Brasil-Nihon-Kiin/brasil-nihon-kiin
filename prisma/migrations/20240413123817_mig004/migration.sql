/*
  Warnings:

  - Added the required column `creatorId` to the `CalendarSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CalendarSlot" ADD COLUMN     "creatorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CalendarSlot" ADD CONSTRAINT "CalendarSlot_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
