import useUser from "@/app/utils/hooks/useUser";
import { TEnrollment } from "./userId/[id]/route";
import { Database } from "@/database.types";

type TCreateDeleteEnrollment =
  Database["public"]["Tables"]["enrollment"]["Insert"];

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

export async function createEnrollment(enrollment: TCreateDeleteEnrollment) {
  try {
    const res = await fetch(`/api/enrollments`, {
      method: "POST",
      body: JSON.stringify({ ...enrollment }),
    });
    const createdEnrollment = await res.json();
    return createdEnrollment[0];
  } catch (error) {
    console.error("Error enrolling class:", error);
  }
}

export async function deleteEnrollment(
  enrollment: TCreateDeleteEnrollment,
  userEnrollmentIds: any,
) {
  try {
    await fetch(`/api/enrollments`, {
      method: "DELETE",
      body: JSON.stringify({ ...enrollment }),
    });
    return userEnrollmentIds.filter(
      (enrollmentId: string) => enrollmentId !== enrollment.classId,
    );
  } catch (error) {
    console.error("Error unenrolling class:", error);
  }
}
