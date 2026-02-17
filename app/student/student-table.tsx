"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { User, Phone, Home, GraduationCap } from "lucide-react";
import StudentModal from "./student-model";
import { getStudent } from "../actions/student-actions";
import { getClasses } from "../actions/class-action";
import DeleteStudentButton from "./delete-student";
import UpdateStudentModal from "./update-student-model";

interface Student {
  id: number;
  name: string;
  father: string;
  roll_number: string;
  phone?: string | null;
  address?: string | null;
  class_id: number;
  class?: {
    id: number;
    name: string;
  };
}


interface Class {
  id: number;
  name: string;
}

interface Props {
  selectedClass: Class;
}

export default function StudentTableUI({ selectedClass }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [allClasses, setAllClasses] = useState<Class[]>([]); 
  
  useEffect(() => {
    async function getData() {
      if(!selectedClass) return 
      const data: any = await getStudent(selectedClass.id);
      setStudents(data);
    }
    getData();

    async function fetchClasses() {
      const classesData = await getClasses();
      setAllClasses(classesData);
    }
    fetchClasses();
  }, [selectedClass.id]);

  const handleDelete = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const handleUpdate = (updatedStudent: Student) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row h-[80px] border-b items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4 sm:mb-0">
            Student Section {selectedClass.name}
          </h2>
          <p>Total Student: {students.length}</p>
        </div>
        <StudentModal
          classId={selectedClass.id}
          onAdd={(student) => setStudents((prev) => [student, ...prev])}
        />
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search students..."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Card
            key={student.id}
            className="relative overflow-hidden border-t-4 border-blue-500 hover:scale-105 transition-transform duration-300 shadow-lg bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700"
          >
            <CardHeader className="p-4">
              <CardTitle className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" /> {student.name}
                </div>
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1 text-white/80">
                <GraduationCap className="w-4 h-4" /> Roll Number:{" "}
                {student.roll_number}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2 p-4 text-white/90">
              <p className="flex items-center gap-2">
                <User className="w-4 h-4" /> <span className="font-semibold">Father:</span>{" "}
                {student.father}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> <span className="font-semibold">Phone:</span>{" "}
                {student.phone}
              </p>
              <p className="flex items-center gap-2">
                <Home className="w-4 h-4" /> <span className="font-semibold">Address:</span>{" "}
                {student.address}
              </p>
            </CardContent>

            <CardFooter className="flex justify-end gap-2 p-4">
              <DeleteStudentButton
                studentId={student.id}
                onDelete={() => handleDelete(student.id)}
              />
              <UpdateStudentModal
                student={student ?? null}
                classes={allClasses}
                onUpdate={handleUpdate}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}