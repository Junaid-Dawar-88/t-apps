import StudentClassManager from "./class/student-class";
import { getClasses } from "@/app/actions/class-action";

export default async function StudentClassManagerPage() {
  const classes = await getClasses();

  return <StudentClassManager initialClasses={classes} />;
}