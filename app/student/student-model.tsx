"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addStudent } from "../actions/student-actions";

interface Props {
  classId?: number;
  onAdd?: (student: any) => void;
}

export default function StudentModal({ classId, onAdd }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleStudent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(e.currentTarget);

    try {
      if (classId) formData.append("class_id", classId.toString());

      const student = await addStudent(formData);
      if (!student) return;

      setIsOpen(false);
      if (onAdd) onAdd(student);
    } catch (error: any) {
      alert(error.message || "Please fill in all required fields!");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-700 hover:bg-blue-600 text-white cursor-pointer">
          Add Student
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleStudent}>
          <input type="hidden" name="class_id" value={classId} />

          <div className="space-y-2">
            <Label>Student Name</Label>
            <Input name="name" placeholder="Enter name" required />
          </div>

          <div className="space-y-2">
            <Label>Father Name</Label>
            <Input name="father" placeholder="Enter father name" required />
          </div>

          <div className="space-y-2">
            <Label>Roll Number</Label>
            <Input name="roll_number" placeholder="123" required />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input name="phone" placeholder="03xxxxxxxxx" required />
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
  );
}