'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateTeacher } from '../actions/teacher-actions'

interface UpdateTeacherModalProps {
  teacher: { id: number; name: string; email: string; phone: string }
}

export default function UpdateTeacherModal({ teacher }: UpdateTeacherModalProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="sm" variant="outline">
        Update
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <form
            className="bg-white rounded-xl p-6 shadow-xl max-w-md w-full space-y-4"
            action={async (formData: FormData) => {
            
              await updateTeacher(teacher.id, formData)
              setIsOpen(false)
            }}
          >
            <Input name="name" defaultValue={teacher.name} />
            <Input name="email" defaultValue={teacher.email} />
            <Input name="phone" defaultValue={teacher.phone} />
            <div className="flex justify-end gap-2">
              <Button type="button" onClick={() => setIsOpen(false)} variant="outline">
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-500 text-white">
                Update
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}