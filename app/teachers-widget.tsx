"use client"

import React, { useEffect, useState } from "react"
import { getTeacher } from "./actions/teacher-actions"

interface TeachersWidgetProps {
  showTop?: number
  showCount?: boolean
}

export default function TeachersWidget({ showTop, showCount }: TeachersWidgetProps) {
  const [teachers, setTeachers] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeacher()
      setTeachers(data)
    }
    fetchData()
  }, [])

  if (showCount) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
        <p className="text-slate-500 font-medium">Teachers</p>
        <h2 className="text-4xl font-bold text-indigo-600 mt-2">{teachers.length}</h2>
      </div>
    )
  }

  const displayed = showTop ? teachers.slice(0, showTop) : teachers

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {displayed.map((teacher) => (
        <div
          key={teacher.id}
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition group cursor-pointer"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
              {teacher.name?.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">{teacher.name}</h3>
              <p className="text-slate-500 text-sm">Teacher_Id: {teacher.id}</p>
            </div>
          </div>
          <div className="flex justify-between text-sm text-slate-500">
            <span>{teacher.email}</span>
          </div>
          <div className="mt-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              Active
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}