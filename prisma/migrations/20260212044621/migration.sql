/*
  Warnings:

  - Made the column `exam_date` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_marks` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teacher_id` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `student_id` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start_date` on table `Syllabus` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end_date` on table `Syllabus` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Teacher` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Exam" ALTER COLUMN "exam_date" SET NOT NULL,
ALTER COLUMN "total_marks" SET NOT NULL,
ALTER COLUMN "teacher_id" SET NOT NULL,
ALTER COLUMN "student_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Syllabus" ALTER COLUMN "start_date" SET NOT NULL,
ALTER COLUMN "end_date" SET NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "phone" SET NOT NULL;
