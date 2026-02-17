'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addTeacher } from '../actions/teacher-actions'

interface Teacher {
  id: number
  name: string
  email: string
  phone: string
  subject: string | null
  created_at: Date
}

export default function TeacherModalToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const [teachers, setTeachers] = useState<Teacher[]>([])

  async function handleTeacher(formData: FormData) {
    const newTeacher = await addTeacher(formData)
    setTeachers([...teachers, newTeacher]) 
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add Teacher</Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <form
            className="bg-white rounded-xl p-6 shadow-xl max-w-md w-full space-y-4"
            action={async (formData: FormData) => {
              await handleTeacher(formData)
            }}
          >
            <Input name="name" placeholder="Teacher Name" />
            <Input name="email" placeholder="Email" />
            <Input name="phone" placeholder="Phone" />
            <Input name="subject" placeholder="Subject" />

            <div className="flex justify-end gap-2">
              <Button type="button" onClick={() => setIsOpen(false)} variant="outline">
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-500 text-white">
                Add
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}