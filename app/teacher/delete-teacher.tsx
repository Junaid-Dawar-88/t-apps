'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteTeacher } from '../actions/teacher-actions'

interface DeleteTeacherButtonProps {
  teacherId: number
}

export default function DeleteTeacherButton({ teacherId }: DeleteTeacherButtonProps) {
  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this teacher?')
    if (!confirmDelete) return
    await deleteTeacher(teacherId)
  }

  return (
    <Button size="sm" variant="destructive" className="flex-1 p-2" onClick={handleDelete}>
      <Trash2 className="h-4 w-4 mr-1" /> Delete
    </Button>
  )
}