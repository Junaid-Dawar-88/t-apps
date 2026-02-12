"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function SchedulManag(formData: FormData) {
  const teacher_id = Number(formData.get("teacherId"));
  const subject = formData.get("subject") as string;
  const timing = formData.get("timing") as string;
  const studentIds = formData.getAll("studentIds").map(Number);

  if (!teacher_id || !subject || !timing || studentIds.length === 0) {
    throw new Error("All fields are required");
  }

  const clash = await prisma.schedule.findFirst({ where: { teacher_id, timing } });
  if (clash) return alert("Teacher already has a class at this time.");

 await prisma.schedule.create({
  data: {
    teacher_id,
    subject,
    timing,
    students: {
      connect: studentIds.map((id) => ({ id })), 
    },
  },
});

  revalidatePath("/schedul");
}


export async function getSchedules() {
  const schedules = await prisma.schedule.findMany({
    orderBy: { created_at: "desc" },
    include: {
      teacher: true,  
      students: true,  
    },
  });

  return schedules
}