"use client"

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateExam } from '../actions/exam-action'
import { getTeacher } from '../actions/teacher-actions'
import { getStudent } from '../actions/student-actions'
import { Pencil } from 'lucide-react'

type Teacher = { id: number; name: string }
type Student = { id: number; name: string }

interface UpdateExamProps {
  id: number
  name: string
  date: Date | null
  total_marks: number | null
  obtained_marks: number
  teacherId: number | string
  studentId: number | string
}

export default function UpdateExamModal({
  id,
  name,
  date,
  total_marks,
  obtained_marks,
  teacherId,
  studentId
}: UpdateExamProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [teachers, setTeachers] = React.useState<Teacher[]>([])
  const [students, setStudents] = React.useState<Student[]>([])

  React.useEffect(() => {
    async function loadData() {
      setTeachers(await getTeacher())
      setStudents(await getStudent())
    }
    loadData()
  }, [])

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="sm" variant="outline">
        <Pencil />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <form
            action={async (formData: FormData) => {
              await updateExam(formData)
              setIsOpen(false)
            }}
            className="bg-white rounded-xl p-6 shadow-xl max-w-md w-full space-y-4"
          >
            <input type="hidden" name="id" value={id} />

            <Input name="name" defaultValue={name} />

            <Input
              name="date"
              type="date"
              defaultValue={
                date ? new Date(date).toISOString().split("T")[0] : ""
              }
            />

            <Input name="total_marks" defaultValue={total_marks ?? 0} />

            <Input name="obtained_marks" defaultValue={obtained_marks} />

            <select
              name="studentId"
              defaultValue={studentId}
              className="h-10 m-2 rounded-md border px-3"
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <select
              name="teacherId"
              defaultValue={teacherId}
              className="h-10 rounded-md border px-3"
            >
              <option value="">Select Teacher</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <Button type="button" onClick={() => setIsOpen(false)} variant="outline">
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}