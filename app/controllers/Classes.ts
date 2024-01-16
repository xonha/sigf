import { TClassAndPeriod } from "../api/classes/[id]/route";

export async function readClass(classId: string | string[]) {
  try {
    const res = await fetch(`/api/classes/${classId}`);
    const classData: TClassAndPeriod = await res.json();
    return classData;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
}
