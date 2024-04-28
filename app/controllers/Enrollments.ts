import { TEnrollment } from "../api/enrollments/userId/[id]/route";
import useUser from "../utils/hooks/useUser";

export async function readEnrollments() {
  const { data, error } = await useUser();

  if (error) {
    console.error("Error getting user:", error);
    throw error;
  }

  try {
    const res = await fetch(`/api/enrollments/userId/${data.user.id}`);
    const resData = await res.json();

    const enrollments = await resData.map(
      (enrollment: { classId: string }) => enrollment.classId,
    );
    return enrollments as TEnrollment[];
  } catch (error) {
    console.error("Error getting enrollments:", error);
    throw error;
  }
}
