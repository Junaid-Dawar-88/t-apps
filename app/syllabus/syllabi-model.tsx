"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const SYLLABUS_TYPES = ["Core", "Elective", "Advanced", "Foundation", "Specialization"];

export default function SyllabusFormToggle() {
  const [isOpen, setIsOpen] = useState(false); // form hidden initially

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="mb-6 bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition font-medium"
        >
          <Plus className="w-5 h-5" /> Add New Syllabus
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Form Centered */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Add New Syllabus</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Course Title"
                />
              </div>

              <div className="md:col-span-2">
                <label>Topics *</label>
                <textarea
                  name="topics"
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Topics covered"
                />
              </div>

              <div className="md:col-span-2">
                <label>Description</label>
                <textarea
                  name="description"
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Optional description"
                />
              </div>

              <div>
                <label>Type *</label>
                <select
                  name="type"
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  {SYLLABUS_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Teacher *</label>
                <select
                  name="teacher_id"
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select teacher</option>
                  <option value="1">Hello</option>
                </select>
              </div>

              <div>
                <label>Start Date *</label>
                <input
                  type="date"
                  name="start_date"
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label>End Date *</label>
                <input
                  type="date"
                  name="end_date"
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3">
                <button
                  type="button"
                  className="px-6 py-2 border rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Add
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}