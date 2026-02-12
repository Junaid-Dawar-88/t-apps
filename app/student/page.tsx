// app/student/student-table.tsx
"use client"

import React, { useEffect, useState } from "react"
import StudentModal from "./student-model"
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { User, Phone, Home, GraduationCap } from "lucide-react"
import { getStudent } from "../actions/student-actions"
import DeleteStudentButton from "./delete-student"
import UpdateStudentModal from "./update-student-model"
import SearchStudent from "./search-student"

export interface Student {
  id: number
  name: string
  class: string
  roll_number: string
  father: string
  phone: string
  address: string | null
}

export default function StudentTable() {
  const [search, setSearch] = useState("")
  const [students, setStudents] = useState<Student[]>([])

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudent()
      setStudents(data)
    }
    fetchStudents()
  }, [])

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.father.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 sm:mb-0">
          Student Section
        </h2>
        <StudentModal onAdd={(newStudent) => setStudents([newStudent, ...students])} />
      </div>

      <SearchStudent search={search} setSearch={setSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="w-full h-full mt-5 flex items-center justify-center col-span-full">
            <h1 className="text-2xl text-center p-5 bg-gray-100 shadow-lg">
              Student not found
            </h1>
          </div>
        ) : (
          filtered.map((studentItem) => (
            <Card
              key={studentItem.id}
              className="hover:shadow-xl transition-shadow border-t-4 border-blue-500"
            >
              <CardHeader className="bg-gradient-to-r from-slate-900 to-blue-900 text-white rounded-t-lg p-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {studentItem.name}
                  </div>
                  <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Class: {studentItem.class}
                  </span>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <GraduationCap className="w-4 h-4" />
                  Roll Number: {studentItem.roll_number}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2 p-4">
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold">Father Name:</span> {studentItem.father}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold">Phone:</span> {studentItem.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold">Address:</span> {studentItem.address}
                </p>
              </CardContent>

              <CardFooter className="flex justify-end gap-2 p-4">
                <DeleteStudentButton
                  studentId={studentItem.id}
                  onDelete={() =>
                    setStudents(students.filter((s) => s.id !== studentItem.id))
                  }
                />
                <UpdateStudentModal
                  student={studentItem}
                  onUpdate={(updatedStudent) =>
                    setStudents(
                      students.map((s) =>
                        s.id === updatedStudent.id ? updatedStudent : s
                      )
                    )
                  }
                />
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}