'use client'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { User, Mail, Phone } from 'lucide-react'
import TeacherModalToggle from './teacher-model'
import DeleteTeacherButton from './delete-teacher'
import UpdateTeacherModal from './UpdateTeacherModal'
import { getTeacher } from '../actions/teacher-actions'
import SearchTeacher from './search-teacher'

interface teacherData {
  id: number
  name: string
  email: string
  phone: string
}

export default function TeacherCards() {
  const [teachers, setTeachers] = useState<teacherData[]>([])
  const [search, setSearch] = useState('')

useEffect(() => {
  async function fetchTeachers() {
    const data = await getTeacher()
    const formatted = data.map((t: any) => ({ ...t, phone: Number(t.phone) }))
    setTeachers(formatted)
  }
  fetchTeachers()
}, [])

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(search.toLowerCase()) ||
      teacher.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center gap-6">
 
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full max-w-7xl gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Teachers: {filteredTeachers.length}
        </h1>
        <TeacherModalToggle />
      </div>

      <SearchTeacher search={search} setSearch={setSearch} />

      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher) => (
            <Card
              key={teacher.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden"
            >
       
              <div className="flex flex-col items-center p-6 border-b border-gray-200">
                <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center text-white text-2xl font-bold mb-3">
                  <User className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{teacher.name}</h3>
                <span className="text-gray-500 text-sm mt-1">ID: {teacher.id}</span>
              </div>

              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{teacher.phone}</span>
                </div>
              </CardContent>

              <CardFooter className="flex justify-center gap-3 p-4 border-t border-gray-200">
                <UpdateTeacherModal teacher={teacher} />
                <DeleteTeacherButton teacherId={teacher.id} />
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500 text-lg">No teachers found</p>
          </div>
        )}
      </div>
    </div>
  )
}