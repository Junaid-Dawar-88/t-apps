import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { getTeacher } from "../actions/teacher-actions";
import { getStudent } from "../actions/student-actions";
import { SchedulManag } from "../actions/schedul-actions";

const ScheduleModel = async () => {
  const teachers = await getTeacher();
  const students = await getStudent();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create New Schedule</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <form action={SchedulManag} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="teacherId" required className="border rounded-md p-2 h-10">
              <option value="">Select Teacher</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>

            <Input name="subject" placeholder="Subject" required />
            <Input name="timing" placeholder="Timing (10:00 AM - 11:00 AM)" required />

            <div className="border rounded-md p-3 max-h-48 overflow-y-auto">
              <p className="font-semibold mb-2">Select Students</p>
              <div className="grid grid-cols-2 gap-2">
                {students.map((s) => (
                  <label key={s.id} className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-1 rounded">
                    <input type="checkbox" name="studentIds" value={s.id} className="w-4 h-4" />
                    <span className="text-sm">{s.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <Button className="bg-green-600 hover:bg-green-700">Add Schedule</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ScheduleModel;