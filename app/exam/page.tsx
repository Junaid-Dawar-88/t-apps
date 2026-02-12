import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExamModel from "./exam-model";
import { getExam } from "../actions/exam-action";
import ExamDelete from "./exam-delete";
import UpdateExamModal from "./exam-update";

export default async function ExamUI() {
  const exams = await getExam(); 

  return (
    <div className="p-8 bg-slate-100 min-h-screen space-y-8">

      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold">Create Test / Exam</h1>
      </div>

      <ExamModel />

      <Card className="max-w-7xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Exam Results</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="p-3 text-left font-semibold">Test/Exam</th>
                  <th className="p-3 text-left font-semibold">Teacher</th>
                  <th className="p-3 text-left font-semibold">Student</th>
                  <th className="p-3 text-left font-semibold">Obtained</th>
                  <th className="p-3 text-left font-semibold">Total</th>
                  <th className="p-3 text-left font-semibold">Percentage</th>
                  <th className="p-3 text-left font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {exams.length > 0 ? (
                  exams.map((exam) => {
                    const percentage =
                           exam.total_marks && exam.obtained_marks
                                 ? ((exam.obtained_marks / exam.total_marks) * 100).toFixed(2)
                                            : "0.00";
                    return (
                      <tr key={exam.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{exam.exam_name}</td>
                        <td className="p-3">{exam.teacher?.name ?? "No Teacher"}</td>
                        <td className="p-3">{exam.student?.name ?? "No Student"}</td>
                       <td className="p-3">{exam.obtained_marks}</td>
                       <td className="p-3">{exam.total_marks}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              Number(percentage) >= 60
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {percentage}%
                          </span>
                        </td>
                        <td className="p-3">
                      <div className="flex items-center gap-2">
                          <UpdateExamModal 
  id={exam.id}
  name={exam.exam_name}
  date={exam.exam_date}
  total_marks={exam.total_marks}
  obtained_marks={exam.obtained_marks}
  teacherId={exam.teacher?.id ?? ""}
  studentId={exam.student?.id ?? ""}
/>
                    <ExamDelete examId={exam.id} />
                        </div>
                      </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No results to display
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