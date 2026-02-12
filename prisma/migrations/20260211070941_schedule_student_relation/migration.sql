/*
  Warnings:

  - You are about to drop the column `studentIds` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "studentIds";

-- CreateTable
CREATE TABLE "_ScheduleToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ScheduleToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ScheduleToStudent_B_index" ON "_ScheduleToStudent"("B");

-- AddForeignKey
ALTER TABLE "_ScheduleToStudent" ADD CONSTRAINT "_ScheduleToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleToStudent" ADD CONSTRAINT "_ScheduleToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
