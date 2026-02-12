/*
  Warnings:

  - You are about to drop the column `student_id` on the `Schedule` table. All the data in the column will be lost.
  - Made the column `teacher_id` on table `Schedule` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subject` on table `Schedule` required. This step will fail if there are existing NULL values in that column.
  - Made the column `timing` on table `Schedule` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_teacher_id_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "student_id",
ADD COLUMN     "studentIds" INTEGER[],
ALTER COLUMN "teacher_id" SET NOT NULL,
ALTER COLUMN "subject" SET NOT NULL,
ALTER COLUMN "timing" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
