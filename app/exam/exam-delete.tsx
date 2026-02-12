'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteExam } from '../actions/exam-action'

interface deleteExam {
    examId: number
}

const ExamDelete = ({examId}: deleteExam) => {
    const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this teacher?')
    if (!confirmDelete) return
    await deleteExam(examId)
  }
  return (
    <div>
       <Button size="sm" variant="destructive" className="flex-1 p-2" onClick={handleDelete}>
      <Trash2 className="h-4 w-4 mr-1" /> 
    </Button>
    </div>
  )
}

export default ExamDelete
