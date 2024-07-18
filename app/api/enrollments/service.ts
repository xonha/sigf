import useUser from "@/hooks/useUser";
import { TEnrollment } from "./userId/[id]/route";
import { Database } from "@/database.types";

type TCreateDeleteEnrollment =
  Database["public"]["Tables"]["enrollment"]["Insert"];

export async function readEnrollments() {
  try {
    const res = await fetch(`/api/enrollments`);
    const enrollments = await res.json();
    return enrollments as TEnrollment[];
  } catch (error) {
    console.error("Error getting enrollments:", error);
    throw error;
  }
}
export async function readEnrollmentsByClassId(classId: string) {
  try {
    const res = await fetch(`/api/enrollments/classId/${classId}`);
    const res_data = await res.json();

    const new_res_data = res_data.map((row) => {
      row.createdAt = new Date(row.createdAt);
      return row;
    });

    return new_res_data;
  } catch (error) {
    console.error("Error fetching enrollments:", error);
  }
}

export async function readEnrollmentsByUser() {
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
