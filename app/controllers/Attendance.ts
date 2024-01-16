import { TAttendance } from "../api/attendance/route";
import { TApprovedEnrollment } from "../api/enrollments/classId/[id]/approved/route";

export async function createAttendances(attendances: TAttendance[]) {
  try {
    const res = await fetch(`/api/attendance`, {
      method: "POST",
      body: JSON.stringify(attendances),
    });
    const createdAttendances: TAttendance[] = await res.json();
    return createdAttendances;
  } catch (error) {
    console.error("Error creating attendances:", error);
    throw error;
  }
}

export async function readApprovedEnrollments(classId: string | string[]) {
  try {
    const res = await fetch(`/api/enrollments/classId/${classId}/approved`);
    const approvedEnrollments: TApprovedEnrollment[] = await res.json();
    return approvedEnrollments;
  } catch (error) {
    console.error("Error reading approved enrollments:", error);
    throw error;
  }
}
