import useUser from "@/app/utils/hooks/useUser";
import { TEnrollment } from "./userId/[id]/route";

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
export async function createEnrollment(
  classId: string,
  setUserEnrollments: any,
  setUpdateEnrollments: any,
  userEnrollments: any,
) {
  try {
    const { data, error } = await useUser();
    if (error) {
      console.error("Error getting user:", error);
      return;
    }
    const res = await fetch(`/api/enrollments`, {
      method: "POST",
      body: JSON.stringify({ userId: data.user.id, classId }),
    });
    const resData = await res.json();
    setUserEnrollments([...userEnrollments, resData[0].classId]);
    setUpdateEnrollments(true);
  } catch (error) {
    console.error("Error enrolling class:", error);
  }
}

export async function deleteEnrollment(
  classId: string,
  setUserEnrollments: any,
  setUpdateEnrollments: any,
  userEnrollments: any,
) {
  try {
    const { data, error } = await useUser();

    if (error) {
      console.error("Error getting user:", error);
      return;
    }
    const response = await fetch(`/api/enrollments`, {
      method: "DELETE",
      body: JSON.stringify({ userId: data.user.id, classId }),
    });
    await response.json();
    const filteredEnrollments = userEnrollments.filter(
      (item: { classId: string }) => item.classId === classId,
    );

    setUserEnrollments(filteredEnrollments);
    setUpdateEnrollments(true);
  } catch (error) {
    console.error("Error unenrolling class:", error);
  }
}
