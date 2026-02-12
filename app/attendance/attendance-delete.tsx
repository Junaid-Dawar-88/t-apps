"use client";

import { Button } from "@/components/ui/button";
import { deleteAttendance } from "../actions/attendance-action";

export default function DeleteAttendanceButton({ id }: { id: number }) {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={async () => {
        if (confirm("Delete this attendance?")) {
          await deleteAttendance(id);
        }
      }}
    >
      Delete
    </Button>
  );
}