"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addStudent } from "../actions/student-actions"

interface Props {
  onAdd?: (student: any) => void
}

export default function StudentModal({ onAdd }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-slate-900 hover:bg-slate-800">Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4"
          action={async (formData: FormData) => {
            const student = await addStudent(formData)
            setIsOpen(false)
            if (onAdd) onAdd(student) 
          }}
        >
          <div className="space-y-2">
            <Label>Student Name</Label>
            <Input name="name" placeholder="Enter name" />
          </div>

          <div className="space-y-2">
            <Label>Father Name</Label>
            <Input name="father" placeholder="Enter father name" />
          </div>

          <div className="space-y-2">
            <Label>Class</Label>
            <Input name="class" placeholder="Student class" />
          </div>

          <div className="space-y-2">
            <Label>Roll Number</Label>
            <Input name="roll_number" placeholder="123" />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input name="phone" placeholder="03xxxxxxxxx" />
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <textarea
              name="address"
              placeholder="Enter address"
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Student</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}