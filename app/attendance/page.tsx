import React from "react";
import { Users, AlertCircle, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AttendanceModel } from "./attendance-model";
import { getAttendance } from "../actions/attendance-action";
import DeleteAttendanceButton from "./attendance-delete";


export default async function AttendanceUI() {
  const attendance = await getAttendance();

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="mb-10 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>

          <h1 className="text-4xl font-bold">
            Attendance Manager
          </h1>
        </div>

        <p className="text-slate-500 ml-11">
          Track and manage student attendance
        </p>
      </div>

      <AttendanceModel />

      <Card className="max-w-6xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <AlertCircle className="text-green-600" />
            Attendance Records
          </CardTitle>
        </CardHeader>

        <CardContent>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <Input placeholder="Search student..." className="pl-10" />
          </div>

          {attendance.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              No attendance marked yet
            </p>
          ) : (

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b bg-slate-50">
                  <tr>
                    <th className="p-3 font-semibold">ID</th>
                    <th className="p-3 font-semibold">Name</th>
                    <th className="p-3 font-semibold">Status</th>
                    <th className="p-3 font-semibold">Date</th>
                    <th className="p-3 font-semibold">Remarks</th>
                    <th className="p-3 font-semibold text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {attendance.map((attend) => (
                    <tr key={attend.id} className="border-b">
                      <td className="p-3">{attend.student.id}</td>
                      <td className="p-3">{attend.student.name}</td>

                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            attend.status === "Present"
                              ? "bg-green-100 text-green-700"
                              : attend.status === "Absent"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {attend.status}
                        </span>
                      </td>

                      <td className="p-3">
                        {new Date(attend.attendance_date)
                          .toISOString()
                          .split("T")[0]}
                      </td>

                      <td className="p-3">
                        {attend.remarks || "-"}
                      </td>

                      <td className="p-3 text-center">
                        <DeleteAttendanceButton id={attend.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          )}

        </CardContent>
      </Card>

    </div>
  );
}