'use client'

import React, { useState } from 'react'
import { addTeacher } from '@/app/actions/teacher-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

export default function TeacherModalToggle() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>

      <DialogTrigger asChild>
        <Button className="bg-blue-700 hover:bg-blue-500 text-white rounded-full px-8 py-3 hover:scale-105 transition-transform duration-300">
          Add Teacher
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Teacher</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4"
          action={async (formData: FormData) => {
            await addTeacher(formData)
            setIsOpen(false) 
          }}
        >
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              name="name"
              type="text"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              name="email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">
                Cancel Teacher
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              Add Teacher
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>

    </Dialog>
  )
}