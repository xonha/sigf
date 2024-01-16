import { Database } from "@/database.types";
import { TClassDates } from "../api/classDates/route";

type ClassDatesRow = Database["public"]["Tables"]["classDates"]["Row"];

export async function createClassDates(
  classId: string | string[],
  dates: Date[],
  currentClassDates: ClassDatesRow[] = []
): Promise<ClassDatesRow[]> {
  const body = dates.map((date) => {
    return {
      date: date.toISOString(),
      classId,
    };
  });

  try {
    const res = await fetch("/api/classDates", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const createdClassDates: ClassDatesRow[] = await res.json();

    const newCreatedClassDates = createdClassDates.map((row) => {
      const date = new Date(row.date);
      const day = date.toLocaleDateString("pt-BR", { weekday: "long" });
      return { ...row, day };
    });

    const newClassDates = [...currentClassDates, ...newCreatedClassDates];

    return newClassDates;
  } catch (error) {
    console.error("Error creating class date:", error);
    throw error;
  }
}

export async function deleteClassDates(classId: string | string[]) {
  const body = { classId };
  try {
    const res = await fetch(`/api/classDates`, {
      method: "DELETE",
      body: JSON.stringify(body),
    });
    const deletedClassDates: TClassDates[] = await res.json();
    return deletedClassDates;
  } catch (error) {
    console.error("Error deleting class date:", error);
  }
}
