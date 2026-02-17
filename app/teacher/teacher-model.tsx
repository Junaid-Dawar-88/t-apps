'use client'

import React, { useState } from 'react'
import { createPortal } from 'react-dom'
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
  const Modal = ({ children }: { children: React.ReactNode }) => {
    if (typeof window === 'undefined') return null
    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        {children}
      </div>,
      document.body
    )
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add Teacher</Button>

      {isOpen && (
        <Modal>
          <form
            className="bg-white rounded-xl p-6 shadow-xl max-w-md w-full relative"
            action={async (formData: FormData) => {
              await handleTeacher(formData)
            }}
          >
            {/* Close button at top-right */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* Modal title */}
            <h2 className="text-xl font-semibold mb-4 text-center">Add Teacher</h2>

            {/* Form fields */}
            <div className="space-y-3">
              <Input name="name" placeholder="Teacher Name" required />
              <Input name="email" placeholder="Email" type="email" required />
              <Input name="phone" placeholder="Phone" type="text" required />
              <Input name="subject" placeholder="Subject" />
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-500 text-white">
                Add
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}