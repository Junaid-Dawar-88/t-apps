"use client"

import React, { useEffect, useState } from "react"
import { getStudent } from "./actions/student-actions"

export default function StudentsWidget() {
  const [students, setStudents] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStudent()
      setStudents(data)
    }
    fetchData()
  }, [])

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
      <p className="text-slate-500 font-medium">طلاب (Students)</p>
      <h2 className="text-4xl font-bold text-blue-600 mt-2">{students.length}</h2>
    </div>
  )
}