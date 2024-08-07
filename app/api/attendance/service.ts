import axios from "axios";
import { TApprovedEnrollment } from "../enrollments/types";
import { TAttendance } from "./route";
import { TClassDatesRow } from "../classDates/route";

export type TAttendanceWithClassDates = TAttendance & {
  classDates: TClassDatesRow;
};

export async function readAttendances(
  userId?: string | string[],
  classId?: string,
) {
  try {
    const res = await axios.get(`/api/attendance`);
    const attendances: TAttendanceWithClassDates[] = res.data;
    if (userId && classId) {
      const filteredAttendances = attendances.filter(
        (attendance) =>
          attendance.userId === userId &&
          attendance.classDates.classId === classId,
      );
      return filteredAttendances;
    } else if (userId) {
      const filteredAttendances = attendances.filter(
        (attendance) => attendance.userId === userId,
      );
      return filteredAttendances;
    }
    return attendances;
  } catch (error) {
    console.error("Error reading attendances:", error);
    throw error;
  }
}

export async function createAttendances(attendances: TAttendance[]) {
  try {
    const res = await axios.post(`/api/attendance`, attendances);
    const createdAttendances: TAttendance[] = res.data;
    return createdAttendances;
  } catch (error) {
    console.error("Error creating attendances:", error);
    throw error;
  }
}

export async function readApprovedEnrollments(classId: string | string[]) {
  try {
    const res = await axios.get(`/api/enrollments/classId/${classId}/approved`);
    const approvedEnrollments: TApprovedEnrollment[] = res.data;
    return approvedEnrollments;
  } catch (error) {
    console.error("Error reading approved enrollments:", error);
    throw error;
  }
}
