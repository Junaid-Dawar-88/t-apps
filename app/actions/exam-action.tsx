"use server"
import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache'

// Create Exam
export async function ExamManag(formData: FormData) {
  const exam_name = formData.get('name') as string;
  const exam_date = formData.get('date') as string;
  const total_marks = Number(formData.get('totalMarks'));
  const obtained_marks = Number(formData.get('obtainedMarks'));
  const teacher_id = Number(formData.get('teacherId'));
  const student_id = Number(formData.get('studentId'));

  await prisma.exam.create({
    data: {
      exam_name: exam_name,
      exam_date: new Date(exam_date),
      total_marks,
      obtained_marks,
      teacher: { connect: { id: teacher_id } },
      student: { connect: { id: student_id } },
    },
  });

  revalidatePath('/exam');
}

// Get Exams
export async function getExam() {
  const exam = await prisma.exam.findMany({
    include: {
      teacher: true,
      student: true
    }
  })
  return exam
}

export async function deleteExam(examId: number) {
  await prisma.exam.delete({
    where: { id: examId }
  });
  revalidatePath('/exam');
}


export async function updateExam(formData: FormData) {
  const id = Number(formData.get('id'));
  const exam_name = formData.get('name') as string;
  const exam_date = formData.get('date') as string;
  const total_marks = Number(formData.get('total_marks'));
  const obtained_marks = Number(formData.get('obtained_marks'));
  const teacher_id = Number(formData.get('teacherId'));
  const student_id = Number(formData.get('studentId'));

  await prisma.exam.update({
    where: { id },
    data: {
      exam_name,
      exam_date: new Date(exam_date),
      total_marks,
      obtained_marks,
      teacher: { connect: { id: teacher_id } },
      student: { connect: { id: student_id } },
    },
  });

  revalidatePath('/exam');
}