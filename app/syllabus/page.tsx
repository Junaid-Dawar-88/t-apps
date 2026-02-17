"use client";

import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import SyllabusForm from "./syllabi-model";

interface Syllabus {
  id: number;
  title: string;
  topics: string;
  description?: string;
  type: string;
  start_date: string;
  end_date: string;
  teacher: { id: number; name: string };
}

const STATIC_SYLLABUS: Syllabus[] = [
  { id: 1, title: "Web Development", topics: "HTML, CSS, JS", description: "Frontend basics", type: "Core", start_date: "2026-02-01", end_date: "2026-04-01", teacher: { id: 1, name: "Dr. Sarah Johnson" } },
  { id: 2, title: "Data Structures", topics: "Arrays, Linked List, Trees", description: "Essential DS", type: "Core", start_date: "2026-03-01", end_date: "2026-05-01", teacher: { id: 2, name: "Prof. Michael Chen" } },
  { id: 3, title: "AI Basics", topics: "ML, Neural Networks", description: "Intro to AI", type: "Elective", start_date: "2026-01-15", end_date: "2026-03-15", teacher: { id: 3, name: "Dr. Emma Wilson" } },
  { id: 4, title: "Database Design", topics: "SQL, ER Diagrams", description: "Relational databases", type: "Core", start_date: "2026-02-10", end_date: "2026-04-10", teacher: { id: 4, name: "Prof. James Martinez" } },
  { id: 5, title: "Advanced JS", topics: "ES6+, Async, React", description: "Modern JavaScript", type: "Advanced", start_date: "2026-03-05", end_date: "2026-05-05", teacher: { id: 1, name: "Dr. Sarah Johnson" } },
];

export default function SyllabusTable() {
  return (
    <>
    <div className="w-full flex items-center justify-between h-[120px] rounded-lg mb-4 bg-blue-600" > 
      <h1>
        Syllabus Dashboard
      </h1>
      <div>

       <SyllabusForm />
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-lg overflow-auto">
      <table className="w-full">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Topics</th>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-left">Duration</th>
            <th className="px-6 py-3 text-left">Teacher</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {STATIC_SYLLABUS.map((s, i) => (
            <tr key={s.id} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}>
              <td className="px-6 py-4">
                <p className="font-semibold">{s.title}</p>
                {s.description && <p className="text-gray-500 text-sm">{s.description}</p>}
              </td>
              <td className="px-6 py-4 text-sm">{s.topics}</td>
              <td className="px-6 py-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{s.type}</span>
              </td>
              <td className="px-6 py-4 text-sm">
                {new Date(s.start_date).toLocaleDateString()} - {new Date(s.end_date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{s.teacher.name}</td>
              <td className="px-6 py-4 text-center flex justify-center gap-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center gap-1"><Pencil className="w-4 h-4"/>Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-1"><Trash2 className="w-4 h-4"/>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}