import { TClassAndPeriod, TClasses } from "../api/classes/[id]/route";

export async function readClass(classId: string | string[]) {
  try {
    const res = await fetch(`/api/classes/${classId}`);
    const classData: TClassAndPeriod = await res.json();
    return classData;
  } catch (error) {
    console.error("Error reading class:", error);
    throw error;
  }
}

export async function readClasses() {
  try {
    const res = await fetch("/api/classes");
    const classes: TClasses[] = await res.json();
    return classes;
  } catch (error) {
    console.error("Error reading classes:", error);
    throw error;
  }
}
