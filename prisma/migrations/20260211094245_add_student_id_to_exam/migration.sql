-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "student_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
