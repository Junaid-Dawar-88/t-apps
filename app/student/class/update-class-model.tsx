"use client";

import React, { useState } from "react";
import { updateClass } from "@/app/actions/class-action";

interface Props {
  classId: number;
  currentName: string;
  onClose: () => void;
  onUpdate: (newName: string) => void;
}

export default function UpdateClassModal({ classId, currentName, onClose, onUpdate }: Props) {
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return alert("Class name cannot be empty");

    setLoading(true);
    try {
      const updated = await updateClass(classId, name);
      onUpdate(updated.name);
      onClose();
    } catch (error) {
      throw error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-slate-800 text-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl hover:text-red-400"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Edit Class</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Enter new class name"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 rounded-xl hover:bg-red-600 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 rounded-xl hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}