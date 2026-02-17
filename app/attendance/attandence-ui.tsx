"use client";

import React, {  useState, useTransition } from "react";
import Script from "next/script";
import {
  markAttendance,
  getClassAttendance,
  deleteAttendance,
} from "../actions/attendance-action";

interface Student {
  id: number;
  name: string;
  father: string;
  roll_number: string;
}

type Status = "Present" | "Absent" | "Leave";

interface AttendanceRecord {
  id: number;
  student: Student;
  status: Status;
  date: string;
}

interface Props {
  classId: number;
  className: string;
  students: Student[];
  onClose: () => void;
}

export default function ClassAttendanceModal({
  classId,
  className,
  students,
  onClose,
}: Props) {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isPending, startTransition] = useTransition();

  // ✅ FIXED — now correctly typed
  const [selectedRecord, setSelectedRecord] =
    useState<AttendanceRecord | null>(null);

  const [jsPDFLoaded, setJsPDFLoaded] = useState(false);

  //-------------------------------------------
  // Load attendance
  //-------------------------------------------
  const loadAttendance = async () => {
    const data = await getClassAttendance(classId);

    const mapped = (data).map((rec) => ({
      id: rec.id,
      status: rec.status as Status,
      student: {
        id: rec.student.id,
        name: rec.student.name,
        father: rec.student.father,
        roll_number: rec.student.roll_number,
      },
      date: new Date(rec.attendance_date).toLocaleDateString(),
    }));

    setRecords(mapped);
  };


  //-------------------------------------------
  // Mark attendance
  //-------------------------------------------
  const handleMark = (student: Student, status: Status) => {
    setRecords((prev) => {
      const exist = prev.find((r) => r.student.id === student.id);

      if (exist) {
        return prev.map((r) =>
          r.student.id === student.id ? { ...r, status } : r
        );
      }

      return [
        ...prev,
        {
          id: Math.random(),
          student,
          status,
          date: new Date().toLocaleDateString(),
        },
      ];
    });

    const form = new FormData();
    form.append("studentId", student.id.toString());
    form.append("classId", classId.toString());
    form.append("status", status);
    form.append("date", new Date().toISOString());

    startTransition(async () => {
      await markAttendance(form);
      await loadAttendance();
    });
  };

  //-------------------------------------------
  // Delete attendance
  //-------------------------------------------
  const handleDelete = (id: number) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));

    startTransition(async () => {
      await deleteAttendance(id);
      await loadAttendance();
    });
  };

  //-------------------------------------------
  // Generate Monthly PDF
  //-------------------------------------------
  const generateMonthlyReport = (student: Student) => {
    if (!jsPDFLoaded) {
      alert("PDF library is still loading...");
      return;
    }

    // safer access
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`${student.name}'s Monthly Attendance Report`, 20, 20);

    doc.setFontSize(12);
    doc.text("Date", 20, 40);
    doc.text("Status", 80, 40);

    const today = new Date();

    const studentRecords = records.filter((r) => {
      const d = new Date(r.date);

      return (
        r.student.id === student.id &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    });

    let y = 50;

    studentRecords.forEach((rec) => {
      doc.text(rec.date, 20, y);
      doc.text(rec.status, 80, y);
      y += 10;
    });

    doc.save(`${student.name}-Monthly-Attendance.pdf`);
  };

  return (
    <>
      {/* Load jsPDF */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
        strategy="afterInteractive"
        onLoad={() => setJsPDFLoaded(true)}
      />

      <div className="fixed inset-0 bg-black/40 flex justify-center pt-20 z-50">
        <div className="bg-slate-800 text-white w-full max-w-6xl rounded-xl p-6 shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-xl hover:text-red-400"
          >
            ✕
          </button>

          <h2 className="text-3xl font-bold mb-6">{className} Attendance</h2>

          {/* Attendance Table */}
          <table className="w-full border border-slate-600">
            <thead className="bg-slate-700">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Roll</th>
                <th className="p-3 border">Father</th>
                <th className="p-3 border">Present</th>
                <th className="p-3 border">Absent</th>
                <th className="p-3 border">Leave</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => {
                const existing = records.find(
                  (r) => r.student.id === student.id
                );

                return (
                  <tr key={student.id}>
                    <td className="border p-2">{student.name}</td>
                    <td className="border p-2">{student.roll_number}</td>
                    <td className="border p-2">{student.father}</td>

                    {(["Present", "Absent", "Leave"] as Status[]).map((s) => (
                      <td key={s} className="border text-center">
                        <input
                          type="radio"
                          name={`status-${student.id}`}
                          checked={existing?.status === s}
                          disabled={isPending}
                          onChange={() => handleMark(student, s)}
                        />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Records */}
          {records.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-3">Attendance Records</h3>

              <table className="w-full border">
                <tbody>
                  {records.map((rec) => (
                    <tr
                      key={rec.id}
                      className="text-center cursor-pointer hover:bg-slate-700"
                      onClick={() => setSelectedRecord(rec)}
                    >
                      <td className="border p-2">{rec.student.name}</td>
                      <td className="border p-2">{rec.status}</td>
                      <td className="border p-2">{rec.date}</td>
                      <td className="border p-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(rec.id);
                          }}
                          className="bg-red-500 px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Detail Modal */}
          {selectedRecord && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
              <div className="bg-slate-900 text-white rounded-xl p-6 w-[400px]">
                <h2 className="text-2xl font-bold mb-4">Attendance Detail</h2>

                <p><strong>Student:</strong> {selectedRecord.student.name}</p>
                <p><strong>Father:</strong> {selectedRecord.student.father}</p>
                <p><strong>Roll:</strong> {selectedRecord.student.roll_number}</p>
                <p><strong>Status:</strong> {selectedRecord.status}</p>
                <p><strong>Date:</strong> {selectedRecord.date}</p>

                <button
                  onClick={() =>
                    generateMonthlyReport(selectedRecord.student)
                  }
                  className="mt-2 w-full bg-blue-500 py-2 rounded-lg"
                >
                  Download Monthly Report
                </button>

                <button
                  onClick={() => setSelectedRecord(null)}
                  className="mt-4 w-full bg-gray-600 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}