"use client";

import * as React from "react";
import ReactDOM from "react-dom";
import { updateStudent } from "../actions/student-actions";

export interface Student {
  id: number;
  name: string;
  father: string;
  roll_number: string;
  phone: string;
  address: string | null;
  class: {
    id: number;
    name: string;
  };
}

interface Class {
  id: number;
  name: string;
}

interface UpdateStudentModalProps {
  student: Student;
  classes: Class[];
  onUpdate?: (student: Student) => void;
}

export default function UpdateStudentModal({
  student,
  classes,
  onUpdate,
}: UpdateStudentModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!student) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
      >
        Update
      </button>

      {isOpen &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setIsOpen(false)} 
          >
            <div
              className="bg-white rounded-xl p-6 shadow-xl max-w-lg w-[90%] mx-auto"
              onClick={(e) => e.stopPropagation()} // prevent closing if clicked inside
            >
              <h2 className="text-xl font-bold text-center mb-4">Update Student</h2>

              <form
                className="space-y-3"
                action={async (formData: FormData) => {
                  const updatedStudent = await updateStudent(student.id, formData);
                  setIsOpen(false);
                  if (onUpdate && updatedStudent) onUpdate(updatedStudent);
                }}
              >
                <input
                  name="name"
                  defaultValue={student.name}
                  placeholder="Student Name"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  name="father"
                  defaultValue={student.father}
                  placeholder="Father Name"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  name="roll_number"
                  defaultValue={student.roll_number}
                  placeholder="Roll Number"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                
                <input
                  name="phone"
                  defaultValue={student.phone}
                  placeholder="Phone"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  name="address"
                  defaultValue={student.address ?? ""}
                  placeholder="Address"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="border px-4 py-2 rounded hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}