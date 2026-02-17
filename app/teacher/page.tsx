'use client'

import React, { useState, useEffect } from 'react'
import TeacherModalToggle from './teacher-model'
import DeleteTeacherButton from './delete-teacher'
import UpdateTeacherModal from './UpdateTeacherModal'
import TeacherCard from './teacher-card'
import { getTeacher } from '../actions/teacher-actions'
import SearchTeacher from './search-teacher'

interface teacherData {
  id: number
  name: string
  email: string
  phone: string
}

export default function TeacherTable() {
  const [teachers, setTeachers] = useState<teacherData[]>([])
  const [search, setSearch] = useState('')
  const [selectedTeacher, setSelectedTeacher] = useState<teacherData | null>(null)

  useEffect(() => {
    async function fetchTeachers() {
      const data = await getTeacher()

      const formatted = data.map((t) => ({
        ...t,
        phone: t.phone ? String(t.phone) : '', // ensure phone is always a string
      }))

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
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">

      {/* HEADER */}
      <div className="max-w-8xl mx-auto mb-8">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Teacher Dashboard
            </h1>

            <p className="text-slate-300 mt-1">
              Manage your teachers efficiently
            </p>
          </div>

          <TeacherModalToggle />
        </div>
      </div>

      {/* SEARCH */}
      <div className="max-w-7xl mx-auto mb-6">
        <SearchTeacher search={search} setSearch={setSearch} />
      </div>

      {/* TABLE */}
      <div className="max-w-7xl mx-auto overflow-hidden rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl bg-white/5">
        <table className="min-w-full text-sm text-left text-slate-300">
          
          {/* HEAD */}
          <thead className="bg-white/10 text-xs uppercase tracking-wider text-slate-200">
            <tr>
              <th className="px-6 py-4">Teacher</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  onClick={() => setSelectedTeacher(teacher)}
                  className="
                    border-t border-white/5
                    hover:bg-white/10
                    transition
                    cursor-pointer
                    group
                  "
                >
                  {/* TEACHER */}
                  <td className="px-6 py-5 flex items-center gap-4">

                    {/* Avatar */}
                    <div className="
                      h-12 w-12
                      rounded-full
                      bg-gradient-to-tr from-indigo-500 to-purple-600
                      flex items-center justify-center
                      font-bold text-white text-lg
                      shadow-lg
                      group-hover:scale-110
                      transition
                    ">
                      {teacher.name.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        {teacher.name}
                      </p>

                      <p className="text-slate-400 text-xs">
                        ID: {teacher.id}
                      </p>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="px-6 py-5 text-slate-300">
                    {teacher.email}
                  </td>

                  {/* PHONE */}
                  <td className="px-6 py-5">
                    {teacher.phone}
                  </td>

                  {/* ACTIONS */}
                  <td
                    className="px-6 py-5 flex justify-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <UpdateTeacherModal teacher={teacher} />
                    <DeleteTeacherButton teacherId={teacher.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-10 text-slate-400">
                  No teachers found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* CARD MODAL */}
      {selectedTeacher && (
        <TeacherCard
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />
      )}

    </div>
  )
}