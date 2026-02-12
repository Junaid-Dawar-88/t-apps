import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScheduleModel from "./schedul-model";
import { getSchedules } from "../actions/schedul-actions";

export default async function ScheduleUI() {
  const schedules = await getSchedules();

  return (
    <div className="p-6 space-y-6">
      <ScheduleModel />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">All Schedules</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Teacher</th>
                  <th className="px-4 py-3 text-left">Students</th>
                  <th className="px-4 py-3 text-left">Subject</th>
                  <th className="px-4 py-3 text-left">Timing</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {schedules.length > 0 ? (
                  schedules.map((schedule) => (
                    <tr key={schedule.id} className="border-b">
                      <td className="px-4 py-3">{schedule.id}</td>
                      <td className="px-4 py-3">{schedule.teacher.name}</td>
                       <td className="px-4 py-3">
                           {schedule.students.map(s => s.name).join(", ")}
                      </td>
                      <td className="px-4 py-3">{schedule.subject}</td>
                      <td className="px-4 py-3">{schedule.timing}</td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <Button variant="outline" size="sm">Update</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      No schedules yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}