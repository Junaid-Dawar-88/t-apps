"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateStudent } from "../actions/student-actions"


interface UpdateStudentModalProps {
  student: {
    id: number
    name: string
    father: string
    roll_number: string
    class: string
    phone: string
    address: string
  }
  onUpdate?: (student: any) => void 
}

export default function UpdateStudentModal({ student, onUpdate }: UpdateStudentModalProps) {

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
              const updatedStudent = await updateStudent(student.id, formData)
              setIsOpen(false)
              if (onUpdate) onUpdate(updatedStudent)
            }}
          >
            <Input name="name" defaultValue={student.name} placeholder="Student Name" />
            <Input name="father" defaultValue={student.father} placeholder="Father Name" />
            <Input name="roll_number" defaultValue={student.roll_number} placeholder="Roll Number" />
            <Input name="class" defaultValue={student.class} placeholder="Class" />
            <Input name="phone" defaultValue={student.phone} placeholder="Phone" />
            <Input name="address" defaultValue={student.address} placeholder="Address" />

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