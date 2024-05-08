import { Database } from "@/database.types";
import { TClassAndPeriod, TClasses } from "./[id]/route";

export type TCreateClass = Database["public"]["Tables"]["classes"]["Insert"];
export type TUpdateClass = Database["public"]["Tables"]["classes"]["Update"];

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

export async function createClass(classData: TCreateClass) {
  const resCreateClass = await fetch("/api/classes", {
    method: "POST",
    body: JSON.stringify(classData),
  });
  if (!resCreateClass.ok) {
    throw new Error("Error creating class");
  }

  const res = await fetch("/api/classes");
  if (!res.ok) {
    throw new Error("Error fetching classes");
  }

  const data = await res.json();

  return data;
}

export async function updateClass(classData: TUpdateClass) {
  try {
    await fetch(`/api/classes`, {
      method: "PATCH",
      body: JSON.stringify(classData),
    });

    const response = await fetch("/api/classes");
    const newClasses = await response.json();

    return newClasses;
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
}
