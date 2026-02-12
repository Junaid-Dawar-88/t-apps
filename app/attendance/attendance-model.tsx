import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";
import { getStudent } from "../actions/student-actions";
import { managAttendance } from "../actions/attendance-action";

export async function AttendanceModel() {
   const students = await getStudent()

  return (
    <Card className="max-w-6xl mx-auto mb-10 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <CheckCircle className="text-blue-600" />
          Mark Attendance
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form action={managAttendance} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              name="date"
              type="date"
              required
              defaultValue={new Date().toISOString().split("T")[0]}
            />

            <select
              name="studentId"
              required
              className="h-10 rounded-md border px-3"
            >
              <option value="">Select Teacher</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
            <select
              name="status"
              required
              className="h-10 rounded-md border px-3"
              defaultValue="Present"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>

            <Input
              name="remarks"
              placeholder="Remarks (optional)"
            />

          </div>

          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Mark Attendance
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}