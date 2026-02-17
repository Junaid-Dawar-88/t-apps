'use server';
import prisma from "@/lib/prisma";

// ------------------------
// Create a new student
// ------------------------
export async function addStudent(formData: FormData) {
  const name = formData.get("name")?.toString() || "";
  const father = formData.get("father")?.toString() || "";
  const roll_number = formData.get("roll_number")?.toString() || "";
  const phone = formData.get("phone")?.toString() || "";    
  const address = formData.get("address")?.toString() || "";
  const classId = parseInt(formData.get("class_id")?.toString() || "");

  if (!name || !father || !roll_number || !classId) {
    return;
  }

  const classRecord = await prisma.class.findUnique({ where: { id: classId } });
  if (!classRecord) throw new Error("Selected class not found");

  const student = await prisma.student.create({
    data: {
      name,
      father,
      roll_number,
      phone: phone || '',  
      address, 
      class: { connect: { id: classId } },
    },
  });
  return student;
}
// ------------------------
// Get all students
// ------------------------
export async function getStudent(classId?: number) {
  const students = await prisma.student.findMany({
    where: classId ? { class_id: classId } : undefined,
    orderBy: { id: "desc" },
    include: { class: true },
  });
  return students;
}

// ------------------------
// Delete a student
// ------------------------
export async function deleteStudent(studentId: number) {
  const student = await prisma.student.delete({
    where: { id: studentId },
  });
  return student;
}

// ------------------------
// Update a student
// ------------------------
export async function updateStudent(studentId: number, formData: FormData) {
  const name = formData.get("name")?.toString();
  const father = formData.get("father")?.toString();
  const roll_number = formData.get("roll_number")?.toString();
  const phone = formData.get("phone")?.toString();
  const address = formData.get("address")?.toString();

  


  const student = await prisma.student.update({
    where: { id: studentId },
    data: {
      name,
      father,
      roll_number: roll_number || '',
     phone: phone || "",
      address,
    },
  });

  return student;
}