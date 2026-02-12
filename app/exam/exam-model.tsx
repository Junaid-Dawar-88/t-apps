'use server'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React from 'react';
import { getTeacher } from '../actions/teacher-actions';
import { getStudent } from '../actions/student-actions';
import { ExamManag } from '../actions/exam-action';

const ExamModel = async () => {
  const teachers = await getTeacher();
  const students = await getStudent();

  return (
    <div>
      <Card className="max-w-7xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Exam Details</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Use server action directly in the form */}
          <form action={ExamManag} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input name="name" placeholder="Exam/Test Name" required />
              <Input name="date" type="date" required />
              <Input name="totalMarks" type="number" placeholder="Total Marks" required />
              <Input name="obtainedMarks" type="number" placeholder="Obtained Marks" required />

              <select name="studentId" className="h-10 rounded-md border px-3" required>
                <option value="">Select Student</option>
                {students.map(stud => (
                  <option key={stud.id} value={stud.id}>{stud.name}</option>
                ))}
              </select>

              <select name="teacherId" className="h-10 rounded-md border px-3" required>
                <option value="">Select Teacher</option>
                {teachers.map(teach => (
                  <option key={teach.id} value={teach.id}>{teach.name}</option>
                ))}
              </select>
            </div>

            <Button type="submit" className="mt-6 bg-purple-600 hover:bg-purple-700">
               Exam
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamModel;