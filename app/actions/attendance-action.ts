"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/* =====================================
   MARK / UPDATE ATTENDANCE
===================================== */
export async function markAttendance(formData: FormData) {
  const studentId = Number(formData.get("studentId"));
  const classId = Number(formData.get("classId"));
  const status = formData.get("status") as "Present" | "Absent" | "Leave";
  const date = new Date(formData.get("date") as string);

  if (!studentId || !classId || !status) {
    throw new Error("Missing fields");
  }

  date.setHours(0, 0, 0, 0);

  // ✅ Use snake_case as in Prisma schema
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: { class_id: true },
  });

  if (!student) throw new Error("Student not found");

  // ✅ Validate class
  if (student.class_id !== classId) {
    throw new Error("Invalid class");
  }

  // ✅ Upsert attendance
  await prisma.attendance.upsert({
  where: {
    student_id_attendance_date: {
      student_id: studentId,
      attendance_date: date,
    },
  },
  update: {
    status,
  },
  create: {
    student_id: studentId,
    attendance_date: date,
    status,
  },
});

  revalidatePath("/attendance");
}

/* =====================================
   GET ATTENDANCE BY CLASS
===================================== */
export async function getClassAttendance(
  classId: number,
  date?: Date
) {
  const target = date ?? new Date();
  target.setHours(0, 0, 0, 0);

  const next = new Date(target);
  next.setDate(target.getDate() + 1);

  return prisma.attendance.findMany({
    where: {
      attendance_date: {
        gte: target,
        lt: next,
      },
      student: {
        class_id: classId, // ✅ Use snake_case
      },
    },
    include: {
      student: true,
    },
  });
}

/* =====================================
   DELETE ATTENDANCE
===================================== */
export async function deleteAttendance(id: number) {
  await prisma.attendance.delete({
    where: { id },
  });

  revalidatePath("/attendance");
}