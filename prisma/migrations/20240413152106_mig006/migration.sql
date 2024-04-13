/*
  Warnings:

  - You are about to drop the column `eventId` on the `CalendarSlot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CalendarSlot" DROP CONSTRAINT "CalendarSlot_eventId_fkey";

-- AlterTable
ALTER TABLE "CalendarSlot" DROP COLUMN "eventId";

-- CreateTable
CREATE TABLE "_CalendarSlotToEvent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CalendarSlotToEvent_AB_unique" ON "_CalendarSlotToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_CalendarSlotToEvent_B_index" ON "_CalendarSlotToEvent"("B");

-- AddForeignKey
ALTER TABLE "_CalendarSlotToEvent" ADD CONSTRAINT "_CalendarSlotToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "CalendarSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CalendarSlotToEvent" ADD CONSTRAINT "_CalendarSlotToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
