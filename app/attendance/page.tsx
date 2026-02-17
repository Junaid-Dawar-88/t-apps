"use client";

import React, { useEffect, useState } from "react";
import { getClasses } from "../actions/class-action";
import { getStudent } from "../actions/student-actions";
import ClassAttendanceModal from "./attandence-ui";

interface Class {
  id: number;
  name: string;
}

interface Student {
  id: number;
  name: string;
  father: string;
  roll_number: string;
}

export default function AttendancePage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [search, setSearch] = useState("");

  // ⭐ Keep null here (this is correct for selection UI)
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const [students, setStudents] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // ✅ Fetch classes ONCE
  useEffect(() => {
    async function fetchClasses() {
      try {
        const data = await getClasses();
        setClasses(data);
      } catch (error) {
        console.error("Failed to load classes", error);
      }
    }

    fetchClasses();
  }, []);

  // ✅ Fetch students ONLY when class is selected
  useEffect(() => {
    // ⭐ THIS LINE removes your TypeScript error
    if (!selectedClass) return;

    async function fetchStudents() {
      try {
        setLoadingStudents(true);
            if(!selectedClass) return
        const data = await getStudent(selectedClass.id);
        setStudents(data);

      } catch (error) {
        console.error("Failed to load students", error);
      } finally {
        setLoadingStudents(false);
      }
    }

    fetchStudents();
  }, [selectedClass]);

  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-700 min-h-screen">
      <div className="bg-gray-600 h-[120px]">
        <h1 className="text-4xl p-5 pt-8 font-bold mb-6 text-white">
          Attendance Section
        </h1>
      </div>

      <div className="py-5 px-4 max-w-7xl">
        <input
          type="search"
          placeholder="Search class here..."
          className="py-2 px-5 w-full rounded-full border text-white border-gray-500 bg-slate-800"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="max-w-7xl m-5 border-b border-t rounded-lg text-white overflow-hidden">
        <ul>
          {filteredClasses.map((cls) => (
            <li
              key={cls.id}
              className="border-b last:border-b-0 cursor-pointer p-4 hover:bg-gray-800 transition"
              onClick={() => setSelectedClass(cls)}
            >
              {cls.id}. {cls.name}
            </li>
          ))}
        </ul>
      </div>

      {selectedClass && (
        <ClassAttendanceModal
          classId={selectedClass.id}
          className={selectedClass.name}
          students={students} 
          onClose={() => setSelectedClass(null)}
        />
      )}
    </div>
  );
}