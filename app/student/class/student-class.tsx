"use client";

import React, { useState, useRef, useEffect } from "react";
import StudentTableUI from "../student-table";
import { createClass, updateClass } from "@/app/actions/class-action";
import { MoreVertical } from "lucide-react";
import Deleteclass from "./delete-class";

interface Class {
  id: number;
  name: string;
}

interface Props {
  initialClasses: Class[];
}

export default function StudentClassManager({ initialClasses }: Props) {
  const [classes, setClasses] = useState(initialClasses);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [classInput, setClassInput] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [editingName, setEditingName] = useState("");

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddClass = async () => {
    if (!classInput) return alert("Please enter class name");
    try {
      const newClass = await createClass(classInput);
      if (!newClass) return;
      setClasses((prev) => [...prev, newClass]);
      setClassInput("");
    } catch (error: any) {
      alert(error.message || "Error creating class");
    }
  };

  const handleUpdateClass = async () => {
    if (!editingName.trim()) return alert("Class name cannot be empty");
    if (!editingClass) return;

    try {
      const updated = await updateClass(editingClass.id, editingName);
      setClasses((prev) =>
        prev.map((c) => (c.id === editingClass.id ? { ...c, name: updated.name } : c))
      );
      setEditingClass(null);
      setEditingName("");
    } catch (err: any) {
      alert(err.message || "Failed to update class");
    }
  };

  if (selectedClass) {
    return (
      <div className="p-6 w-full min-h-screen bg-gray-800 text-white">
        <button
          onClick={() => setSelectedClass(null)}
          className="mb-6 px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition font-semibold shadow"
        >
          ← Back to Classes
        </button>
        <StudentTableUI selectedClass={selectedClass} />
      </div>
    );
  }

  return (
    <div className="p-6 w-full min-h-screen bg-gray-800 text-white">
      {/* CREATE CLASS SECTION */}
      <div className="mb-8 py-6 bg-gradient-to-r from-black to-gray-900 pl-6 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold tracking-wide">CREATE NEW CLASS</h1>
      </div>

      <div className="flex gap-3 mb-10">
        <input
          type="text"
          value={classInput}
          onChange={(e) => setClassInput(e.target.value)}
          placeholder="Enter class name"
          className="flex-1 p-3 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddClass}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-semibold hover:scale-105 active:scale-95 transition shadow-lg"
        >
          Add Class
        </button>
      </div>

      {/* CLASS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {classes.map((c) => {
          const cardMenuRef = React.createRef<HTMLDivElement>();

          return (
            <div
              key={c.id}
              className="relative w-[230px] h-[100px] rounded-xl bg-blue-900 border border-blue-700 shadow-lg hover:shadow-2xl transition"
            >
              {/* CARD MENU */}
              <div ref={cardMenuRef} className="absolute top-2 right-2 z-50">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === c.id ? null : c.id);
                  }}
                  className="p-1 rounded-lg hover:bg-blue-700 transition"
                >
                  <MoreVertical size={18} />
                </button>

                {openMenuId === c.id && (
                  <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white shadow-2xl overflow-hidden">
                    <button
                      onClick={() => {
                        setEditingClass(c);
                        setEditingName(c.name);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 font-medium"
                    >
                      ✏️ Edit
                    </button>

                    <Deleteclass
                      Id={c.id}
                      onDelete={() =>
                        setClasses((prev) => prev.filter((cls) => cls.id !== c.id))
                      }
                    />
                  </div>
                )}
              </div>

              {/* CARD BODY */}
              <div
                onClick={() => !editingClass && setSelectedClass(c)}
                className="absolute inset-0 flex items-center justify-center cursor-pointer rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 hover:scale-[1.03] active:scale-[0.97] transition p-2"
              >
                <span className="text-2xl font-bold">{c.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODERN UPDATE MODAL */}
      {editingClass && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-slate-800 text-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setEditingClass(null)}
              className="absolute right-4 top-4 text-xl hover:text-red-400"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">Edit Class</h2>
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Enter new class name"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingClass(null)}
                className="px-4 py-2 bg-red-500 rounded-xl hover:bg-red-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateClass}
                className="px-4 py-2 bg-green-500 rounded-xl hover:bg-green-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}