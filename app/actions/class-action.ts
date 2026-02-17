'use server'
import prisma from "@/lib/prisma";

export async function getClasses() {
  const classes = await prisma.class.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });
  return classes;
}

export async function createClass(name: string) {
  const newClass = await prisma.class.create({
    data: { name },
    select: { id: true, name: true }, 
  });
  return newClass;
}


export async function deleteClass(id: number) {
  const classId = await prisma.class.delete({
    where: {id: id}
  })
  return classId
}

export async function updateClass(id: number, name: string) {
  if (!name.trim()) throw new Error("Class name cannot be empty");

  const updatedClass = await prisma.class.update({
    where: { id },
    data: { name },
  });

  return updatedClass;
}