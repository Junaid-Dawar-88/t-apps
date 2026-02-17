"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function addTeacher(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (!name || !email || !phone) throw new Error("All fields are required");

  const teacher = await prisma.teacher.create({
    data: { name, email, phone },
  });

  revalidatePath("/teacher");
  return teacher;
}

export async function getTeacher() {
  const teachers = await prisma.teacher.findMany({
    orderBy: { id: "desc" },
  });

  return teachers.map((t) => ({
    id: t.id,
    name: t.name,
    email: t.email,
    phone: t.phone ?? "",
  }));
}

// Update Teacher
export async function updateTeacher(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (!name || !email || !phone) throw new Error("All fields are required");

  await prisma.teacher.update({
    where: { id },
    data: { name, email, phone },
  });

  revalidatePath("/teacher");
}

// Delete Teacher
export async function deleteTeacher(id: number) {
  await prisma.teacher.delete({
    where: { id },
  });

  revalidatePath("/teacher");
}