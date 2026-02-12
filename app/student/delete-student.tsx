"use client"
import React, { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { deleteStudent } from "../actions/student-actions"

interface Props {
  studentId: number
  onDelete?: () => void
}

export default function DeleteStudentButton({ studentId, onDelete }: Props) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const conf = confirm("Are you sure to delete!")
      if (!conf) return

      await deleteStudent(studentId)

      // remove from parent state immediately
      if (onDelete) onDelete()
    })
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isPending}>
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  )
}