'use server'
import prisma from "@/lib/prisma";

export async function addStudent(formData: FormData) {
  const name = (formData.get("name") as string)?.trim() || ""
  const father = (formData.get("father") as string)?.trim() || ""
  const roll_number = (formData.get("roll_number") as string)?.trim() || ""
  const studentClass = (formData.get("class") as string)?.trim() || ""
  const phone = (formData.get("phone") as string)?.trim() || ""
  const address = (formData.get("address") as string)?.trim() || ""

  if (!name || !father || !roll_number || !studentClass) {
    return alert('input field is empty fill it')
  }
  const student = await prisma.student.create({
    data: { name, father, roll_number, class: studentClass, phone, address, },
  })
  return student
}

export async function getStudent() {
  const students = await prisma.student.findMany({
    orderBy: { id: 'desc' },
  })
  return students
}

export async function deleteStudent(studentId: number) {
  
   const student = await prisma.student.delete({
      where: { id: studentId },
    })
  return student 
}

export async function updateStudent(studentId: number ,formData: FormData) {
  const name = (formData.get("name") as string)
  const father = (formData.get("father") as string)
  const roll_number = (formData.get("roll_number") as string)
  const studentClass = (formData.get("class") as string)
  const phone = (formData.get("phone") as string)
  const address = (formData.get("address") as string)

  if (!name || !father || !roll_number || !studentClass) {
    throw new Error("Required fields are missing")
  }
  const student = await prisma.student.update({
    where: {id: studentId},
    data: {
      name,
      father,
      roll_number,
      class: studentClass,
      phone,
      address,
    },
  })
  return student
}