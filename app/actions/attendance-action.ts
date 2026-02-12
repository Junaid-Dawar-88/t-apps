"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function managAttendance(formData: FormData) {

  const student_id = Number(formData.get("studentId"));
  const attendance_date = new Date(formData.get("date") as string);
  const status = formData.get("status") as string;
  const remarks = formData.get("remarks") as string | null;

  if (!student_id || !attendance_date || !status) {
    throw new Error("Missing required fields");
  }

  try {

    await prisma.attendance.create({
      data: {
        student_id,
        attendance_date,
        status,
        remarks: remarks || null,
      },
    });
    revalidatePath("/attendance"); 

  } catch (error) {
    throw error;
  }
}

export async function getAttendance() {
  return await prisma.attendance.findMany({
    include: {
      student: true,
    },
    orderBy: {
      attendance_date: "desc",
    },
  });
}

export async function deleteAttendance(id: number) {
  await prisma.attendance.delete({
    where: { id },
  });

  revalidatePath("/attendance");
}